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
 * Edwiser RemUI Course Renderer Class
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui\output\core;
defined('MOODLE_INTERNAL') || die();

use moodle_url;
use coursecat_helper;
use lang_string;
use core_course_category;
use context_system;
use html_writer;
use core_text;
use pix_icon;
use theme_remui\utility as utility;
require_once($CFG->dirroot . '/course/renderer.php');

/**
 * Edwiser RemUI Course Renderer Class.
 *
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class course_renderer extends \core_course_renderer {
    /**
     * Renders HTML to display particular course category - list of it's subcategories and courses
     *
     * Invoked from /course/index.php
     *
     * @param int|stdClass|core_course_category $category
     */
    public function get_morebutton_pagetitle($category) {
        global $CFG;
        $output = '';
        $site = get_site();
        if ($category != 'all') {
            $usertop = core_course_category::user_top();
            if (empty($category)) {
                $coursecat = $usertop;
            } else if (is_object($category) && $category instanceof core_course_category) {
                $coursecat = $category;
            } else {
                $coursecat = core_course_category::get(is_object($category) ? $category->id : $category);
            }

            $actionbar = new \core_course\output\category_action_bar($this->page, $coursecat);

            // $output = $this->render_from_template('core_course/category_actionbar', $actionbar->export_for_template($this));

            $actionbardata = $actionbar->export_for_template($this);
            $output = $actionbardata["additionaloptions"];

            if (core_course_category::is_simple_site()) {
                $strfulllistofcourses = get_string('fulllistofcourses');
                $this->page->set_title("$site->shortname: $strfulllistofcourses");
            } else if (!$coursecat->id || !$coursecat->is_uservisible()) {
                $strcategories = get_string('categories');
                $this->page->set_title("$site->shortname: $strcategories");
            } else {
                $strfulllistofcourses = get_string('fulllistofcourses');
                $this->page->set_title("$site->shortname: $strfulllistofcourses");
            }
        } else {
            $strcategories = get_string('categories');
            $this->page->set_title("$site->shortname: $strcategories");
        }
        return $output;
    }

        /**
         * Renders html to display a course search form
         *
         * @param string $value default value to populate the search field
         * @return string
         */
    public function course_search_form($value = '') {

        $data = [
            'action' => \core_search\manager::get_course_search_url(),
            'btnclass' => 'btn-primary',
            'inputname' => 'q',
            'searchstring' => get_string('searchcourses'),
            'hiddenfields' => (object) ['name' => 'areaids', 'value' => 'core_course-course'],
            'query' => $value
        ];
        return $this->render_from_template('theme_remui/course_archive_search_input', $data);
    }

        /**
         * Returns HTML to print list of available courses for the frontpage
         *
         * @return string
         */
    public function frontpage_available_courses() {
        global $CFG, $DB;
        $contenthtml = '';
        $chelper = new coursecat_helper();
        $chelper->set_show_courses(self::COURSECAT_SHOW_COURSES_EXPANDED)->set_courses_display_options(array(
                    'recursive' => true,
                    'limit' => $CFG->frontpagecourselimit,
                    'viewmoreurl' => new moodle_url('/course/index.php'),
                    'viewmoretext' => new lang_string('fulllistofcourses')));

        $chelper->set_attributes(array('class' => 'frontpage-course-list-all'));
        // $courses = core_course_category::get(0)->get_courses($chelper->get_courses_display_options());

        $courselength = $CFG->frontpagecourselimit;
        $totalcount = core_course_category::get(0)->get_courses_count($chelper->get_courses_display_options());
        if (!$totalcount &&
        !$this->page->user_is_editing() &&
        has_capability('moodle/course:create', \context_system::instance())
        ) {
            // Print link to create a new course, for the 1st available category.
            return $this->add_new_course_button();
        }
        $coursehandler = new \theme_remui_coursehandler();
        $courses = $coursehandler->get_courses(
            false,
            null,
            null,
            0,
            $courselength,
            null,
            null,
            [],
            false
        );

        if (!empty($courses)) {
            // $coursehtml = '<div class="card-deck slick-course-slider slick-slider d-none">';
            $contenthtml .= "<div class='slick-slide-container'>";
            foreach ($courses as $course) {
                $contenthtml .= $this->render_from_template("theme_remui/frontpage_available_course", $course);
            }
            $contenthtml .= "</div>";
            $contenthtml .= "<div class='available-courses button-container w-100 text-center mt-3'>
                            <button type='button' class='btn btn-floating btn-primary btn-prev btn-sm'>
                            <span class='edw-icon edw-icon-Left-Arrow' aria-hidden='true'></span>
                            </button>
                            <button type='button' class='btn btn-floating btn-primary btn-next btn-sm '>
                            <span class='edw-icon edw-icon-Right-Arrow' aria-hidden='true'></span>
                            </button>
                            </div>";

            $contenthtml .= "<div class='row'>
                            <div class='col-12 text-right'>
                             <a href='{$CFG->wwwroot}/course/index.php' class='btn btn-primary mt-2'>" . get_string('viewallcourses', 'core')."</a>
                            </div>
                            </div>";
        }

        return $contenthtml;
    }
}
