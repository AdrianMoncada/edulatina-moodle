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
 * @package   local_edwiserpagebuilder
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav Govande
 */

namespace local_edwiserpagebuilder;

// @codingStandardsIgnoreLine
require_once($CFG->dirroot. '/config.php');

use context_system;
use moodle_url;

class custom_page_handler
{
    // Private members.
    private $pagetable = "edw_pages";
    private $publishtable = "edw_pages";
    private $drafttable = "edw_pages_draft";
    private $blockinstancetable = 'block_instances';

    public $page = null;

    public function __construct($type = 'draft', $pageid = 0) {
        $this->page = new \local_edwiserpagebuilder\page_model();
        if ($pageid !== 0) {
            $this->page->register_page($type, $pageid);
        }
    }

    /**
     * Fetch all created pages.
     *
     * @return list of pages
     */
    public function fetch_list_of_pages() {
        global $DB;

        $pages = $DB->get_records($this->drafttable, array('deleted' => 0));

        return $pages;
    }

    /**
     * Create New Entry in draft table only.
     *
     * @param [type] $config
     * @return void
     */
    public function action_add_new_page($config) {

        $pagedata = json_decode($config);

        $pm = new \local_edwiserpagebuilder\page_model();

        $pm->pagetable = $pm->get_drafttable();

        foreach ($pagedata as $key => $value) {
            $functionname = "set_" . $key;
            $pm->$functionname($value);
        }

        $pageid = $pm->create_page_record();

        // Setting config as no layout is set.
        set_config("show-layout-".$pageid, true, "local_edwiserpagebuilder");

        return $pageid;
    }

    /**
     * Create new page along with adding layouts in it.
     *
     * @param [type] $config
     * @return void
     */
    public function action_add_new_page_with_layoutid($config) {
        $config = json_decode($config);
        $pageconfig = array(
            'pagename' => $config->title
        );

        $pageid = $this->action_add_new_page(json_encode($pageconfig));

        $config->pageid = $pageid;

        // Setting config as no layout is set.
        unset_config("show-layout-".$pageid, "local_edwiserpagebuilder");
        $this->action_edw_publish_page_on_pageid(json_encode($config));

        return $pageid;
    }

    /**
     * Adding layouts in exisiting page.
     *
     * @param [type] $config
     * @return void
     */
    public function action_add_layout_on_exisiting_page($config) {
        $config = json_decode($config);

        $pageid = $config->pageid;

        // Setting config as no layout is set.
        unset_config("show-layout-".$pageid, "local_edwiserpagebuilder");
        $this->action_edw_publish_page_on_pageid(json_encode($config));

        return $pageid;
    }


    /**
     * Publsh block on a  new page.
     * @param [type] $config
     * @return void
     */
    public function action_edw_publish_page_on_pageid($config) {

        $config = json_decode($config);
        $pageid = $config->pageid;
        $pm = new \local_edwiserpagebuilder\page_model();

        // Creating table constraints to get desired blockdata from DB.
        $layoutconfig = array(
            'id' => $config->layoutid
        );

        if (empty($pageid)) {
            print_error('blankpageid: '. get_string('accesserror', "local_edwiserpagebuilder"), 'pageid must have some value');
        }
        if ($config->layoutid == 0) {
            // Creating table constraints to get desired blockdata from DB.
            $layoutconfig = array(
                'title' => 'defaultheader'
            );

            $page = new \moodle_page();
            $page->set_context(context_system::instance());

            $birecords = array(
                'blockname' => 'edwiseradvancedblock',
                'parentcontextid' => $page->context->id,
                "pagetypepattern" => $pm->draftpagetype,
                "subpagepattern" => $pageid,
                "defaultregion" => $this->set_page_region($pageid),
                "defaultweight" => 1
            );

            $blockobject = new \stdClass();
            // Creating block object.
            $blockobject->blockname = $birecords['blockname'];
            $blockobject->parentcontextid = $birecords['parentcontextid'];
            $blockobject->pagetypepattern = $birecords['pagetypepattern'];
            $blockobject->subpagepattern = $birecords['subpagepattern'];
            $blockobject->defaultregion = $birecords['defaultregion'];
            $blockobject->defaultweight = $birecords['defaultweight'];

            $this->edw_action_add_block_on_page(array($blockobject), $pm->draftpagetype, $pageid);

            // Fetch newly added block.
            $addedblockrecord = $pm->get_block_record($birecords);

            $layoutblocksdata = $pm->get_layout_block_content($layoutconfig);

            // Structere the data for the advanced block config fields.
            $dataobj = $this->generate_advanced_block_data_object(json_decode($layoutblocksdata->content));

            $this->update_block_instance_content($dataobj, $addedblockrecord);

        } else {
            $layoutblocksdata = $pm->get_layout_block_content($layoutconfig);

            $this->add_layout_blocks($layoutblocksdata, $pm->draftpagetype, $pageid);
        }

        return $pageid;
    }

