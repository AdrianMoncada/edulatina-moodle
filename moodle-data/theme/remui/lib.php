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
 * Edwiser RemUI them functions
 * @package   theme_remui
 * @copyright 2016 Frédéric Massart - FMCorz.net
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


/**
 * Reset all caches
 */
function remui_clear_cache() {
    global $CFG, $PAGE;
    $link = $PAGE->url;
    $link->remove_params();
    purge_other_caches();
    remove_dir($CFG->dataroot . '/temp/theme/remui');
    theme_reset_all_caches();
    redirect($link);
}

/**
 * Serves any files associated with the theme settings.
 *
 * @param stdClass $course
 * @param stdClass $cm
 * @param context $context
 * @param string $filearea
 * @param array $args
 * @param bool $forcedownload
 * @param array $options
 * @return bool
 */
function theme_remui_pluginfile($course, $cm, $context, $filearea, $args, $forcedownload, array $options = array()) {
    if ($context->contextlevel != CONTEXT_SYSTEM) {
        send_file_not_found();
    }
    // By default, theme files must be cache-able by both browsers and proxies.
    $settings = [
        'frontpageloader',
        'staticimage',
        'testimonialimage1',
        'testimonialimage2',
        'testimonialimage3',
        'slideimage0',
        'slideimage1',
        'slideimage2',
        'slideimage3',
        'slideimage4',
        'slideimage5',
        'frontpageblockimage1',
        'frontpageblockimage2',
        'frontpageblockimage3',
        'frontpageblockimage4',
        'logo',
        'logomini',
        'faviconurl',
        'loginsettingpic',
        'loginpanellogo',
        'secondaryfooterlogo',
        'secondaryfooterlogodarkmode',
        'loaderimage',
        'darkmodelogo',
        'darkmodelogomini'
    ];
    if (in_array($filearea, $settings)) {
        $theme = theme_config::load('remui');
        // By default, theme files must be cache-able by both browsers and proxies.
        if (!array_key_exists('cacheability', $options)) {
            $options['cacheability'] = 'public';
        }
        return $theme->setting_file_serve($filearea, $args, $forcedownload, $options);
    } else {
        $itemid = (int)array_shift($args);
        $relativepath = implode('/', $args);
        $fullpath = "/{$context->id}/theme_remui/$filearea/$itemid/$relativepath";
        $fs = get_file_storage();
        if (!($file = $fs->get_file_by_hash(sha1($fullpath)))) {
            return false;
        }
        // Download MUST be forced - security!
        send_stored_file($file, 0, 0, $forcedownload, $options);
    }
    return false;
}

/**
 * Returns the main SCSS content.
 *
 * @param theme_config $theme The theme config object.
 * @return string
 */
function theme_remui_get_main_scss_content($theme) {
    global $CFG;

    $scss = '';

    $branch = get_moodle_release_version_branch();

    $scss .= file_get_contents($CFG->dirroot . '/theme/remui/scss/preset/remui.scss');

    $scss .= file_get_contents($CFG->dirroot . '/theme/remui/scss/remui.scss');

    return $scss;
}

/**
 * Get compiled css.
 *
 * @return string compiled css
 */
function theme_remui_get_precompiled_css() {
    global $CFG;
    return file_get_contents($CFG->dirroot . '/theme/remui/style/moodle.css');
}

/**
 * Get SCSS to prepend.
 *
 * @param theme_config $theme The theme config object.
 * @return array
 */
function theme_remui_get_pre_scss($theme) {
    global $CFG;

    $scss = '';
    $configurable = [
        // Config key => [variableName, ...].
        'brandcolor' => ['primary'],
    ];

    // Prepend variables first.
    foreach ($configurable as $configkey => $targets) {
        $value = isset($theme->settings->{$configkey}) ? $theme->settings->{$configkey} : null;
        if (empty($value)) {
            continue;
        }
        array_map(function($target) use (&$scss, $value) {
            $scss .= '$' . $target . ': ' . $value . ";\n";
        }, (array) $targets);
    }

    // Prepend pre-scss.
    if (!empty($theme->settings->scsspre)) {
        $scss .= $theme->settings->scsspre;
    }

    $customizer = theme_remui\customizer\customizer::instance();

    $variables = $customizer->process();

    // Variables used in theme.
    $variables['hideheadercontent'] = get_config('theme_remui', 'hideheadercontent') ? 'none' : 'block';
    $variables['hideactivitysection'] = get_config('theme_remui', 'hideactivitysection') ? 'none' : 'block';
    $variablesscss = "\n";
    foreach ($variables as $variable => $value) {
        $variablesscss .= '$' . $variable . ': ' . $value . ";\n";
    }

    $scss .= $variablesscss;

    if (is_plugin_available('block_remuiblck')) {
        require_once($CFG->dirroot . '/blocks/remuiblck/lib.php');
        if (function_exists('block_remuiblck_get_scss_content')) {
            $scss .= block_remuiblck_get_scss_content();
        }
    }

    return $scss;
}
/**
 * Get theme release information(Version).
 *
 * @return string theme release
 */
