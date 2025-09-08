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
 * Edwiser RemUI Settings.
 *
 * @package   theme_remui
 * @copyright 2016 Ryan Wyllie
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class theme_remui_admin_settingspage_tabs extends admin_settingpage {

    /** @var The tabs */
    protected $tabs = array();

    /**
     * Add a tab.
     *
     * @param admin_settingpage $tab A tab.
     */
    public function add_tab(admin_settingpage $tab) {
        foreach ($tab->settings as $setting) {
            $this->settings->{$setting->name} = $setting;
        }
        $this->tabs[] = $tab;
        return true;
    }

    public function add($tab) {
        return $this->add_tab($tab);
    }

    /**
     * Get tabs.
     *
     * @return array
     */
    public function get_tabs() {
        return $this->tabs;
    }

    /**
     * Generate the HTML output.
     *
     * @return string
     */
    public function output_html() {
        global $OUTPUT, $CFG, $PAGE;

        $activetab = optional_param('activetab', get_config('theme_remui', 'activetab'), PARAM_ALPHA);
        unset_config('activetab', 'theme_remui');

        $context = array('tabs' => array());
        $havesetactive = false;

        foreach ($this->get_tabs() as $tab) {
            $active = false;

            // Default to first tab it not told otherwise.
            if (empty($activetab) && !$havesetactive) {
                $active = true;
                $havesetactive = true;
            } else if ($activetab === $tab->name) {
                $active = true;
            }

            $context['tabs'][] = array(
                'name' => $tab->name,
                'displayname' => $tab->visiblename,
                'html' => $tab->output_html(),
                'active' => $active,
            );
        }

        // Add Personalizer tab.
        $personalizer = $OUTPUT->render_from_template('theme_remui/personalizer', array());

        // Personalizer tab.
        $context['tabs'][] = array(
            'name' => 'theme_remui_edwiserpersonalizer',
            'displayname' => get_string('personalizer', 'theme_remui'),
            'html' => $personalizer,
            'active' => $activetab == 'edwiserpersonalizer',
            'customclass' => 'remuitab edwiserpersonalizer'
        );

        // Edwiser Site pages settings.
        if (\theme_remui\utility::can_create_page()) {
            ob_start();
            echo "<div id='managepage-wrapper'></div>";
            $PAGE->requires->js_call_amd('local_edwiserpagebuilder/pageslistsettings', 'init');
            $sitepages = ob_get_clean();

            $context['tabs'][] = array(
                'name' => 'epbsitepages',
                'displayname' => get_string('sitepagessettings', 'local_edwiserpagebuilder'),
                'html' => $sitepages,
                'active' => $activetab == 'epbsitepages',
                'customclass' => 'remuitab'
            );
        }

        // Add edwiser importer.
        $importer = '';
        $pluginman = \core_plugin_manager::instance();
        if (array_key_exists("edwisersiteimporter", $pluginman->get_installed_plugins('local'))) {
            ob_start();
            include_once($CFG->dirroot . '/local/edwisersiteimporter/index.php');

            $importer = ob_get_clean();
        } else {
            $importer = get_string('importer-missing', 'theme_remui');
        }


        if (is_plugin_available("local_sitesync")) {
            // Add site sync.
            $sitesyncurl = $CFG->wwwroot . '/local/sitesync/overview.php';
            $sitesynchtml = '<div class="alert alert-warning  fade show" role="alert">
                                    '.get_string('user_syncinfo', 'local_sitesync').'
                            </div>
                            <div class="sitesync-button-wrapper">
                                <a href="' . $sitesyncurl . '" class="btn btn-primary" title="Go to site sync settings">
                                    '.get_string('site_sync_button_title', 'theme_remui').'
                                </a>
                            </div>';

            // Site sync tab.
            $context['tabs'][] = array(
                'name' => 'theme_remui_sitesync',
                'displayname' => get_string('sitesyncplugintabtext', 'theme_remui'),
                'html' => $sitesynchtml,
                'active' => $activetab == 'edwsitesync',
                'customclass' => 'remuitab edwsitesync'
            );
        }

        // Information center.
        $context['tabs'][] = array(
            'name' => 'edwisersiteimporter',
            'displayname' => get_string('importer', 'theme_remui'),
            'html' => $importer,
            'active' => $activetab == 'edwisersiteimporter',
            'customclass' => 'remuitab'
        );

        // Announcements tab content.
        ob_start();
        include_once($CFG->dirroot . '/theme/remui/information_center.php');
        $informationcenter = ob_get_clean();
        // Information center.
        $context['tabs'][] = array(
            'name' => 'informationcenter',
            'displayname' => get_string('informationcenter', 'theme_remui'),
            'html' => $informationcenter,
            'active' => $activetab == 'informationcenter',
            'customclass' => 'remuitab'
        );

        if (empty($context['tabs'])) {
            return '';
        }

        return $OUTPUT->render_from_template('theme_remui/admin_setting_tabs', $context);
    }

}