    /**
     * Add and pushish a new page.
     * @param [type] $config
     * @return void
     */
    public function action_add_n_publish_page($config) {

        $pagedata = json_decode($config);

        $pm = new \local_edwiserpagebuilder\page_model();

        foreach ($pagedata as $key => $value) {
            $functionname = "set_" . $key;
            $pm->$functionname($value);
        }

        // Creating Draft page.
        $pm->pagetable = $pm->get_drafttable();

        $draftid = $pm->create_page_record();

        // Creating Published page with reference to Draft page id.
        $pm->set_refid($draftid);

        $pm->pagetable = $pm->get_publishtable();

        $publishid = $pm->create_page_record();

        // Updating draft page with Publish page id as refid.
        $pm->pagetable = $pm->get_drafttable();

        $pm->set_id($draftid);

        $pm->set_refid($publishid);

        $pm->update_page_record();

        // Returning Draft page id.
        return $draftid;
    }

    /**
     * Delete page.
     *
     * @param [array] $config = ("id" => <draftid>)
     * @return void
     */
    public function action_delete_page($config) {
        $pagedata = json_decode($config);

        $pm = new \local_edwiserpagebuilder\page_model();

        foreach ($pagedata as $key => $value) {
            $functionname = "set_" . $key;
            $pm->$functionname($value);
        }

        $pm->register_page('draft', $pm->get_id());

        $pm->set_deleted(1);

        $pm->update_page_record();
        // To remove DB record completely -> $pm->delete_page_record();.

        // $pm->remove_block_instances();
        $this->edw_action_delete_page_blocks($this->page->draftpagetype, $pm->get_id());

        if ($pm->get_refid() != -1) {

            $pm->register_page('publish', $pm->get_refid());

            $pm->set_deleted(1);

            $pm->update_page_record();
            // To remove DB record completely -> $pm->delete_page_record();.

            // $pm->remove_block_instances();
            $this->edw_action_delete_page_blocks($this->page->publishpagetype, $pm->get_id());
        }
    }

    /**
     * Update page details to draft table.
     *
     * @param [array] $config (Array object key value pair)
     * @return void
     */
    public function action_update_page($config) {
        $pagedata = json_decode($config);

        $pm = new \local_edwiserpagebuilder\page_model();

        $pm->register_page('draft', $pagedata->id);

        $pagedata->refid = $pm->get_refid();

        foreach ($pagedata as $key => $value) {
            $functionname = "set_" . $key;
            $pm->$functionname($value);
        }

        $pm->pagetable = $pm->get_drafttable();

        return $pm->update_page_record();
    }


    /**
     * Publish draft page.
     *
     * @param [array] $config = ("id" => <draftid>)
     * @return void
     */
    public function action_publish_page($config) {
        $pagedata = json_decode($config);

        $pm = new \local_edwiserpagebuilder\page_model();

        $pm->register_page('draft', $pagedata->id);

        $pm->pagetable = $pm->get_publishtable();

        if ($pm->get_refid() == -1) {
            // Publish fresh page.
            $pm->set_id(0);

            $pm->set_refid($pagedata->id);

            $publishid = $pm->create_page_record();

            // Updating draft page with Publish page id as refid.
            $pm->pagetable = $pm->get_drafttable();

            $pm->set_id($pagedata->id);

            $pm->set_refid($publishid);

            $pm->update_page_record();

        } else {
            // Update existing published page.
            $pm->set_id($pm->get_refid());

            $pm->set_refid($pagedata->id);

            $publishid = $pm->get_id();

            $pm->update_page_record();
        }

        return $publishid;
    }

    /**
     * Publish page and publish all the block layouts.
     *
     * @param [type] $config
     * @return [int] $publishid
     */
    public function action_publish_page_with_layouts($config) {
        $pagedata = json_decode($config);

        $publishid = $this->action_publish_page($config);

        $this->edw_action_publish_page_blocks(
            $this->page->draftpagetype,
            $this->page->publishpagetype,
            $pagedata->id,
            $publishid
        );

        return $publishid;

    }

