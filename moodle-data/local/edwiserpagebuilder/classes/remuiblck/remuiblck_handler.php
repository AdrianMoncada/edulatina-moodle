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
 * @package   local_edwiserpagebuilder
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace local_edwiserpagebuilder\remuiblck;

defined('MOODLE_INTERNAL') || die;

require_once($CFG->dirroot . '/enrol/externallib.php');
require_once($CFG->dirroot . '/local/edwiserpagebuilder/lib.php');

// use user_picture;
use context_course;
// use moodle_url;
use core_enrol_external;
use stdClass;
use html_writer;
use core_completion\progress;

class remuiblck_handler {
    
    // It will handle the latest_members web service call
    public function action_get_latest_members_list($config) {
        $obj = new \local_edwiserpagebuilder\remuiblck\latestmembers();

        return $obj->get_latest_members_list();
    }

    // It will handle the Add Notes web service call
    public function action_get_enrolled_users_by_course($config) {
        $config = json_decode($config);
        
        $obj = new \local_edwiserpagebuilder\remuiblck\addnotes();

        return $obj->get_enrolled_users_by_course($config);
    }

    // It will handle the Recent Feedback  web service call
    public function action_get_recent_feedbacks($config) {
        $obj = new \local_edwiserpagebuilder\remuiblck\recentfeedback();
        
        return $obj->get_recent_feedbacks();
    }

    // It will handle the Recent Forum  web service call
    public function action_get_recent_active_forum($config) {
        $obj = new \local_edwiserpagebuilder\remuiblck\recentforums();
        
        return $obj->get_recent_active_forum();
    }

    // bellow two functions handle Course Progress services
    public function action_get_course_progress_list($config) {
        $config = json_decode($config);

        $obj = new \local_edwiserpagebuilder\remuiblck\courseprogress();
        
        return $obj->get_course_progress_list($config);
    }

    public function action_get_course_progress($config) {
        global $USER;
        $config = json_decode($config);
        $data = new stdClass;
        $course = get_course($config->courseid);
        $data->coursefullname = format_text(trim($course->fullname));
        $data->coursesummary = format_text(trim(strip_tags($course->summary)));
        $data->students = [];

        $coursecontext = context_course::instance($config->courseid);
        $groupid = groups_get_user_groups($config->courseid, $USER->id);
        $students = get_role_users(5, $coursecontext);
        $roleUser = get_user_roles($coursecontext, $USER->id);
        $roleid = 0;
        foreach($roleUser as $key => $rusers){
            $roleid = $rusers->roleid;
        }
        if($roleid == 4){
            if(count($groupid[0]) > 0){
                $members = groups_get_groups_members($groupid[0]);
                foreach($members as $key => $member){
                    if(!in_array($key, array_keys($students))){
                        unset($members[$key]);
                    }
                }
                $students = $members;
            }
        }
        
        $studentcnt   = 0;
        $coursehandler = \local_edwiserpagebuilder\remuiblck\coursehandler::get_instance();
        foreach ($students as $studentid => $student) {
            $studentdata = new stdClass;
            $studentdata->index = ++$studentcnt;
            $studentdata->name = fullname($student);
            $studentdata->id = $studentid;
            $studentdata->lastaccess = $coursehandler->get_last_course_access_time($config->courseid, $studentid)->time;
            $progress = (int)progress::get_course_progress_percentage($course, $student->id);
            if (empty($progress)) {
                $progress = 0;
            }
            $studentdata->progress = $progress;
            $studentdata->progressclass = $progress > 70 ? 'progress-bar-success' : ($progress > 30 ? 'progress-bar-warning' : 'progress-bar-danger');
            $data->students[] = $studentdata;
            unset($students[$studentid]);
        }
        return $data;
    }

    // It will handle send message service for all blocks
    public function action_send_message($config) {
        global $USER, $DB, $SITE;
        $config = json_decode($config);
        $userfrom = $DB->get_record('user', array('id' => $USER->id), '*', MUST_EXIST);
        $userto = $DB->get_record('user', array('id' => $config->studentid), '*', MUST_EXIST);

        $message = new \core\message\message();
        $message->courseid = $SITE->id;
        $message->component = 'moodle';
        $message->name = 'instantmessage';
        $message->userfrom = $userfrom;
        $message->userto = $userto;
        $message->subject = '';
        $message->fullmessage = strip_tags($config->messagetext);
        $message->fullmessageformat = FORMAT_MARKDOWN;
        $message->fullmessagehtml = $config->messagetext;
        $message->smallmessage = $config->messagetext;
        $message->notification = '0';
        $message->contexturl = '';
        $message->contexturlname = '';
        $message->replyto = $userfrom->email;
        $messageid = message_send($message);
        return $messageid;
    }


