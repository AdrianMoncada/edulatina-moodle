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

require_once($CFG->libdir.'/gradelib.php');
require_once($CFG->dirroot. '/grade/querylib.php');
require_once($CFG->libdir . '/grade/grade_item.php');
require_once($CFG->libdir . '/grade/grade_grade.php');

defined('MOODLE_INTERNAL') || die();

// This class will handle every operations related to users
use context_course;
class courseanalytics{

    public function get_block_context(){

        global $OUTPUT;
        $context = new \stdClass();

        $obj = \local_edwiserpagebuilder\remuiblck\coursehandler::get_instance();
        $data = $obj->get_analytics_overview();
        $context->quizcourse = $data['quizcourse'];
        $context->hasanalytics = $data['hasanalytics'];
        $perpage = get_user_preferences('courseanalyticsperpage', 5);
        $context->perpagevalue = $perpage;
        $barperpagename = 'entries'.$perpage;
        $context->perpage = $perpage;
        $context->$barperpagename = true;
        $context->leftarrow  = $OUTPUT->image_url("Square_Arrow_left", "local_edwiserpagebuilder");
        $context->rightarrow  = $OUTPUT->image_url("Square_Arrow_Right", "local_edwiserpagebuilder");
        return $context;
    }

    public function generate_block_content($context=[]) {

        global $OUTPUT, $CFG;

        return $OUTPUT->render_from_template("local_edwiserpagebuilder/remuiblck/courseanlytics", $context);
    }

    /**
     * The function itself
     * @return string welcome message
     */
    public function get_course_analytics($courseid) {
        global $USER, $COURSE;
        if ($courseid == 0) {
            return array(
                'status' => false
            );
        }
        // Get the list of users which are enrolled in the course
        $context = CONTEXT_COURSE::instance($courseid);
        $enrolledusers = $enrolledusers = get_enrolled_users($context, '');

        // Get all the activities of the course which can be graded
        $gradeactivities = grade_get_gradable_activities($courseid);
        $qactivity = [];

        if (!empty($gradeactivities)) {
            $modinfo = get_fast_modinfo($courseid);
            $allcms = $modinfo->get_cms();
            foreach ($gradeactivities as $gradeactivity) {
                if(empty($allcms[$gradeactivity->id])){
                    continue;
                }
                $cm = $modinfo->get_cm($gradeactivity->id);
                if ($cm->visible == 1) {
                    $attempt = 0;
                    // Get all the grade items for the activity
                    $gradeitemlist = grade_get_grade_items_for_activity($gradeactivity, true);
                    $gradeitem = reset($gradeitemlist);

                    // Get the last attempt grade value of logged in users
                    $grade = new \grade_grade(array('itemid' => $gradeitem->id, 'userid' => $USER->id));
                    if (isset($grade->rawgrade)) {
                        $average = intval($grade->rawgrade);
                        $attempt = 1;
                    } else {
                        $average = 0;
                    }

                    // Get the average grade for the activity of last attempt of all enrolled users
                    $sum = 0;
                    $count = 0;
                    foreach ($enrolledusers as $user) {
                        $grade = new \grade_grade(array('itemid' => $gradeitem->id, 'userid' => $user->id));
                        if (isset($grade->rawgrade)) {
                            $sum += intval($grade->rawgrade);
                            $count++;
                        }
                    }
                    if ($count) {
                        $globalaverage = $sum / $count;
                    } else {
                        $globalaverage = 0;
                    }
                    $qactivity[] = ['id' => $gradeactivity->id, 'name' => $gradeactivity->name, 'lastAttempt' => $average, 'globalAverage' => $globalaverage, 'attempt' => $attempt];
                }
            }
        }

        $chartdata = array();
        $index = 0;
        $chartdata['datasets'][0]['label'] = get_string('lastattempt', 'local_edwiserpagebuilder');
        $chartdata['datasets'][1]['label'] = get_string('globalattempt', 'local_edwiserpagebuilder');
        $chartdata['datasets'][0]['backgroundColor'] = "#37BE71";
        $chartdata['datasets'][1]['backgroundColor'] = "#264485";
        $chartdata['labels'] = [];
        foreach ($qactivity as $activity) {
            $chartdata['labels'][$index] = $activity['name'];
            $chartdata['datasets'][0]['data'][$index] = $activity['lastAttempt'];
            $qactivity[$index]['lastAttempt'] = $chartdata['datasets'][0]['data'][$index];
            $chartdata['datasets'][1]['data'][$index] = (int)$activity['globalAverage'];

            if ($chartdata['datasets'][1]['data'][$index] < 0) {
                $chartdata['datasets'][1]['data'][$index] = 0;
            }
            $index++;
        }

        $highest = max(array_column($qactivity, 'lastAttempt'));
        $lowest = min(array_column($qactivity, 'lastAttempt'));
        if (count($qactivity)) {
            $average = intval(array_sum(array_column($qactivity, 'lastAttempt')) / count(array_column($qactivity, 'lastAttempt')));
        } else {
            $average = 0;
        }

        $maxs = array_keys(array_column($qactivity, 'lastAttempt'), $highest);
        $mins = array_keys(array_column($qactivity, 'lastAttempt'), $lowest);

        $maxactivityname = "";
        $minactivityname = "";

        foreach ($maxs as $max) {
            if ($qactivity[$max]['attempt'] == 1) {
                $maxactivityname .= $qactivity[$max]['name'] .", ";
            }
        }

        foreach ($mins as $min) {
            if ($qactivity[$min]['attempt'] == 1) {
                $minactivityname .= $qactivity[$min]['name'] .", ";
            }
        }
        $chartdata['status'] = true;
        $chartdata['highest'] = $highest;
        $chartdata['lowest'] = $lowest;
        $chartdata['average'] = $average;
        $chartdata['maxactivityname'] = rtrim($maxactivityname, ", ");
        $chartdata['minactivityname'] = rtrim($minactivityname, ", ");
        return $chartdata;
    }
}
