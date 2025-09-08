<?php
// This file is part of Edwiser Video Format Moodle Course Format Plugin.
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
 * Edwiser video format license controller is necessary to activate, deactivate or renew license.
 *
 * @package   format_edwiservideoformat
 * @copyright Copyright (c) 2024 WisdmLabs. (http://www.wisdmlabs.com)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace format_edwiservideoformat;
/**
 * Edwiser video format license controller class
 */
class edwiservideoformat_license_controller {

    /**
     *
     * @var string Short Name for plugin.
     */
    private $pluginshortname = '';

    /**
     *
     * @var string Slug to be used in url and functions name
     */
    private $pluginslug = '';

    /**
     *
     * @var string stores the current plugin version
     */
    private $pluginversion = '';

    /**
     *
     * @var string Handles the plugin name
     */
    private $pluginname = '';

    /**
     *
     * @var string  Stores the URL of store. Retrieves updates from
     *              this store
     */
    private $storeurl = '';

    /**
     *
     * @var string  Name of the Author
     */
    private $authorname = '';

    /**
     * Response data
     * @var array
     */
    public static $responsedata;

    /**
     * Developer Note: This variable is used everywhere to check license information and verify the data.
     * Change the Name of this variable in this file wherever it appears and also remove this comment
     * After you are done with adding Licensing
     * @var array
     */
    public $wdmedwiservideoformatdata = array (
        // Plugins short name appears on the License Menu Page.
        'plugin_short_name' => 'edwiser video course format',
        // Data in db. License is checked using two options viz edd_<slug>_license_key and edd_<slug>_license_status.
        'plugin_slug' => 'edwiser-video-course-format', // This slug is used to store the
        // This should be similar to Version tag mentioned in Plugin headers.
        'plugin_version' => '1.0.0', // Current Version of the plugin.
        // Under this Name product should be created on WisdmLabs Site.
        'plugin_name' => 'edwiser video course format',
        // Url where program pings to check if update is available and license validity.
        'store_url' => 'https://edwiser.org/check-update',
        // Author Name.
        'author_name' => 'WisdmLabs',
    );

    /**
     * Constructor
     */
    public function __construct() {
        $this->authorname       = $this->wdmedwiservideoformatdata[ 'author_name' ];
        $this->pluginname       = $this->wdmedwiservideoformatdata[ 'plugin_name' ];
        $this->pluginshortname = $this->wdmedwiservideoformatdata[ 'plugin_short_name' ];
        $this->pluginslug       = $this->wdmedwiservideoformatdata[ 'plugin_slug' ];
        $this->pluginversion    = $this->wdmedwiservideoformatdata[ 'plugin_version' ];
        $this->storeurl         = $this->wdmedwiservideoformatdata[ 'store_url' ];
    }

    /**
     * The function parses the response come from the edwiser.org
     * on activation and determines is status of the license key.
     *
     *
     * @param  object $licensedata the response retune by the activation request.
     * @return String               returns the license key status
     */
    public function status_update($licensedata) {
        global $DB;

        $status = "";
        if ((empty($licensedata->success)) && isset($licensedata->error) && ($licensedata->error == "expired")) {
            $status = 'expired';
        } else if ($licensedata->license == 'invalid' && isset($licensedata->error) && $licensedata->error == "revoked") {
            $status = 'disabled';
        } else if ($licensedata->license == 'invalid' && $licensedata->activations_left == "0") {
            $status = 'invalid';
        } else if ($licensedata->license == 'failed') {
            $status = 'failed';
            // @codingStandardsIgnoreLine
            $GLOBALS[ 'wdm_license_activation_failed' ] = true;
        } else {
            $status = $licensedata->license;
        }

        // Delete previous license status.
        try {
            $DB->delete_records_select(
                'config_plugins',
                'name = :name',
                array('name' => 'edd_' . $this->pluginslug . '_license_status')
            );
        } catch (dml_exception $e) {
            $rcd = 0;
            // Keep catch empty if no record found.
        }

        $dataobject = new \stdClass();
        $dataobject->plugin = 'format_edwiservideoformat';
        $dataobject->name = 'edd_' . $this->pluginslug . '_license_status';
        $dataobject->value = $status;

        $DB->insert_record('config_plugins', $dataobject);

        return $status;
    }

    /**
     * Check if there is no license data in response
     * @param  object $licensedata         License data
     * @param  int    $currentresponsecode Current response code from Edwiser site
     * @param  int    $validresponsecode   Valid response code
     * @return bool                        True if license is valid
     */
    public function check_if_no_data($licensedata, $currentresponsecode, $validresponsecode) {
        global $DB;

        if ($licensedata == null ||
            !in_array((string)$currentresponsecode, $validresponsecode)
        ) {
            // @codingStandardsIgnoreLine
            $GLOBALS[ 'wdm_server_null_response' ] = true;

            // Delete previous record.
            try {
                $DB->delete_records_select(
                    'config_plugins',
                    'name = :name',
                    array('name' => 'wdm_' . $this->pluginslug . '_license_trans')
                );
            } catch (dml_exception $e) {
                $rcd = 0;
                // Keep catch empty if no record found.
            }

            // Insert new license trans.
            $dataobject = new \stdClass();
            $dataobject->plugin = 'format_edwiservideoformat';
            $dataobject->name = 'wdm_' . $this->pluginslug . '_license_trans';
            $dataobject->value = serialize(array('server_did_not_respond', time() + (60 * 60 * 24)));
            $DB->insert_record('config_plugins', $dataobject);
            return false;
        }
        return true;
    }

    /**
     * Activate theme license
     */
    public function activate_license() {
        global $DB, $CFG;
        $licensekey = trim($_POST['edd_' . $this->pluginslug . '_license_key']);

        if ($licensekey) {
            // Check previous license key.
            try {
                $prevlicensekey = $DB->get_field(
                    'config_plugins',
                    'value',
                    array('name' => 'edd_' . $this->pluginslug . '_license_key')
                );
            } catch (dml_exception $e) {
                $prevlicensekey = 0;
                // Keep catch empty if no record found.
            }
            if ($prevlicensekey !== 0 && $prevlicensekey !== $licensekey) {
                // Delete previous license users.
                try {
                    $DB->delete_records_select(
                        'config_plugins',
                        'name = :name',
                        array('name' => 'evf_edwiser-video-course-format_licensed_users')
                    );
                } catch (dml_exception $e) {
                    $rcd = 0;
                    // Keep catch empty if no record found.
                }
            }
            // Delete previous license key.
            try {
                $DB->delete_records_select(
                    'config_plugins',
                    'name = :name',
                    array('name' => 'edd_' . $this->pluginslug . '_license_key')
                );
            } catch (dml_exception $e) {
                $rcd = 0;
                // Keep catch empty if no record found.
            }

            // Insert new license key.
            $dataobject = new \stdClass();
            $dataobject->plugin = 'format_edwiservideoformat';
            $dataobject->name = 'edd_' . $this->pluginslug . '_license_key';
            $dataobject->value = $licensekey;
            $DB->insert_record('config_plugins', $dataobject);

            // Make API call to validate license
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_URL => $this->storeurl,
                CURLOPT_POST => 1,
                CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'].' - '.$CFG->wwwroot,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_POSTFIELDS => array(
                    'edd_action' => 'activate_license',
                    'license' => $licensekey,
                    'item_name' => urlencode($this->pluginname),
                    'current_version' => $this->pluginversion,
                    'url' => urlencode($CFG->wwwroot),
                )
            ));

            // Process response and update status
            $resp = curl_exec($curl);
            $currentresponsecode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            curl_close($curl);

            $licensedata = json_decode($resp);
            $validresponsecode = array('200', '301');

            $isdataavailable = $this->check_if_no_data($licensedata, $currentresponsecode, $validresponsecode);

            if ($isdataavailable == false) {
                return;
            }

            $exptime = 0;
            if (isset($licensedata->expires)) {
                $exptime = strtotime($licensedata->expires);
            }
            $curtime = time();

            if (isset($licensedata->expires) &&
                ($licensedata->expires !== false) &&
                ($licensedata->expires != 'lifetime') &&
                $exptime <= $curtime &&
                $exptime != 0
            ) {
                $licensedata->error = "expired";
            }

            if (isset($licensedata->renew_link) && ( ! empty($licensedata->renew_link) || $licensedata->renew_link != "")) {

                // Delete previous record.
                try {
                    $DB->delete_records_select(
                        'config_plugins',
                        'name = :name',
                        array('name' => 'wdm_' . $this->pluginslug . '_product_site')
                    );
                } catch (dml_exception $e) {
                    $rcd = 0;
                    // Keep catch empty if no record found.
                }

                // Add renew link.
                $dataobject = new \stdClass();
                $dataobject->plugin = 'format_edwiservideoformat';
                $dataobject->name = 'wdm_' . $this->pluginslug . '_product_site';
                $dataobject->value = $licensedata->renew_link;

                $DB->insert_record('config_plugins', $dataobject);
            }

            $licensestatus = $this->status_update($licensedata);
            $this->set_transient_on_activation($licensestatus);
        }
    }

    /**
     * Set transient on activation
     * @param string $licensestatus License status
     */
    public function set_transient_on_activation($licensestatus) {
        global $DB;

        $transexpired = false;

        // Check license trans.
        $transvar = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'wdm_' . $this->pluginslug . '_license_trans'),
            IGNORE_MISSING
        );

        if ($transvar) {
            $transvar = unserialize($transvar);

            if (is_array($transvar) && time() > $transvar[1] && $transvar[1] > 0) {
                $transexpired = true;

                // Delete previous record.
                try {
                    $DB->delete_records_select(
                        'config_plugins',
                        'name = :name',
                        array('name' => 'wdm_' . $this->pluginslug . '_license_trans')
                    );
                } catch (dml_exception $e) {
                    $rcd = 0;
                    // Keep catch empty if no record found.
                }
            }
        } else {
            $transexpired = true;
        }

        if ($transexpired == false) {
            // Delete previous license trans.
            try {
                $DB->delete_records_select(
                    'config_plugins',
                    'name = :name',
                    array('name' => 'wdm_' . $this->pluginslug . '_license_trans')
                );
            } catch (dml_exception $e) {
                $rcd = 0;
                // Keep catch empty if no record found.
            }

            if (! empty($licensestatus)) {
                if ($licensestatus == 'valid') {
                    $time = time() + 60 * 60 * 24 * 7;
                } else {
                    $time = time() + 60 * 60 * 24;
                }

                // Insert new license trans.
                $dataobject = new \stdClass();
                $dataobject->plugin = 'format_edwiservideoformat';
                $dataobject->name = 'wdm_' . $this->pluginslug . '_license_trans';
                $dataobject->value = serialize(array($licensestatus, $time));
                $DB->insert_record('config_plugins', $dataobject);
            }
        }
    }

    /**
     * Deactivate theme license
     */
    public function deactivate_license() {
        global $DB, $CFG;

        $wpeplicensekey = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'edd_' . $this->pluginslug . '_license_key'),
            IGNORE_MISSING
        );

        if (!empty($wpeplicensekey)) {
            // Make API call to deactivate license
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_URL => $this->storeurl,
                CURLOPT_POST => 1,
                CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'].' - '.$CFG->wwwroot,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_POSTFIELDS => array(
                    'edd_action' => 'deactivate_license',
                    'license' => $wpeplicensekey,
                    'item_name' => urlencode($this->pluginname),
                    'current_version' => $this->pluginversion,
                    'url' => urlencode($CFG->wwwroot),
                )
            ));

            // Process response and update status
            $resp = curl_exec($curl);
            $currentresponsecode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            curl_close($curl);

            $licensedata = json_decode($resp);
            $validresponsecode = array('200', '301');

            $isdataavailable = $this->check_if_no_data($licensedata, $currentresponsecode, $validresponsecode);

            if ($isdataavailable) {
                if ($licensedata->license == 'deactivated' || $licensedata->license == 'failed') {
                    // Delete previous record
                    try {
                        $DB->delete_records_select(
                            'config_plugins',
                            'name = :name',
                            array('name' => 'edd_' . $this->pluginslug . '_license_status')
                        );
                    } catch (dml_exception $e) {
                        // Keep catch empty if no record found
                    }

                    // Update license status in database
                    $dataobject = new \stdClass();
                    $dataobject->plugin = 'format_edwiservideoformat';
                    $dataobject->name = 'edd_' . $this->pluginslug . '_license_status';
                    $dataobject->value = 'deactivated';
                    $DB->insert_record('config_plugins', $dataobject);

                    // Update transient data
                    try {
                        $DB->delete_records_select(
                            'config_plugins',
                            'name = :name',
                            array('name' => 'wdm_' . $this->pluginslug . '_license_trans')
                        );
                    } catch (dml_exception $e) {
                        // Keep catch empty if no record found
                    }

                    $dataobject = new \stdClass();
                    $dataobject->plugin = 'format_edwiservideoformat';
                    $dataobject->name = 'wdm_' . $this->pluginslug . '_license_trans';
                    $dataobject->value = serialize(array('deactivated', 0));
                    $DB->insert_record('config_plugins', $dataobject);
                }
            }
        }
    }

    /**
     * Validate and add data to database
     */
    public function add_data() {
        if (is_siteadmin()) {

            // Check if submission came from license page
            if (!isset($_POST['onEdwiserVideoFormatLicensePage']) || $_POST['onEdwiserVideoFormatLicensePage'] == 0) {
                $_POST['onEdwiserVideoFormatLicensePage'] = false;
                return;
            }

            // Get license key from form
            $licensekeyfield = 'edd_' . $this->pluginslug . '_license_key';
            if (!isset($_POST[$licensekeyfield]) || trim($_POST[$licensekeyfield]) === '') {
                $lk = 'empty';
            } else {
                $lk = trim($_POST[$licensekeyfield]);
            }

            // Handle license activation
            if (isset($_POST['edd_' . $this->pluginslug . '_license_activate'])) {

                set_config('licensekey', $lk, 'format_edwiservideoformat');
                set_config('licensekeyactivate', @$_POST['edd_' . $this->pluginslug . '_license_activate'], 'format_edwiservideoformat');
                return $this->activate_license();
            }
            // Handle license deactivation
            else if (isset($_POST['edd_' . $this->pluginslug . '_license_deactivate'])) {
                set_config('licensekey', $lk, 'format_edwiservideoformat');
                set_config('licensekeydeactivate', @$_POST['edd_' . $this->pluginslug . '_license_deactivate'], 'format_edwiservideoformat');
                return $this->deactivate_license();
            }
        }
    }

    /**
     * Get data from database
     * @return string License status
     */
    public function get_data_from_db() {
        global $DB, $CFG;

        if (null !== self::$responsedata) {
            return self::$responsedata;
        }

        $transexpired = false;

        $gettrans = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'wdm_' . $this->pluginslug . '_license_trans'),
            IGNORE_MISSING
        );
        if ($gettrans) {
            $gettrans = unserialize($gettrans);
            if (is_array($gettrans) && time() > $gettrans[1] && $gettrans[1] > 0) {
                $transexpired = true;
                // Delete previous license trans.
                try {
                    $lusers = self::edd_get_users_from_api();
                    if (!empty($lusers) && isset($lusers->users)) {
                        set_config('evf_edwiser-video-course-format_licensed_users', serialize($lusers->users), 'format_edwiservideoformat');
                    }
                    $DB->delete_records_select(
                        'config_plugins',
                        'name = :name',
                        array('name' => 'wdm_' . $this->pluginslug . '_license_trans')
                    );
                } catch (dml_exception $e) {
                    $rcd = 0;
                    // Keep catch empty if no record found.
                }
            }
        } else {
            $transexpired = true;
        }

        if ($transexpired == true) {
            $licensekey = $DB->get_field_select(
                'config_plugins',
                'value',
                'name = :name',
                array('name' => 'edd_' . $this->pluginslug . '_license_key'),
                IGNORE_MISSING
            );

            if ($licensekey) {
                // Get cURL resource.
                $curl = curl_init();

                curl_setopt_array($curl, array(
                    CURLOPT_RETURNTRANSFER => 1,
                    CURLOPT_URL => $this->storeurl,
                    CURLOPT_POST => 1,
                    CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'].' - '.$CFG->wwwroot,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_SSL_VERIFYPEER => false,
                    CURLOPT_POSTFIELDS => array(
                        'edd_action' => 'check_license',
                        'license' => $licensekey,
                        'item_name' => urlencode($this->pluginname),
                        'current_version' => $this->pluginversion,
                        'url' => urlencode($CFG->wwwroot),
                    )
                ));
                // Send the request & save response to $resp.
                $resp = curl_exec($curl);

                $currentresponsecode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

                // Close request to clear up some resources.
                curl_close($curl);

                $licensedata = json_decode($resp);

                $validresponsecode = array( '200', '301' );

                if ($licensedata == null || ! in_array($currentresponsecode, $validresponsecode)) {
                    // If server does not respond, read current license information.
                    $licensestatus = $DB->get_field_select(
                        'config_plugins',
                        'value',
                        'name = :name',
                        array('name' => 'edd_' . $this->pluginslug . '_license_status'),
                        IGNORE_MISSING
                    );

                    if (empty($licensedata)) {
                        // Insert new license transient.
                        $dataobject = new \stdClass();
                        $dataobject->plugin = 'format_edwiservideoformat';
                        $dataobject->name = 'wdm_' . $this->pluginslug . '_license_trans';
                        $dataobject->value = serialize(array('server_did_not_respond', time() + (60 * 60 * 24)));
                        $DB->insert_record('config_plugins', $dataobject);
                    }
                } else {
                    $licensestatus = $licensedata->license;
                }

                if (empty($licensestatus)) {
                    return;
                }

                if (isset($licensedata->license) && ! empty($licensedata->license)) {
                    // Delete previous record.
                    try {
                        $DB->delete_records_select(
                            'config_plugins',
                            'name = :name',
                            array('name' => 'edd_' . $this->pluginslug . '_license_status')
                        );
                    } catch (dml_exception $e) {
                        $rcd = 0;
                        // Keep catch empty if no record found.
                    }

                    $dataobject = new \stdClass();
                    $dataobject->plugin = 'format_edwiservideoformat';
                    $dataobject->name = 'edd_' . $this->pluginslug . '_license_status';
                    $dataobject->value = $licensestatus;
                    $DB->insert_record('config_plugins', $dataobject);
                }

                $this->set_response_data($licensestatus, $this->pluginslug, true);
                return self::$responsedata;
            }
        } else {
            $licensestatus = $DB->get_field_select(
                'config_plugins',
                'value',
                'name = :name',
                array('name' => 'edd_' . $this->pluginslug . '_license_status'),
                IGNORE_MISSING
            );

            $this->set_response_data($licensestatus, $this->pluginslug);
            return self::$responsedata;
        }
    }

    /**
     * Set response data to plugin config
     * @param string  $licensestatus License status
     * @param string  $pluginslug    Plugin slug
     * @param boolean $settransient  Transient data
     */
    public function set_response_data($licensestatus, $pluginslug, $settransient = false) {
        global $DB;

        if ($licensestatus == 'valid') {
            self::$responsedata = 'available';
        } else if ($licensestatus == 'expired') {
            self::$responsedata = 'available';
        } else {
            self::$responsedata  = 'unavailable';
        }

        if ($settransient) {
            if ($licensestatus == 'valid') {
                $time = 60 * 60 * 24 * 7;
            } else {
                $time = 60 * 60 * 24;
            }

            // Delete previous record.
            try {
                $DB->delete_records_select(
                    'config_plugins',
                    'name = :name',
                    array('name' => 'wdm_' . $pluginslug . '_license_trans')
                );
            } catch (dml_exception $e) {
                $rcd = 0;
                // Keep catch empty if no record found.
            }

            // Insert new license transient.
            $dataobject = new \stdClass();
            $dataobject->plugin = 'format_edwiservideoformat';
            $dataobject->name = 'wdm_' . $pluginslug . '_license_trans';
            $dataobject->value = serialize(array($licensestatus, time() + (60 * 60 * 24)));
            $DB->insert_record('config_plugins', $dataobject);
        }
    }

    /**
     * This function is used to get list of sites where license key is already activated.
     *
     * @return string  list of site
     */
    public function get_site_list() {
        global $DB, $CFG;

        $sites = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'wdm_' . $this->pluginslug . '_license_key_sites'),
            IGNORE_MISSING
        );

        $max = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'wdm_' . $this->pluginslug . '_license_max_site'),
            IGNORE_MISSING
        );

        $sites = unserialize($sites);

        $cursite    = $CFG->wwwroot;
        $cursite    = preg_replace('#^https?://#', '', $cursite);

        $sitecount  = 0;
        $activesite = "";

        if (!empty($sites) || $sites != "") {
            foreach ($sites as $key) {
                foreach ($key as $value) {
                    $value = rtrim($value, "/");

                    if (strcasecmp($value, $cursite) != 0) {
                        $activesite .= "<li>" . $value . "</li>";
                        $sitecount ++;
                    }
                }
            }
        }

        if ($sitecount >= $max) {
            return $activesite;
        } else {
            return "";
        }
    }

    /**
     * Handler for user add/remove
     * @param  [type] $api           Api name
     * @param  array  $licensedusers Licensed users array
     * @param  string $site          Site name
     * @return mixed                 Response from server
     */
    public function handle_users_api($api, $licensedusers = array(), $site = '') {
        global $DB, $CFG;
        $pluginslug = $this->pluginslug;
        $licensekey = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'edd_' . $pluginslug .'_license_key'),
            IGNORE_MISSING
        );
        $status = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'edd_' . $pluginslug . '_license_status'),
            IGNORE_MISSING
        );
        if ($site == '') {
            $site = $CFG->wwwroot;
        }
        if ($licensekey && $status == 'valid') {
            $fields = [
                'key' => $licensekey,
                'site' => $site
            ];
            if (!empty($licensedusers)) {
                $licensedusers = array_values($licensedusers);
                for ($i = 0; $i < count($licensedusers); $i++) {
                    $fields["users[$i]"] = $licensedusers[$i]->user;
                }
            } else {
                $fields["users[0]"] = '';
            }
            $curl = curl_init();
            // Set some options - we are passing in a useragent too here.
            curl_setopt_array($curl, [
                CURLOPT_URL => "https://edwiser.org/wp-json/wdm-eddc/v1/potential-users/$api",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => $fields
            ]);
            // Send the request & save response to $resp.
            $resp = curl_exec($curl);
            // Close request to clear up some resources.
            curl_close($curl);
            return $resp;
        }
        return false;
    }

    /**
     * Get licensed users from api call
     * @return array Users list
     */
    public function edd_get_users_from_api() {
        global $DB, $CFG;
        $pluginslug = $this->pluginslug;
        $licensekey = $DB->get_field_select(
            'config_plugins',
            'value',
            'value',
            array('name' => 'edd_' . $pluginslug .'_license_key'),
            IGNORE_MISSING
        );
        $status = $DB->get_field_select(
            'config_plugins',
            'value',
            'name = :name',
            array('name' => 'edd_' . $pluginslug . '_license_status'),
            IGNORE_MISSING
        );
        if ($licensekey && $status == 'valid') {
            $site = parse_url($CFG->wwwroot, PHP_URL_HOST).''.parse_url($CFG->wwwroot, PHP_URL_PATH);
            $curl = curl_init();
            // Set some options - we are passing in a useragent too here.
            curl_setopt_array($curl, [
                CURLOPT_URL => "https://edwiser.org/wp-json/wdm-eddc/v1/potential-users/get?key=" . $licensekey . "&site=" . $site,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_POSTFIELDS => ""
            ]);
            // Send the request & save response to $resp.
            $resp = curl_exec($curl);
            // Close request to clear up some resources.
            curl_close($curl);
            return json_decode($resp);
        }
    }
}
