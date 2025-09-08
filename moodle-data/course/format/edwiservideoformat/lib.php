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
 * This file contains main class for Edwiser Video Format.
 *
 * @package   format_edwiservideoformat
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();
require_once($CFG->dirroot. '/course/format/lib.php');

use core\output\inplace_editable;

/**
 * Main class for the Edwiser Video Format
 *
 * @package   format_edwiservideoformat
 * @copyright 2024 Edwiser
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class format_edwiservideoformat extends core_courseformat\base {

    /**
     * Returns true if this course format uses sections.
     *
     * @return bool
     */
    public function uses_sections() {
        return true;
    }

    /**
     * Returns true if this course format uses indentation.
     *
     * @return bool
     */
    public function uses_indentation(): bool {
        return false;
    }

    /**
     * Returns true if this course format uses course index.
     *
     * @return bool
     */
    public function uses_course_index() {
        return true;
    }

    /**
     * Get the course display value for the current course.
     *
     * FORCED TO SINGLE PAGE - Always displays all sections on one page
     * This overrides the parent method to ensure consistent single-page display.
     *
     * @return int The current value (always COURSE_DISPLAY_SINGLEPAGE)
     */
    public function get_course_display(): int {
        // Force single page display - all sections on one page
        return COURSE_DISPLAY_SINGLEPAGE;
    }

    /**
     * Returns the information about the ajax support in the given source format.
     *
     * The returned object's property (boolean)capable indicates that
     * the course format supports Moodle course ajax features.
     *
     * @return stdClass
     */
    public function supports_ajax() {
        $ajaxsupport = new stdClass();
        $ajaxsupport->capable = true;
        return $ajaxsupport;
    }

    /**
     * Enable the component based content.
     *
     * @return bool
     */
    public function supports_components() {
        return true;
    }

    /**
     * Whether this format allows to delete sections.
     *
     * Do not call this function directly, instead use {@link course_can_delete_section()}
     *
     * @param int|stdClass|section_info $section
     * @return bool
     */
    public function can_delete_section($section) {
        return true;
    }

    /**
     * Indicates whether the course format supports the creation of a news forum.
     *
     * @return bool
     */
    public function supports_news() {
        return true;
    }

    /**
     * Returns the display name of the given section that the course prefers.
     *
     * This method is required for inplace section name editor.
     *
     * @param int|stdClass $section Section object from database or just field section.section
     * @return string Display name that the course format prefers, e.g. "Topic 2"
     */
    public function get_section_name($section) {
        $section = $this->get_section($section);
        if ((string)$section->name !== '') {
            return format_string($section->name, true,
                ['context' => \context_course::instance($this->courseid)]);
        } else {
            return $this->get_default_section_name($section);
        }
    }

    /**
     * Returns the default section name for the format.
     *
     * @param stdClass $section Section object from database or just field section.section
     * @return string The default value for the section name.
     */
    public function get_default_section_name($section) {
        if ($section->section == 0) {
            // Return the general section.
            return get_string('section0name', 'format_edwiservideoformat');
        } else {
            // Use the default section name.
            return get_string('sectionname', 'format_edwiservideoformat') . ' ' . $section->section;
        }
    }

    /**
     * Returns the list of course format options.
     *
     * @param bool $foreditform
     * @return array of options
     */
    public function course_format_options($foreditform = false) {
        static $courseformatoptions = false;

        if ($courseformatoptions === false) {
            $courseconfig = get_config('moodlecourse');
            $courseformatoptions = [
                'hiddensections' => [
                    'default' => $courseconfig->hiddensections,
                    'type' => PARAM_INT,
                ],
                // COURSE DISPLAY SETTING DISABLED - Always shows all sections on one page
                // 'coursedisplay' => [
                //     'default' => $courseconfig->coursedisplay,
                //     'type' => PARAM_INT,
                // ],
                'showcoursedescription' => [
                    'default' => 1,
                    'type' => PARAM_INT,
                ],
                'edwiservideoformat_courseimage_filemanager' => [
                    'default' => false,
                    'type' => PARAM_INT
                ],
                'edw_format_hd_bgpos' => [
                    'default' => "center",
                    'type' => PARAM_RAW
                ],
                'edw_format_hd_bgsize' => [
                    'default' => "cover",
                    'type' => PARAM_RAW
                ],
                'headeroverlayopacity' => [
                    'default' => "100",
                    'type' => PARAM_RAW
                ],
            ];
        }
        if ($foreditform && !isset($courseformatoptions['coursedisplay']['label'])) {
            $courseformatoptionsedit = [
                'hiddensections' => [
                    'label' => get_string('hiddensections'),
                    'help' => 'hiddensections',
                    'help_component' => 'moodle',
                    'element_type' => 'select',
                    'element_attributes' => [
                        [
                            0 => get_string('hiddensectionscollapsed'),
                            1 => get_string('hiddensectionsinvisible')
                        ],
                    ],
                ],
                // COURSE DISPLAY SETTING DISABLED - Always shows all sections on one page
                // 'coursedisplay' => [
                //     'label' => get_string('coursedisplay'),
                //     'element_type' => 'select',
                //     'element_attributes' => [
                //         [
                //             COURSE_DISPLAY_SINGLEPAGE => get_string('coursedisplay_single'),
                //             COURSE_DISPLAY_MULTIPAGE => get_string('coursedisplay_multi'),
                //         ],
                //     ],
                //     'help' => 'coursedisplay',
                //     'help_component' => 'moodle',
                // ],
                'showcoursedescription' => [
                    'label' => get_string('showcoursedescription', 'format_edwiservideoformat'),
                    'help' => 'showcoursedescription',
                    'help_component' => 'format_edwiservideoformat',
                    'element_type' => 'select',
                    'element_attributes' => [
                        [
                            0 => "No",
                            1 => "Yes",
                        ],
                    ],
                ],
                'edwiservideoformat_courseimage_filemanager' => [
                    'label' => get_string('edwiservideoformat_courseimage_filemanager', 'format_edwiservideoformat'),
                    'element_type' => 'filemanager',
                    'element_attributes' => [[], array(
                        'subdirs' => 0,
                        'maxfiles' => 1,
                        'accepted_types' => array('web_image')
                    )],
                    'help' => 'edwiservideoformat_courseimage_filemanager',
                    'help_component' => 'format_edwiservideoformat',
                ],
                'edw_format_hd_bgpos' => [
                    'label' => get_string('edw_format_hd_bgpos', 'format_edwiservideoformat'),
                    'element_type' => 'select',
                    'element_attributes' => [
                        [
                            "bottom" => get_string('bottom', 'format_edwiservideoformat'),
                            "center" => get_string('center', 'format_edwiservideoformat'),
                            "top" => get_string('top', 'format_edwiservideoformat'),
                            "left" => get_string('left', 'format_edwiservideoformat'),
                            "right" => get_string('right', 'format_edwiservideoformat'),
                        ]
                    ],
                    'help' => 'edw_format_hd_bgpos',
                    'help_component' => 'format_edwiservideoformat'
                ],
                'edw_format_hd_bgsize' => [
                    'label' => get_string('edw_format_hd_bgsize', 'format_edwiservideoformat'),
                    'element_type' => 'select',
                    'element_attributes' => [
                        [
                            "contain" => get_string('contain', 'format_edwiservideoformat'),
                            "auto" => get_string('auto', 'format_edwiservideoformat'),
                            "cover" => get_string('cover', 'format_edwiservideoformat'),
                        ]
                    ],
                    'help' => 'edw_format_hd_bgsize',
                    'help_component' => 'format_edwiservideoformat'
                ],
                'headeroverlayopacity' => [
                    'label' => get_string('headeroverlayopacity', 'format_edwiservideoformat'),
                    'element_type' => 'text',
                    'help' => 'headeroverlayopacity',
                    'help_component' => 'format_edwiservideoformat'
                ],
            ];
            $courseformatoptions = array_merge_recursive($courseformatoptions, $courseformatoptionsedit);
        }
        return $courseformatoptions;
    }

    /**
     * DB value setter for edwiservideoformat_courseimage_filemanager option
     * @param boolean $itemid Image itemid
     */
    public function set_edwiservideoformat_courseimage_filemanager($itemid = false) {
        global $DB;
        $courseimage = $DB->get_record('course_format_options', array(
            'courseid' => $this->courseid,
            'format' => 'edwiservideoformat',
            'sectionid' => 0,
            'name' => 'edwiservideoformat_courseimage_filemanager'
        ));
        if ($courseimage == false) {
            $courseimage = (object) array(
                'courseid' => $this->courseid,
                'format' => 'edwiservideoformat',
                'sectionid' => 0,
                'name' => 'edwiservideoformat_courseimage_filemanager'
            );
            $courseimage->id = $DB->insert_record('course_format_options', $courseimage);
        }
        $courseimage->value = $itemid;
        $DB->update_record('course_format_options', $courseimage);
        return true;
    }

    /**
     * DB value getter for edwiservideoformat_courseimage_filemanager option
     * @return int Item id
     */
    public function get_edwiservideoformat_courseimage_filemanager() {
        global $DB;
        $itemid = $DB->get_field('course_format_options', 'value', array(
            'courseid' => $this->courseid,
            'format' => 'edwiservideoformat',
            'sectionid' => 0,
            'name' => 'edwiservideoformat_courseimage_filemanager'
        ));
        if (!$itemid) {
            $itemid = file_get_unused_draft_itemid();
        }
        return $itemid;
    }

    /**
     * Adds format options elements to the course/section edit form.
     *
     * @param MoodleQuickForm $mform form the elements are added to.
     * @param bool $forsection 'true' if this is a section edit form, 'false' if this is course edit form.
     * @return array array of references to the added form elements.
     */
    public function create_edit_form_elements(&$mform, $forsection = false) {
        global $COURSE, $USER, $OUTPUT;

        $elements = parent::create_edit_form_elements($mform, $forsection);

        if (!$forsection && (empty($COURSE->id) || $COURSE->id == SITEID)) {
            // Add "numsections" element to the create course form - it will force new course to be prepopulated
            // with empty sections.
            // The "Number of sections" option is no longer available when editing course, instead teachers should
            // delete and add sections when needed.
            $courseconfig = get_config('moodlecourse');
            $max = (int)$courseconfig->maxsections;
            $element = $mform->addElement('select', 'numsections', get_string('numberweeks'), range(0, $max ?: 52));
            $mform->setType('numsections', PARAM_INT);
            if (is_null($mform->getElementValue('numsections'))) {
                $mform->setDefault('numsections', $courseconfig->numsections);
            }
            array_unshift($elements, $element);
        }

        // Handle file manager for course image
        if (!$forsection) {
            $fs = get_file_storage();
            // Check if course exists before creating context
            if ($this->courseid && $this->courseid != SITEID) {
                $coursecontext = context_course::instance($this->courseid);
            } else {
                // For new course creation or site course, use system context
                $coursecontext = context_system::instance();
            }
            $usercontext = context_user::instance($USER->id);

            $data = new stdClass;
            $fileitemid = $this->get_edwiservideoformat_courseimage_filemanager();
            $fs->delete_area_files($usercontext->id, 'user', 'draft', $fileitemid);
            $data = file_prepare_standard_filemanager(
                $data,
                'edwiservideoformat_courseimage',
                array('accepted_types' => 'images', 'maxfiles' => 1),
                $coursecontext,
                'format_edwiservideoformat',
                'edwiservideoformat_courseimage_filearea',
                $fileitemid
            );
            $mform->setDefault('edwiservideoformat_courseimage_filemanager', $data->edwiservideoformat_courseimage_filemanager);
            foreach ($elements as $key => $element) {
                if ($element->getName() == 'edwiservideoformat_courseimage_filemanager') {
                    $element->setMaxfiles(1);
                }
            }
        }

        return $elements;
    }

    /**
     * Updates format options for a course.
     *
     * @param stdClass|array $data return value from {@link moodleform::get_data()} or array with data
     * @param stdClass $oldcourse if this function is called from {@link update_course()}
     *     this object contains information about the course before update
     * @return bool whether there were any changes to the options values
     */
    public function update_course_format_options($data, $oldcourse = null) {
        $data = (array)$data;
        if ($oldcourse !== null) {
            $oldcourse = (array)$oldcourse;
            $options = $this->course_format_options();
            foreach ($options as $key => $unused) {
                if (!array_key_exists($key, $data)) {
                    if (array_key_exists($key, $oldcourse)) {
                        $data[$key] = $oldcourse[$key];
                    }
                }
            }
        }

        // Handle file manager for course image
        if (!isset($data['edwiservideoformat_courseimage_filemanager'])) {
            $data['edwiservideoformat_courseimage_filemanager'] = '';
        }
        if (!empty($data)) {
            // Check if course exists before creating context
            if ($this->courseid && $this->courseid != SITEID) {
                $contextid = context_course::instance($this->courseid);
            } else {
                // For new course creation or site course, use system context
                $contextid = context_system::instance();
            }
            if (!empty($data['edwiservideoformat_courseimage_filemanager'])) {
                // Convert array to stdClass for file_postupdate_standard_filemanager
                $filedata = new stdClass();
                $filedata->edwiservideoformat_courseimage_filemanager = $data['edwiservideoformat_courseimage_filemanager'];

                file_postupdate_standard_filemanager(
                    $filedata,
                    'edwiservideoformat_courseimage',
                    array('accepted_types' => 'images', 'maxfiles' => 1),
                    $contextid,
                    'format_edwiservideoformat',
                    'edwiservideoformat_courseimage_filearea',
                    $data['edwiservideoformat_courseimage_filemanager']
                );
            }
            $this->set_edwiservideoformat_courseimage_filemanager($data['edwiservideoformat_courseimage_filemanager']);
        }

        return $this->update_format_options($data);
    }

    /**
     * The URL to use for the specified course (with section)
     * @param int|stdClass $section Section object from database or just field course_sections.section
     *     if omitted the course view page is returned
     * @param array $options options for view URL. At the moment core uses:
     *     'navigation' (bool) if true and section has no separate page, the function returns null
     *     'sr' (int) used by multipage formats to specify to which section to return
     * @return null|moodle_url
     */
    public function get_view_url($section, $options = array()) {
        $course = $this->get_course();
        $url = new moodle_url('/course/view.php', array('id' => $course->id));

        $sr = null;
        if (array_key_exists('sr', $options)) {
            $sr = $options['sr'];
        }
        if (is_object($section)) {
            $sectionno = $section->section;
        } else {
            $sectionno = $section;
        }
        if ($sectionno !== null) {
            // Force single page display - always use anchor links
            if ($sectionno != 0) {
                $url->set_anchor('section-'.$sectionno);
            }
        }

        // Force single page display - no separate section pages
        // Navigation always goes to the main course page with anchor
        return $url;
    }

    /**
     * Set the section number for the current format instance.
     * Version-compatible method to handle deprecation gracefully.
     *
     * @param int|null $sectionnum null for all sections or a sectionid.
     */
    public function set_section_number(int $sectionnum): void {
        global $CFG;
        if ((int)$CFG->branch >= 404) {
            parent::set_sectionnum($sectionnum);
        } else {
            parent::set_section_number($sectionnum);
        }
    }

    /**
     * Get the current section number.
     * Version-compatible method to handle deprecation gracefully.
     *
     * @return int zero for all sections or the section number
     */
    public function get_section_number(): int {
        global $CFG;
        if ((int)$CFG->branch >= 404) {
            return (int)parent::get_sectionnum();
        } else {
            return parent::get_section_number();
        }
    }

    /**
     * Return the plugin configs for external functions.
     *
     * @return array the list of configuration settings
     */
    public function get_config_for_external() {
        return $this->get_format_options();
    }
}

