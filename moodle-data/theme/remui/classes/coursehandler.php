<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Course Related Queries and functionalities.
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('COURSE_IDS', 'ids');
define('MY_COURSE_IDS', 'myids');

use theme_remui\utility as utility;
use core_completion\progress as progress;

class theme_remui_coursehandler {
    /**
     * Get recent courses accessed by user
     *
     * @param Integer $limit
     * @return Array List of courses
     */
    public static function get_recent_accessed_courses($limit) {
        global $USER, $DB;
        $sql = 'SELECT ul.courseid, c.fullname
            FROM {user_lastaccess} ul
            JOIN {course} c ON c.id = ul.courseid
            WHERE userid = ?
            ORDER BY timeaccess
            DESC';
        $params = array ('userid' => $USER->id);
        $courses = $DB->get_records_sql($sql, $params, 0, $limit);
        if ($courses) {
            return $courses;
        }
        return array();
    }


        /**
         * Check if current user is admin or manager of site
         * @return boolean True if user is site admin/manager
         */
    public function is_admin_or_manager() {
        global $USER;
        if (is_siteadmin()) {
            return true;
        }

        $systemcontext = context_system::instance();
        // Checking two capabilities here.
        // As manager can manage the roles and manager the users too.
        if (has_capability('moodle/role:manage', $systemcontext) || has_capability('moodle/user:create', $systemcontext)) {
            return true;
        }
        return false;
    }

        /**
         * Delete temporary created table
         * @param  String $tablename Table name
         */
    public function drop_table($tablename) {
        global $DB;

        $dbman = $DB->get_manager();

        $table = new xmldb_table($tablename);

        if ($dbman->table_exists($tablename)) {
            $dbman->drop_table($table);
        }
    }

    /**
     * Get all course ids which is accessible to current user
     * @return array course ids
     */
    private function get_course_ids() {
        global $DB;
        $cache = $this->get_cache();
        $ids = $cache->get(COURSE_IDS);
        $ids = '';
        if (!$ids) {
            $ids = [];
            $where = 'c.id <> :siteid';
            $params = array(
                'contextcourse' => CONTEXT_COURSE,
                'siteid' => SITEID);
            $ctxselect = context_helper::get_preload_record_columns_sql('ctx');
            $sql = "SELECT c.id, c.category, c.visible, $ctxselect
                FROM {course} c
                JOIN {context} ctx ON c.id = ctx.instanceid AND ctx.contextlevel = :contextcourse
                WHERE ". $where;

            $list = $DB->get_records_sql($sql, $params);
            $mycourses = enrol_get_my_courses();
            // Loop through all records and make sure we only return the courses accessible by user.
            foreach ($list as $course) {
                if (isset($list[$course->id]->hassummary)) {
                    $list[$course->id]->hassummary = strlen($list[$course->id]->hassummary) > 0;
                }
                context_helper::preload_from_record($course);
                // Check that course is accessible by user.
                if (!array_key_exists($course->id, $mycourses) && !core_course_category::can_view_course_info($course)) {
                    unset($list[$course->id]);
                }
            }
            foreach ($list as $id => $value) {
                $ids[] = (object)[
                    'tempid' => $id
                ];
            }
            $cache->set(COURSE_IDS, $ids);
        }
        return $ids;
    }

    /**
     * Get ids of enrolled course ids
     * @return array Enrolled course ids
     */
    protected function get_my_courses() {
        global $DB;
        $cache = $this->get_cache();
        $ids = $cache->get('myids');
        if (!$ids) {
            $mycourses = enrol_get_my_courses();
            $ids = [];
            if (!empty($mycourses)) {
                foreach ($mycourses as $id => $value) {
                    $ids[] = (object)[
                        'tempid' => $id
                    ];
                }
            }
            $cache->set(MY_COURSE_IDS, $ids);
        }
        return $ids;
    }

