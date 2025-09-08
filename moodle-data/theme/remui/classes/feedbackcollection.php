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

namespace theme_remui;

/**
 * Class feedbackcollection
 *
 * @package    theme_remui
 * @copyright  2024 YOUR NAME <your@email.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class feedbackcollection {
    /**
     * Performs the specified action using the provided configuration.
     *
     * @param string $action The action to perform.
     * @param mixed $config The configuration data required for the action.
     * @return mixed The result of the action, or an error message if the action function does not exist.
    */
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

    public function question_lists() {
        // Use Moodle's cache API to cache the feedback questions for 1 hour (site-wide).
        $cache = \cache::make('theme_remui', 'feedback_questions');
        $questionlists = $cache->get('feedbackquestionlists');
        if ($questionlists === false) {
            $questionlists = \theme_remui\utility::get_content_from_json(
                'https://staticcdn.edwiser.org/json/setupwizard_json_files/information_feedback_questions.json'
            )["feedbackquestionlists"];
            $cache->set('feedbackquestionlists', $questionlists);
        }
        return $questionlists;
    }


    public function action_get_feedback_context($config) {
        $config = json_decode($config);

        if (!is_siteadmin()) {
            return false;
        }

        $internetconnected = \theme_remui\utility::check_internet_connection();
        if (!$internetconnected) {
            return false;
        }

        // Check if the question has already been submitted.
        $submitedfeedbacks = json_decode(get_config("theme_remui", "submited_feedbacks"), true);
        if (!$submitedfeedbacks) {
            $submitedfeedbacks = [];
        }
        if (array_key_exists($config->questionname, $submitedfeedbacks)) {
            return false;
        }

        $questionlists = $this->question_lists();

        if (!isset($questionlists[$config->questionname])) {
            return false;
        }

        $questioncontext = $questionlists[$config->questionname];

        if ($questioncontext["hidden"]) {
            return false;
        }

        return $questioncontext;
    }

    public function action_submit_feedback($config) {
        $config = json_decode($config);

        $submitedfeedbacks = json_decode(get_config("theme_remui", "submited_feedbacks"), true);
        if (!$submitedfeedbacks) {
            $submitedfeedbacks = [];
        }
        $submitedfeedbacks[$config->question] = $config->feedback;
        set_config("submited_feedbacks", json_encode($submitedfeedbacks), "theme_remui");
        $userfeedbackcontroller = new \theme_remui\userfeedback();
        $data[$config->question] = $config->feedback;
        $userfeedbackdata = $userfeedbackcontroller->prepare_userfeedbacks($data);
        if ($config->verifyuser == true && !$userfeedbackdata['licensekey']) {
            return false;
        }
        $userfeedbackcontroller->send_user_feedback($userfeedbackdata);
        return true;
    }
    public function action_update_aw_feedback($config) {
        global $USER;
        $config = json_decode($config);
        $isgetfeedback = $config->isgetfeedback;

        $awfeedbacks = json_decode(get_config("theme_remui", "edw_aw_feedbacks"), true);

        if (!is_array($awfeedbacks)) {
            $awfeedbacks = [
                'counts' => [ // Store Easy & Hard counts separately
                    'Easy' => 0,
                    'Hard' => 0
                ],
                'accessibilityfeedbacks' => [] // Separate array for user feedbacks
            ];
        }

        if (!$isgetfeedback) {
            if ($config->feedback->answer == 'Easy') {
                $awfeedbacks['counts']['Easy'] += 1;
            } else if ($config->feedback->answer == 'Hard') {
                $awfeedbacks['counts']['Hard'] += 1;
            }
        }

        // Ensure accessibilityfeedbacks is always an array
        if (!isset($awfeedbacks['accessibilityfeedbacks']) || !is_array($awfeedbacks['accessibilityfeedbacks'])) {
            $awfeedbacks['accessibilityfeedbacks'] = [];
        }

        // Only store feedback if usercomment is not empty
        if (!empty(trim($config->feedback->usercomment))) {
            $awfeedbacks['accessibilityfeedbacks']['user_' . $USER->id] = [
                'answer' => $config->feedback->answer,
                'comment' => $config->feedback->usercomment,
            ];
        }

        set_config("edw_aw_feedbacks", json_encode($awfeedbacks), "theme_remui");

        return json_encode($awfeedbacks);
    }

    public static function get_current_feedback_questionname() {


        $submitedfeedbacks = json_decode(get_config("theme_remui", "submited_feedbacks"), true);
        if (!$submitedfeedbacks) {
            $submitedfeedbacks = [];
        }

        // ***********************
        // Replace true to actual condition where we Identified which page is right now. and accrodingly return the question name.
        // ***********************
        // if (true) {
        //     if (!array_key_exists("homepage_question", $submitedfeedbacks)) {
        //         return "homepage_question";
        //     }
        // }

        return false;
    }

}
