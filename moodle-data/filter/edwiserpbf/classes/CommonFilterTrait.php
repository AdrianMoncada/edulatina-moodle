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

namespace filter_edwiserpbf;

/**
 * Class common_filter
 *
 * @package    filter_edwiserpbf
 * @copyright  2024 YOUR NAME <your@email.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Trait providing common functionality for filtering text and replacing shortcodes.
 *
 * This trait provides methods for filtering text and replacing various types of shortcodes, including:
 * - Courses shortcodes
 * - Categories shortcodes
 * - CNC (Courses and Categories) shortcodes
 * - Featured courses shortcodes
 * - Remuiblck shortcodes
 *
 * The `filter_tags()` method is used to convert the shortcode tags into an associative array.
 * The `filter()` method is the main entry point for filtering the text and replacing the shortcodes.
 */
trait CommonFilterTrait {
    /**
     * Filter tags and convert to associative array
     * @param  array $tags Tags array
     * @return array       Tags array
     */
    private function filter_tags($tags) {
        $assoarr = array();
        for ($i = 1; $i < count($tags); $i++) {
            $assoarr[$tags[$i][0]] = $tags[$i + 1][0];
            $i = $i + 1;
        }
        return $assoarr;
    }

    public function filter($text, array $options = array())  {

        if (!is_string($text) or empty($text)) {
            return $text;
        }

        $edwisershortcode = "[edwiser-";

        $pos = strpos($text, $edwisershortcode);

        if ($pos === false) {
            return $text;
        }
        // Courses Pregmatch
        $pregmatch = "(\[edwiser\-courses[ ]+(catid)\=[\'\"’‘“”]([a-zA-Z0-9,]+)[\'\"’‘“”][ ](layout)\=[\'\"’‘“”]([a-zA-Z0-9]+)[\'\"’‘“”]\])";

        preg_match_all(
            $pregmatch,
            $text,
            $tags
        );

        // Find the replacement Text
        if (isset($tags[0][0]) && $tags[0][0] != "") {
            $replace = $tags[0][0];

            // Filter the shortcode tags to object
            $tags = $this->filter_tags($tags);

            // Content Generation
            $cg = new ContentGenerator();
            $content = $cg->generate_courses($tags);

            // return $text;
            return str_replace($replace, $content, $text);
        }

        // Categories Pregmatch
        $pregmatch = "(\[edwiser\-categories[ ]+(layout)\=[\'\"’‘“”]([a-zA-Z0-9]*)[\'\"’‘“”][ ](btnlabel)\=[\'\"’‘“”]([a-zA-Z0-9]+)[\'\"’‘“”][ ](count)\=[\'\"’‘“”]([a-zA-Z0-9]+)[\'\"’‘“”]\])";

        preg_match_all(
            $pregmatch,
            $text,
            $tags
        );

        // Find the replacement Text
        if (isset($tags[0][0]) && $tags[0][0] != "") {
            $replace = $tags[0][0];

            // Filter the shortcode tags to object
            $tags = $this->filter_tags($tags);

            // Content Generation
            $cg = new ContentGenerator();
            $content = $cg->generate_categories($tags);

            // return $text;
            return str_replace($replace, $content, $text);
        }

        // Categories Pregmatch
        $pregmatch = "(\[edwiser\-cnc[ ]+(layout)\=[\'\"’‘“”]([a-zA-Z0-9]*)[\'\"’‘“”][ ](show)\=[\'\"’‘“”]([a-zA-Z0-9]+)[\'\"’‘“”][ ](catid)\=[\'\"’‘“”]([a-zA-Z0-9,]+)[\'\"’‘“”][ ](date)\=[\'\"’‘“”]([a-zA-Z0-9]+)[\'\"’‘“”]\])";

        preg_match_all(
            $pregmatch,
            $text,
            $tags
        );
        // Find the replacement Text
        if (isset($tags[0][0]) && $tags[0][0] != "") {
            $replace = $tags[0][0];

            // Filter the shortcode tags to object
            $tags = $this->filter_tags($tags);

            // Content Generation
            $cg = new ContentGenerator();
            // $content = $cg->generate_categories($tags);
            $content = $cg->generate_cnc_content($tags);
            // return $content;
            // return $text;
            return str_replace($replace, $content, $text);
        }

        // Featured courses pregmatch
        $pregmatch = "(\[edwiser\-fc[ ]+(layout)\=[\'\"’‘“”]([a-zA-Z0-9]*)[\'\"’‘“”][ ](show)\=[\'\"’‘“”]([a-zA-Z0-9]+)[\'\"’‘“”][ ](courseid)\=[\'\"’‘“”]([a-zA-Z0-9,]+)[\'\"’‘“”][ ](date)\=[\'\"’‘“”]([a-zA-Z0-9]+)[\'\"’‘“”]\])";

        preg_match_all(
            $pregmatch,
            $text,
            $tags
        );
        // Find the replacement Text
        if (isset($tags[0][0]) && $tags[0][0] != "") {
            $replace = $tags[0][0];

            // Filter the shortcode tags to object
            $tags = $this->filter_tags($tags);

            // Content Generation
            $cg = new ContentGenerator();
            // $content = $cg->generate_categories($tags);
            $content = $cg->generate_fc_content($tags);
            // return $content;
            // return $text;
            return str_replace($replace, $content, $text);
        }

        //remuiblck
        $pregmatch = '/\[edwiser-remuiblck-[^\]]*\]/U';
        preg_match_all(
            $pregmatch,
            $text,
            $matches,
            PREG_SET_ORDER
        );

        $tags = array();




        foreach ($matches as $key => $match) {
            $tags[$key] = array($match[0]);

            // Extract attribute names and values
            preg_match_all('/(\w+)\s*=\s*["\']([^"\']+)["\']/', $match[0], $attributes, PREG_SET_ORDER);

            // Output attribute names and values
            foreach ($attributes as $attribute) {
                $tags[$key][] = array($attribute[1]);
                $tags[$key][] = array($attribute[2]);
            }
        }

        $fcontent = "";
        if (count($tags) == 0) {
            return $text;
        } else {
            $count = 0;
            foreach ($tags as $tag) {
                // Find the replacement Text
                if (isset($tag[0]) && $tag[0] != "") {
                    $replace = $tag[0];

                    // Filter the shortcode tags to object
                    $tag = $this->filter_tags($tag);

                    // Content Generation
                    $cg = new ContentGenerator();
                    // $content = $cg->generate_categories($tags);
                    $content = $cg->generate_remuiblck_content($tag);

                    if ($count == 0) {
                        $fcontent = str_replace($replace, $content, $text);
                    } else {
                        $fcontent = str_replace($replace, $content, $fcontent);
                    }
                    $count++;
                }
            }
            return $fcontent;
        }

        return $text;
    }
}