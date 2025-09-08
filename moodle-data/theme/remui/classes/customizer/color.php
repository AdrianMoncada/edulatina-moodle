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
 * Theme customizer color utility. Provide functionality to manupulate colors.
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

namespace theme_remui\customizer;

class color {
    /**
     * Convert hex color code to rgb.
     * @param string hex Hex color value
     * @return object
     */
    public function hex_to_rgb($hex) {
        $result = null;
        $hex = strtoupper($hex);
        $hex = explode('#', $hex);
        $hex = $hex[count($hex) - 1];
        $result = [];
        if (strlen($hex) == 6) {
            preg_match_all("/^([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/", $hex, $result);
        } else if (strlen($hex) == 3) {
            preg_match_all("/^([A-F\d]{1})([A-F\d]{1})([A-F\d]{1})$/", $hex, $result);
            $result[1][0] .= $result[1][0];
            $result[2][0] .= $result[2][0];
            $result[3][0] .= $result[3][0];
        }
        $rgb = $result ? [
            "red" => hexdec($result[1][0]),
            "green" => hexdec($result[2][0]),
            "blue" => hexdec($result[3][0])
        ] : [
            "red" => "00",
            "green" => "00",
            "blue" => "00"
        ];
        return (object) $rgb;
    }

    /**
     * Pad a hexadecimal string with zeros if it needs it.
     * @param string number Hex number
     * @return string Hex
     */
    private function pad($number) {
        $str = '' . $number;
        if (strlen($str) < 2) {
            $str = '0' . $str;
        }
        return $str;
    }

    /**
     * Convert rgb color to hex.
     * @param object rgb Red, Green and blue color
     * @return string Hex color.
     */
    public function rgb_to_hex($rgb) {
        $rgb->red = $this->pad(dechex(min(max(round($rgb->red), 0), 255)));
        $rgb->green = $this->pad(dechex(min(max(round($rgb->green), 0), 255)));
        $rgb->blue = $this->pad(dechex(min(max(round($rgb->blue), 0), 255)));
        return "#" . $rgb->red . $rgb->green . $rgb->blue;
    }

    /**
     * Get shade of hex color.
     * @param object $rgb   Red, Green and blue color
     * @param int    $shade Shade number in percentage.
     * @return string       Hex color.
     */
    private function rgb_shade($rgb, $shade) {
        $rgb->red *= (1 - 0.01 * $shade);
        $rgb->green *= (1 - 0.01 * $shade);
        $rgb->blue *= (1 - 0.01 * $shade);
        return $rgb;
    }

    /**
     * Get tint of hex color.
     * @param object $rgb  Red, Green and blue color
     * @param int    $tint Tint number in percentage.
     * @return string      Hex color.
     */
    private function rgb_tint($rgb, $tint) {
        $rgb->red += (255 - $rgb->red) * $tint * 0.01;
        $rgb->green += (255 - $rgb->green) * $tint * 0.01;
        $rgb->blue += (255 - $rgb->blue) * $tint * 0.01;
        return $rgb;
    }

    /**
     * Get color shade.
     * @param string color Hex color
     * @param int shade Shade percentage.
     * @return string Hex color
     */
    public static function shade($color, $shade) {
        $self = new self();
        return $self->rgb_to_hex($self->rgb_shade($self->hex_to_rgb($color), $shade));
    }

    /**
     * Get color tint.
     * @param string color Hex color
     * @param int tint  Tint percentage.
     * @return string Hex color
     */
    public static function tint($color, $tint) {
        $self = new self();
        return $self->rgb_to_hex($self->rgb_tint($self->hex_to_rgb($color), $tint));
    }
}
