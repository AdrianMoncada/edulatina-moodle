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

use stdClass;

define("EDIT_CAP", 'local/edwiserpagebuilder:epb_can_manage_page');

class page_model {
    private $id;
    private $pagename;
    private $capabilities;
    private $pagecontent;
    private $deleted;
    private $pagelayout;
    private $startdate;
    private $enddate;
    private $pagemodified;
    private $pagedesc;
    private $allowloginonly;
    private $visible;
    private $seotag;
    private $seodesc;
    private $allowindex;
    private $refid;
    private $type = "draft";

    private $blocks = array();

    public $pagetable;

    // Property directly used in custom page handler.
    public $publishtable = "edw_pages";
    public $drafttable = "edw_pages_draft";
    public $draftpagetype = "epb-page-draft";
    public $publishpagetype = "epb-page-publish";

    public function __construct() {
        $this->set_pagename("");
        $this->set_capabilities(json_encode(array()));
        $this->set_pagecontent("");
        $this->set_deleted(0);
        $this->set_pagelayout("mydashboard");
        $this->set_startdate(0);
        $this->set_enddate(0);
        $this->set_pagemodified(time());
        $this->set_pagedesc("");
        $this->set_allowloginonly(1);
        $this->set_visible(1);
        $this->set_seotag("");
        $this->set_seodesc("");
        $this->set_allowindex(0);
        $this->set_refid(-1);
    }

    /**
     * This function will register the current page.
     *
     * @param string $type
     * @param [int] $pageid
     * @return [obj] page_model
     */
    public function register_page($type, $pageid) {
        $this->set_type($type);
        $this->pagetable = ($type == 'draft') ? $this->drafttable : $this->publishtable;

        $this->initialize_page($pageid);
    }

    /**
     * Initialize page object.
     *
     * @param [type] $pageid
     * @return void
     */
    public function initialize_page($pageid) {

        $page = $this->get_page_record_by_id($pageid);

        if (!$page) {
            print_error('epb_pageidnotfound: '. get_string('accesserror', "local_edwiserpagebuilder"), 'error');
        }

        $this->set_id($page->id);
        $this->set_pagename($page->pagename);
        $this->set_capabilities($page->capabilities);
        $this->set_pagecontent($page->pagecontent);
        $this->set_deleted($page->deleted);
        $this->set_pagelayout($page->pagelayout);
        $this->set_startdate($page->startdate);
        $this->set_enddate($page->enddate);
        $this->set_pagemodified($page->pagemodified);
        $this->set_pagedesc($page->pagedesc);
        $this->set_allowloginonly($page->allowloginonly);
        $this->set_visible($page->visible);
        $this->set_seotag($page->seotag);
        $this->set_seodesc($page->seodesc);
        $this->set_allowindex($page->allowindex);
        $this->set_refid($page->refid);
    }

    /**
     * Get Page record by provided id.
     *
     * @param [type] $pageid
     * @return [array] page db object
     */
    public function get_page_record_by_id($pageid) {

        global $DB;

        $param = array('id' => $pageid, 'deleted' => 0);

        $page = $DB->get_record($this->pagetable, $param);

        return $page;
    }

    /**
     * Create page from page obj.
     * Before calling this function, must initiate page_model and update the data.
     * Also must set $this->pagetable to reference table.
     */
    public function create_page_record() {
        global $DB;

        $page = $DB->insert_record(
            $this->pagetable,
            $this->generate_addable_object(),
            true,
            false
        );

        return $page;
    }

    /**
     * Update page record.
     * Before calling this function, must initiate page_model and update the data.
     * Also must set $this->pagetable to reference table.
     *
     * @return [obj] page
     */
    public function update_page_record() {
        global $DB;

        $page = $DB->update_record(
            $this->pagetable,
            $this->generate_addable_object(),
            true,
            false
        );

        return $page;
    }

    /**
     * Delete page records.
     * Deleting page records delete pages from draft and publish table.
     */
    public function delete_page_record() {
        global $DB;

        $DB->delete_records(
            $this->pagetable,
            array("id" => $this->get_id())
        );
    }

    /**
     * Remove block instances.
     */
    public function remove_block_instances() {
        $blocks = $this->get_blocks();

        foreach ($blocks as $block) {
            blocks_delete_instance($block);
        }
    }

