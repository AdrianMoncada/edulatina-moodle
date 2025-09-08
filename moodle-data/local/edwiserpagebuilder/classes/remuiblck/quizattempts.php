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

use context_system;

class quizattempts{
    public function get_block_context(){
        global $OUTPUT, $PAGE;

        $context = new \stdClass();

        $userobj =  \local_edwiserpagebuilder\remuiblck\userhandler::get_instance();
        $quizstats = $userobj->get_quiz_stats();
        $context->is_siteadmin = is_siteadmin();
        $context->quizdata = $quizstats;

        $context->canview = $this->can_view();
        $context->warningicon = $OUTPUT->image_url("warninig_icon", "local_edwiserpagebuilder");
        $context->editing = $PAGE->user_is_editing();

        // $LANGS = [get_string('noofstudents', 'local_edwiserpagebuilder')];
        // $PAGE->requires->data_for_js('LANGS', $LANGS);

        return $context;
    }

    public function can_view() {

        if(is_siteadmin()){
            return true;
        }

        $userobj = \local_edwiserpagebuilder\remuiblck\userhandler::get_instance();

        $options["roles"] = $userobj->get_user_roles_system_wide();
        if (in_array("manager", $options['roles']) ||
            in_array("teacher", $options['roles']) ||
            in_array("editingteacher", $options['roles'])) {
            return true;
        }

        return false;
    }

    public function get_quiz_participation($courseid, $quizid) {
        global $DB;

        $context = \context_course::instance($courseid);
        $enrolledstudents = array_keys(get_enrolled_users($context, 'mod/quiz:attempt', 0, 'u.id'));

        if (!empty($enrolledstudents)) {
            $totalstudents = implode(',', $enrolledstudents);

            $sqlq = "SELECT DISTINCT q.userid from {quiz_attempts} q WHERE q.quiz = ? AND q.userid IN ($totalstudents)";
            $quizdata = $DB->get_records_sql($sqlq, array($quizid));

            $quizattemps = count(array_keys($quizdata));
        }

        $index = 0;

        $chartdata['datasets'][0]['label'] = get_string('totalusersattemptedquiz', 'local_edwiserpagebuilder');
        $chartdata['datasets'][1]['label'] = get_string('totalusersnotattemptedquiz', 'local_edwiserpagebuilder');
        $chartdata['datasets'][0]['backgroundColor'] = "#37BE71";
        $chartdata['datasets'][1]['backgroundColor'] = "#264485";
        $chartdata['datasets'][0]['borderColor'] = "#37BE71";
        $chartdata['datasets'][1]['borderColor'] = "#264485";
        $chartdata['datasets'][0]['borderWidth'] = 1;
        $chartdata['datasets'][1]['borderWidth'] = 1;

        $chartdata['labels'][$index] = '';

        // Data is available only for one activity thats why index is always 0.
        if (!empty($enrolledstudents)) {
            $chartdata['datasets'][0]['data'][$index] = intval($quizattemps);
            $chartdata['datasets'][1]['data'][$index] = intval(count($enrolledstudents) - $quizattemps);
            if ($chartdata['datasets'][1]['data'][$index] < 0) {
                $chartdata['datasets'][1]['data'][$index] = 0;
            }
        } else {
            $chartdata['datasets'][0]['data'][$index] = 0;
            $chartdata['datasets'][1]['data'][$index] = 0;
        }
        return $chartdata;
    }

    /**
     * The function itself
     * @return string welcome message
     */
    public  function get_quizzes_of_course($courseid) {
        global $DB;

        $sqlq = "SELECT q.id quizid, q.name quizname, q.course courseid from {quiz} q WHERE q.course = ?";
        $quizzes = $DB->get_records_sql($sqlq, array($courseid));

        foreach ($quizzes as $index => $quiz) {
            $quiz->quizname = format_text($quiz->quizname, FORMAT_HTML);
            $quizzes[$index] = $quiz;
        }

        return $quizzes;
    }

    public function generate_block_content($context=[]) {

        global $OUTPUT, $CFG;

        return $OUTPUT->render_from_template("local_edwiserpagebuilder/remuiblck/quizattempts", $context);
    }
}