        /**
         * Retrieves number of records from course table
         *
         * Not all fields are retrieved. Records are ready for preloading context
         *
         * @param  string $whereclause Where condition
         * @param  string $join        Join statement
         * @param  array  $params      sql parameters
         * @param  array  $options     may indicate that summary needs to be retrieved
         * @return array               array of stdClass objects
         */
    public function get_course_records($whereclause, $join, $params, $options) {
        global $DB, $CFG;
        $sesskey = strtolower(sesskey());
        $coursestable = 'tmp_cids_' . $sesskey;
        $mycoursestable = 'tmp_mycids_' . $sesskey;
        $ismanageroradmin = $this->is_admin_or_manager();

        // Check for required options.
        if (!isset($options['sort'])) {
            $options['sort'] = false;
        }
        if (!isset($options['mycourses'])) {
            $options['mycourses'] = false;
        }
        if (!isset($options['limitfrom'])) {
            $options['limitfrom'] = 0;
        }
        if (!isset($options['limitto'])) {
            $options['limitto'] = 0;
        }
        if (!isset($options['filtermodified'])) {
            $options['filtermodified'] = true;
        }

        // Apply sorting order.
        switch($options['sort']) {
            case 'ASC':
            case 'DESC':
                $orderby = " ORDER BY c.fullname " . $options['sort'];
                break;
            case 'newest':
                $orderby = " ORDER BY c.startdate DESC";
                break;
            case 'oldest':
                $orderby = " ORDER BY c.startdate ASC";
                break;
            case 'highrating':
            case 'lowrating':
                $courseidsbyratings = Utility::get_all_courseids_sorted_according_rating();
                if (!empty($courseidsbyratings)) {
                    $direction = $options['sort'] === 'lowrating' ? ' DESC' : '';
                    $casestatements = [];
                    foreach ($courseidsbyratings as $index => $id) {
                        $casestatements[] = "WHEN c.id = $id THEN $index";
                    }
                    $orderby = " ORDER BY CASE " . implode(' ', $casestatements) . " ELSE " . count($courseidsbyratings) . " END $direction";

                } else {
                    $orderby = " ORDER BY c.timecreated DESC";
                }
                break;
            default:
                $orderby = " ORDER BY c.sortorder";
                break;
        }

        $fields = array('c.id', 'c.category', 'c.sortorder',
                        'c.shortname', 'c.fullname', 'c.idnumber',
                        'c.startdate', 'c.enddate', 'c.visible', 'c.cacherev','c.timemodified','c.groupmode');

        // Load summary data.
        if (!empty($options['summary'])) {
            $fields[] = 'c.summary';
            $fields[] = 'c.summaryformat';
        } else {
            $fields[] = $DB->sql_substr('c.summary', 1, 1). ' as hassummary';
        }

        // If user is not admin then load viewvable course ids.
        if (!$ismanageroradmin) {
            $ids = $this->get_course_ids();
            if (empty($ids)) {
                return array(0, []);
            }
            $this->create_temp_table($coursestable, $ids);
            $join .= " INNER JOIN {" . $coursestable  . "} cids ON c.id = cids.tempid";
        }

        // Load enrolled courses if mycourses is enabled.
        if ($options['mycourses'] == true) {
            $ids = $this->get_my_courses();
            if (empty($ids)) {
                $this->drop_table($mycoursestable);
                return array(0, []);
            }
            $this->create_temp_table($mycoursestable, $ids);
            $join .= " INNER JOIN {" . $mycoursestable . "} mycids ON c.id = mycids.tempid";
        }

        $fields = join(',', $fields);
        $sql = "SELECT $fields
                FROM {course} c $join $whereclause $orderby";

        $list = $DB->get_records_sql($sql, $params, $options['limitfrom'], $options['limitto']);

        // Cache course count for upcoming request.
        $cache = $this->get_cache();
        $count = $cache->get('count');
        if ((!$count || $options['filtermodified']) && $options['totalcount'] == true) {
            $sql = "SELECT count(c.id) count
                FROM {course} c $join $whereclause";
            $count = $DB->get_record_sql($sql, $params)->count;
            $cache->set('count', $count);
        }

        // If user is not admin then load viewvable course ids.
        if (!$ismanageroradmin) {
            $this->drop_table($coursestable);
        }

        // Load enrolled courses if mycourses is enabled.
        if ($options['mycourses'] == true) {
            $this->drop_table($mycoursestable);
        }

        return array($count, $list);
    }

    /**
     * Get recent courses menu data context accessed by user
     *
     * @param Integer $limit
     * @return Array List of courses
     */
    public function get_recent_accessed_courses_menu($limit) {

        if (!isloggedin() && !\theme_remui\toolbox::get_setting('enablerecentcourses')) {
            return false;
        }

        $finalarr = array();
        $courses = $this->get_recent_accessed_courses($limit);
        foreach ($courses as $key => $course) {
            $templatecontext['hasrecent'] = true;
            $finalarr[] = array (
                'id' => $course->courseid,
                'fullname' => format_text($course->fullname)
            );
        }

        if (empty($finalarr)) {
            return false;
        }

        return $finalarr;
    }