    public function generate_addable_object() {
        $obj = new stdClass();

        // Add id to object only when ID required to update the data.
        if ($this->get_id()) {
            $obj->id = $this->get_id();
        }
        $obj->pagename = $this->get_pagename();
        $obj->capabilities = json_encode($this->get_capabilities());
        $obj->pagecontent = $this->get_pagecontent();
        $obj->deleted = $this->get_deleted();
        $obj->pagelayout = $this->get_pagelayout();
        $obj->startdate = $this->get_startdate();
        $obj->enddate = $this->get_enddate();
        $obj->pagemodified = time();
        $obj->pagedesc = $this->get_pagedesc();
        $obj->allowloginonly = $this->get_allowloginonly();
        $obj->visible = $this->get_visible();
        $obj->seotag = $this->get_seotag();
        $obj->seodesc = $this->get_seodesc();
        $obj->allowindex = $this->get_allowindex();
        $obj->refid = $this->get_refid();

        return $obj;
    }

    /**
     * Check if current user has permission to visit the page.
     *
     * @return boolean
     */
    public function can_view_page() {

        if ( !isloggedin()) {
            // Return False, if page is not allowed for logged out users.
            if ($this->get_allowloginonly()) {
                return false;
            }

            if (!$this->get_visible()) {
                return false;
            }

            // Return false, startdate not justified.
            $current = time();
            if ($current < $this->get_startdate()) {
                return false;
            }

            // Return false, we passed the end date.
            if ($this->get_enddate() != 0 && $current > $this->get_enddate()) {
                return false;
            }

            return true;
        }

        // If user has editing capability, return true.
        // Return true if user has editing capability.
        $systemcontext = \context_system::instance();
        if (is_siteadmin() || has_capability(EDIT_CAP, $systemcontext)) {
            return true;
        }

        // Return false, if page is hidden.
        if (!$this->get_visible()) {
            return false;
        }

        // Return false, startdate not justified.
        $current = time();
        if ($current < $this->get_startdate()) {
            return false;
        }

        // Return false, we passed the end date.
        if ($this->get_enddate() != 0 && $current > $this->get_enddate()) {
            return false;
        }

        // Check user has the capability to view or not.
        $allowedcapabilities = $this->get_capabilities();
        if (!empty($allowedcapabilities)) {
            $canview = false;

            foreach ($allowedcapabilities as $key => $value) {
                if (has_capability($value, $systemcontext)) {
                    $canview = true;
                }
            }
            // Returning true only if user has set capability to view the page.
            return $canview;
        }
        // Returning true as all checks are done.
        return true;
    }

    /**
     * Get the layout block record from db
     */
    public function get_layout_block_content($tablecontraints) {
        global $DB;

        $blocklayoutable = 'edw_page_blocks';
        $layoutblocks = $DB->get_record(
            $blocklayoutable,
            $tablecontraints
        );
        return $layoutblocks;
    }

    /**
     * Get the single block record from db
     */
    public function get_block_record($tablecontraints) {
        global $DB;
        $blockinstancetable = 'block_instances';
        $record = $DB->get_record(
            $blockinstancetable,
            $tablecontraints
        );

        return $record;
    }

    /**
     * Get the array of block record from db
     */
    public function get_block_records($tablecontraints) {
        global $DB;
        $blockinstancetable = 'block_instances';
        $record = $DB->get_records(
            $blockinstancetable,
            $tablecontraints
        );

        return $record;
    }

    /**
     * Update the single block record from db
     */
    public function update_block_record($updatedentry) {
        global $DB;
        $blockinstancetable = 'block_instances';
        $DB->update_record($blockinstancetable, $updatedentry);
    }


    /**
     * Following code has only Getters & Setters.
     */

