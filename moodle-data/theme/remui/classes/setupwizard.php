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
 * Edwiser RemUI - Setup wizard Class
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui;
use context_system;

/**
 * setupwizard class
 */
class setupwizard {

    /**
     * Performs the specified action using the provided configuration.
     *
     * @param string $action The action to perform.
     * @param mixed $config The configuration data required for the action.
     * @return mixed The result of the action, or an error message if the action function does not exist.
    */
    public function perform_action($action, $config) {
        $functionname = "action_".$action;

        // Check if the function exists before calling it.
        if (method_exists($this, $functionname)) {
            // Call the function dynamically.
            return call_user_func(array($this, $functionname), $config);
        } else {
            // Handle the case when the function doesn't exist.
            return "Function $functionname does not exist.";
        }
    }


    /**
     * Sets the current theme for the site.
     *
     * @param mixed $config The configuration data required for the action.
     * @return void
    */
    public function action_set_theme($config){

        $theme = \theme_config::load('remui');

        $notifytype = 'fail';

        if ($theme instanceof \theme_config) {
            set_config('theme', $theme->name);
            $notifytype = 'success';
            set_config("setupinstallcheck", "hidemodal", "theme_remui");
            theme_reset_all_caches();
        }

        return $notifytype;
    }

    public function action_skipsetup_from_modal($config) {
        set_config("setupinstallcheck", "hidemodal", "theme_remui");
    }

    /**
     * Saves the setup information for a specific configuration key.
     *
     * If the 'setupuserinfo' configuration setting already exists, the new value is appended to the existing array.
     * Otherwise, a new 'setupuserinfo' configuration setting is created with the provided value.
     *
     * @param string $config The configuration data to be saved, in JSON format.
     * @return bool True if the setup information was saved successfully, false otherwise.
     */
    public function action_save_setup_info($config) {

        // $this->set_setup_status("userinformation");
        if ($setupuserinfo = get_config('theme_remui', 'setupuserinfo')) {

            $config = json_decode($config);

            $setupuserinfo = json_decode($setupuserinfo);

            foreach ($config as $key => $value) {
                $setupuserinfo->{$key} = $value;
            }

            set_config('setupuserinfo', json_encode($setupuserinfo), "theme_remui");
        } else {
            set_config('setupuserinfo', $config, "theme_remui");
        }

        return true;
    }

   /**
    * Checks the license status and handles the setup wizard configuration.
    *
    * This method performs the following tasks:
    * - Instantiates a LicenseController object
    * - Calls the license_handler_for_setup_wizard method to retrieve license data
    * - Saves the license data to the 'edd_remui_setup_license_data' configuration setting
    * - Retrieves the Remui license template context and stores it in the $templatecontext array
    *
    * @param mixed $config The configuration data to be used for the license check.
    * @return void
    */
    public function action_license_check($config){
        // $this->set_setup_status("licenseactivation");
        $config = json_decode($config);

        $licensecontroller = new \theme_remui\controller\LicenseController();

        if($config->operation == 'activate'){
            $licensedata = $licensecontroller->license_handler_for_setup_wizard($config->licensekey);

            if(isset($licensedata->license)  && $licensedata->license == 'valid'){
                \theme_remui\toolbox::remove_plugin_config(EDD_LICENSE_ACTION);
            }
        }
        $licensekey = get_config('theme_remui', 'edd_remui_license_key');
        $controller = new \theme_remui\controller\RemUIController($licensekey);
        $licensedata = $controller->request_license_data_for_setup_wizard($licensekey);

        set_config('edd_remui_setup_license_data', json_encode($licensedata), 'theme_remui');

        $licensedata = $licensecontroller->get_remui_license_template_context();

        return $licensedata;
    }