    public function get_focus_context_data() {
        global $PAGE, $CFG, $COURSE, $USER;

        require_once($CFG->libdir . '/completionlib.php');

        // Focus Mode Code.
        $focusdata = [];
        if (($PAGE->pagelayout === 'course' || $PAGE->pagelayout === 'incourse') && $PAGE->pagetype !== "enrol-index") {

            $userpreference = get_user_preferences('enable_focus_mode', null);
            $focusmodpreference = $userpreference ? json_decode($userpreference, true) : null;
            $focusmodesetting = \theme_remui\toolbox::get_setting('focusmode');



            $focusdata['enabled'] = $focusmodesetting;

            // Get course focus mode custom field value if exists
            $coursefocusmodecustomfield = 0;
            $metadata = get_course_metadata($COURSE->id);
            if (isset($metadata["edwfocusmode"])) {
                $coursefocusmodecustomfield = $metadata["edwfocusmode"];
            }

            // First check if focusmode setting is enabled
            if ($focusmodesetting == 0 ||
                ($focusmodesetting == 1 && $coursefocusmodecustomfield == 0)) {
                $focusdata['on'] = false;
            } else if ($focusmodesetting == 1 && $coursefocusmodecustomfield == 1 ||
                      $focusmodesetting == 2) {
                $focusdata['on'] = true;
            }

            $focusmodepreferencestatus = false;
            if (!empty($focusmodpreference) && isset($focusmodpreference[$COURSE->id]) && ($focusmodesetting != 0)) {
                $focusdata['on'] = (bool)$focusmodpreference[$COURSE->id];
                $focusmodepreferencestatus = $focusdata['on'];
            }

            $coursecontext = context_course::instance($COURSE->id);

            $roles = get_user_roles_in_course($USER->id, $COURSE->id);

            if (
                (is_siteadmin($USER) || preg_match('/\b(Teacher|Manager|coursecreator|Non-editing teacher)\b/', $roles)) &&
                !$focusmodepreferencestatus
            ) {
                $focusdata['on'] = false;

                // Currently this is not requre and in future be will remove this comment

                // if ($PAGE->url->compare(new moodle_url('/course/view.php'), URL_MATCH_BASE)) {
                //     $focusdata['admininfotext'] = get_string('focusmodeactiveadminmsg', 'theme_remui');
                //     $focusdata['enableadmininfo'] = true;
                // }
            }
            // $focusdata['on'] = get_user_preferences('enable_focus_mode', false) && $focusdata['enabled'];
            if ($focusdata['on']) {
                $focusdata['btnbg'] = 'btn-danger';
                $focusdata['btnicon'] = 'edw-icon edw-icon-Cancel';
                $focusdata['btntext'] = get_string('focusmodeactivestatetext', 'theme_remui');
            } else {
                $focusdata['btnbg'] = 'btn-primary';
                $focusdata['btnicon'] = 'edw-icon edw-icon-Expand';
                $focusdata['btntext'] = get_string('focusmodenormalstatetext', 'theme_remui');
            }
            $focusdata['coursename'] = format_text($COURSE->fullname, FORMAT_HTML);
            if ($PAGE->pagelayout === 'incourse') {
                $focusdata['courseurl'] = $CFG->wwwroot . '/course/view.php?id=' . $COURSE->id;
            }


            if (is_enrolled($coursecontext, $USER->id)) {
                $completion = new \completion_info($COURSE);
                if ($completion->is_enabled()) {
                    $percentage = \core_completion\progress::get_course_progress_percentage($COURSE, $USER->id);
                    if ($percentage === null) {
                        $percentage = 0;
                    }
                    $focusdata['progress'] = (int)$percentage;
                }
            }
        }

        return $focusdata;
    }

    /**
     * Get enrolled students in course
     * @param  Object $course  Course
     * @param  Object $context Course context
     * @return Array           Array of users
     */
    public function get_enrolled_students($course, $context,$userid=0,$admin = false) {
        global $DB, $USER;

        $groups = [];

        if (empty($userid)) {
            $userid = $USER->id;
        }

        $groups = groups_get_user_groups($course->id, $userid);
        $groups = $groups[0];

        list($esql, $params) = get_enrolled_sql($context, 'moodle/course:isincompletionreports');

        $groupsql = '';

        if(!$admin){
            if (!has_capability('moodle/site:accessallgroups', $context) && $course->groupmode == 1) {
                if (empty($groups)) {
                    return [];
                }

                list($insql, $inparams) = $DB->get_in_or_equal($groups, SQL_PARAMS_NAMED, 'groups', true, true);
                $groupsql = " JOIN {groups_members} gm ON gm.groupid $insql AND gm.userid = u.id";
                $params = array_merge($params, $inparams);
            }
        }

        $fields = implode(', ', [
            'u.id',
            'u.confirmed',
            'u.policyagreed',
            'u.deleted',
            'u.suspended',
            'u.username',
            'u.idnumber',
            'u.firstname',
            'u.lastname',
            'u.email',
            'u.lang',
            'u.theme',
            'u.firstaccess',
            'u.lastaccess',
            'u.lastlogin',
            'u.currentlogin',
            'u.timecreated',
            'u.timemodified',
            'u.lastnamephonetic',
            'u.firstnamephonetic',
            'u.middlename',
            'u.alternatename',
        ]);

        $sql = "SELECT DISTINCT $fields
                FROM {user} u
                $groupsql
                JOIN ($esql) je ON je.id = u.id
                WHERE u.deleted = 0";

        return $DB->get_records_sql($sql, $params);
    }

    /**
     * Set course stats
     *
     * @param object $course Course object
     *
     * @return array
     */
    public function set_course_stats($course,$admins=false) {

        $statsjson = json_decode(get_config('theme_remui',"edwcoursestats"),true);

        $stats = array();
        $context = \context_course::instance($course->id);
        // This capability is allowed to only students - 'moodle/course:isincompletionreports'.
        if($admins){

            $adminuser = get_admin();

            $enrolledusers = $this->get_enrolled_students($course, $context,$adminuser->id,true);

            $stats = $this->calculate_course_stats($course,$enrolledusers);

            $statsjson["course".$course->id] = $stats;

            set_config("edwcoursestats", json_encode($statsjson), "theme_remui");

        }else{

            $enrolledusers = $this->get_enrolled_students($course, $context);

            $stats = $this->calculate_course_stats($course,$enrolledusers);

        }

        return $stats;

    }