function get_theme_release_info() {
    $pluginman = core_plugin_manager::instance();
    $themeinfo = $pluginman->get_plugin_info("theme_remui");
    return $themeinfo->release;
}



/**
 * This function check  plugin is available or not.
 *
 * @return boolean
 */

function is_plugin_available($component) {

    list($type, $name) = core_component::normalize_component($component);

    $dir = \core_component::get_plugin_directory($type, $name);
    if (!file_exists($dir ?? '')) {
        return false;
    }
    return true;
}

/**
 * Process CSS content. This function replace tags and primary colors.
 * @param  string $css   CSS content passed by moodle
 * @param  object $theme Theme object
 * @return string        Processed CSS content
 */
function theme_remui_process_css($css, $theme) {
    global $PAGE, $OUTPUT;
    $outputus = $PAGE->get_renderer('theme_remui', 'core');
    \theme_remui\toolbox::set_core_renderer($outputus);

    // Get the theme font from setting and apply it in CSS.
    if (\theme_remui\toolbox::get_setting('fontselect') === "2") {
        $fontname = ucwords(\theme_remui\toolbox::get_setting('fontname'));
    }
    if (empty($fontname)) {
        $fontname = 'Inter';
    }

    $css = \theme_remui\toolbox::set_font($css, $fontname);

    // Set custom CSS.
    $customcss = \theme_remui\toolbox::get_setting('customcss');
    $css = $css . $customcss;
    return $css;
}
/**
 * This function creates custom field category.
 * @param  string $categoryname  name of the category
 * @return int    Newly created Category id.
 */
function theme_remui_create_customfield_category($categoryname) {
    // Create Custom Fields.
    $handler = \core_customfield\handler::get_handler('core_course', 'course', 0);
    if (!$handler->can_configure()) {
        if (!CLI_SCRIPT) {
            throw new moodle_exception('nopermissionconfigure', 'core_customfield');
        } else {
            \core\session\manager::set_user(get_admin());
        }
    }
    $categoryid = $handler->create_category($categoryname);

    return $categoryid;
}
/**
 * Function to fetch the customfield data.
 * @param  int $courseid  Course ID
 * @return Custom field data.
 */
function get_course_metadata($courseid) {
    $handler = \core_customfield\handler::get_handler('core_course', 'course');

    $datas = $handler->get_instance_data($courseid);

    $metadata = [];
    foreach ($datas as $data) {
        if (empty($data->get_value())) {
            continue;
        }
        $metadata[$data->get_field()->get('shortname')] = $data->get_value();
    }
    return $metadata;
}

/**
 * Function to fetch the customfield data.
 * @param  int $courseid  Course ID
 * @return Custom field data.
 */
function get_all_remui_course_metadata($courseid) {
    $handler = \core_customfield\handler::get_handler('core_course', 'course');

    $datas = $handler->get_instance_data($courseid);

    $remuicustomfieldarray = array();
    foreach ($datas as $data) {
        if (!($data->get_field()->get('type') == 'checkbox') && empty($data->get_value())) {
            continue;
        }
        if ($data->get_field()->get_category()->get('name') == "RemUI Custom Fields") {

            $dataid = $data->get('id');

            $context = $data->get_context();

            $processed = file_rewrite_pluginfile_urls($data->get_value(), 'pluginfile.php', $context->id,
            'customfield_textarea', 'value', $dataid);

            $value = format_text($processed, $data->get('valueformat'), ['context' => $context]);

            if ($data->get_field()->get('type') == 'checkbox') {
                if ($data->get_value()) {
                    $value = get_string('true', 'theme_remui');
                } else {
                    $value = get_string('false', 'theme_remui');
                }
            }

            if ($data->get_field()->get('type') == 'date') {

                $machineformat = '%d %B %Y';
                $value = userdate($data->get_value(), $machineformat, 99, false, false);

            }
            if ($data->get_field()->get('type') == 'select') {
                $options = explode("\n", $data->get_field()->get('configdata')['options']);
                $value = $options[$data->get_value() - 1];
            }
            $remuicustomfieldarray[$data->get_field()->get('shortname')] = array(
                "categoryid" => $data->get_field()->get_category()->get('id'),
                "shortname" => $data->get_field()->get('shortname'),
                "name" => $data->get_field()->get('name'),
                "text" => $value,
            );
        } else {
            continue;
        }
    }
    return $remuicustomfieldarray;
}