    /**
     * Performs a series of system checks to ensure the Moodle environment is compatible with the Edwiser RemUI plugin.
     *
     * The checks performed include:
     * - Moodle version check: Ensures the Moodle version is at least 4.0.2.
     * - Write access check: Ensures the plugin directories have write permissions.
     * - Internet connection check: Ensures the server has an active internet connection.
     *
     * @param array $config The configuration data required for the action.
     * @return array The result of the system checks, including a flag indicating if all checks passed.
     */
    public function action_system_server_check($config) {
        global $CFG;
        // $this->set_setup_status("servercheck");

        $result = [
            'requirechecks' => [],
            'allchecks' => true,
        ];

        $requirechecks = [
            'moodleversioncheck' => true,
            'writeaccesscheck' => true,
            'internetconnectioncheck' => \theme_remui\utility::check_internet_connection(),
            'allowurlfopencheck' => ini_get('allow_url_fopen'),
        ];

        // Check Moodle version
        if ($CFG->branch < 402) {
            $result["allchecks"] = false;
            $requirechecks['moodleversioncheck'] = false;
        }

        // Check write permissions for plugin directories
        $pluginmanager = \core_plugin_manager::instance();
        $plugintypes = [ 'block', 'format', 'filter', 'local'];
        $nonwriteable = [];

        foreach ($plugintypes as $plugintype) {
            $plugintypepath = $pluginmanager->get_plugintype_root($plugintype);
            if (!is_writable($plugintypepath)) {
                if ($plugintype === 'format') {
                    $nonwriteable[] = "'course/" . $plugintype . "'";
                } else if ($plugintype === 'block') {
                    $nonwriteable[] = "'blocks'";
                } else {
                    $nonwriteable[] = "'" . $plugintype . "'";
                }
                $requirechecks['writeaccesscheck'] = false;
                $result["allchecks"] = false;
            }
        }
        if (!empty($nonwriteable)) {
            $lastitem = array_pop($nonwriteable);
            $nonwriteablestr = !empty($nonwriteable) ?
                implode(', ', $nonwriteable) . ' and ' . $lastitem :
                $lastitem;
            $result['nonwriteablepluginsmsg'] = get_string(
                'setupwizard:warning2',
                'theme_remui',
                ['nonwriteablestr' => $nonwriteablestr]);
        }

        if (!$requirechecks['internetconnectioncheck']) {
            $result["allchecks"] = false;
        }

        if (!$requirechecks['allowurlfopencheck']) {
            $result["allchecks"] = false;
        }

        $result["requirechecks"] = $requirechecks;

        return $result;
    }

    /**
     * Sets the default course format to remuiformat.
     *
     * @param array $config The configuration data required for the action.
     */
    public function action_set_default_course_format($config) {
        set_config("format", "remuiformat", 'moodlecourse');
        return true;
    }

    /**
     * Sets the page builder as the homepage.
     *
     * @param array $config The configuration data required for the action.
     */
    public function action_set_pagebuilder_for_homepage($config) {
        set_config('frontpagechooser', 3, 'theme_remui');
        return true;
    }

    /**
     * Enables a filter plugin.
     *
     * @param array $config The configuration data required for the action.
     */
    public function action_enable_filterplugin($config) {
        global $CFG;
        require_once($CFG->libdir . '/filterlib.php');
        filter_set_global_state('edwiserpbf', TEXTFILTER_ON);
        filter_set_applies_to_strings('edwiserpbf', true);

        return true;
    }