    /**
     * Calculate the course statistics for the given course and enrolled users.
     *
     * @param object $course The course object.
     * @param array $enrolledusers The array of enrolled users.
     * @return array The course statistics, including the number of completed, in-progress, and not-started courses.
     */

    public function calculate_course_stats($course, $enrolledusers) {

        $stats = array();
        $coursepercentage = new \core_completion\progress();
        $stats['completed'] = 0;
        $stats['inprogress'] = 0;
        $stats['notstarted'] = 0;
        $stats['enrolledusers'] = count($enrolledusers);
        // Check if completion is enabled.
        $completion = new completion_info($course);
        if ($completion->is_enabled()) {
            $inprogress = 0;
            $completed = 0;
            $notstarted = 0;
            foreach ($enrolledusers as $student) {
                $percentvalue = $coursepercentage->get_course_progress_percentage($course, $student->id);
                if ($percentvalue == 100) {
                    $completed++;
                }
                if ($percentvalue == 0) {
                    $notstarted++;
                }
                if ($percentvalue > 0 && $percentvalue < 100) {
                    $inprogress++;
                }
            }

            $stats['completed'] = $completed;
            $stats['inprogress'] = $inprogress;
            $stats['notstarted'] = $notstarted;
        }

        return $stats;

    }

    /**
     * Get course stats
     *
     * @param object $course Course object
     *
     * @return array
     */
    public function get_course_stats($course) {

        $statsjson = json_decode(get_config('theme_remui',"edwcoursestats"),true);

        $stats = array();

        if(isset($statsjson["course".$course->id])){

            $stats = $statsjson["course".$course->id];

        }else{

            $stats = $this->set_course_stats($course,true);

        }

        // It will not update the course stats in db it will calculate and return it.
        if($course->groupmode == 1 && !$this->is_admin_or_manager()){

            $stats = $this->set_course_stats($course);
        }
        return $stats;
    }

    /**
     * Set dashboard stats
     *
     *
     * @return array
     */
    public function set_dashboard_stats($userid) {

        $statsjson = json_decode(get_config('theme_remui',"edwdashboardstats"),true);

        $coursepercentage = new \core_completion\progress();

        $stats = array();

        $courses = enrol_get_users_courses($userid);

        $coursescount = 0;
        $coursescompleted = 0;
        $activitiescomplete = 0;
        $activitiesdue = 0;
        foreach ($courses as $key => $course) {
            $coursescount++;
            $completion = new \completion_info($course);
            $progresspercentvalue = $coursepercentage->get_course_progress_percentage($course, $userid);
            if ($completion->is_enabled()) {
                $modules = $completion->get_activities();
                $activitiesprogress = 0;
                foreach ($modules as $module) {
                    $moduledata = $completion->get_data($module, false, $userid);
                    if ($moduledata->completionstate == COMPLETION_INCOMPLETE) {
                        $activitiesdue++;
                    } else {
                        $activitiescomplete++;
                    }
                }
                if ($progresspercentvalue == "100") {
                    $coursescompleted++;
                }

            }
        }

        $stats['coursesenrolled'] = $coursescount;
        $stats['coursescompleted'] = $coursescompleted;
        $stats['activitiescompleted'] = $activitiescomplete;
        $stats['activitiesdue'] = $activitiesdue;

        $statsjson[$userid] = $stats;

        set_config("edwdashboardstats", json_encode($statsjson), "theme_remui");

    }

    /**
     * Get dashboard stats
     *
     *
     * @return array
     */
    public function get_dashboard_stats() {

        global $USER;

        $statsjson = json_decode(get_config('theme_remui',"edwdashboardstats"),true);

        $stats = array();

        if(isset($statsjson[$USER->id])){

            $stats = $statsjson[$USER->id];

        }else{
            $this->set_dashboard_stats($USER->id);

            $statsjson = json_decode(get_config('theme_remui',"edwdashboardstats"),true);

            $stats = $statsjson[$USER->id];
        }
        return $stats;
    }


