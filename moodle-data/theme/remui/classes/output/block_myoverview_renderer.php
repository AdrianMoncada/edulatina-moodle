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
 * myoverview block renderer
 *
 * @package    block_myoverview
 * @copyright  2016 Ryan Wyllie <ryan@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui\output;

class block_myoverview_renderer extends \block_myoverview\output\renderer {
    /**
     * Return the main content for the block overview.
     *
     * @param main $main The main renderable
     * @return string HTML string
     */
    public function render_main(\block_myoverview\output\main $main) {
        global $CFG;
        $templatecontext = $main->export_for_template($this);
        $viewconarray = [
            'card' => "edw-icon edw-icon-Card-View",
            'list' => "edw-icon edw-icon-List-View-08",
            'summary' => "edw-icon edw-icon-Topic-View"
        ];
        $count = 0;
        foreach ($templatecontext['layouts'] as $layoutitem) {
            $templatecontext['layouts'][$count]->edwicon = $viewconarray[$layoutitem->id];
            $count++;
        }
        $templatecontext['dirroot'] = $CFG->wwwroot;
        $templatecontext['cardanimationsetting'] = get_config('theme_remui', 'courseanimation');
        return $this->render_from_template('block_myoverview/main', $templatecontext);
    }
}