/**
 * This function creates custom field.
 * @param  int $categoryid  Category Id, in which new field will be created.
 * @param  string $fieldname name of the Custom Field
 * @param  string $fieldtype Custom Field Type, checkbox|date|select|text|textarea
 * @param  string $options default [] (Optional) Extra data to create the field
 * @return int    Newly created Category id.
 */
function theme_remui_create_custom_field($categoryid, $fieldname, $fieldtype, $options = [], $description = "") {
    try {

        $configdata = get_customfield_data($categoryid, $fieldname, $fieldtype, $options, $description);

        $category = \core_customfield\category_controller::create($categoryid);
        $field = \core_customfield\field_controller::create(0, (object)['type' => $fieldtype], $category);

        $handler = $field->get_handler();

        $fieldid = $handler->save_field_configuration($field, $configdata);
    } catch (Exception $e) {
        error_log($e);
    }
}

function theme_remui_check_customfield_empty_status($customfieldid, $customfield, $shortname) {
    global $DB;
    $customfieldrecords = $DB->get_records('customfield_field', array('shortname' => $shortname), $sort = '', $fields = '*');
    foreach ($customfieldrecords as $customfieldrecord) {
        if (empty($customfieldrecord->description)) {
            $customfieldrecord->description = ' ';
        }
        $DB->update_record('customfield_field', $customfieldrecord, $bulk = false);
    }
}
/**
 * This function creates custom field.
 * @param  int $categoryid  Category Id, in which new field will be created.
 * @param  string $fieldname name of the Custom Field
 * @param  string $fieldtype Custom Field Type, checkbox|date|select|text|textarea
 * @param  string $options default [] (Optional) Extra data to create the field, $key => value
 * @return data  array[] of custom field configuration
 */
function get_customfield_data($categoryid, $fieldname, $fieldtype, $options = [], $description = "" ) {
    $data = new \stdClass;

    $data->name = $fieldname;
    $data->description = $description;  // Add description field.
    $data->descriptionformat = FORMAT_HTML;  // Add description format (typically HTML).

    $replacefor = [' ', '(', ')'];
    $replacewith = ['', '', ''];
    $filteredname = str_replace($replacefor, $replacewith, $fieldname);
    $data->shortname = "edw" . strtolower($filteredname);

    $data->mform_isexpanded_id_header_specificsettings = 1;
    $data->mform_isexpanded_id_course_handler_header = 1;
    $data->categoryid = $categoryid;
    $data->type = $fieldtype;
    $data->id = 0; // This is always zero.

    $configdata = [
        "required" => 0,
        "uniquevalues" => 0,
        "locked" => 0,
        "visibility" => 2,
    ];

    switch ($fieldtype) {
        case 'checkbox':
            $configdata["checkbydefault"] = 0;
            break;
        case 'date':
            $configdata["includetime"] = 0;
            $configdata["mindate"] = 1605158580;
            $configdata["maxdate"] = 1605158580;
            break;
        case 'select':
            $configdata["options"] = "menuitem1";
            $configdata["defaultvalue"] = "menuitem1";
            break;
        case 'text':
            $configdata["defaultvalue"] = "";
            $configdata["displaysize"] = 50;
            $configdata["maxlength"] = 1333;
            $configdata["ispassword"] = 0;
            break;
        case 'textarea':
            $configdata['defaultvalue_editor'] = array();
            break;
        default:
            throw new Exception("No such type of field");
            break;
    }

    foreach ($options as $key => $value) {
        $configdata[$key] = $value;
    }

    $data->configdata = $configdata;
    return $data;
}
/**
 * Get unused item id for file uploading
 *
 * @param  String  $filearea File area of file
 *
 * @return Integer           File item id
 */
function theme_remui_get_unused_itemid($filearea) {
    global $DB, $USER;

    if (isguestuser() || !isloggedin()) {
        // Guests and not-logged-in users can not be allowed to upload anything!!!!!!
        throw new \moodle_exception('noguest');
    }

    $contextid = context_system::instance()->id;

    $fs = get_file_storage();
    $itemid = rand(1, 999999999);
    while ($files = $fs->get_area_files($contextid, 'theme_remui', $filearea, $itemid)) {
        $itemid = rand(1, 999999999);
    }

    return $itemid;
}
/**
 * Get image url of file using itemid, component and filearea
 *
 * @param  Integer $itemid    File item id
 * @param  String  $component File component
 * @param  String  $filearea  File area
 *
 * @return String             File url
 */