    public function reset_dashboard_stats_for_users_incourse($course) {

        $coursecontext = \context_course::instance($course->id);

        $courseuserids = get_enrolled_users($coursecontext,'',0,'u.id',);

        // Convert the array of objects to an array of associative arrays
        $courseuseridsArray = array_map(function($user) {
            return (array) $user;
        }, $courseuserids);

        // Use array_column to extract the 'id' values
        $courseuserids = array_column($courseuseridsArray, 'id');

        $statsjson = json_decode(get_config('theme_remui',"edwdashboardstats"),true);

        // Ensure $statsjson is always an array to avoid errors in array_diff_key().
        // This handles cases where the config is missing or empty, so we safely proceed with an empty array.
        if (!is_array($statsjson)) {
            $statsjson = [];
        }

        // Remove keys from $statsjson where values are present in $courseuserids
        $statsjson = array_diff_key($statsjson, $courseuserids);

        set_config("edwdashboardstats", json_encode($statsjson), "theme_remui");

    }
        /**
         * Returns the data for course filter.
         */
    public static function get_course_filters_data() {
        global $PAGE;
        $filterdata = array();
        $catdata = array();
        $categories = \core_course_category::make_categories_list();
        $firstcat = true;
        foreach ($categories as $key => $value) {
            $category = new \stdClass();
            $category->id = $key;
            $category->title = $value;
            $cat = \core_course_category::get($key);
            $category->courses = $cat->get_courses_count();
            if ($firstcat) {
                $category->active = true;
                $firstcat = false;
            }
            array_push($catdata, $category);
        }
        $filterdata['catdata'] = $catdata;
        $filterdata['searchhtml'] = $PAGE->get_renderer('core', 'course')->course_search_form('', '', '', 0);
        return $filterdata;
    }

        /**
         * Clear user cache
         */
    public function invalidate_course_cache() {
        $cache = $this->get_cache();
        $result = $cache->delete_many([COURSE_IDS, MY_COURSE_IDS]);

        // Make the preference to false.
        set_user_preference('course_cache_reset', false);

        // Save the time at which cache was reset.
        set_user_preference('course_reset_time', time());
    }

        /**
         * Get cache object for logged in and logged out users
         * @return Object Cache Object
         */
    private function get_cache() {
        global $USER;
        if (!empty($USER->id) || isguestuser($USER->id)) {
            return cache::make('theme_remui', 'courses');
        }
        return cache::make('theme_remui', 'guestcourses');
    }