    public function action_get_installableplugin_list($config) {

        $licensecontext = json_decode(get_config("theme_remui", "edd_remui_setup_license_data"));

        if (!$licensecontext) {
            return [
                "pluginslist" => null,
                "structuredpluginlist" => null,
            ];
        }

        $pluginlist = null;
        foreach ($licensecontext->download_links as $key => $value) {
            if (strpos($value->post_name, 'remui') === 0) {
                $pluginlist = $value->download_links;
                break;
            }
        }

        // $pluginlist = (object)[
        //     "edwiserratingreview" => "https://qastaticcdn.edwiser.org/externalplugins/block_edwiserratingreview.zip",
        //     "remuiformat" => "https://qastaticcdn.edwiser.org/externalplugins/moodle-format_remuiformat.zip",
        //     "edwisersiteimporter" => "https://qastaticcdn.edwiser.org/externalplugins/moodle-local_edwisersiteimporter.zip",
        //     "edwiserpagebuilder" => "https://qastaticcdn.edwiser.org/externalplugins/moodle-local_edwiserpagebuilder.zip",
        //     "edwiseradvancedblock" => "https://qastaticcdn.edwiser.org/externalplugins/moodle-block_edwiseradvancedblock.zip",
        //     "edwiserpbf" => "https://qastaticcdn.edwiser.org/externalplugins/filter_edwiserpbf.zip",
        // ];

        // Define plugin mappings
        $mapping = [
            'edwiserratingreview' => ['block_edwiserratingreview', 'Edwiser Rating and Review'],
            'remuiformat' => ['format_remuiformat', 'Edwiser Course Format'],
            'edwisersiteimporter' => ['local_edwisersiteimporter', 'Edwiser Importer'],
            'edwiserpagebuilder' => ['local_edwiserpagebuilder', 'Edwiser Page Builder'],
            'edwiseradvancedblock' => ['block_edwiseradvancedblock', 'Edwiser Advance Block'],
            'edwiserpbf' => ['filter_edwiserpbf', 'Edwiser Page Builder Filter'],
        ];

        // Build plugins array with download URLs
        $pluginslist = [];
        foreach ($mapping as $oldkey => $data) {
            if (isset($pluginlist->$oldkey)) {
                $pluginslist[$data[0]] = $pluginlist->$oldkey;
            }
        }

        // Initialize plugin categories
        $structuredpluginlist = [
            "edwiseraddons" => [
                'name' => 'Edwiser add-ons',
                'plugins' => [],
            ],
            "advanceblockplugins" => [
                'name' => 'Edwiser advance block plugins',
                'plugins' => [],
            ],
        ];

        // Map and categorize plugins
        foreach ($mapping as $oldkey => $data) {
            if (isset($pluginlist->$oldkey)) {
                $plugin = $data[0];
                $name = $data[1];

                $category = in_array($plugin, [
                    'local_edwiserpagebuilder',
                    'block_edwiseradvancedblock',
                    'filter_edwiserpbf',
                ]) ? 'advanceblockplugins' : 'edwiseraddons';

                $structuredpluginlist[$category]['plugins'][] = [
                    "id" => $plugin,
                    "name" => "$name ($plugin)",
                    $plugin => true,
                ];
            }
        }

        $structuredpluginlist = array_filter($structuredpluginlist, function($category) {
            return !empty($category['plugins']);
        });

        return [
            "pluginslist" => $pluginslist,
            "structuredpluginlist" => array_values($structuredpluginlist),
        ];
    }

    public function action_get_setupwizard_context($config) {
        global $CFG;

        $questions = \theme_remui\utility::get_content_from_json(
            'https://staticcdn.edwiser.org/json/setupwizard_json_files/information_feedback_questions.json'
        )["userinformation"];

        $setupwizardlayoutcontent = \theme_remui\utility::get_content_from_json(
            'https://staticcdn.edwiser.org/json/setupwizard_json_files/setupwizard_layout_content.json'
        );

        // This is for final steps
        $manualsetupplugins = $setupwizardlayoutcontent["manualsetupplugins"];

        // this is for sitesetup page
        $layouts = $setupwizardlayoutcontent["layouts"];
        $coursedata = $setupwizardlayoutcontent["coursedata"];

        $licensekey = get_config('theme_remui', 'edd_remui_license_key');
        if ($licensekey) {
            $controller = new \theme_remui\controller\RemUIController($licensekey);
            $licensedata = $controller->request_license_data_for_setup_wizard($licensekey);
            set_config('edd_remui_setup_license_data', json_encode($licensedata), 'theme_remui');
        }

        $feedbackcollection = new \theme_remui\feedbackcollection();
        $finalfeedbackquestion = $feedbackcollection->question_lists()["setupexperience_question"];
        $finalfeedbackquestion["questionname"] = "setupexperience_question";

        $questionsgenerated = true;
        if (!$questions) {
            $questionsgenerated = false;
        }

        return [
            "questions" => $questions,
            "questionsgenerated" => $questionsgenerated,
            "resumestep" => $this->get_setup_status(),
            "manualsetupplugins" => $manualsetupplugins,
            "layouts" => $layouts,
            "courses" => $coursedata,
            "licensekey" => $licensekey,
            "finalfeedbackquestion" => $finalfeedbackquestion,
            "isratingreviewaddedtocourses" => get_config('block_edwiserratingreview', 'pluginchecker'),
        ];
    }