function get_file_img_url($itemid, $component, $filearea) {
    $context = \context_system::instance();

    $fs = get_file_storage();
    $files = $fs->get_area_files($context->id, $component, $filearea, $itemid);
    foreach ($files as $file) {
        if ($file->get_filename() != '.') {
            return moodle_url::make_pluginfile_url(
                $file->get_contextid(),
                $file->get_component(),
                $file->get_filearea(),
                $file->get_itemid(),
                $file->get_filepath(),
                $file->get_filename(),
                false)->out();
        }
    }
    return "";
}

/**
 * Import User Tours.
 *
 * @return void
 */
function import_user_tour() {
    global $DB, $CFG;
    $staticcdn = "https://staticcdn.edwiser.org";

    $tours = [
        [
            'name' => 'What\'s New',
            'url' => $staticcdn . '/json/tour/functional_blocks_tour.json'
        ],
    ];

    foreach ($tours as $key => $tour) {
        $record = $DB->get_record('tool_usertours_tours', array('name' => $tour['name']));

        if (isset($tour['delete']) && $tour['delete']) {
            if ($record) {
                $tour = \tool_usertours\tour::instance($record->id);
                $tour->remove();
            }
            continue;
        }
        if (!$record) {
            try {
                $content = @file_get_contents($tour['url']);
                if ($content) {
                    $tour = \tool_usertours\manager::import_tour_from_json($content);
                }
            } catch (Exception $ex) {
                // Skipping the tour updation.
                echo '';
            }
        }
    }
}

/**
 * Fragment for customizer html editor
 *
 * @param  Array $args Argument passed with fragment call
 *
 * @return String      Customizer html editor
 */
function theme_remui_output_fragment_customizer_htmleditor($args) {
    global $CFG;

    $args = (object) $args;

    $id = 'theme_remui_customizer_htmleditor';
    $content = $args->content;

    $editor = editors_get_preferred_editor(FORMAT_HTML);
    $editor->set_text($content);
    $editor->use_editor($id, array('autosave' => false));

    $o = html_writer::start_tag('div', array('class' => 'p-5'));
    $o .= html_writer::tag('textarea', $content, array('id' => $id, 'rows' => 10));
    $o .= html_writer::end_tag('div');

    return $o;
}

/**
 * Get plugin release info.
 *
 * @return stdClass plugin release
 */
function get_theme_req_plugin_release_info($pluginname) {
    $pluginman = core_plugin_manager::instance();
    $plugininfo = $pluginman->get_plugin_info($pluginname);
    return $plugininfo;
}


// Add block move top and move bottom buttons.
function get_block_move_buttons($instanceid) {
    global $OUTPUT;
    $templatecontext = [
        'blockid'       => $instanceid,
        'movebuttons'  => array(
            0 => array(
                'wrapperclass' => 'move-top',
                'title' => 'Move up',
                'iconclass' => 'edw-icon edw-icon-Up'
            ),
            1 => array(
                'wrapperclass' => 'move-bottom',
                'title' => 'Move down',
                'iconclass' => 'edw-icon edw-icon-Down'
            ),
        ),
    ];
    return $OUTPUT->render_from_template('theme_remui/adv_move_buttons', $templatecontext);
}

// Add the customizer button on each block.
function adv_block_customizer_button($instanceid) {
    global $PAGE, $CFG;
    if (!$PAGE->user_is_editing()) {
        return "";
    }
    if (!\theme_remui\utility::check_user_admin_cap()) {
        return "";
    }

    $url = $CFG->wwwroot . "/local/edwiserpagebuilder/editor.php?bui_edit=" . $instanceid;
    $url .= "&returl=". urlencode($PAGE->url);

    // Export button.
    $customizerbutton = "<button class='btn btn-secondary d-flex justify-content-end block_exporter_btn' " .
    "data-blockid='$instanceid'>";
    $customizerbutton .= "<i class='fa fa-pencil'></i> ".get_string("exportblock", "theme_remui")."</a>";
    $customizerbutton .= "</button>";

    // Live customizer button.
    $customizerbutton .= "<div class='d-flex justify-content-end live-customizer-btn'>";
    $customizerbutton .= "<a class='btn btn-primary' href='".$url."'";
    $customizerbutton .= "role='button'>";
    $customizerbutton .= "<i class='fa fa-pencil'></i> ".get_string("livecustomizer", "theme_remui")."</a>";
    $customizerbutton .= "</div>";

    return $customizerbutton;
}

