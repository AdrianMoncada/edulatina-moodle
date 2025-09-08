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
 * Theme customizer checkbox element class
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\elements;

use stdClass;
use theme_remui\customizer\customizer;

/**
 * Checkbox element.
 */
class checkbox extends base {

    /**
     * Return help content if available in options
     * @param  bool        $withdefault If true then default value will shown in help
     * @return bool|string              Boolean false if no help else help steing
     */
    public function get_help($withdefault = true) {
        global $OUTPUT;
        if (isset($this->options['help'])) {
            $help = $this->options['help'];
            $default = get_string('disabled', 'admin');
            if (isset($this->options['options']) && isset($this->options['options']['checked'])) {
                $default = get_string('enabled', 'admin');
            }
            $help = '<strong>' . get_string('default', 'moodle') . ': ' . $default . '</strong><br>' . $help;
            $data = new stdClass;
            $data->ltr = !right_to_left();
            $data->text = $help;
            return $OUTPUT->render_from_template('theme_remui/customizer/help_icon', $data);
        }
        return false;
    }

    /**
     * Process form save
     *
     * @param array $settings Settings
     * @param array $errors   Errors array
     * @return void
     */
    public function process_form_save($settings, &$errors) {
        if (customizer::is_resetting() && isset($this->options['default'])) {
            set_config(
                $this->name,
                $this->options['default'],
                $this->component
            );
            return;
        }
        if (isset($settings[$this->name])) {
            set_config($this->name, $settings[$this->name], $this->component);
            return;
        }
        set_config($this->name, false, $this->component);
    }

    /**
     * Prepare the output for the setting
     *
     * @return string element output
     */
    public function output() {
        global $OUTPUT;

        $options = $this->options;
        $this->name = $options['name'];
        $label = isset($options['label']) ? $options['label'] : get_string($this->name, $this->component);

        if (!isset($this->options['options'])) {
            $this->options['options'] = [];
        }

        $default = get_config($this->configcomponent, $this->name);
        if (get_config($this->configcomponent, $this->name) === false && isset($this->options['default'])) {
            $default = $this->options['default'];
        }
        $value = true;

        if (get_config($this->configcomponent, $this->name) === false) {
            if ($default) {
                $this->options['options']['checked'] = true;
            }
        } else if (!isset($this->options['options']['checked']) && !empty(get_config($this->configcomponent, $this->name))) {
            $this->options['options']['checked'] = true;
        }

        return $OUTPUT->render_from_template($this->component . '/customizer/elements/checkbox', [
            'name' => $this->name,
            'label' => $label,
            'help' => $this->get_help(),
            'default' => $default,
            'value' => $value,
            'type' => 'checkbox',
            'options' => $this->process_options()
        ]);
    }
}