    // To Do List services start
    public function action_create_new_task($config) {
        $config = json_decode($config);
        
        $obj = new \local_edwiserpagebuilder\remuiblck\todolist();
        
        return $obj->create_new_task($config);
    }

    public function action_edit_task($config) {
        $config = json_decode($config);
        
        $obj = new \local_edwiserpagebuilder\remuiblck\todolist();
        
        return $obj->edit_task($config);
    }

    public function action_complete_task($config) {
        $config = json_decode($config);

        $obj = new \local_edwiserpagebuilder\remuiblck\todolist();
        
        return $obj->complete_task($config);
    }

    public function action_delete_task($config) {
        $config = json_decode($config);

        $obj = new \local_edwiserpagebuilder\remuiblck\todolist();
        
        return $obj->delete_task($config);
    }

    public function action_task_notify_users($config) {
        $config = json_decode($config);

        $obj = new \local_edwiserpagebuilder\remuiblck\todolist();
        
        return $obj->task_notify_users($config);
    }

    public function action_get_user_tasks($config) {
        $config = json_decode($config);

        $obj = new \local_edwiserpagebuilder\remuiblck\todolist();
        
        return $obj->get_user_tasks($config);
    }
    // To Do List services end

    //course report services start
    public function action_get_course_report($config) {
        global $CFG, $OUTPUT;
        $config = json_decode($config);

        $context = new stdClass();
        $handler = \local_edwiserpagebuilder\remuiblck\coursehandler::get_instance();
        $stats = $handler->get_course_stats(get_course($config->courseid));
        $context->enrolledstats = $stats['enrolledusers'] == 0 ? false : $stats;
        $context->courseid = $config->courseid;
        foreach (COURSE_MANAGE_PIE_COLORS as $color => $value) {
            $context->$color = $value;
        }
        return $context;
    }

        /**
     * Get class for user last access
     *
     * @param string $type type of parameter
     * @param int $value date value
     *
     * @return string classname string
     */
    public function get_user_last_access_class($type, $value) {
        switch ($type) {
            case 'y':
            case 'm':
                return 'red-600 bg-red-100 p-1';
            case 'd':
                if ($value > 6) {
                    return 'red-600 bg-red-100 p-1';
                }
                if ($value > 3) {
                    return 'orange-600 bg-orange-100 p-1';
                }
        }
        return 'green-600 bg-green-100 p-1';
    }

    /**
     * Get user last access column value
     *
     * @param int $timecreated time when user is enrolled
     * @param int $currenttime
     * @param string $yettostart yet to start label
     * @param bool $table does this call is from table or export button
     *
     * @return string last access column html value
     */
    public function get_user_last_access($timecreated, $currenttime, $yettostart, $table) {
        $yettostartwrapped = html_writer::tag(
            'label',
            $yettostart,
            array(
                'class' => 'grey-600 bg-grey-200 p-1 w-p100 text-center mb-0'
            )
        );
        if (is_null($timecreated) && $timecreated == 0) {
            return $table ? $yettostartwrapped : $yettostart;
        }
        $difference = get_date_differences($timecreated, $currenttime);
        $accessed = "";
        $values = array(
            "y" => "numyear",
            "m" => "nummonth",
            "d" => "numday",
            "h" => "numhour",
            "i" => "numminute",
            "s" => "numsecond"
        );
        foreach ($values as $key => $id) {
            if ($difference->$key == 0) {
                continue;
            }
            $accessed = get_string($id, 'local_edwiserpagebuilder', $difference->$key);
            $accessed = get_string('ago', 'core_message', $accessed);
            if (!$table) {
                return $accessed;
            }
            $clockicon = html_writer::tag(
                'i',
                '',
                array(
                    'class' => 'fa fa-clock-o mr-1',
                    'aria-hidden' => 'true'
                )
            ) . $accessed;
            $customclass = $this->get_user_last_access_class($key, $difference->$key);
            return html_writer::tag(
                'label',
                $clockicon,
                array(
                    'class' => $customclass . ' w-p100 text-center mb-0'
                )
            );
        }
        return $yettostartwrapped;
    }

    /**
     * Get message icon
     *
     * @param int $userid id of user
     * @param string $content content to attach with message icon
     *
     * @return string message icon html
     */
    public function get_user_message_icon($userid, $content = "") {
        return html_writer::tag(
            'i',
            '',
            array(
                'class' => 'fa fa-envelope float-right text-success p-1 dropping-student-message',
                'aria-hidden' => 'true',
                'data-student-id' => $userid
            )
        ) . $content;
    }

