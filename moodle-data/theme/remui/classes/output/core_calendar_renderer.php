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
 * This file contains the renderers for the calendar within Moodle
 *
 * @copyright 2010 Sam Hemelryk
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @package calendar
 */
namespace theme_remui\output;

/**
 * The primary renderer for the calendar.
 */
class core_calendar_renderer extends \core_calendar_renderer {
    /**
     * Displays a course filter selector
     *
     * @param moodle_url $returnurl The URL that the user should be taken too upon selecting a course.
     * @param string $label The label to use for the course select.
     * @param int $courseid The id of the course to be selected.
     * @param int|null $calinstid The instance ID of the calendar we're generating this course filter for.
     * @return string
     */
    public function course_filter_selector(\moodle_url $returnurl, $label = null, $courseid = null, int $calinstid = null) {
        global $CFG, $DB;

        if (!isloggedin() || isguestuser()) {
            return '';
        }

        $contextrecords = [];
        $courses = calendar_get_default_courses($courseid, 'id, shortname');

        if (!empty($courses) && count($courses) > CONTEXT_CACHE_MAX_SIZE) {
            // We need to pull the context records from the DB to preload them
            // below. The calendar_get_default_courses code will actually preload
            // the contexts itself however the context cache is capped to a certain
            // amount before it starts recycling. Unfortunately that starts to happen
            // quite a bit if a user has access to a large number of courses (e.g. admin).
            // So in order to avoid hitting the DB for each context as we loop below we
            // can load all of the context records and add them to the cache just in time.
            $courseids = array_map(function($c) {
                return $c->id;
            }, $courses);
            list($insql, $params) = $DB->get_in_or_equal($courseids);
            $contextsql = "SELECT ctx.instanceid, " . \context_helper::get_preload_record_columns_sql('ctx') .
                          " FROM {context} ctx WHERE ctx.contextlevel = ? AND ctx.instanceid $insql";
            array_unshift($params, CONTEXT_COURSE);
            $contextrecords = $DB->get_records_sql($contextsql, $params);
        }

        unset($courses[SITEID]);

        $courseoptions = array();
        $courseoptions[SITEID] = get_string('fulllistofcourses');
        foreach ($courses as $course) {
            if (isset($contextrecords[$course->id])) {
                \context_helper::preload_from_record($contextrecords[$course->id]);
            }
            $coursecontext = \context_course::instance($course->id);
            $courseoptions[$course->id] = format_string($course->shortname, true, array('context' => $coursecontext));
        }

        if ($courseid) {
            $selected = $courseid;
        } else if ($this->page->course->id !== SITEID) {
            $selected = $this->page->course->id;
        } else {
            $selected = '';
        }
        $courseurl = new \moodle_url($returnurl);
        $courseurl->remove_params('course');

        $labelattributes = [];
        if (empty($label)) {
            $label = get_string('listofcourses');
            $labelattributes['class'] = 'sr-only';
        }

        $filterid = 'calendar-course-filter';
        if ($calinstid) {
            $filterid .= "-$calinstid";
        }
        $select = \html_writer::label($label, $filterid, false, $labelattributes);
        $select .= \html_writer::select($courseoptions, 'course', $selected, false,
                ['class' => 'cal_courses_flt bg-transparent', 'id' => $filterid]);

        return $select;
    }
}