    public function action_get_layout_info($config){
        global $DB;

        $config = json_decode($config, true);

        $layoutsinfo = [];

        foreach ($config as  $key => $layout) {
            $record = $DB->get_record('edw_page_blocks', array('title' => $layout["layout"]), "id");
            if ($record) {
                $layout["layoutid"] = $record->id;

            } else {
                $layout["layoutid"] = 0;
            }
            $layoutsinfo[$key] = $layout;
        }
        return $layoutsinfo;
    }
    public function action_basic_theme_setup($config){

        global $CFG, $SITE;
        $confightml = [];

        $titiletext = "";
        $iconclass = "";
        $statustext = "";
        $infotext = "";
        $keyclass = "";

        $confightml["edwiserpagebuilderexist"] = false;
        $confightml["edwisersiteimporterexist"] = false;

        if (set_config('pagewidth', "fullwidth", "theme_remui")) {

            $titiletext = get_string("pagewidth", "theme_remui");
            $iconclass = "edw-icon edw-icon-Check";
            $statustext = get_string("done", "theme_remui");
            $infotext = get_string("pagewidthinfo", "theme_remui");
            $keyclass = "themelayout";

            $content  = "<div class=\"content\">
                            <p class=\"para-regular-2 p-mb-2\">{$infotext}</p>
                            <div class=\"setup-status\"><span class=\"check-mark-icon type-1 {$iconclass}\"></span> <p class=\"m-0 status-text small-info-regular\">{$statustext}</p></div>
                        </div>";

            $confightml["pluginsetup"]["themelayouthtml"] = $this->generate_configuration_html($titiletext, $keyclass,$content);
        }

        if ( set_config('enrolment_page_layout', 1, "theme_remui")){

            $titiletext = get_string("enrolment_layout", "theme_remui");
            $iconclass = "edw-icon edw-icon-Check";
            $statustext = get_string("done", "theme_remui");
            $infotext = get_string("enrollayoutinfo", "theme_remui");
            $keyclass = "enrolpagelayout";
            $content  = "<div class=\"content\">
                            <p class=\"para-regular-2 p-mb-2\">{$infotext}</p>
                            <div class=\"setup-status\"><span class=\"check-mark-icon type-1 {$iconclass}\"></span> <p class=\"m-0 status-text small-info-regular\">{$statustext}</p></div>
                         </div>";
            $confightml["pluginsetup"]["enrolpagelayout"] = $this->generate_configuration_html($titiletext, $keyclass,$content);
        }
        //Accessibility widget setting
        set_config('enableaccessibilitytools', true, 'theme_remui');

        // color scheme html
        set_config('sitecolorhex', "#0051F9", 'theme_remui');
        set_config('secondarycolor', "#37be71", 'theme_remui');
        set_config('themecolors-textcolor', "#4c5a73", 'theme_remui');
        set_config('themecolors-bordercolor', "#d5ddea", 'theme_remui');
        $titiletext = get_string("colorschemehead", "theme_remui");
        $iconclass = "edw-icon edw-icon-Check";
        $statustext = get_string("default", "theme_remui");
        $keyclass = "colorscheme";
        $content  = "<div class=\"content\">
                        <div class=\"position-relative inner-container\">
                            <div class=\"pallet-color\">
                                <span style=\"background: rgb(0, 81, 249);\"></span>
                                <span style=\"background: rgb(76, 90, 115);\"></span>
                                <span style=\"background: rgb(55, 190, 113);\"></span>
                                <span style=\"background: rgb(213, 221, 234);\"></span>
                            </div>
                            <span class=\"check-mark-icon type-2 {$iconclass}\"></span>
                        </div>
                        <p class=\"small-info-semibold head-color status-text p-p-2\">{$statustext}</p>
                    </div>";
        $confightml["pluginsetup"]["colorscheme"] = $this->generate_configuration_html($titiletext, $keyclass,$content);

        // Font family selection html
        $titiletext = get_string("fontfamilyhead", "theme_remui");
        $iconclass = "edw-icon edw-icon-Check";
        $statustext = "Inter";
        $infotext = "A quick brown fox jumps over the lazy dog.";
        $keyclass = "fontfamilysetup";
        $content  = "<div class=\"content\">
                        <span class=\"check-mark-icon type-2 {$iconclass} p-mt-1\"></span>
                        <div>
                            <h5 class=\"h-bold-5 p-mb-2\">{$statustext}</h5>
                            <p class=\"para-regular-1 m-0\">{$infotext}</p>
                        </div>
                    </div>";
        $confightml["pluginsetup"]["fontfamilysetup"] = $this->generate_configuration_html($titiletext, $keyclass,$content);


        // Site logo html
        set_config('logoorsitename', 'iconsitename', 'theme_remui');
        set_config('siteicon', 'graduation-cap', 'theme_remui');
        set_config('logo-bg-color', "#FFFFFF", 'theme_remui');
        set_config('sitenamecolor', '#0051F9', 'theme_remui');
        $titiletext = get_string("siteiconnamehead", "theme_remui");
        $iconclass = "fa fa-graduation-cap";
        $statustext = $SITE->shortname;
        $keyclass = "logosetup";
        $color = \theme_remui\toolbox::get_theme_setting('sitenamecolor');
        $content  = "<div class=\"content\" style=\"color:{$color}\">
                        <span class=\"{$iconclass}\"></span> <p class=\"status-text m-0 d-flex\">{$statustext}</p>
                    </div>";
        $confightml["pluginsetup"]["logosetup"] = $this->generate_configuration_html($titiletext, $keyclass,$content);

        // Home page selection html
        if (is_plugin_available("local_edwiserpagebuilder")) {
            $titiletext = get_string("homepageselectionhead", "theme_remui");
            $keyclass = "homepagesetup";
            $infotext = get_string("inprogress", "theme_remui");
            $content  = "<div class=\"content\">
                            <div class=\"inprogress\">
                                <img  style=\"margin-right: 4px;\"  src=\"{$CFG->wwwroot}/theme/remui/pix/siteinnerloader.svg\" width=\"16\" height=\"16\">
                                <span>{$infotext}</span>
                            </div>
                        </div>";
            $confightml["pluginsetup"]["homepagesetup"] = $this->generate_configuration_html($titiletext, $keyclass, $content);

            // other page selection html
            $titiletext = get_string("otherpageselectionhead", "theme_remui");
            $keyclass = "otherpagesetup";
            $infotext = get_string("inprogress", "theme_remui");
            $content  = "<div class=\"content\">
                            <div class=\"inprogress\">
                                <img  style=\"margin-right: 4px;\"  src=\"{$CFG->wwwroot}/theme/remui/pix/siteinnerloader.svg\" width=\"16\" height=\"16\">
                                <span>{$infotext}</span>
                            </div>
                        </div>";
            $confightml["pluginsetup"]["otherpagesetup"] = $this->generate_configuration_html($titiletext, $keyclass, $content);
            $confightml["edwiserpagebuilderexist"] = true;
        }


        // if(is_plugin_available("local_edwisersiteimporter")){
        //     // demo course import html
        //     $titiletext = get_string("democourseimporthead","theme_remui");
        //     $keyclass = "democoursesetup";
        //     $infotext = get_string("inprogress","theme_remui");
        //     $content  = "<div class=\"content\">
        //                     <div class=\"inprogress\">
        //                         <img  style=\"margin-right: 4px;\"  src=\"{$CFG->wwwroot}/theme/remui/pix/siteinnerloader.svg\" width=\"16\" height=\"16\">
        //                         <span>{$infotext}</span>
        //                     </div>
        //                 </div>";
        //     $confightml["pluginsetup"]["democoursesetup"] = $this->generate_configuration_html($titiletext, $keyclass,$content);
        //     $confightml["edwisersiteimporterexist"] = true;
        // }
        return $confightml;
    }

