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
 * Trait for edwiser_fetch_blocks_list service
 * @package   local_edwiserpagebuilder
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav Govande
 */

namespace local_edwiserpagebuilder\external;

defined('MOODLE_INTERNAL') || die();

use external_single_structure;
use external_function_parameters;
use external_value;
use context_system;
use stdClass;
use context;
/**
 * Service definition for create new form
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
trait edwiser_fetch_blocks_list {

    /**
     * Returns the functional parameter for fetching the blocks list.
     * @return external_function_parameters  Functional parameters
     */
    public static function edwiser_fetch_blocks_list_parameters() {
        return new external_function_parameters(
            array(
                'edwpageurl' => new external_value( PARAM_RAW, 'Current page url' ),
                'contextid' => new external_value( PARAM_INT, 'current page context'),
                'blockpage' => new external_value( PARAM_RAW, 'blockpagetype')
            )
        );
    }

    /**
     * Return the response structure Fetch the blocks list service.
     * @return external_single_structure return structure
     */
    public static function edwiser_fetch_blocks_list_returns() {
        return new \external_single_structure(
            array(
                'status' => new external_value( PARAM_BOOL, 'Success status - True or False.' ),
                'html' => new external_value( PARAM_RAW, 'Generated HTML for blocks list' ),
                'categoriesDesktophtml' => new external_value( PARAM_RAW, 'Generated HTML for Categories list for desktop' ),
                'categoriesMobHtml' => new external_value( PARAM_RAW, 'Generated HTML for Categories list for Mob' ),
            )
        );
    }

    /**
     * List down the blocks data.
     * @return array  [limitto, blocks[]]
     */
    public static function edwiser_fetch_blocks_list($edwpageurl, $contextid, $blockpage) {
        global $CFG, $OUTPUT, $PAGE;
        $PAGE->set_context(context::instance_by_id($contextid));

        require_once($CFG->dirroot . '/local/edwiserpagebuilder/lib.php');
        local_edwiserpagebuilder_update_block_content();

        preg_match('/bui_blockregion=([^&]+)/', $edwpageurl, $matches);
        if (isset($matches[1])) {
            $buiblockregion = $matches[1];
        }

        $blockslist = [];
        $bm = new \local_edwiserpagebuilder\block_handler();

        // $blocks = $bm->fetch_blocks_list(array("type" => "block")); // Fetching Edwiser Blocks

        // $dynamicblocks = $bm->fetch_blocks_list(array("type" => "dynamic"));

        // $blocks = array_merge($blocks, $dynamicblocks);

        // $pagelayoutblock = $bm->fetch_blocks_list(array("type" => "blocklayout"));

        // $blocks = html_block_rearrange($blocks);

        // $blocks = array_merge($blocks, $pagelayoutblock);

        $context = $bm->get_edwblocks_categories_with_blocks();

        $blockscontext = new \stdClass;

        if ($context["blockscontext"]) {
            foreach ($context["blockscontext"] as $categorykey => $categoryvalue) {
                $data = [
                    "categorytitle" => $categoryvalue["categorytitle"],
                    "categoryvalue" => $categoryvalue["categoryvalue"],
                    "type" => $categoryvalue["type"],
                    "blocks" => isset($categoryvalue["blocks"]) ? array_map(function ($block) use ($edwpageurl, $buiblockregion, $blockpage, $OUTPUT) {
                        $obj = [
                            'id' => $block->id,
                            'url' => $edwpageurl,
                            'name' => 'edwiseradvancedblock',
                            'section' => $block->title,
                            'title' => $block->label,
                            'additionalclass' => "isblock advanceblockblocks",
                            'thumbnail' => str_replace("{{>cdnurl}}", CDNIMAGES, $block->thumbnail),
                            'updateavailable' => (int)$block->updateavailable,
                            'visible' => (int)$block->visible,
                            'blocktype' => check_advblock_type($block->title, $block->type),
                            'addableblock' => true,
                            'blockregion' => $buiblockregion,
                            'blockpagetype' => $blockpage,
                            'blockgroup' => 'advanceblockblocks',
                            'blockinfo' => $block->visible ? block_info_in_addblockmodel($block->title) : false,
                        ];
                        if ($block->updateavailable || !$block->visible) {
                            $obj['hasextrabutton'] = true;
                        }
                        if ($obj['blocktype'] == 'block-page-layout') {
                            $obj['addableblock'] = false;
                        }
                        if (!isset($block->thumbnail)) {
                            $obj['thumbnail'] = $OUTPUT->image_url('default', 'local_edwiserpagebuilder');
                        }
                        if (!isset($block->section) && isset($block->name) && $block->name == "remuiblck") {
                            $obj['section'] = " ";
                            $obj['thumbnail'] = $OUTPUT->image_url('edwiser', 'local_edwiserpagebuilder');
                        }
                        return $obj;
                    }, $categoryvalue["blocks"]) : []
                ];

                // Update the category data in the context
                if ($data["categorytitle"] == 'htmlblock') {
                    $data["blocks"][0]['title'] = "Create custom blocks";
                    $blockscontext->htmlblock = $data;
                    unset($context["blockscontext"][$categorykey]);
                } else {
                    $context["blockscontext"][$categorykey] = $data;
                }
            }

            $blockscontext->blockscontext = array_values($context["blockscontext"]);
        }

        $templatecontext = new \stdClass;
        $templatecontext->blockscontext = $blockscontext->blockscontext;
        $templatecontext->htmlblock = $blockscontext->htmlblock;
        $templatecontext->categories = $context["categoriescontext"];

        $html = $OUTPUT->render_from_template('local_edwiserpagebuilder/edwblock_content', $templatecontext);
        $categoriesDesktophtml = $OUTPUT->render_from_template('local_edwiserpagebuilder/block_category_list_desktop', $templatecontext);
        $categoriesMobHtml = $OUTPUT->render_from_template('local_edwiserpagebuilder/block_category_select_mob', $templatecontext);

        // return $files_list;
        return array(
            'status' => true,
            'html' => $html,
            'categoriesDesktophtml' => $categoriesDesktophtml,
            'categoriesMobHtml' => $categoriesMobHtml,
        );
    }
}
