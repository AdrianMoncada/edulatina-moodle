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
 * Theme customizer color element class
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer\elements;

/**
 * Color picker element class.
 */
class color extends base {

    /**
     * Validate color value. For hex color validation only.
     *
     * @param string $color Hex color.
     *
     * @return boolean
     */
    private function is_valid_color($color) {
        $hex = strtoupper($color);
        $hex = explode('#', $hex);
        $hex = $hex[count($hex) - 1];
        $result = [];
        if (empty($color)) {
            return false;
        }
        if (strlen($hex) == 6) {
            return preg_match("/^([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/", $hex, $result);
        } else if (strlen($hex) == 3) {
            return preg_match("/^([A-F\d]{1})([A-F\d]{1})([A-F\d]{1})$/", $hex, $result);
        }
        return true;
    }

    /**
     * Get config of setting.
     *
     * @param bool   $devices NOTE: Will be supported in future.
     * @return mixed
     */
    public function get_config($devices = false) {
        $value = parent::get_config();
        $default = $this->options['default'];
        return !$this->is_valid_color($value) ? $default : $value;
    }

    /**
     * Varify prefered color format.
     *
     * @param array $options
     * @return void
     */
    private function prefered_format($options) {
        $formatset = false;
        if (!isset($options['options'])) {
            $options['options'] = [];
        } else {
            foreach ($options['options'] as $option) {
                if ($option['key'] == 'preferredFormat') {
                    $formatset = true;
                    break;
                }
            }
        }

        if (!$formatset) {
            $options['options'][] = ['key' => 'preferredFormat', 'value' => '\'hex\''];
        }
        return $options;
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

        $change = false;
        if (isset($options['change'])) {
            $change = $options['change'];
        }

        $options = $this->prefered_format($options);

        return $OUTPUT->render_from_template($this->component . '/customizer/elements/colorpicker', [
            'name' => $this->name,
            'label' => $label,
            'help' => $this->get_help(),
            'default' => $default,
            'change' => $change,
            'options' => isset($options['options']) ? $options['options'] : []
        ]);
    }
}