    public function action_set_pagelinks_in_footer($config){
        $config = json_decode($config,true);

        $colindex = 1;

        $footercolcontentarr=[];

        foreach ($config as $value) {
            $footercolcontentarr[] = array(
                "text" => $value["title"],
                "address" => $value["publishedpage"],
            );
        }

        set_config("footercolumn","1","theme_remui");
        set_config("footercolumn".$colindex."type","menu","theme_remui");
        set_config("footercolumn".$colindex."title","Custom Pages","theme_remui");
        set_config("footercolumn".$colindex."menu",json_encode($footercolcontentarr),"theme_remui");

        return true;
    }

    function generate_configuration_html($titiletext, $keyclass,$content) {
        return "<div class=\"configuration-wrapper {$keyclass}\">
                    <h5 class=\"title h-semibold-5 p-mb-3\">{$titiletext}</h5>
                    {$content}
                </div>";

    }

    public function set_setup_status($status){
        set_config('setupstatus', $status, 'theme_remui');
    }

    public function get_setup_status(){
        return get_config('theme_remui', 'setupstatus');
    }

    public function action_set_setup_status($config){
        $config = json_decode($config);
        $this->set_setup_status($config->status);
    }

    // *************************************** plugin installation ***************************************
    public function action_plugin_download_handler($config) {
        global $CFG;

        require_once($CFG->libdir . '/adminlib.php');
        require_once($CFG->libdir . '/upgradelib.php');

        $internetcheck = \theme_remui\utility::check_internet_connection();
        if (!$internetcheck) {
            return [];
        }

        $config = json_decode($config, true);

        $plugins = $config["plugins"];

        // $url = "https://qastaticcdn.edwiser.org/externalplugins/pluginlist.json";
        // // $url = "https://qastaticcdn.edwiser.org/externalplugins/pluginlist.json";
        // $jsoncontent = file_get_contents($url);
        // $plugins = json_decode($jsoncontent, true);

        // $this->set_setup_status("sitesetup");

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($plugins) || !$plugins) {
            return [];
        }

