/* eslint-disable no-console */
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
 * Theme customizer color utils js. Provide functionality to manupulate colors.
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

class ColorUtils {
    /**
     * Convert hex color code to rgb.
     * @param {string} hex Hex color value
     * @returns {object}
     */
    hexToRgb(hex) {
        let result;
        hex = hex.split('#');
        hex = hex[hex.length - 1];
        if (hex.length == 6) {
            result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        } else if (hex.length == 3) {
            result = /^([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
            result[1] += result[1];
            result[2] += result[2];
            result[3] += result[3];
        }
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : {
            red: 0,
            green: 0,
            blue: 0
        };
    }

    /**
     * Pad a hexadecimal string with zeros if it needs it.
     * @param {number} number Hex number
     * @returns {number} Hex
     */
    pad(number) {
        var str = '' + number;
        if (str.length < 2) {
            str = '0' + str;
        }
        return str;
    }

    /**
     * Convert rgb color to hex.
     * @param {object} rgb Red, Green and blue color
     * @returns {string} Hex color.
     */
    rgbToHex(rgb) {
        rgb.red = this.pad(Math.min(Math.max(Math.round(rgb.red), 0), 255).toString(16));
        rgb.green = this.pad(Math.min(Math.max(Math.round(rgb.green), 0), 255).toString(16));
        rgb.blue = this.pad(Math.min(Math.max(Math.round(rgb.blue), 0), 255).toString(16));
        return `#${rgb.red}${rgb.green}${rgb.blue}`;
    }

    /**
     * Get shade of hex color.
     * @param {object} rgb Red, Green and blue color
     * @param {number} shade Shade number in percentage.
     * @returns {object} rgb color.
     */
    rgbShade(rgb, shade) {
        return {
            red: rgb.red * (1 - 0.01 * shade),
            green: rgb.green * (1 - 0.01 * shade),
            blue: rgb.blue * (1 - 0.01 * shade)
        };
    }

    /**
     * Get tint of hex color.
     * @param {object} rgb Red, Green and blue color
     * @param {number} tint Tint number in percentage.
     * @returns {string} rgb color
     */
    rgbTint(rgb, tint) {
        return {
            red: rgb.red + (255 - rgb.red) * tint * 0.01,
            green: rgb.green + (255 - rgb.green) * tint * 0.01,
            blue: rgb.blue + (255 - rgb.blue) * tint * 0.01
        };
    }

    /**
     * Get color shade.
     * @param {string} color Hex color
     * @param {number} shade Shade percentage.
     * @returns {string} Hex color
     */
    shade(color, shade) {
        return this.rgbToHex(this.rgbShade(this.hexToRgb(color), shade));
    }

    /**
     * Get color tint.
     * @param {string} color Hex color
     * @param {number} tint  Tint percentage.
     * @returns {string} Hex color
     */
    tint(color, tint) {
        return this.rgbToHex(this.rgbTint(this.hexToRgb(color), tint));
    }
}

export default new ColorUtils();