        /**
         * Return user's courses or all the courses
         *
         * Usually called to get usr's courese, or it could also be called to get all course.
         * This function will also be called whern search course is used.
         *
         * @param bool   $totalcount If true the course count is returned
         * @param string $search course name to be search
         * @param int    $category ids to be search of courses.
         * @param int    $limitfrom course to be returned from these number onwards, like from course 5 .
         * @param int    $limitto till this number course to be returned ,
         *                        like from course 10, then 5 course will be returned from 5 to 10.
         * @param int    $mycourses to return user's course which he/she enrolled into.
         * @param bool   $categorysort if true the categories are sorted
         * @param array  $courses pass courses if would like to load more data for those courses
         * @param bool   $filtermodified if true then fresh course count will be loaded else cached will be used
         * @return array of course.
         */
    public function get_courses(
        $totalcount = false,
        $search = null,
        $category = null,
        $limitfrom = 0,
        $limitto = 0,
        $mycourses = null,
        $categorysort = null,
        $courses = [],
        $filtermodified = false,
        $filteredcourseids = [],
        $isfilterapplied = false
    ) {
        global $DB, $CFG, $USER, $OUTPUT;
        $count = 0;
        $coursecount = 0;
        $coursesarray = array();
        $where = '';

        if (!empty($courses)) {
            $coursecount = count($courses);
        }

        require_once($CFG->dirroot.'/course/renderer.php');

        if (empty($courses)) {
            // Retrieve list of courses in category.
            $where = 'WHERE c.id <> :siteid ';
            $params = array('siteid' => SITEID);
            $join = '';
            $sesskey = strtolower(sesskey());
            $cattable = 'tmp_catids' . $sesskey;

            if (is_numeric($category) || is_array($category)) {
                $categories = self::get_allowed_categories($category);
                $cats = [];
                foreach ($categories as $category) {
                    $cats[] = (object)[
                        'tempid' => $category
                    ];
                }
                if (!empty($categories)) {
                    $this->create_temp_table($cattable, $cats);
                    $join = " INNER JOIN {" . $cattable . "} catids ON c.category = catids.tempid";
                }
            }

            if (!empty($search)) {
                $search = '%' . str_replace(' ', '%', $search) . '%';
                $where .= " AND ( LOWER(c.fullname) like LOWER(:name1) OR LOWER(c.shortname) like LOWER(:name2) )";
                $params = $params + array("name1" => $search, "name2" => $search);
            }
            if ($isfilterapplied) {
                if (!empty($filteredcourseids)) {
                    list($insql, $inparams) = $DB->get_in_or_equal($filteredcourseids, SQL_PARAMS_NAMED);
                    $where .= " AND c.id $insql";
                    $params = $params + $inparams;
                } else {
                    // This will ensure no courses are returned when $filteredcourseids is empty.
                    $where .= " AND 1=0";
                }
            }

            // Get list of courses without preloaded coursecontacts because we don't need them for every course.
            list($coursecount, $courses) = $this->get_course_records(
                $where,
                $join,
                $params,
                [
                    'summary' => true,
                    'sort' => $categorysort,
                    'filtermodified' => $filtermodified,
                    'limitfrom' => $limitfrom,
                    'limitto' => $limitto,
                    'mycourses' => $mycourses,
                    'totalcount' => $totalcount,
                ]
            );
            if (is_numeric($category) || is_array($category)) {
                $this->drop_table($cattable);
            }
        }
        // Return count of total courses by getting limited data.
        // If required.
        if ($totalcount === true) {
            return $coursecount;
        }

        $beginnerecourseids = Utility::get_skilllevel_filtered_courseids([1]);
        $intermediatecourseids = Utility::get_skilllevel_filtered_courseids([2]);
        $advancedcourseids = Utility::get_skilllevel_filtered_courseids([3]);

        // Prepare courses array.
        $chelper = new \coursecat_helper();

        foreach ($courses as $k => $course) {
            $course = (object)$course;
            $corecourselistelement = new \core_course_list_element($course);
            $context = context_course::instance($course->id);

            if ($course->category == 0) {
                continue;
            }

            $coursesarray[$count]["courseid"] = $course->id;
            $coursesarray[$count]["coursename"] = strip_tags($chelper->get_course_formatted_name($course));
            $coursesarray[$count]["shortname"] = $course->shortname;
            $coursesarray[$count]["categoryname"] = format_text($DB->get_record('course_categories', array('id' => $course->category))->name,FORMAT_HTML);
            $coursesarray[$count]["visible"] = $course->visible;
            $coursesarray[$count]["courseurl"] = $CFG->wwwroot."/course/view.php?id=".$course->id;

            $slilllevel = null;
            if (in_array($course->id, $beginnerecourseids)) {
                $slilllevel = [
                    'badge' => 'badge-light',
                    'labeltag' => get_string('skill1', 'theme_remui'),
                ];
            } else if (in_array($course->id, $intermediatecourseids)) {
                $slilllevel = [
                    'badge' => 'badge-info',
                    'labeltag' => get_string('skill2', 'theme_remui'),
                ];
            } else if (in_array($course->id, $advancedcourseids) ) {
                $slilllevel = [
                    'badge' => 'badge-warning',
                    'labeltag' => get_string('skill3', 'theme_remui'),
                ];
            }

            $coursesarray[$count]["skillleveltag"] = $slilllevel;

            // This is to handle the version change.
            // User enrollment link has changed for moodle version 3.4.
            $version33 = "2017092100";
            $curversion = $DB->get_record_sql(
                'SELECT * FROM {config_plugins} WHERE plugin = ? AND name = ?',
                array('theme_remui', 'version')
            );
            $userenrollink = "/enrol/users.php?id=";
            if ($curversion > $version33) {
                $userenrollink = "/user/index.php?id=";
            }
            $coursesarray[$count]["enrollusers"] = $CFG->wwwroot.$userenrollink.$course->id."&version=".$course->id;
            $coursesarray[$count]["editcourse"] = $CFG->wwwroot."/course/edit.php?id=".$course->id;
            $coursesarray[$count]["grader"] = $CFG->wwwroot."/grade/report/grader/index.php?id=".$course->id;
            $coursesarray[$count]["activity"] = $CFG->wwwroot."/report/outline/index.php?id=".$course->id;
            $coursesummary = strip_tags($chelper->get_course_formatted_summary($corecourselistelement));
            $coursesummary = preg_replace('/\n+/', '', $coursesummary);
            $summarystring = $coursesummary;
            $coursesarray[$count]["coursesummary"] = $summarystring;
            $coursesarray[$count]["epochstartdate"] = $course->startdate;
            $coursesarray[$count]["coursestartdate"] = date('d M, Y', $course->startdate);
            $coursesarray[$count]["epochenddate"] = $course->enddate;
            if (!$mycourses) {
                $coursecontext = context_course::instance($course->id);
                if (has_capability('moodle/course:update', $coursecontext)) {
                    $coursesarray[$count]["usercanmanage"] = true;
                }
            }
            // Course enrolled users count
            $coursesarray[$count]["enrolleduserscount"] = false;
            if(get_config('theme_remui', 'enrolleduserscountvisibility')){
                $coursesarray[$count]["enrolleduserscount"] = $this->formatcoursecounts(count($this->get_enrolled_students($course, $context)));
            }

            $coursedatevisibility = get_config('theme_remui', 'coursedatevisibility');
            $coursesarray[$count]["showselecteddatesetting"] = false;
            $coursesarray[$count]["showselecteddatesettingname"] =false;
            $coursesarray[$count]["showselecteddatesettingdate"] =false;
            if($coursedatevisibility == 'hidedate'){
                $coursesarray[$count]["showselecteddatesetting"]  = false;
            } else if($coursedatevisibility == 'showstartdate'){
                $coursesarray[$count]["showselecteddatesetting"] = get_string('coursestarted', 'theme_remui').": ".date('M Y', $course->startdate);
                $coursesarray[$count]["showselecteddatesettingname"] = get_string('coursestarted', 'theme_remui');
                $coursesarray[$count]["showselecteddatesettingdate"] = date('d M Y', $course->startdate);
            } else if($coursedatevisibility == 'showupdatedate'){
                $coursesarray[$count]["showselecteddatesetting"] = get_string('courseupdated', 'theme_remui').": ".date('M Y', $course->timemodified);
                $coursesarray[$count]["showselecteddatesettingname"] = get_string('courseupdated', 'theme_remui');
                $coursesarray[$count]["showselecteddatesettingdate"] = date('d M Y', $course->timemodified);
            }else if($coursedatevisibility == 'showstartwhenend' && $course->enddate){
                $coursesarray[$count]["showselecteddatesetting"] = get_string('coursestarted', 'theme_remui').": ".date('M Y', $course->startdate);
                $coursesarray[$count]["showselecteddatesettingname"] = get_string('coursestarted', 'theme_remui');
                $coursesarray[$count]["showselecteddatesettingdate"] = date('d M Y', $course->startdate);
            }else{
                $coursesarray[$count]["showselecteddatesetting"] = false;
            }
            $coursesarray[$count]["enrolledusertitletext"] =  get_string('coursecardsenrolledetxt', 'theme_remui' );
            $coursesarray[$count]["lessonstitletext"]  = get_string('coursecardlessonstext','theme_remui'  );

            if(get_config('theme_remui', 'showenrolledtextinput')){
                $coursesarray[$count]["enrolledusertitletext"] = format_text(get_config('theme_remui', 'showenrolledtextinput'),FORMAT_HTML);
            }
            if(get_config('theme_remui', 'showlessontextinput')){
                $coursesarray[$count]["lessonstitletext"] = format_text(get_config('theme_remui', 'showlessontextinput'),FORMAT_HTML);;
            }

            // Course enrollment icons.
            if ($icons = enrol_get_course_info_icons($course)) {
                $iconhtml = '';
                $iconsarraylength = count($icons);
                $arraylenthcount = 0;
                if($iconsarraylength > 2){
                    $coursesarray[$count]["enrollmenticonsremainig"] = $iconsarraylength - 2;
                }else{
                    $coursesarray[$count]["enrollmenticonsremainig"] = false;
                }
                foreach ($icons as $pixicon) {
                    if($arraylenthcount == 2){
                        break;
                    }
                    $iconhtml .= $OUTPUT->render($pixicon);
                    $arraylenthcount++;
                }
                $coursesarray[$count]["enrollmenticons"] = $iconhtml; // Add icons in context.
            }

            // Course instructors.
            $instructors = $corecourselistelement->get_course_contacts();
            $coursesarray[$count]['instructorcount'] = (count($instructors) > 1) ? count($instructors) - 1 : "";

            // Get Ratings and Review Context.
            $rnrshortdesign =false;
            if (is_plugin_available('block_edwiserratingreview')) {
                $rnrshortdesignarray = utility:: get_ernr_coursecard_design($course);
                if($rnrshortdesignarray['rnrshortratingvalue'] > 0){
                    $rnrshortdesign = $rnrshortdesignarray['rnrshortdesign'];
                }
            }

            $coursesarray[$count]["ernrshortdesign"] = $rnrshortdesign;
             // Get sections information.
            $modinfo = get_fast_modinfo($course);
            $sections = $modinfo->get_section_info_all();
            $courselessoncount = 0;
            foreach($sections as $section){
                if($section->visible){
                    $courselessoncount++;
                }
            }
            $coursesarray[$count]['lessoncount'] = false;
            $coursesarray[$count]['multilessonpresent']  = false;
            $coursesarray[$count]['singleessonpresent']  = false;
            if(get_config('theme_remui', 'lessonsvisiblityoncoursecard')){
                $coursesarray[$count]['lessoncount'] = $courselessoncount;
                if($coursesarray[$count]['lessoncount'] > 1){
                    $coursesarray[$count]['multilessonpresent']  = true;
                }else{
                 $coursesarray[$count]['singleessonpresent']  = true;
                }
            }
            foreach ($instructors as $key => $instructor) {
                $coursesarray[$count]["instructors"][] = array(
                    'name' => $instructor['username'],
                    'url'  => $CFG->wwwroot.'/user/profile.php?id='.$key,
                    'picture' => utility::get_user_picture($DB->get_record('user', array('id' => $key)))
                );
                break;
            }

            // Course image.
            foreach ($corecourselistelement->get_course_overviewfiles() as $file) {
                $isimage = $file->is_valid_image();
                $courseimage = file_encode_url(
                    "$CFG->wwwroot/pluginfile.php",
                    '/'. $file->get_contextid(). '/'. $file->get_component(). '/'.
                    $file->get_filearea(). $file->get_filepath(). $file->get_filename(),
                    !$isimage
                );
                if ($isimage) {
                    break;
                }
            }
            if (!empty($courseimage)) {
                $coursesarray[$count]["courseimage"] = $courseimage;
            } else {
                $coursesarray[$count]["courseimage"] = $OUTPUT->get_generated_image_for_id($course->id);
            }
            $courseimage = '';
            $count++;
        }

        if ($totalcount === false) {
            return $coursesarray;
        }
        return array($coursecount, $coursesarray);
    }



