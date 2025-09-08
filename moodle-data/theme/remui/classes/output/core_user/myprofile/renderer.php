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
 * myprofile renderer.
 *
 * @package    core_user
 * @copyright  2015 onwards Ankit Agarwal <ankit.agrr@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui\output\core_user\myprofile;

use core_user\output\myprofile\tree;
use core_user\output\myprofile\category;
use core_user\output\myprofile\node;

class renderer extends \core_user\output\myprofile\renderer {
    /**
     * Render a category.
     *
     * @param category $category
     *
     * @return string
     */
    public function render_category(\core_user\output\myprofile\category $category) {
        $classes = $category->classes;
        if (empty($classes)) {
            $return = \html_writer::start_tag('section',
                array('class' => 'node_category card d-inline-block w-100 mb-3'.' '.$category->name));
            $return .= \html_writer::start_tag('div', array('class' => 'card-body'));
        } else {
            $return = \html_writer::start_tag('section',
                array('class' => 'node_category card d-inline-block w-100 mb-3' . $classes.' '.$category->name));
            $return .= \html_writer::start_tag('div', array('class' => 'card-body'));
        }
        $return .= \html_writer::tag('h3', $category->title, array('class' => 'lead h-semibold-4'));
        $nodes = $category->nodes;
        if (empty($nodes)) {
            // No nodes, nothing to render.
            return '';
        }
        $return .= \html_writer::start_tag('ul');
        foreach ($nodes as $node) {
            $return .= $this->render($node);
        }
        $return .= \html_writer::end_tag('ul');
        $return .= \html_writer::end_tag('div');
        $return .= \html_writer::end_tag('section');
        return $return;
    }
}
