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
 * @package   block_edwiseradvancedblock
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Gourav Govande
 */

require_once('../../config.php');
// require_once('/var/www/remui/html/v39/config.php');

global $CFG, $OUTPUT;
require_once($CFG->dirroot . "/blocks/edwiseradvancedblock/lib.php");

require_login();
$blockinstance = required_param('bui_edit', PARAM_INT);
require_capability(
    "block/edwiseradvancedblock:cancustomizelive",
    \context_block::instance($blockinstance)
);
$PAGE->set_url('/blocks/edwiserblocks/editor.php', array('bui_edit' => $blockinstance));
$PAGE->set_context(context_system::instance());
$urls = $PAGE->theme->css_urls($PAGE);
foreach ($urls as $url) {
    $PAGE->requires->css_theme($url);
}
$config = block_edwiseradvancedblock_get_config($blockinstance);
$templatecontext = [];
$templatecontext['output'] = $OUTPUT;
$templatecontext['jsjquery'] = $CFG->wwwroot . '/local/edwiserpagebuilder/js/jquery.min.js';
$templatecontext['jsbootstrap'] = $CFG->wwwroot . '/local/edwiserpagebuilder/js/bootstrap.min.js';
$templatecontext['jsslick'] = $CFG->wwwroot . '/local/edwiserpagebuilder/js/slick.min.js';
$templatecontext['editorhelpercss'] = $CFG->wwwroot . '/local/edwiserpagebuilder/styles/vvvebjs-editor-helpers.css';
$templatecontext['blockstyle'] = $CFG->wwwroot . '/blocks/edwiseradvancedblock/style.css';


if (!is_null($config)) {

    // We user editing block 2nd time all multilang content is not visible because by using format_text it's showing string according to lang
    // For solving this issue we are going to format_text only the necessory ones, and in this case Shortcodes for dynamic blocks (enclosed within `[]`)

    // Process shortcode formats
    $content = $config->html['text'];
    $pattern = '/\[edwiser[\w-]*(?:\s+[^]]+)?\]/';

    preg_match_all($pattern, $content, $matches);

    foreach ($matches[0] as $match) {
        $formatted = format_text($match, FORMAT_HTML, array("noclean" => true));
        $content = str_replace($match, $formatted, $content);
    }

    $templatecontext['blockhtml'] = pre_process_html($content, $blockinstance);
    $templatecontext['blockcss'] = pre_process_html($config->css['text'], $blockinstance);
    $templatecontext['blockjs'] = pre_process_html($config->js['text'], $blockinstance);
}

echo $OUTPUT->render_from_template('block_edwiseradvancedblock/blockpage', $templatecontext);