        /**
         * Get allowed categories from category id
         *
         * @param  integer $categoryid Category id
         * @return array               Category ids
         */
    public static function get_allowed_categories($categoryid) {
        global $DB;

        $allcats = array_keys(\core_course_category::make_categories_list());
        $allowedcat = array();

        if ($categoryid == 'all') {
            return $allcats;
        } else if ($categoryid !== null && is_numeric($categoryid)) {
            $sql = "SELECT * FROM {course_categories} WHERE path LIKE ? OR path LIKE ?";
            $categories = $DB->get_records_sql($sql, array('%/' . $categoryid, '%/' . $categoryid . '/%'));
            $allowedcat = array_intersect($allcats, array_keys($categories));
        }

        return $allowedcat;
    }

    /**
     * Create temporary table to join ids with table
     * @param  String $tablename Name of table
     * @param  Array $ids       Id array
     */
    public function create_temp_table($tablename, $ids) {
        global $DB, $CFG;

        $dbman = $DB->get_manager();

        $table = new xmldb_table($tablename);
        // $table->add_field('id', XMLDB_TYPE_INTEGER, 10);
        // $table->add_field('tempid', XMLDB_TYPE_INTEGER, 10);

        $table->add_field('id', XMLDB_TYPE_INTEGER, 10,XMLDB_UNSIGNED, XMLDB_NOTNULL, XMLDB_SEQUENCE);
        $table->add_field('tempid', XMLDB_TYPE_INTEGER, 10);
        $table->add_key('primary', XMLDB_KEY_PRIMARY, ['id']);

        if ($dbman->table_exists($tablename)) {
            $dbman->drop_table($table);
        }

        $dbman->create_temp_table($table);

        $DB->insert_records($tablename, $ids);
    }