    /**
     * Get the value of id
     */
    public function get_id() {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function set_id($id) {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of pagename
     */
    public function get_pagename() {
        return $this->pagename;
    }

    /**
     * Set the value of pagename
     *
     * @return  self
     */
    public function set_pagename($pagename) {
        $this->pagename = $pagename;

        return $this;
    }

    /**
     * Get the value of capabilities
     */
    public function get_capabilities() {
        return json_decode($this->capabilities);
    }

    /**
     * Set the value of capabilities
     *
     * @return  self
     */
    public function set_capabilities($capabilities) {
        $this->capabilities = $capabilities;

        return $this;
    }

    /**
     * Get the value of pagecontent
     */
    public function get_pagecontent() {
        return $this->pagecontent;
    }

    /**
     * Set the value of pagecontent
     *
     * @return  self
     */
    public function set_pagecontent($pagecontent) {
        $this->pagecontent = $pagecontent;

        return $this;
    }

    /**
     * Get the value of deleted
     */
    public function get_deleted() {
        return $this->deleted;
    }

    /**
     * Set the value of deleted
     *
     * @return  self
     */
    public function set_deleted($deleted) {
        $this->deleted = $deleted;

        return $this;
    }

    /**
     * Get the value of pagelayout
     */
    public function get_pagelayout() {
        return $this->pagelayout;
    }

    /**
     * Set the value of pagelayout
     *
     * @return  self
     */
    public function set_pagelayout($pagelayout) {
        $this->pagelayout = $pagelayout;

        return $this;
    }

    /**
     * Get the value of startdate
     */
    public function get_startdate() {
        return $this->startdate;
    }

    /**
     * Set the value of startdate
     *
     * @return  self
     */
    public function set_startdate($startdate) {
        $this->startdate = $startdate;

        return $this;
    }

    /**
     * Get the value of enddate
     */
    public function get_enddate() {
        return $this->enddate;
    }

    /**
     * Set the value of enddate
     *
     * @return  self
     */
    public function set_enddate($enddate) {
        $this->enddate = $enddate;

        return $this;
    }

    /**
     * Get the value of pagemodified
     */
    public function get_pagemodified() {
        return $this->pagemodified;
    }

    /**
     * Set the value of pagemodified
     *
     * @return  self
     */
    public function set_pagemodified($pagemodified) {
        $this->pagemodified = $pagemodified;

        return $this;
    }

    /**
     * Get the value of pagedesc
     */
    public function get_pagedesc() {
        return $this->pagedesc;
    }

    /**
     * Set the value of pagedesc
     *
     * @return  self
     */
    public function set_pagedesc($pagedesc) {
        $this->pagedesc = $pagedesc;

        return $this;
    }

    /**
     * Get the value of allowloginonly
     */
    public function get_allowloginonly() {
        return $this->allowloginonly;
    }

    /**
     * Set the value of allowloginonly
     *
     * @return  self
     */
    public function set_allowloginonly($allowloginonly) {
        $this->allowloginonly = $allowloginonly;

        return $this;
    }

    /**
     * Get the value of visible
     */
    public function get_visible() {
        return $this->visible;
    }

    /**
     * Set the value of visible
     *
     * @return  self
     */
    public function set_visible($visible) {
        $this->visible = $visible;

        return $this;
    }

    /**
     * Get the value of seotag
     */
    public function get_seotag() {
        return $this->seotag;
    }

    /**
     * Set the value of seotag
     *
     * @return  self
     */
    public function set_seotag($seotag) {
        $this->seotag = $seotag;

        return $this;
    }

    /**
     * Get the value of seodesc
     */
    public function get_seodesc() {
        return $this->seodesc;
    }

    /**
     * Set the value of seodesc
     *
     * @return  self
     */
    public function set_seodesc($seodesc) {
        $this->seodesc = $seodesc;

        return $this;
    }

    /**
     * Get the value of allowindex
     */
    public function get_allowindex() {
        return $this->allowindex;
    }

    /**
     * Set the value of allowindex
     *
     * @return  self
     */
    public function set_allowindex($allowindex) {
        $this->allowindex = $allowindex;

        return $this;
    }

    /**
     * Get the value of refid
     */
    public function get_refid() {
        return $this->refid;
    }

    /**
     * Set the value of refid
     *
     * @return  self
     */
    public function set_refid($refid) {
        $this->refid = $refid;

        return $this;
    }

    /**
     * Get the value of type
     */
    public function get_type() {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @return  self
     */
    public function set_type($type) {
        $this->type = $type;

        return $this;
    }


    /**
     * Get the value of blocks
     */
    public function get_blocks() {

        if (empty($this->blocks)) {
            $this->set_blocks();
        }

        return $this->blocks;
    }

    /**
     * Set the value of blocks
     *
     * @return  self
     */
    public function set_blocks() {
        global $DB;

        $blockinstancetable = 'block_instances';

        $blocks = $DB->get_records(
            $blockinstancetable,
            array(
                "pagetypepattern" => $this->get_type() == "draft" ? 'epb-page-draft' : 'epb-page-publish',
                "subpagepattern" => $this->get_id()
            )
        );

        $this->blocks = $blocks;

        return $this;
    }


    /**
     * Get the value of publishtable
     */
    public function get_publishtable() {
        return $this->publishtable;
    }

    /**
     * Get the value of drafttable
     */
    public function get_drafttable() {
        return $this->drafttable;
    }


}
