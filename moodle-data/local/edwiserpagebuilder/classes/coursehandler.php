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
namespace local_edwiserpagebuilder;

defined('MOODLE_INTERNAL') || die;

defined('EPBFCOURSE_IDS') || define('EPBFCOURSE_IDS', 'ids');
defined('MY_EPBFCOURSE_IDS') || define('MY_EPBFCOURSE_IDS', 'myids');
require_once($CFG->dirroot . "/local/edwiserpagebuilder/lib.php");
define_cdn_constants();

use context_course;
use context_system;

class coursehandler {

    /**
     * Delete temporary created table
     * @param  String $tablename Table name
     */
    public function drop_table($tablename) {
        global $DB;

        $dbman = $DB->get_manager();

        $table = new \xmldb_table($tablename);

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
        $ids = $cache->get(EPBFCOURSE_IDS);
        $ids = '';
        if (!$ids) {
            $ids = [];
            $where = 'c.id <> :siteid';
            $params = array(
                'contextcourse' => CONTEXT_COURSE,
                'siteid' => SITEID);
            $ctxselect = \context_helper::get_preload_record_columns_sql('ctx');
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
                \context_helper::preload_from_record($course);
                // Check that course is accessible by user.
                if (!array_key_exists($course->id, $mycourses) && !\core_course_category::can_view_course_info($course)) {
                    unset($list[$course->id]);
                }
            }
            foreach ($list as $id => $value) {
                $ids[] = (object)[
                    'tempid' => $id
                ];
            }
            $cache->set(EPBFCOURSE_IDS, $ids);
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
            $cache->set(MY_EPBFCOURSE_IDS, $ids);
        }
        return $ids;
    }
    /**
     * Clear user cache
     */
    public function invalidate_course_cache() {
        $cache = $this->get_cache();
        $result = $cache->delete_many([EPBFCOURSE_IDS, MY_EPBFCOURSE_IDS]);

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
            return \cache::make('theme_remui', 'courses');
        }
        return \cache::make('theme_remui', 'guestcourses');
    }
    /**
     * Create temporary table to join ids with table
     * @param  String $tablename Name of table
     * @param  Array $ids       Id array
     */
    public function create_temp_table($tablename, $ids) {
        global $DB, $CFG;

        $dbman = $DB->get_manager();

        $table = new \xmldb_table($tablename);
        $table->add_field('id', XMLDB_TYPE_INTEGER, 10);
        $table->add_field('tempid', XMLDB_TYPE_INTEGER, 10);

        if ($dbman->table_exists($tablename)) {
            $dbman->drop_table($table);
        }

        $dbman->create_temp_table($table);

        $DB->insert_records($tablename, $ids);
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

        $systemcontext = \context_system::instance();
        // Checking two capabilities here.
        // As manager can manage the roles and manager the users too.
        if (has_capability('moodle/role:manage', $systemcontext) || has_capability('moodle/user:create', $systemcontext)) {
            return true;
        }
        return false;
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
        $filtermodified = false
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
            $category = explode(",", $category);

            if (is_numeric($category) || is_array($category)) {
                $categories = [];
                if (is_array($category)) {
                    foreach ($category as $cat) {
                        // $categories[]  = self::get_allowed_categories($cat);
                        $categories = array_unique(array_merge($categories, self::get_allowed_categories($cat)));
                    }
                } else {
                    $categories  = self::get_allowed_categories($category);
                }

                if (empty($categories)) {
                    return array(0, array());
                }

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
                    'totalcount' => true
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

        $beginnerecourseids = self::get_skilllevel_filtered_courseids([1]);
        $intermediatecourseids = self::get_skilllevel_filtered_courseids([2]);
        $advancedcourseids = self::get_skilllevel_filtered_courseids([3]);

        // Prepare courses array.
        $chelper = new \coursecat_helper();

        $moreiconimg = $OUTPUT->image_url("more", "local_edwiserpagebuilder")->__toString();
        $geariconimg = $OUTPUT->image_url("Gear_icon", "local_edwiserpagebuilder")->__toString();
        $canceliconimg = $OUTPUT->image_url("Cancel", "local_edwiserpagebuilder")->__toString();
        $coursereportimg = $OUTPUT->image_url("Group_user", "local_edwiserpagebuilder")->__toString();
        $enroluserlinkimg = $OUTPUT->image_url("Group_user", "local_edwiserpagebuilder")->__toString();
        $graderreportimg = $OUTPUT->image_url("Rating_stars_Active", "local_edwiserpagebuilder")->__toString();
        $activityreportimg = $OUTPUT->image_url("Graph", "local_edwiserpagebuilder")->__toString();
        $editcoursesettingimg = $OUTPUT->image_url("Edit", "local_edwiserpagebuilder")->__toString();
        $coursereportimg = $OUTPUT->image_url("table", "local_edwiserpagebuilder")->__toString();

        $watchiconimg = $OUTPUT->image_url("watch_icon", "local_edwiserpagebuilder")->__toString();
        $profileiconimg = $OUTPUT->image_url("profile_icon", "local_edwiserpagebuilder")->__toString();
        $bookiconimg = $OUTPUT->image_url("book_icon", "local_edwiserpagebuilder")->__toString();
        $hideiconimg = $OUTPUT->image_url("hide_icon_dark", "local_edwiserpagebuilder")->__toString();

        foreach ($courses as $k => $course) {
            $course = (object)$course;
            $corecourselistelement = new \core_course_list_element($course);
            $context = \context_course::instance($course->id);

            if ($course->category == 0) {
                continue;
            }
            // if (!$course->visible) {
            // continue;
            // }
            $coursesarray[$count]["courseid"] = $course->id;
            $coursesarray[$count]["coursename"] = strip_tags($chelper->get_course_formatted_name($course));
            $coursesarray[$count]["shortname"] = $course->shortname;
            $coursesarray[$count]["categoryid"] = $course->category;
            $coursesarray[$count]["categoryname"] = format_text($DB->get_record('course_categories', array('id' => $course->category))->name, FORMAT_HTML);
            $coursesarray[$count]["visible"] = $course->visible;
            $coursesarray[$count]["courseurl"] = $CFG->wwwroot."/course/view.php?id=".$course->id;

            $coursesarray[$count]["enrollink"] = $CFG->wwwroot."/user/index.php?id=".$course->id;
            $coursesarray[$count]["graderreportlink"] = $CFG->wwwroot."/grade/report/grader/index.php?id=".$course->id;
            $coursesarray[$count]["activityreportlink"] = $CFG->wwwroot."/report/outline/index.php?id=".$course->id;
            $coursesarray[$count]["editcourselink"] = $CFG->wwwroot."/course/edit.php?id=".$course->id;

            $coursesarray[$count]["moreiconimg"] = $moreiconimg;
            $coursesarray[$count]["canceliconimg"] = $canceliconimg;
            $coursesarray[$count]["coursereportimg"] = $coursereportimg;
            $coursesarray[$count]["enroluserlinkimg"] = $enroluserlinkimg;
            $coursesarray[$count]["graderreportimg"] = $graderreportimg;
            $coursesarray[$count]["activityreportimg"] = $activityreportimg;
            $coursesarray[$count]["editcoursesettingimg"] = $editcoursesettingimg;
            $coursesarray[$count]["coursereportimg"] = $coursereportimg;
            $coursesarray[$count]["bookiconimg"] = $bookiconimg;
            $coursesarray[$count]["watchiconimg"] = $watchiconimg;
            $coursesarray[$count]["profileiconimg"] = $profileiconimg;
            $coursesarray[$count]["hideiconimg"] = $hideiconimg;

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

            // It will check that user have capability or not to view manage course actions
            $canview_manage_course_action = false;
            if (is_siteadmin()) {
                $canview_manage_course_action = true;
            }
            $context = context_course::instance($course->id);
            $roles = get_user_roles($context, $USER->id, false);
            foreach ($roles as $role) {
                if ($role->roleid == 1 && ($role->shortname == 'manager' || $role->shortname == 'teacher' || $role->shortname == 'editingteacher')) {
                    $canview_manage_course_action = true;
                }
            }

            $coursesarray[$count]["canview_manage_course_action"] = $canview_manage_course_action;

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
            $summarystring = strlen($coursesummary) > 80 ? mb_substr($coursesummary, 0, 80) . "..." : $coursesummary;
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
                $coursesarray[$count]["lessonstitletext"] = format_text(get_config('theme_remui', 'showlessontextinput'),FORMAT_HTML);
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
           if (self::is_plugin_available('block_edwiserratingreview')) {
               $rnrshortdesignarray = $this->get_ernr_coursecard_design($course);
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
                   'picture' =>  $this->get_user_picture($DB->get_record('user', array('id' => $key)))
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
        // if ($totalcount === false) {
        // return $coursesarray;
        // }

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
     * Get user picture from user object
     * @param  object  $userobject User object
     * @param  integer $imgsize    Size of image in pixel
     * @return String              User picture link
     */
    public static function get_user_picture($userobject = null, $imgsize = 100) {
        global $USER, $PAGE;
        if (!$userobject) {
            $userobject = $USER;
        }

        $userimg = new \user_picture($userobject);
        $userimg->size = $imgsize;
        return  $userimg->get_url($PAGE);
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
    public static function get_ernr_coursecard_design($course){
        global $CFG;
        $rnrshortdesign = '';
        if (self::is_plugin_available("block_edwiserratingreview")) {
            $dbhandler = new \block_edwiserratingreview\dbhandler();
            $data  = new \stdClass();
            $data->averagerating = $dbhandler->get_averageratingvalue($course->id);
            $data->averagerating  = number_format($data->averagerating, 1);
            $data->totalcount = $dbhandler->get_recordcount($course->id);
            $data->avergeratingstar = '<div class="stars d-flex"><i aria-hidden="true" class="fa fa-star"></i></div>';
            $rnrshortdesign .= '<div class="d-flex align-items-center justify-content-left rating-short-design" style="color:orange;">';
            $rnrshortdesign .= "<div class='d-flex align-items-center'>";
            $rnrshortdesign .= "<span class='avgrating small-info-semibold d-flex'>$data->averagerating</span>" . $data->avergeratingstar . "</div>";
            $rnrshortdesign .= "<a class='rnr-link d-flex' href='". $CFG->wwwroot ."/course/view.php?id=".$course->id."#reviewarea'>";
            $rnrshortdesign .= "<span class=' small-info-semibold d-flex p-pl-0d5'>({$data->totalcount})</span></a></div>";
        }
        $rnrshortdesingnarray = [];
        $rnrshortdesingnarray['rnrshortdesign'] = $rnrshortdesign;
        $rnrshortdesingnarray['rnrshortratingvalue'] = $data->averagerating;
        return $rnrshortdesingnarray;
    }

    /**
     * This function check  plugin is available or not.
     *
     * @return boolean
     */

     public static function is_plugin_available($component) {

        list($type, $name) = \core_component::normalize_component($component);

        $dir = \core_component::get_plugin_directory($type, $name);
        if (!file_exists($dir ?? '')) {
            return false;
        }
        return true;
    }

    /**
     * Get the list of course IDs that match the specified skill level filters.
     *
     * This function takes an array of skill level filters and returns an array of course IDs that match those filters.
     * It does this by querying the {customfield_field} and {customfield_data} tables to find courses that have a custom field
     * with the shortname 'edwskilllevel' and a value that matches the provided filters.
     *
     * @param array $skillvalues An array of skill level filters.
     * @return array An array of course IDs that match the specified skill level filters.
     */
    public static function get_skilllevel_filtered_courseids($skillvalues) {
        global $DB;

        list($insql, $inparams) = $DB->get_in_or_equal($skillvalues, SQL_PARAMS_NAMED, 'param', true);

        $sql = "SELECT DISTINCT cd.instanceid AS courseid
                FROM {customfield_field} cf
                JOIN {customfield_data} cd ON cf.id = cd.fieldid
                WHERE cf.shortname = :shortname AND " . $DB->sql_cast_char2int('cd.intvalue') . " $insql";

        $params = array_merge(['shortname' => 'edwskilllevel'], $inparams);

        $records = $DB->get_records_sql($sql, $params);

        $courseids = array_keys($records);

        return $courseids;
    }
}