    /**
     * Get course image.
     * @param  stdClass $corecourselistelement Course list element
     * @param  boolean  $islist                Is list
     * @return string                          Course image
     */
    public static function get_course_image($corecourselistelement, $islist = false) {
        global $CFG, $OUTPUT;

        if (!$islist) {
            $corecourselistelement = new \core_course_list_element($corecourselistelement);
        }

        // Course image.
        foreach ($corecourselistelement->get_course_overviewfiles() as $file) {
            $isimage = $file->is_valid_image();
            $courseimage = file_encode_url(
                "$CFG->wwwroot/pluginfile.php",
                '/'. $file->get_contextid(). '/'. $file->get_component(). '/'.
                $file->get_filearea(). $file->get_filepath(). $file->get_filename(),
                !$isimage
            );
            if ($isimage) {
                break;
            }
        }
        if (!empty($courseimage)) {
            return $courseimage;
        } else {
            return $OUTPUT->get_generated_image_for_id($corecourselistelement->id);
        }
    }

    /**
     * Get Enrolled Teachers Context
     * @param integer $courseid
     * @param boolean $frontlineteacher
     * @return Array
     */
    public function get_enrolled_teachers_context($course, $frontlineteacher = false) {
        global $OUTPUT, $CFG, $USER;

        $courseid = $course->id;

        $usergroups = groups_get_user_groups($courseid, $USER->id);

        $groupids = 0;

        if($course->groupmode == 1){
            $groupids = $usergroups[0];
        }
        $coursecontext = \context_course::instance($courseid);
        $teachers = get_enrolled_users($coursecontext, 'mod/folder:managefiles', $groupids, '*', 'firstname', $limitfrom = 0, $limitnum = 0, $onlyactive = true);
        $roles =   new stdClass();

        $allroles = get_all_roles();
        foreach($allroles as $singlerole){
            if($singlerole->shortname == 'editingteacher'){
                $roles = $singlerole;
                break;
            }
        }
        if(!isset($roles)){
            $roles->id = "";
        }

        $context = array();

        if ($teachers) {
            $namescount = 4;
            $profilecount = 0;
            foreach ($teachers as $key => $teacher) {
                if ($frontlineteacher && $profilecount < $namescount) {
                    $instructor = array();
                    $instructor['id'] = $teacher->id;
                    $instructor['name'] = fullname($teacher, true);
                    $instructor['avatars'] = $OUTPUT->user_picture($teacher);
                    $instructor['teacherprofileurl'] = $CFG->wwwroot.'/user/profile.php?id='.$teacher->id;
                    if ($profilecount != 0) {
                        $instructor['hasanother'] = true;
                    }
                    $context['instructors'][] = $instructor;
                }
                $profilecount++;
            }
            if ($profilecount > $namescount) {
                $context['teachercount'] = $profilecount - $namescount;
            }
            $context['participantspageurl'] = $CFG->wwwroot.'/user/index.php?id='.$courseid.'&roleid='.$roles->id;
            $context['hasteachers'] = true;
        }
        return $context;
    }

    /**
     * Get numbers formated in the format of 1k 2k 1m etc
     */

    function formatcoursecounts($number) {
        // If the number is greater than or equal to 1 million, format as millions
        if ($number >= 1000000) {
            return intval($number / 1000000, 1) . 'm';
        }
        // If the number is greater than or equal to 1000, format as thousands
        elseif ($number >= 1000) {
            return intval($number / 1000, 1) . 'k';
        }
        // Otherwise, return the original number
        else {
            return $number;
        }
    }
}