        $mapping = [
            'block_edwiserratingreview' => 'edwiserratingreview.zip',
            'format_remuiformat' => 'remuiformat.zip',
            'local_edwisersiteimporter' => 'edwisersiteimporter.zip',
            'local_edwiserpagebuilder' => 'edwiserpagebuilder.zip',
            'block_edwiseradvancedblock' => 'edwiseradvancedblock.zip',
            'filter_edwiserpbf' => 'edwiserpbf.zip',
        ];

        $tempdir = make_temp_directory('edwiserplugininstaller');
        $installer = \tool_installaddon_installer::instance();

        $downloadedpluginlist = [];

        foreach ($plugins as $plugin => $url) {
            // Check if URL is accessible
            $headers = get_headers($url);
            if (!$headers || strpos($headers[0], '200') === false) {
                continue;
            }

            $zipurl = $url;
            $zipfile = $tempdir . '/' . basename($zipurl);

            $pluginzippath = $tempdir . '/' . $mapping[$plugin];

            if (!file_exists($pluginzippath)) {
                file_put_contents($zipfile, file_get_contents($zipurl));
            }

            $downloadedpluginlist[$plugin] = $zipfile;

            // $component = $installer->detect_plugin_component($zipfile);
            // list($type, $name) = \core_component::normalize_component($component);
        }

