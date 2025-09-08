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
 *
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 */

import $ from "jquery";
import ColorUtils from "theme_remui/customizer/color-utils";
import ModalFactory from "core/modal_factory";

// Main colors selectors.
var MAIN_COLORS = {
    PRIMARY: '[name="sitecolorhex"]',
    SECONDARY: '[name="secondarycolor"]',
    TEXT: '[name="themecolors-textcolor"]',
    BORDER: '[name="themecolors-bordercolor"]'
};

/**
 * Get main colors object.
 * @returns {object} Colors
 */
function getMainColors() {
    return {
        primary: $(MAIN_COLORS.PRIMARY).spectrum('get').toString(),
        secondary: $(MAIN_COLORS.SECONDARY).spectrum('get').toString(),
        text: $(MAIN_COLORS.TEXT).spectrum('get').toString(),
        border: $(MAIN_COLORS.BORDER).spectrum('get').toString(),
        white: '#ffffff'
    };
}

function apply() {
    let mainColors = getMainColors();
    // Header Element bg.
    let colorMap = [{
        target: 'global-colors-pagebackgroundcolor',
        source: 'primary',
        shift: {
            method: 'tint',
            value: 96
        }
    }, {
        target: 'global-typography-body-linkcolor',
        source: 'primary',
    }, {
        target: 'global-typography-body-linkhovercolor',
        source: 'primary',
        shift: {
            method: 'shade',
            value: 20
        }
    }, {
        target: 'button-primary-color-background', // Primary colors
        source: 'primary',
    }, {
        target: 'button-primary-color-background-hover',
        source: 'primary',
        shift: {
            method: 'shade',
            value: 20
        }
    }, {
        target: 'button-primary-color-text',
        source: 'white',
    }, {
        target: 'button-primary-color-text-hover',
        source: 'white',
    }, {
        target: 'button-primary-color-icon',
        source: 'white',
    }, {
        target: 'button-primary-color-icon-hover',
        source: 'white',
    }, {
        target: 'button-primary-border-color',
        source: 'primary'
    }, {
        target: 'button-primary-border-color-hover',
        source: 'primary',
        shift: {
            method: 'shade',
            value: 20
        }
    }, {
        target: 'button-secondary-color-text', // Secondary colors
        source: 'primary',
    }, {
        target: 'button-secondary-color-text-hover',
        source: 'primary',
        shift: {
            method: 'shade',
            value: 20
        }
    }, {
        target: 'button-secondary-color-icon',
        source: 'primary',
    }, {
        target: 'button-secondary-color-icon-hover',
        source: 'primary',
        shift: {
            method: 'shade',
            value: 20
        }
    }, {
        target: 'button-secondary-color-background',
        source: 'white',
    }, {
        target: 'button-secondary-color-background-hover',
        source: 'white',
    }, {
        target: 'button-secondary-border-color',
        source: 'primary',
    }, {
        target: 'button-secondary-border-color-hover',
        source: 'primary',
        shift: {
            method: 'shade',
            value: 20
        }
    }, {
        target: 'loginpaneltextcolor',
        source: 'text',
        shift: {
            method: 'shade',
            value: 38
        }
    }, {
        target: 'loginpanelcontentcolor',
        source: 'text',
    }, {
        target: 'signuptextcolor',
        source: 'text',
    }, {
        target: 'loginpanellinkcolor',
        source: 'primary',
    }, {
        target: 'loginpanellinkhovercolor',
        source: 'primary',
        shift: {
            method: 'shade',
            value: 20
        }
    }, {
        target: 'loginpanelbackgroundcolor',
        source: 'primary',
        shift: {
            method: 'tint',
            value: 96
        }
    }, {
        target: 'global-colors-ascentbackgroundcolor', // Ascent bg color.
        source: 'primary',
        shift: {
            method: 'shade',
            value: 60
        }
    },
    {
        target: 'global-colors-elementbackgroundcolor', // Elements  bg color.
        source: 'border',
        shift: {
            method: 'tint',
            value: 58
        }
    }, {
        target: [
            'header-menu-background-color', // Header background.
            'logo-bg-color'
        ],
        source: 'white'
    }, {
        target: [
            'header-menu-text-color', // Header menu item color.
            'sitenamecolor'
        ],
        source:  'text',
        shift: {
            method: 'tint',
            value: 12
        }
    }, {
        target: 'header-menu-text-hover-color', // Header menu item hover color.
        source: 'primary'
    }, {
        target: 'header-menu-text-active-color', // Header menu item active color.
        source: 'primary'
    }, {
        target: 'header-menu-element-bg-color', // Header Element BG.
        source: 'primary',
        shift: {
            method: 'tint',
            value: 94
        }
    }, {
        target: 'header-menu-divider-bg-color', // Header divider color.
        source: 'border',
        shift: {
            method: 'shade',
            value: 15
        }
    }, {
        target: 'hds-icon-color', // Header icon color.
        source: 'text',
        shift: {
            method: 'tint',
            value: 9
        }
    }, {
        target: 'hds-icon-hover-color', // Header icon hover color.
        source: 'text',
        shift: {
            method: 'shade',
            value: 11
        }
    }, {
        target: 'hds-icon-active-color', // Header icon active color.
        source: 'primary'
    }, {
        target: 'themecolors-lightbordercolor', // Light border color.
        source: 'border',
        shift: {
            method: 'tint',
            value: 58
        }
    }, {
        target: 'themecolors-mediumbordercolor', // Medium border color.
        source: 'border',
    }, {
        target: [
            'typography-heading-all-textcolor', // Headings.
            'typography-heading-h1-textcolor',
            'typography-heading-h2-textcolor',
            'typography-heading-h3-textcolor',
            'typography-heading-h4-textcolor',
            'typography-heading-h5-textcolor',
            'typography-heading-h6-textcolor'
        ],
        source: 'text',
        shift: {
            method: 'shade',
            value: 38
        }
    }, {
        target: 'footer-background-color', // Footer BG.
        source: 'primary',
        shift: {
            method: 'shade',
            value: 90
        }
    }, {
        target: 'footer-text-color',
        source: 'white'
    }, {
        target: [
            'footer-link-text', // Footer link text.
            'footer-link-hover-text',
        ],
        source: 'text',
        shift: {
            method: 'tint',
            value: 70
        }
    }, {
        target: 'footer-divider-color', // Footer divider.
        source: 'primary',
        shift: {
            method: 'shade',
            value: 70
        }
    }, {
        target: [
            'footer-icon-color', // Footer icon color
        ],
        source: 'text',
        shift: {
            method: 'tint',
            value: 40
        },
    }, {
        target: [
            'footer-icon-hover-color', // Footer icon hover color
        ],
        source: 'primary'
    }];

    // Iterate each map to apply color.
    colorMap.forEach(color => {
        let targets = color.target;
        if (!Array.isArray(color.target)) {
            targets = [targets];
        }

        targets.forEach(target => {
            if (color.shift === undefined) {
                $(`[name="${target}"]`).spectrum('set', mainColors[color.source]).trigger('color.changed');
                return;
            }
            $(`[name="${target}"]`).spectrum(
                'set',
                ColorUtils[color.shift.method](
                    mainColors[color.source],
                    color.shift.value
                )
            ).trigger('color.changed');
        });
    });

    let obj = {
        type: ModalFactory.types.ALERT,
    };
    obj.title = M.util.get_string("success", "moodle");
    obj.body = "Smart color applied successfully";
    ModalFactory.create(obj, $("#create")).done(modal => {
        modal.show();
    });
}

export default {
    apply
};