    public function action_get_dropping_off_students($config) {
        global $CFG, $OUTPUT;
        $config = json_decode($config);

        $coursehandler = \local_edwiserpagebuilder\remuiblck\coursehandler::get_instance();
        $users = $coursehandler->get_filtered_dropping_user_stats($config->courseid, $config->search, true, $config->start, $config->length, $config->order);
        $count = $coursehandler->get_filtered_dropping_user_stats_count($config->courseid, $config->search);
        $json = array();
        $yettostart = get_string('yettostart', 'local_edwiserpagebuilder');
        $currenttime = time();
        foreach ($users as $user) {
            $json[] = array(
                "name"           => $coursehandler->get_user_image_and_link($user, $config->courseid),
                "email"          => $user->email,
                "enroltimestart" => $this->get_user_message_icon($user->id, date("h:i A, d F Y", $user->timestart)),
                "lastaccess"     => $this->get_user_last_access(
                    $user->timecreated,
                    $currenttime,
                    $yettostart,
                    true
                )
            );
        }
        return array(
            "data" => $json,
            "recordsTotal" => $count,
            "recordsFiltered" => $count
        );

    }

    public function action_export_dropping_off_students($config) {
        global $DB;
        $config = json_decode($config);

        $coursehandler = \local_edwiserpagebuilder\remuiblck\coursehandler::get_instance();
        $users = $coursehandler->get_filtered_dropping_user_stats($config->courseid, $config->search, false, false, false, false);
        $json = array();
        $yettostart = get_string('yettostart', 'local_edwiserpagebuilder');
        $currenttime = time();
        $json[] = implode(',', array(
            "name"           => get_string('name'),
            "email"          => get_string('email'),
            "enroltimestart" => get_string('enrolmentdate', 'local_edwiserpagebuilder'),
            "lastaccess"     => get_string('lastaccess')
        ));
        foreach ($users as $user) {
            $json[] = implode(',', array(
                "name"           => $user->name,
                "email"          => $user->email,
                "enroltimestart" => date("h:i A d F Y", $user->timestart),
                "lastaccess"     => self::get_user_last_access($user->timecreated, $currenttime, $yettostart, false)
            ));
        }
        $coursename = $DB->get_field('course', 'shortname', array('id' => $config->courseid));
        return array(
            "filename" => $coursename . date("h:i-A,d-F-Y", time()) . '.csv',
            "filedata" => implode("\n", $json)
        );

    }
    //course report services end

    // It will handle course analytics web service call.
    public function action_get_course_analytics($config){

        $config = json_decode($config);

        $courseanalyticsobj  = new \local_edwiserpagebuilder\remuiblck\courseanalytics();

        return $courseanalyticsobj->get_course_analytics($config->courseid);
    }

    // It will handle the enrolled users block web service call
    public function action_get_enrolled_users_by_category($config){
        $config = json_decode($config);

        $obj  = new \local_edwiserpagebuilder\remuiblck\enrolledusers();

        return $obj-> get_enrolled_users_by_category($config->categoryid);
    }

    // It will handle the quiz attempts web service call
    public function action_get_quiz_participation($config){

        $config = json_decode($config);

        $obj  = new \local_edwiserpagebuilder\remuiblck\quizattempts();

        return $obj->get_quiz_participation($config->courseid, $config->quizid);

    }

    // It will handle the quiz attempts web service call
    public function action_get_quizzes_of_course($config){

        $config = json_decode($config);

        $obj  = new \local_edwiserpagebuilder\remuiblck\quizattempts();

        return $obj->get_quizzes_of_course($config->courseid);

    }

    public function perform_action($action, $config) {
        $functionname = "action_".$action;

        // Check if the function exists before calling it.
        if (method_exists($this, $functionname)) {
            // Call the function dynamically.
            return call_user_func(array($this, $functionname), $config);
        } else {
            // Handle the case when the function doesn't exist.
            return "Function $functionname does not exist.";
        }
    }

    // It will generate content of the RemUI  blocks
    public function get_content($tags){
        global $PAGE, $CFG, $OUTPUT;

        $blockname = $tags['layout'];

        $classname = '\local_edwiserpagebuilder\remuiblck\\'.$blockname;

        if (!class_exists($classname)) {
            return "";
        }

        $blockobj = new $classname();

        $context = $blockobj->get_block_context();

        if($PAGE->pagetype == "blocks-edwiserblocks-editor" || isset($tags["editorpage"]) ){
            $warningicon = $OUTPUT->image_url("warninig_icon", "local_edwiserpagebuilder");
            return $OUTPUT->render_from_template("local_edwiserpagebuilder/remuiblck/uneditable_warning_msg", ["warningicon" => $warningicon]);
        }

        if ( $CFG->branch < '403') {
            user_preference_allow_ajax_update('always-load-progress', PARAM_BOOL);
        }
        $PAGE->requires->data_for_js('rmblckmdlrelease', $CFG->backup_release);

        return $blockobj->generate_block_content($context);
    }
}