        return $downloadedpluginlist;
    }

    public function check_plugin_installable($plugins) {
        global $CFG;

        $pluginman = \core_plugin_manager::instance();

        if (!empty($CFG->disableupdateautodeploy)) {
            return false;
        }

        if (empty($plugins)) {
            return false;
        }

        $validationresults = [];

        foreach ($plugins as $plugin) {
            $zipfile = $plugin->zipfilepath;
            list($plugintype, $pluginname) = \core_component::normalize_component($plugin->component);
            $tmp = make_request_directory();
            $zipcontents = $pluginman->unzip_plugin_file($zipfile, $tmp, $pluginname);
            if (empty($zipcontents)) {
                $validationresults[$plugin->component] = ['error' => 'Unable to unzip ' . $zipfile];
                continue;
            }

            $validator = \core\update\validator::instance($tmp, $zipcontents);
            $validator->assert_plugin_type($plugintype);
            $validator->assert_moodle_version($CFG->version);
            $result = $validator->execute();

            $validationresults[$plugin->component] = [
                'result' => $result,
                'messages' => [],
                'errors' => []  // New array to store error messages
            ];

            foreach ($validator->get_messages() as $message) {
                $messagedata = [
                    'level' => $validator->message_level_name($message->level),
                    'msgcode' => $validator->message_code_name($message->msgcode),
                    'addinfo' => $validator->message_code_info($message->msgcode, $message->addinfo),
                    'info' => is_string($message->addinfo) ? $message->addinfo : json_encode($message->addinfo),
                ];

                $validationresults[$plugin->component]['messages'][] = $messagedata;

                // Store error messages in a separate array
                if ($messagedata['level'] === 'Error') {
                    $validationresults[$plugin->component]['errors'][] = $messagedata;
                }
            }
        }

        return $validationresults;
    }

    public function action_plugin_install_handler($config) {
        global $CFG;
        $config = json_decode($config);
        $zipfile = $config->zipfile;

        require_once($CFG->libdir . '/adminlib.php');
        require_once($CFG->libdir . '/upgradelib.php');

        $installer = \tool_installaddon_installer::instance();
        $pluginman = \core_plugin_manager::instance();

        $component = $installer->detect_plugin_component($zipfile);

        // Check if plugin is already installed
        $plugininfo = $pluginman->get_plugin_info($component);

        if ($plugininfo) {
            return ['info' => true, "message" => get_string("alreadyinstalled", "theme_remui")];
        }

        list($type, $name) = \core_component::normalize_component($component);
        if ($name == "edwiserpagebuilder") {
            $internetcheck = \theme_remui\utility::check_internet_connection();
            if (!$internetcheck) {
                throw new \moodle_exception("Internet should be available to install this plugin");
            }
        }

        if ($name == "edwiseradvancedblock" || $name == "edwiserpbf") {
            if (!is_plugin_available("local_edwiserpagebuilder")) {
                throw new \moodle_exception("Edwiser page builder should be installed to install this plugin");
            }
        }

        $installable = [(object)[
            'component' => $component,
            'zipfilepath' => $zipfile,
        ]];

        // echo \html_writer::start_tag('pre', array('class' => 'plugin-install-console'));
        // $validated = $pluginman->install_plugins($installable, false, false);
        // echo \html_writer::end_tag('pre');

        $validationresults = $this->check_plugin_installable($installable);
        $pluginname = $validationresults[$component]['messages'][0]['info'];

        if (!$validationresults[$component]['result']) {
            $errors = $validationresults[$component]['errors'];
            // $erroroutput = "<div>";
            // foreach ($errors as $error) {
            //     $erroroutput .= "<p class='m-0'>[{$error['level']}] {$error['msgcode']}</p>";
            // }
            // $erroroutput .= "</div>";
            $erroroutput = "<span>";
            foreach ($errors as $error) {
                $erroroutput .= "[{$error['level']}] {$error['msgcode']}<br>";
            }
            $erroroutput .= "</span>";

            return ['error' => true, 'message' => $erroroutput];
        }



        $result = $pluginman->install_plugins($installable, true, true);

        ob_start();
        upgrade_noncore(true);
        ob_end_clean();

        return ['success' => true, "message" => "done"];
    }

    public function action_plugin_database_upgrader_handler($config) {
        global $CFG;
        require_once($CFG->libdir . '/upgradelib.php');

        ob_start();
        upgrade_noncore(true);
        ob_end_clean();

        purge_all_caches();

        return true;
    }

    public function action_send_usersiteinfo_to_edwiser($config) {
        $userfeedback = new \theme_remui\userfeedback();
        $setupdata = $userfeedback->prepare_setupdata($config);
        $userfeedback->send_user_feedback($setupdata);
        return true;
    }

    public function collect_new_settings($node, &$data) {
        ob_start();

        if ($node instanceof \admin_category) {
            $entries = array_keys($node->children);
            foreach ($entries as $entry) {
                $this->collect_new_settings($node->children[$entry], $data);
            }
        } else if ($node instanceof \admin_settingpage) {
            foreach ($node->settings as $setting) {
                if (is_null($setting->get_setting())) {
                    $fullname = $setting->get_full_name();
                    $defaultvalue = $setting->get_defaultsetting();
                    $data->$fullname = $defaultvalue;
                }
            }
        }

        ob_end_clean();
    }

    public function action_save_newplugin_settings() {
        global $CFG;

        ob_start(); // Move ob_start() to the very beginning

        require_once($CFG->libdir . '/adminlib.php');
        require_once($CFG->libdir . '/upgradelib.php');

        require_login(0, false);
        if (isguestuser()) {
            ob_end_clean();
            return false;
        }

        $adminroot = admin_get_root();
        $data = new \stdClass();
        $this->collect_new_settings($adminroot, $data);

        $result = false;
        if (!empty((array)$data)) {

            ob_end_clean();

            ob_start();
            upgrade_noncore(true);
            ob_end_clean();

            ob_start();

            admin_write_settings($data);
            $result = true;
        }

        ob_end_clean();
        return $result;
    }

    public function action_remove_downloaded_zip_and_purge_cache($config) {
        global $CFG;
        require_once($CFG->libdir . '/upgradelib.php');

        $config = json_decode($config);

        $temppath = realpath($CFG->tempdir . DIRECTORY_SEPARATOR . 'edwiserplugininstaller');
        if (is_dir($temppath)) {
            remove_dir($temppath);
        }

        if ($config->purgecache) {
            purge_all_caches();
        }

        return true;
    }
}

