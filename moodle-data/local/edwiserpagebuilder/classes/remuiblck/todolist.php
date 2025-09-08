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
 * Class User Handler.
 *
 * @package local_edwiserpagebuilder
 * @author  2022 WisdmLabs
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace local_edwiserpagebuilder\remuiblck;

defined('MOODLE_INTERNAL') || die();

use stdObject;

use context_system;

class todolist{

    public function get_block_context(){
        global $OUTPUT, $CFG;

        $context = [];
        $context['searchfiltericonimg'] = $OUTPUT->image_url("Search", "local_edwiserpagebuilder");
        return $context;
    }

    public function create_new_task($config) {
        global $DB, $USER;
        $task = new \stdClass;
        $task->subject = $config->subject;
        $task->summary = $config->summary;
        $task->timedue = $config->timedue;
        $task->visible = $config->visible;
        $task->notify = $config->notify;
        $task->createdby = $USER->id;
        $task->assignedto = json_encode($config->users);
        $task->timecreated = $task->timemodified = time();
        $id = $DB->insert_record('edw_taskslist', $task);
        return $id;
    }

    public function edit_task($config) {
        $task = new \stdClass;
        $task->id = $config->id;
        $task->subject = $config->subject;
        $task->summary = $config->summary;
        $task->timedue = $config->timedue;
        $task->visible = $config->visible;
        $task->notify = $config->notify;
        $task->completed = 0;
        $task->assignedto = json_encode($config->users);
        $task->timemodified = time();
        $taskhandler = new \local_edwiserpagebuilder\remuiblck\taskhandler($config->id);
        return $taskhandler->update($task);
    }

    public function complete_task($config) {
        $taskhandler = new \local_edwiserpagebuilder\remuiblck\taskhandler($config->id);
        $result = $taskhandler->complete($config->status);
        if ($taskhandler->get_task()->notify) {
            $taskhandler->notify_users($config->status == true ? 'complete' : 'incomplete');
        }
        return array(
            'status' => $result,
            'msg'    => $result == true ? '' : (get_string(
                $config->status == true ? 'failedtomarkcomplete' : 'failedtomarkincomplete',
                'local_edwiserpagebuilder'
            ))
        );
    }

    public function delete_task($config) {
        $taskhandler = new \local_edwiserpagebuilder\remuiblck\taskhandler($config->id);
        $result = $taskhandler->delete();
        return array(
            'status' => $result,
            'msg'    => $result == true ? '' : get_string(
                'failedtodeletetask',
                'local_edwiserpagebuilder'
            )
        );
    }

    public function task_notify_users($config) {
        $taskhandler = new \local_edwiserpagebuilder\remuiblck\taskhandler($config->id);
        return $taskhandler->notify_users($config->type);
    }

    /**
     * Return sql query parameters to filter task based on duration
     *
     * @param string $duration due duration of tasks filter
     *
     * @return array [sql => sql query, param => sql parameter]
     */
    public function get_task_duration_query_params($duration) {
        $today = strtotime(date('d-m-Y', time()));
        $oneday = 86400; // 24 * 60 * 60
        switch ($duration) {
            case 'today':
                return array(' AND (timedue BETWEEN ?+1 AND ?-1) ', array($today, $today + $oneday));
            case 'next7days':
                return array(' AND (timedue BETWEEN ?+1 AND ?-1) ', array($today, $today + (7 * $oneday)));
            case 'next30days':
                return array(' AND (timedue BETWEEN ?+1 AND ?-1) ', array($today, $today + (30 * $oneday)));
            case 'next3months':
                return array(' AND (timedue BETWEEN ?+1 AND ?-1) ', array($today, $today + (90 * $oneday)));
            case 'next6months':
                return array(' AND (timedue BETWEEN ?+1 AND ?-1) ', array($today, $today + (180 * $oneday)));
            default: // For all
                return array('', array());
        }
    }

    /**
     * Return sql query parameters to filter task based on status
     *
     * @param string $status status of task
     *
     * @return string sql query
     */
    public function get_task_status_query_params($status) {
        switch ($status) {
            case 'completed':
                return ' AND completed <> 0';
            case 'incomplete':
                return ' AND completed = 0';
            case 'due':
                return ' AND timedue <= ' . time();
            default: // For all
                return '';
        }
    }

    public function get_user_tasks($config) {
        global $DB, $USER, $PAGE, $OUTPUT;

        $response = array();
        $sql = \local_edwiserpagebuilder\remuiblck\taskhandler::get_task_sql();
        $params = array($USER->id, "%$USER->id%");

        // Check for duration filter
        list($durationsql, $durationparam) = $this->get_task_duration_query_params($config->duration);
        $sql .= $durationsql;
        $params = array_merge($params, $durationparam);

        // Check for status filter
        $statussql = $this->get_task_status_query_params($config->status);
        $sql .= $statussql;

        if ($config->search != "") {
            // Search tasks by search query
            $sql .= ' AND (subject LIKE ? OR summary LIKE ?)';
            $params[] = "%$config->search%";
            $params[] = "%$config->search%";
            $response['search'] = $config->search;
        }

        // Order task according to timedue
        $sql .= ' ORDER BY completed ASC, timedue ASC';
        $result = $DB->get_records_sql($sql, $params);
        $tasks = [];
        $today = time();
        foreach ($result as $id => $task) {
            $taskhandler = new \local_edwiserpagebuilder\remuiblck\taskhandler($id, $task);
            if (!$taskhandler->is_my_task()) {
                continue;
            }
            if ($USER->id != $task->createdby) {
                $task->createdby = 0;
            }
            $task->subject = format_text($task->subject, FORMAT_HTML);
            $task->summary = $task->summary == '' ? get_string('nosummary', 'local_edwiserpagebuilder') : format_text($task->summary, FORMAT_HTML);
            $task->completed = $task->completed != 0;
            $task->due = ($task->completed == 0 && $task->timedue < $today);
            $task->timedue = date('D, M d, Y', $task->timedue);
            $task->assignedto = $taskhandler->get_task_users_details();
            $tasks[$id] = $task;
        }
        $response["nodataimg"]  = $OUTPUT->image_url("Todo_list", "local_edwiserpagebuilder")->__toString();
        $response['tasks'] = $tasks;
        return $response;
    }

    public function generate_block_content($context=[]) {

        global $OUTPUT, $CFG, $PAGE;
        $PAGE->requires->data_for_js('contextid', context_system::instance()->id);

        return $OUTPUT->render_from_template("local_edwiserpagebuilder/remuiblck/schedule_task", $context);
    }
}
