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
 * Edwiser Importer plugin
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 */

require_once('../../../config.php');
require_once('../lib.php');

require_admin();
$PAGE->set_context(context_system::instance());
$data = required_param('data', PARAM_URL);
$PAGE->set_url(new moodle_url('/local/edwiserpagebuilder/homepageimporter/homepage.php', array('data' => $data)));
$PAGE->set_pagelayout('admin');
echo $OUTPUT->header();


$blockname = 'edwiseradvancedblock';
$defaultregion = 'full-width-top';
$pagetypepattern = 'site-index';
$blockinstancetable = 'block_instances';
$msg = get_string('homepagemigrationdesc', 'local_edwiserpagebuilder');
// Getting all sections.
set_config('homepagemigrationstatus', false, "local_edwiserpagebuilder");
if ($data == "migrate") {
    global $DB;

    try {
	$DB->delete_records('block_instances', array("pagetypepattern" => $pagetypepattern, "defaultregion" => $defaultregion));
        $sections = $DB->get_records('remuihomepage_sections', array('visible' => 1));
        $blockinstances = [];
        $blockseq = 0;
        $sectionempty = empty($sections);  // add this check for the below code
        if (!$sectionempty) {
            foreach ($sections as $section) {
                $blockseq = $blockseq + 1;
                $sectionconfightml = new \stdClass();
                if ($section->configdata == '') {
                    continue;
                }
                if (!empty(json_decode($section->configdata))) {
                    $sectionconfightml = json_decode($section->configdata);
                }
                $sectionconfightml->id = $section->id;
                $sectionconfightml->sectionname = $section->name;
                $sectionconfightml->sectionpropertiesoutput = str_replace('invisible', '', $sectionconfightml->sectionpropertiesoutput);
                if ($section->name == 'html') {
                    $sectionconfightml = html_data($sectionconfightml);
                    $blockinstances[] = [
                    "blockseq" => $blockseq,
                    "blockid" => $sectionconfightml->id,
                    "blockname" => $sectionconfightml->sectionname,
                    "blockstyles" => '',
                    "blockhtml" => '<div class = "home-sections overflow-hidden">'.$OUTPUT->render_from_template('local_remuihomepage/html', $sectionconfightml).'</div>'
                    ];
                } else {
                    if ($section->name == "courses") {
                        $blockinstances[] = [
                        "blockseq" => $blockseq,
                        "blockid" => $sectionconfightml->id,
                        "blockname" => $sectionconfightml->sectionname,
                        "blockstyles" => '',
                        'checkforbuilder' => false,
                        "blockhtml" => course_block($sectionconfightml, $section)
                        ];
                    } else {
                        if ($sectionconfightml->sectionname == "slider") {
                            if ($sectionconfightml->slides > 1) {
                                $sectionconfightml->hasnextprev = true;
                            }
                        }

                        $blockinstances[] = [
                        "blockseq" => $blockseq,
                        "blockid" => $sectionconfightml->id,
                        "blockname" => $sectionconfightml->sectionname,
                        "blockstyles" => '',
                        'checkforbuilder' => false,
                        "blockhtml" => '<div class = "home-sections overflow-hidden">'.$OUTPUT->render_from_template('local_remuihomepage/'.$section->name, $sectionconfightml).'</div>'
                        ];
                    }

                }

            }

            foreach ($blockinstances as $homeblockinstance) {
                $page = new moodle_page();
                $page->set_context(context_system::instance());
                $page->blocks->add_region('full-width-top');
                $page->blocks->add_block($blockname, $defaultregion, $homeblockinstance["blockseq"], false, $pagetypepattern, null);
                $blockrecord = $DB->get_record($blockinstancetable, array("blockname" => $blockname, "pagetypepattern" => $pagetypepattern, "defaultregion" => $defaultregion, "defaultweight" => $homeblockinstance["blockseq"]), '*');
                $homeblockinstance["blockhtml"] = preg_replace('/\sonload\s*=\s*["\'][^"\']*["\']/', '',  $homeblockinstance["blockhtml"]);
                $dataobj = new stdClass();
                $dataobj->html = [
                "text" => $homeblockinstance["blockhtml"],
                "format" => 1
                ];

                $dataobj->css = [
                "text" => section_css($homeblockinstance['blockname']),
                "format" => 1
                ];

                $dataobj->js = [
                "text" => '',
                "format" => 1
                ];
                try {
                    $instance = block_instance($blockrecord->blockname, $blockrecord);
                    $instance->instance_config_save($dataobj, false);
                } catch (Exception $e) {
                    echo("something went wrong try again");
                }
            }
            set_config('homepagemigrationstatus', true, "local_edwiserpagebuilder");
            set_config('frontpagechooser', 3, 'theme_remui');

            echo ("<div class='text-center'>
                    <img src='" . $CFG->wwwroot . "/local/edwiserpagebuilder/pix/success_icon.svg' />
                    <h4 style='margin: 16px 0;'>" .get_string('homepagemigrationtitlemsg', 'local_edwiserpagebuilder'). "</h4>
                </div>");
            echo "<div class='mt-1 text-center'><a class='btn btn-primary btn-sm' href='" . $CFG->wwwroot . "?redirect=0'>" .get_string('viewhomepage', 'local_edwiserpagebuilder'). "</a></div>";

            
        } else {
            echo('<div class="alert alert-info" role="alert">'
                    .get_string('homepagemigrationnoblockmsg', 'local_edwiserpagebuilder').
                '</div>');
        }

    } catch (Exception $e) {
        echo ("<div class='text-center'>
                    <img src='" . $CFG->wwwroot . "/local/edwiserpagebuilder/pix/failer_icon.svg' />
                    <h4 style='margin: 16px 0;'>" .get_string('homepagemigrationfailtitlemsg', 'local_edwiserpagebuilder'). "</h4>
                </div>");
            echo "<div class='mt-1 text-center'><a class='btn btn-primary btn-sm' href='" . $CFG->wwwroot . "/local/edwiserpagebuilder/homepageimporter/homepage.php?data=migrate'>" .get_string('tryagain', 'local_edwiserpagebuilder'). "</a></div>";
    }
} else if ($data != "migrate") {
    echo('<div class="alert alert-danger" role="alert">
              This action is not allowed
         </div>');
} else {
    echo('<div class="alert alert-info" role="alert">
            Something went wrong try again
         </div>');
}
// else if (get_config("local_edwiserpagebuilder", 'homepagemigrationstatus')) {
// echo("homepage is already migrated");
// }
echo $OUTPUT->footer();
