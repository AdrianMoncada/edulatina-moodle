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
 * Theme customizer fontselect element class
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\elements;

use stdClass;

/**
 * Select element.
 */
class fontselect extends base {
    /**
     * Return help content if available in options for select element.
     * @param  bool        $withdefault If true then default value will shown in help
     * @return bool|string              Boolean false if no help else help steing
     */
    public function get_help($withdefault = true) {
        global $OUTPUT;
        if (!isset($this->options['help'])) {
            return false;
        }
        if (isset($this->options['default']) && $this->options['default'] != '') {
            $help = '';
            if ($withdefault &&
                (!isset($this->options['withdefault']) ||
                (!isset($this->options['withdefault']) && $this->options['withdefault'])) &&
                isset($this->options['default'])
            ) {
                $selectoptions = $this->options['options'];
                $default = $this->options['default'];
                if (strtolower($default) == 'inherit') {
                    $default = isset($selectoptions['inherit']) ? 'inherit' : 'Inherit';
                }

                $value = $selectoptions[$default]['name'];
                $help .= '<strong>' . get_string('default', 'moodle') . ': ' . $value . '</strong><br>';
            }
            $help .= $this->options['help'];
            $data = new stdClass;
            $data->ltr = !right_to_left();
            $data->text = $help;
            return $OUTPUT->render_from_template('theme_remui/customizer/help_icon', $data);
        }
        return false;
    }

    /**
     * Prepare options for normal select input
     *
     * @param  Array $options Options for select input
     * @param  Mixed $default Default value
     *
     * @return Array
     */
    private function prepare_select_options($options, $default) {
        $selectoptions = [];
        foreach ($options as $key => $value) {
            $option = [
                'key' => $key,
                'value' => $value
            ];
            if ($key == $default) {
                $option['selected'] = 'selected';
            }
            $selectoptions[] = $option;
        }
        return $selectoptions;
    }

    /**
     * Prepare the output for the setting
     *
     * @return string element output
     */
    public function output() {
        global $OUTPUT;

        $options = $this->options;
        $label = isset($options['label']) ? $options['label'] : get_string($this->name, $this->component);
        $default = $this->get_config();

        $selectoptions = $this->prepare_select_options($options['options'], $default);

        return $OUTPUT->render_from_template($this->component . '/customizer/elements/fontselect', [
            'name' => $this->name,
            'label' => $label,
            'help' => $this->get_help(),
            'default' => $default,
            'options' => $selectoptions
        ]);
    }
}
