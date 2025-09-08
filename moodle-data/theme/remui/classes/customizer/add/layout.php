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
 * Theme customizer colors trait
 *
 * @package   theme_remui
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav G
 */
namespace theme_remui\customizer\add;

trait layout {
    /**
     * Add global page layout width settings.
     *
     * @return void
     */
    private function add_global_layout() {
        $this->add_panel('pagelayout', get_string('pagewidth', 'theme_remui'), 'global');
        // Icon Setting.
        $default = get_config('theme_remui', 'pagewidth');
        if (empty($default)) {
            $default = 'default';
        }
        $this->add_setting(
            'select',
            'pagewidth',
            get_string('pagewidth', 'theme_remui'),
            'pagelayout',
            [
                'help' => get_string('pagewidthdesc', 'theme_remui'),
                'default' => $default,
                'options' => [
                    'default' => get_string('defaultpermoodle', 'theme_remui'),
                    'fullwidth' => get_string('fullwidthlayout', 'theme_remui')
                ]
            ]
        );

    }
}