function edw_reposition_block($bi, $newregion, $newweight, $contexid, $pagetype, $subpage) {
    global $DB;
    $newbi = new stdClass;
    $newbi->id = $bi->id;
    $newbi->defaultregion = $newregion;
    $newbi->defaultweight = $newweight;
    $newbi->timemodified = time();
    $DB->update_record('block_instances', $newbi);
    $recordexist = $DB->record_exists('block_positions', array('blockinstanceid' => $bi->id));
    if ($recordexist) {
        $blockpositioninstance = $DB->get_record('block_positions', array('blockinstanceid' => $bi->id));
        $blockpositioninstance->region = $newregion;
        $blockpositioninstance->weight = $newweight;
        $DB->update_record('block_positions', $blockpositioninstance);
    } else {
        $bp = new stdClass();

        $bp->blockinstanceid = $bi->id;
        $bp->contextid = $contexid;
        $bp->pagetype = $pagetype;
        if ($subpage) {
            $bp->subpage = $subpage;
        } else {
            $bp->subpage = '';
        }
        $bp->visible = 1;
        $bp->weight = $newweight;
        $bp->region = $newregion;
        $DB->insert_record('block_positions', $bp);
    }
}

/**
 * Get the current Moodle release version branch.
 *
 * @return string The current Moodle release version branch.
 */
function get_moodle_release_version_branch() {
    global $CFG;
    $branch = $CFG->branch;
    return $branch;
}

/**
 * Checks if the current Moodle release version branch is greater than '402'.
 *
 * @return bool True if the current Moodle release version branch is greater than '402', false otherwise.
 */

function apply_latest_user_pref() {
    $branch = get_moodle_release_version_branch();
    if ($branch > '402') {
        return true;
    }
    return false;
}


/**
 * Get the current user preferences that are available
 *
 * @return array[]
 */
function theme_remui_user_preferences(): array {
    return [
            'drawer-open-nav' => [
                'type' => PARAM_ALPHA,
                'null' => NULL_NOT_ALLOWED,
                'default' => '',
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'drawer-open-index' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'drawer-open-block' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'course_view_state' => [
                'type' => PARAM_ALPHA,
                'null' => NULL_NOT_ALLOWED,
                'default' => '',
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'remui_dismised_announcement' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'edw-quick-menu' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'edwiser_inproduct_notification' => [
                'type' => PARAM_ALPHA,
                'null' => NULL_NOT_ALLOWED,
                'default' => '',
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'enable_focus_mode' => [
                'type' => PARAM_RAW,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'homepagedepricatedseen' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'darkmodecustomizerwarnnotvisible' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'forcefulmigratemodalseen' => [
                    'type' => PARAM_BOOL,
                    'null' => NULL_NOT_ALLOWED,
                    'default' => false,
                    'permissioncallback' => [core_user::class, 'is_current_user'],
                ],
            'homepageavailablemodalseen' => [
                    'type' => PARAM_BOOL,
                    'null' => NULL_NOT_ALLOWED,
                    'default' => false,
                    'permissioncallback' => [core_user::class, 'is_current_user'],
                ],
            'acs-widget-status' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
            'acs-feedback-status' => [
                'type' => PARAM_BOOL,
                'null' => NULL_NOT_ALLOWED,
                'default' => false,
                'permissioncallback' => [core_user::class, 'is_current_user'],
            ],
    ];
}
/**
 * Navigation hook to add to preferences page.
 *
 * @param navigation_node $useraccount
 * @param stdClass $user
 * @param context_user $context
 * @param stdClass $course
 * @param context_course $coursecontext
 */
function theme_remui_extend_navigation_user_settings(navigation_node $useraccount) {
    global $PAGE;

    if (get_config('theme_remui', 'enableaccessibilitytools')  && $PAGE->theme->name == 'remui') {
        if (!get_user_preferences('acs-widget-status')) {
            $text = get_string('disable-aw-for-me', 'theme_remui');
            $url = "#disable_aw";
        } else {
            $text = get_string('enable-aw-for-me', 'theme_remui');
            $url = "#enable_aw";
        }
        $parent = $useraccount->parent->find('useraccount', navigation_node::TYPE_CONTAINER);
        $parent->add($text,
        new moodle_url($url), // URL (keep as '#' if non-clickable).
        navigation_node::TYPE_SETTING,  // Type of navigation item.
        null,
        'custom-preference');
    }

}