    /**
     * Update page details in draft and publish it.
     *
     * @param [array] $config (Array object key value pair)
     * @return void
     */
    public function action_update_n_publish_page($config) {
        $pagedata = json_decode($config);

        $pm = new \local_edwiserpagebuilder\page_model();

        $pm->register_page("draft", $pagedata->id);

        foreach ($pagedata as $key => $value) {
            $functionname = "set_" . $key;
            $pm->$functionname($value);
        }

        // Updating Draft page.
        $pm->pagetable = $pm->get_drafttable();

        $pm->update_page_record();

        if ($pm->get_refid() != -1) {
            $pm->register_page("publish", $pm->get_refid());

            unset($pagedata->id);

            foreach ($pagedata as $key => $value) {
                $functionname = "set_" . $key;
                $pm->$functionname($value);
            }

            $pm->pagetable = $pm->get_publishtable();

            $publishid = $pm->get_refid();

            $pm->update_page_record();
        }
        if ($pm->get_refid() == -1) {
            // Creating Published page with reference to Draft page id.
            $pm->set_refid($pagedata->id);

            $draftid = $pagedata->id; // Store pageid before loosing it.
            unset($pagedata->id);

            foreach ($pagedata as $key => $value) {
                $functionname = "set_" . $key;
                $pm->$functionname($value);
            }

            $pm->pagetable = $pm->get_publishtable();

            $publishid = $pm->create_page_record();

            // Update draft page again.
            $pm->register_page("draft", $draftid);

            $pm->set_refid($publishid);

            $pm->update_page_record();
        }

        return $publishid;
    }

    /**
     * Replicate existing page.
     *
     * @param [array] $config = ("id" => <draftid>)
     * @return [int] pageid
     */
    public function action_replicate_page($config) {
        $pagedata = json_decode($config);

        $pm = new \local_edwiserpagebuilder\page_model();

        foreach ($pagedata as $key => $value) {
            $functionname = "set_" . $key;
            $pm->$functionname($value);
        }

        $pm->register_page('draft', $pm->get_id());

        $pm->set_id(0);

        $pm->set_pagename($pm->get_pagename(). "_copy");

        $pm->set_refid(-1);

        return  $pm->create_page_record();

    }

    /**
     * Replicate existing page and copy all the blocks.
     *
     * @param [array] $config = ("id" => <draftid>)
     * @return [int] pageid
     */
    public function action_replicate_page_with_layouts($config) {

        $replica = $this->action_replicate_page($config);

        $pagedata = json_decode($config);

        // Add blocks on the replicated draft page.
        $this->edw_action_publish_page_blocks(
            $this->page->draftpagetype,
            $this->page->draftpagetype,
            $pagedata->id,
            $replica
        );

        return $replica;
    }


    public function action_sitepage_table_content($config) {
        $pagesarray = array_reverse(array_values($this->fetch_list_of_pages()));

        $pagesarray = array_reverse(array_map(function($page) {
            $page->pagename = format_text($page->pagename, FORMAT_HTML);
            return $page;
        }, $pagesarray));

        return $pagesarray;
    }

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
     * Fetch blocks avaiable on page
     */
    public function edw_action_fetch_page_blocks($pagetype, $subpagetype) {
        global $DB;

        $pm = new \local_edwiserpagebuilder\page_model();

        $blockconstraints = array(
            "pagetypepattern" => $pagetype,
             "subpagepattern" => $subpagetype
        );

        $blockrecord = $pm->get_block_records($blockconstraints);
        return $blockrecord;
    }

    /**
     * Add blocks on page
     */
    public function edw_action_add_block_on_page($blocks, $pagetype, $subpagetype) {
        global $DB;

        $page = new \moodle_page();
        $page->set_context(context_system::instance());

        $pm = new \local_edwiserpagebuilder\page_model();

        foreach ($blocks as $block) {
            $page->blocks->add_region($block->defaultregion, false);
            $page->blocks->add_block(
                $block->blockname,
                $block->defaultregion,
                $block->defaultweight,
                false,
                $pagetype,
                $subpagetype
            );

            $blockconstraints = array(
                "blockname" => $block->blockname,
                "pagetypepattern" => $pagetype,
                "subpagepattern" => $subpagetype,
                "defaultregion" => $block->defaultregion,
                "defaultweight" => $block->defaultweight
            );

            // Fetch newly added block.
            $addedblockrecord = $pm->get_block_record($blockconstraints);

            // Updating block content.
            $addedblockrecord->configdata = $block->configdata;
            $pm->update_block_record($addedblockrecord);
        }
    }

    /**
     * Delete block instance on the page
     */
    public function edw_action_delete_page_blocks($pagetype, $subpagetype) {
        $blocks = $this->edw_action_fetch_page_blocks($pagetype, $subpagetype);
        foreach ($blocks as $block) {
            blocks_delete_instance($block);
        }
    }

    /**
     * It will fetch blocks from the draftpage and publish it on publish page.
     */
    public function edw_action_publish_page_blocks(
        $draftpagetype,
        $publishpagetype,
        $draftsubpagetype,
        $publishsubpagetype
    ) {
        // Delete the old blocks on published page.
        $this->edw_action_delete_page_blocks($publishpagetype, $publishsubpagetype);

        // Fetch blocks from the draft page.
        $blocks = $this->edw_action_fetch_page_blocks($draftpagetype, $draftsubpagetype);

        // Add fetch  blocks from the draft page to the publish page.
        $this->edw_action_add_block_on_page($blocks, $publishpagetype, $publishsubpagetype);
    }

