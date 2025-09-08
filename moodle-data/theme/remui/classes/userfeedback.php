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
 * Edwiser user feedback class.
 *
 * We send anonymous user data to imporve our product compatibility with various plugins and systems.
 * Moodle's new Bootstrap theme engine
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui;

defined('MOODLE_INTERNAL') || die();

use curl;

class userfeedback {

    /**
     * Sends the user feedback data to the server.
     *
     * This method takes the user feedback data as an argument and sends it to the server using a cURL request. The feedback data is encoded as JSON and sent in the request body. The method returns an associative array containing the response from the server, with a 'success' key indicating whether the request was successful or not.
     *
     * @param array $feedbackdata The user feedback data to be sent to the server.
     * @return array An associative array containing the response from the server.
     */
    public function send_user_feedback($feedbackdata) {

        $resultarr = [];
        $userfeedbackdata = json_encode($feedbackdata);
        $url = "https://edwiser.org/wp-json/edd/v1/onboarding-data";
        // Call api endpoint with data.
        $curl = new curl();

        // Set the url, number of POST vars, POST data.
        $curl->setopt([
            'CURLOPT_URL' => $url,
            'CURLOPT_CUSTOMREQUEST' => "POST",
            'CURLOPT_RETURNTRANSFER' => true,
            'CURLOPT_HTTPHEADER' => array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($userfeedbackdata)
            )
        ]);

        // Execute post.
        $result = $curl->post($url, $userfeedbackdata);
        if ($curl->get_errno() === 0 && $result) {
            $resultarr = json_decode($result, 1);
        } else {
            $resultarr = [
                'status' => false,
                'message' => $curl->error ?: 'Something went wrong while processing the request',
                'error_code' => $curl->get_errno()
            ];
        }

        return $resultarr;

    }


    /**
     * Prepares the user feedback data to be sent to the server.
     *
     * This method retrieves the user's information, such as the customer name, email, plugin name, and license key, and combines it with the user feedback data stored in the Moodle configuration. The resulting data is returned as an associative array with the 'responetype' key set to 'usersiteinfo' and the 'usersiteinfo' key containing the user feedback data.
     *
     * @return array An associative array containing the user feedback data.
     */

    public  function prepare_setupdata($usersiteinfo = "") {

        $feedbackdata = $this->get_user_info();

        if (!$usersiteinfo) {
            $usersiteinfo = get_config("theme_remui", "setupuserinfo");
        }

        $usersiteinfo = json_decode($usersiteinfo, true);

        $feedbackdata['responsetype'] = "usersiteinfo";
        $feedbackdata['usersiteinfo'] = $usersiteinfo['usersiteinfo'];

        return $feedbackdata;
    }

    /**
     * Prepares the user feedback data to be sent to the server.
     *
     * This method retrieves the user's information, such as the customer name, email, plugin name, and license key, and combines it with the user feedback data stored in the Moodle configuration. The resulting data is returned as an associative array with the 'responetype' key set to 'userfeedbacks' and the 'userfeedbacks' key containing the user feedback data.
     *
     * @return array An associative array containing the user feedback data.
     */
    public  function prepare_userfeedbacks($config) {

        $feedbackdata = $this->get_user_info();
        // $userfeedback = json_decode(get_config("theme_remui","submited_feedbacks"),true);
        $feedbackdata['responsetype'] = "userfeedbacks";
        $feedbackdata['userfeedbacks'] = $config;

        return $feedbackdata;
    }

    /**
     * Retrieves the user's information, including the customer name, email, plugin name, and license key.
     *
     * This method retrieves the user's information from the Moodle configuration and returns it as an associative array. The information includes the customer name, email, plugin name, and license key.
     *
     * @return array An associative array containing the user's information.
     */
    public function get_user_info() {
        $userinfodata = [
            'customername' => '',
            'email' => '',
            'pluginame' => '',
            'licensekey' => ''
        ];

        $licensekey = get_config("theme_remui", "edd_remui_license_key");

        if ($licensekey) {
            $userinfo = get_config("theme_remui", "edd_remui_setup_license_data");
            if ($userinfo) {
                $userinfo = json_decode($userinfo, true);
            } else {
                $controller = new \theme_remui\controller\RemUIController($licensekey);
                $licensedata = $controller->request_license_data_for_setup_wizard($licensekey);
                set_config('edd_remui_setup_license_data', json_encode($licensedata), 'theme_remui');
                $userinfo = $licensedata;
            }

            $userinfodata['customername'] = $userinfo['customer_name'] ?? '';
            $userinfodata['email'] = $userinfo['customer_email'] ?? '';
            $userinfodata['pluginame'] = $userinfo['item_name'] ?? '';
            $userinfodata['licensekey'] = $licensekey;
        }
        return $userinfodata;
    }
}