/**
 * Implements callback inplace_editable() allowing to edit values in-place.
 *
 * @param string $itemtype
 * @param int $itemid
 * @param mixed $newvalue
 * @return inplace_editable
 */
function format_edwiservideoformat_inplace_editable($itemtype, $itemid, $newvalue) {
    global $DB, $CFG;
    require_once($CFG->dirroot . '/course/lib.php');
    if ($itemtype === 'sectionname' || $itemtype === 'sectionnamenl') {
        $section = $DB->get_record_sql(
            'SELECT s.* FROM {course_sections} s JOIN {course} c ON s.course = c.id WHERE s.id = ? AND c.format = ?',
            [$itemid, 'edwiservideoformat'], MUST_EXIST);
        return course_get_format($section->course)->inplace_editable_update_section_name($section, $itemtype, $newvalue);
    }
}

/**
 * Serves file from edwiservideoformat_courseimage_filearea
 *
 * @param mixed $course course or id of the course
 * @param mixed $cm course module or id of the course module
 * @param context $context
 * @param string $filearea
 * @param array $args
 * @param bool $forcedownload
 * @param array $options additional options affecting the file serving
 * @return bool false if file not found, does not return if found - just send the file
 */
function format_edwiservideoformat_pluginfile($course, $cm, $context, $filearea, $args, $forcedownload, array $options = array()) {
    global $DB;
    if ($context->contextlevel != CONTEXT_COURSE) {
        return false;
    }
    require_login();
    if ($filearea != 'edwiservideoformat_courseimage_filearea') {
        return false;
    }

    $itemid = (int)array_shift($args);
    $fs = get_file_storage();
    $filename = array_pop($args);

    if (empty($args)) {
        $filepath = '/';
    } else {
        $filepath = '/'.implode('/', $args).'/';
    }
    $file = $fs->get_file($context->id, 'format_edwiservideoformat', $filearea, $itemid, $filepath, $filename);
    if (!$file) {
        return false;
    }
    send_stored_file($file, 0, 0, 0, $options);
}

function evf_is_plugin_available($component) {

    list($type, $name) = \core_component::normalize_component($component);

    $dir = \core_component::get_plugin_directory($type, $name);
    if (!file_exists($dir ?? '')) {
        return false;
    }
    return true;
}
function format_edwiservideoformat_user_preferences(): array {
    return [
        'typeformcollected' => [
            'type' => PARAM_BOOL,
            'null' => NULL_NOT_ALLOWED,
            'default' => false,
            'permissioncallback' => [core_user::class, 'is_current_user'],
        ]
    ];
}