    /**
     * add the layout blocks
     */
    public function add_layout_blocks($layoutblocksdata , $pagetype, $subpagetypepattern) {
        global $DB;
        $count = 0;
        $region = $this->set_page_region($subpagetypepattern);
        $blockname = 'edwiseradvancedblock';

        // Moodle blank page object.
        $page = new \moodle_page();
        $page->set_context(\context_system::instance());
        $block = $layoutblocksdata;

        // Creating page modal object.
        $pm = new \local_edwiserpagebuilder\page_model();
        $blockcontent = json_decode($block->content);
        foreach ($blockcontent as $content) {

            // Counter will be used as a block weight.
            $count  = $count + 1;

            // Add regions on the page.
            $page->blocks->add_region($region);

            // Array used in getting unique DB record.
            $blockconstraints = array(
                "blockname" => $blockname,
                "parentcontextid" => $page->context->id,
                "pagetypepattern" => $pagetype,
                "subpagepattern" => $subpagetypepattern,
                "defaultregion" => $region,
                "defaultweight" => $count
            );
            if (property_exists($content, 'contenttype')) {
                if ($content->contenttype == 'moodleblock' && property_exists($content, 'blockname')) {

                    // Add block on the page.
                    $page->blocks->add_block($content->blockname, $region, $count, false, $pagetype, $subpagetypepattern);
                }
                if ($content->contenttype == 'advancedblock') {

                    // Add block on the page.
                    $page->blocks->add_block($blockname, $region, $count, false, $pagetype, $subpagetypepattern);

                    $layoutblockconstraints = array(
                        "title" => $content->blockname
                    );

                    $advancedblock = $pm->get_layout_block_content($layoutblockconstraints);

                    $advancedblockcontent = json_decode($advancedblock->content);

                    // Structere the data for the advanced block config fields.
                    $dataobj = $this->generate_advanced_block_data_object($advancedblockcontent);

                    // It will give the recentaly added block.
                    $blockrecord = $pm->get_block_record($blockconstraints);
                    $this->update_block_instance_content($dataobj, $blockrecord);
                }
            } else {
                // Add block on the page.
                $page->blocks->add_block($blockname, $region, $count, false, $pagetype, $subpagetypepattern);

                // It will give the recentaly added block data.
                $blockrecord = $pm->get_block_record($blockconstraints);

                 // Structere the data for the advanced block config fields.
                $dataobj = $this->generate_advanced_block_data_object($content);

                $this->update_block_instance_content($dataobj, $blockrecord);
            }
        }
    }

    /**
     * structre html css and js for the block instance
     */
    public function generate_advanced_block_data_object($advancedblockcontent) {
        $dataobj = new \stdClass();
        $dataobj->html = [
        "text" => $advancedblockcontent->html,
        "format" => 1
        ];

        $dataobj->css = [
        "text" => $advancedblockcontent->css,
        "format" => 1
        ];

        $dataobj->js = [
        "text" => $advancedblockcontent->js,
        "format" => 1
        ];
        return $dataobj;
    }

    /**
     * Update block config in block instance table
     */
    public function update_block_instance_content($dataobj, $blockrecord) {
        try {
            $instance = block_instance($blockrecord->blockname, $blockrecord);
            $instance->instance_config_save($dataobj, false);
        } catch (\Exception $e) {
            echo("something went wrong try again");
        }

        return $instance;
    }

    /**
     * Set config - core set_config function call
     *
     * @param [type] $config => array(name, value, plugin="")
     * @return boolean
     */
    // public function action_set_config($config) {
    //     $config = json_decode($config);

    //     if ($config->plugin != "") {
    //         set_config($config->name, $config->value, $config->plugin);
    //     }

    //     if ($config->plugin == "") {
    //         set_config($config->name, $config->value);
    //     }

    //     return true;
    // }

    /**
     * Unset config - core unset_config function call
     *
     * @param [type] $config => array(name, plugin="")
     * @return boolean
     */
    // public function action_unset_config($config) {
    //     $config = json_decode($config);

    //     if ($config->plugin != "") {
    //         unset_config($config->name, $config->plugin);
    //     }

    //     if ($config->plugin == "") {
    //         unset_config($config->name);
    //     }

    //     return true;
    // }


    public function set_page_region($pageid) {

        global $PAGE;
        $fullwidthtopregion = 'full-width-top';
        $contentregion = 'content';

        $pm = new \local_edwiserpagebuilder\page_model();

        $pm->register_page('draft', $pageid);

        $pagelayout  = $pm->get_pagelayout();

        $PAGE->set_pagelayout($pagelayout);

        if ($PAGE->theme->name == "remui") {
            return $fullwidthtopregion;
        }

        return $contentregion;
    }

}
