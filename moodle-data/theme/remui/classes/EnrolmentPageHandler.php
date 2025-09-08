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
 * Defines the cache usage
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace theme_remui;
    /**
     * Enrolment Page Handler
     */

class EnrolmentPageHandler {
    /**
     * Generate data for enrollment page.
     * @param incourse page context
     * @return context
     */

    public function generate_enrolment_page_context($templatecontext) {
        global $COURSE, $DB, $USER, $PAGE, $CFG, $OUTPUT;

        $cid = (int)$COURSE->id;

        $context = array();

        $temp = array();
        $temp['id'] = $COURSE->id;
        $temp['coursename'] = format_text($COURSE->fullname);
        $temp['category'] = format_text($COURSE->category);
        $temp['coursename'] = format_text($COURSE->fullname);

        $coursehandler = new \theme_remui_coursehandler();
        $coursedataarray = $coursehandler->get_courses(
            false,
            null,
            null,
            0,
            0,
            null,
            null,
            array(
                0=>$COURSE
            ),
            false
        );
        $coursedata = $coursedataarray[0];
        try {
            $coursecategory = \core_course_category::get($COURSE->category);
            $temp['categoryname'] = $coursecategory->get_formatted_name();
            $temp['categoryurl'] = $CFG->wwwroot . '/course/index.php?categoryid=' . $COURSE->category;
        } catch (\Exception $e) {
            $coursecategory = "";
            $categoryname = "";
            $categoryurl = "";
        }

        $coursecontext = \context_course::instance($cid);
        $roles =   array_flip(get_default_enrol_roles($coursecontext));
        $enrolledstudents = $coursedata['enrolleduserscount'];
        $temp['enrolledstudents'] = $enrolledstudents;

        $teachers = get_enrolled_users($coursecontext, 'mod/folder:managefiles', 0, '*', 'firstname');
        $temp['instructorcount'] = false;
        if ($teachers) {
            $profilecount = 0;
            $frontlineteacher = false;
            foreach ($teachers as $key => $teacher) {

                if ($frontlineteacher == false) {
                    $temp['instructor']['name'] = fullname($teacher, true);
                    if (count($teachers) > 1) {
                        $temp['instructor']['name'] = fullname($teacher, true);
                    }
                }

                $temp['instructor']['avatars'][] = [
                    'avatars' => $OUTPUT->user_picture($teacher),
                    'teacherprofileurl' => $CFG->wwwroot.'/user/profile.php?id='.$teacher->id
                ];
                $profilecount++;

                if ($profilecount >= 1) {
                    break;
                }
            }
            if(count($teachers)>1){
                $temp['instructorcount'] = (count($teachers) - 1);
            }
        }
        $context['noratingfound'] = false;
        if (is_plugin_available('block_edwiserratingreview')) {
            $rnr = new \block_edwiserratingreview\ReviewManager();
            $PAGE->requires->strings_for_js([
                'noreviewsfound',
            ], 'block_edwiserratingreview');
            // Get Ratings and Review Context.
            $rnrreviewfull = $rnr->generate_enrolpage_block($cid);
            $rnrshortdesignarray = utility:: get_ernr_coursecard_design($COURSE);
            $temp['rnrreviewdesign'] = $rnrshortdesignarray['rnrshortdesign'];
            if($rnrshortdesignarray['rnrshortratingvalue'] == 0 && (!$PAGE->user_is_editing())){
                $temp['rnrreviewdesign'] = false;
                $rnrreviewfull = false;
            }
            if($rnrshortdesignarray['rnrshortratingvalue'] == 0 && $PAGE->user_is_editing()){
                $context['noratingfound'] = true;
                $rnrreviewfull = true;
            }
        }

        $temp['totallessons'] = $coursedata['lessoncount'];

        $customfielddata = get_course_metadata($cid);

        if (isset($customfielddata['edwcourseintrovideourlembedded'])) {
            $temp['introvideourl'] = $customfielddata['edwcourseintrovideourlembedded'];
        }

        // Header section Context.
        $context['headersection'] = $temp;

        $temp = array();

        $temp['coursesummary'] = format_text(file_rewrite_pluginfile_urls($COURSE->summary, 'pluginfile.php', $coursecontext->id, 'course', 'summary', NULL),FORMAT_HTML,array("noclean"=> true));

        if (isset($rnrreviewfull)) {
            $temp['rnrreviewfull'] = $rnrreviewfull;
        }

        $context['courseoverview'] = $temp;

        // Enrollment Data - Pricing Section.
        $temp = array();
        $temp = $this->get_course_purchase_details($COURSE->id);
        $temp['enrolledstudents'] = $enrolledstudents;
        $temp['enrolledusertitletext'] = $coursedata['enrolledusertitletext'];

        if (isset($customfielddata['edwcourseduration'])) {
            $temp['courselength'] = format_text($customfielddata['edwcourseduration'], FORMAT_HTML);
        }

        if (isset($customfielddata['edwskilllevel']) && Utility::get_skilllevel_by_courseid($COURSE->id)) {
            $temp['skilllevel'] = get_string('skill' . $customfielddata['edwskilllevel'], 'theme_remui');
        }

        $temp['totallessons'] = $coursedata['lessoncount'];
        $temp['lessonstitletext'] = $coursedata['lessonstitletext'];

        $temp['additionalcustomfields'] = $this->get_additional_custom_metadata_html($cid);
        $temp['showselecteddatesetting'] = $coursedata['showselecteddatesetting'];
        $temp['showselecteddatesettingname'] = $coursedata['showselecteddatesettingname'];
        $temp['showselecteddatesettingdate'] = $coursedata['showselecteddatesettingdate'];
        $langarray = \get_string_manager()->get_list_of_translations();
        $language = $langarray["en"];
        if ($COURSE->lang != "" && isset($langarray[$COURSE->lang])) {
            $language = $langarray[$COURSE->lang];
        }
        $temp['language'] = $language;

        $context['pricingsection'] = $temp;
        $customfieldsarray = array_values(get_all_remui_course_metadata($COURSE->id));
        $customfieldcatgory_id = "";
        if(empty(!$customfieldsarray)){
            $customfieldcatgory_id = $customfieldsarray[0]['categoryid'];
        }
        $context['ismanager'] = utility::check_user_admin_cap($USER);
        $context['courseimage'] = $coursedata['courseimage'];
        $context['relatedcourses'] = $this->get_related_courses ();
        $context['coursearcivecaturl'] = $CFG->wwwroot."/course/index.php?categoryid=".$COURSE->category;
        $context['latestcourses'] = $this->get_latest_courses();
        $context['courseurl'] = $CFG->wwwroot."/course/view.php?id=".$COURSE->id;
        $context['hasrelatedcourses'] = get_config("theme_remui", 'showrelatedcourse');
        $context['haslatestcourses'] = get_config("theme_remui", 'showlatestcourse');
        $context['showrelatedcoursesblock'] = true;
        $context['showlatestcoursesblock'] = true;

        if(!$context['relatedcourses']){
            $context['showrelatedcoursesblock'] = false;
        }
        if(!$context['latestcourses']){
            $context['showlatestcoursesblock'] = false;
        }

        $hasintstructors = true;
        if(count($teachers) == 0){
            $hasintstructors = false;
        }
        $context['hasintstructors']  = $hasintstructors;

        $context['hasnarrowidth']   = (get_config("theme_remui", "pagewidth") == 'fullwidth') ? false : true;
        $context['editing'] = $PAGE->user_is_editing();
        $context['editcoursetitle'] = $CFG->wwwroot.'/course/edit.php?id='.$COURSE->id.'#id_fullname';
        $context['editcategorylink'] = $CFG->wwwroot.'/course/edit.php?id='.$COURSE->id.'#id_category';
        $context['editcategorylink'] = $CFG->wwwroot.'/course/edit.php?id='.$COURSE->id.'#id_category';
        $context['editinstructorspageurl'] = $CFG->wwwroot.'/user/index.php?id='.$COURSE->id;
        $context['editapprovalpageurl'] = $CFG->wwwroot.'/blocks/edwiserratingreview/admin.php';
        $context['editcourseintorvideourllink'] = $CFG->wwwroot.'/course/edit.php?id='.$COURSE->id.'#id_category_'.$customfieldcatgory_id;;
        $context['enrolloptionshidden']  = get_config('theme_remui', "enrolloptionshidden".$COURSE->id);
        $context['editcourseimglink'] = $CFG->wwwroot.'/course/edit.php?id='.$COURSE->id.'#fitem_id_overviewfiles_filemanager';
        $context['editenrolmethodspagelink'] = $CFG->wwwroot.'/enrol/instances.php?id='.$COURSE->id;
        $context['editaddremuicustomfieldlink'] = $CFG->wwwroot.'/course/customfield.php'.'#category-'.$customfieldcatgory_id;
        $context['editcoursecustomfields'] = $CFG->wwwroot.'/course/edit.php?id='.$COURSE->id.'#id_category_'.$customfieldcatgory_id;
        $context['editcoursedesclink'] = $CFG->wwwroot.'/course/edit.php?id='.$COURSE->id.'#id_descriptionhdrcontainer';
        $context['editcourseinforsettinglink'] = $CFG->wwwroot.'/admin/settings.php?section=themesettingremui#theme_remui_course';
        $context['editfreelabelsettinglink'] = $CFG->wwwroot.'/admin/settings.php?section=themesettingremui&settingsectionname=admin-enrolment_payment#theme_remui_course';
        $context['editreletedlatestsettinglink'] = $CFG->wwwroot.'/admin/settings.php?section=themesettingremui&settingsectionname=admin-showrelatedcourse#theme_remui_course';
        $context['playiconurl'] = $OUTPUT->image_url("play", "theme_remui");
        $context['csstohidemainarearemuifields'] = $this->get_css_to_hide_custom_metadata_inmainwarpper($COURSE->id);
        return $context;
    }

    /**
     * Course purchase details.
     * @param courseid
     * @return context
     */

    public function get_course_purchase_details($courseid) {
        global $PAGE;
        // Default data.
        $enroldata = array('courseprice' => '', 'hascost' => 0);
        $buttontext = get_string('enrolnow', 'theme_remui',get_string('enrol', 'enrol'));
	 $buttontextinput = $buttontext;

        $buttonurl  = '#maincontent';
        $textforbtnlinkinput = '#';
        // Return No cost if theme setting does not allow for each course.
        if (isset($PAGE->theme->settings->showcoursepricing) && $PAGE->theme->settings->showcoursepricing == 1) {
            $enroldata = $this->get_payment_details($courseid);
        }
        // Button text will be "Buy & Enrol now", if payment is active. Otherwise only 'Enrol Now'.
        // if ($enroldata['hascost'] == 1 && $enroldata['courseprice'] != get_string('course_free', 'theme_remui')) {
        //     $buttontext = get_string('buyand', 'theme_remui') . $buttontext;
        // }

        $contextdata = [];
        if ($enroldata['hascost'] == 1) {
            $contextdata['hascost'] = $enroldata['hascost'];
            $contextdata['courseprice'] = $enroldata['courseprice'];
            $contextdata['currency'] = $enroldata['currency'];
        }
        $variable1 = "enrollnowbtntext".$courseid;
        $variable2 = "enrollnowbtnlink".$courseid;

        if(get_config('theme_remui', $variable1)){
            $buttontextinput = get_config('theme_remui',$variable1);
            $buttontext = format_text($buttontextinput, FORMAT_HTML);
        }

        if(get_config('theme_remui',$variable2) && ((get_config('theme_remui',$variable2)!='#'))){
            $buttonurl = get_config('theme_remui',$variable2);
            $textforbtnlinkinput = $buttonurl;
        }
        if($PAGE->user_is_editing()){
            $buttonurl = '#';
        }
        $custompricetext = "custompricetext".$courseid;

        if(get_config('theme_remui', $custompricetext)) {
            $customcoursepriceinput = get_config('theme_remui', $custompricetext);
            $customcourseprice = format_text($customcoursepriceinput, FORMAT_HTML);
        } else {
            $customcourseprice = "";
            $customcoursepriceinput = "";
        }
        $contextdata['customcourseprice'] = $customcourseprice;
        $contextdata['customcoursepriceinput'] = $customcoursepriceinput;

        $contextdata['buttontext'] = $buttontext;
        $contextdata['buttontextinput'] = $buttontextinput;
        $contextdata['buttonurl'] = $buttonurl;
        $contextdata['textforbtnlinkinput'] = $textforbtnlinkinput;
        return $contextdata;
    }

    /**
     * Generate payment details.
     * @param courseid
     * @return Array
     */

    public function get_payment_details($courseid) {
        global $PAGE;

        $enrolinstances = enrol_get_instances($courseid, true);
        $wdmenrolmentcosts = array();
        $wdmarrayofcosts = array();

        foreach ($enrolinstances as $key => $instance) {
            if (!empty($instance->cost)) {
                $wdmcost = $instance->cost;
                $wdmmethod = $instance->enrol;
                $wdmcurrency = !empty($instance->currency) ? $instance->currency : get_string('currency', 'theme_remui');
                /* @wdmBreak */
                $wdmenrolmentcosts[$wdmcost] = new \stdClass();

                if (strpos($wdmcost, '.')) {
                    $wdmenrolmentcosts[$wdmcost]->cost = number_format($wdmcost, 2, '.', '' );
                } else {
                    $wdmenrolmentcosts[$wdmcost]->cost = $wdmcost;
                }
                $wdmenrolmentcosts[$wdmcost]->currency = $wdmcurrency;
                $wdmenrolmentcosts[$wdmcost]->method = $wdmmethod;
                $wdmarrayofcosts[] = $wdmcost;
            }
        }

        $wdmcoursehascost = 0;
        $wdmcurrencydisplay = '';
        if (!empty($wdmenrolmentcosts)) {
            $wdmcoursehascost = 1;
            $i = 0;
            $wdmcoursepricedisplay = '';
            foreach ($wdmenrolmentcosts as $key => $cost) {
                $i++;
                $thelocale = 'en';
                $thecurrency = !empty($cost->currency) ? $cost->currency : get_string('currency', 'theme_edumy');
                if (class_exists('NumberFormatter')) {
                    /* Extended currency symbol */
                    $formatmagic = new \NumberFormatter($thelocale."@currency=$thecurrency", \NumberFormatter::CURRENCY);
                    $wdmextendedcurrencysymbol = $formatmagic->getSymbol(\NumberFormatter::CURRENCY_SYMBOL);
                    /* Short currency symbol */
                    $formatter = new \NumberFormatter($thelocale, \NumberFormatter::CURRENCY);
                    $formatter->setPattern('¤');
                    $formatter->setAttribute(\NumberFormatter::MAX_SIGNIFICANT_DIGITS, 0);
                    $formattedprice = $formatter->formatCurrency(0, $thecurrency);
                    $zero = $formatter->getSymbol(\NumberFormatter::ZERO_DIGIT_SYMBOL);
                    $wdmcurrencysymbol = str_replace($zero, '', $formattedprice);

                    $wdmenrolmentcosts[$key]->extendedCurrencySymbol = $wdmextendedcurrencysymbol;
                    $wdmenrolmentcosts[$key]->currencySymbol = $wdmextendedcurrencysymbol;

                } else {
                    $wdmenrolmentcosts[$key]->extendedCurrencySymbol = $thecurrency;
                    $wdmenrolmentcosts[$key]->currencySymbol = get_string('currency_symbol', 'theme_remui');
                }
                $wdmstring = '';
                if ($i > 1) {
                    $wdmstring = " / ";
                }
                $pricinghtml = '<span class="pricing--price h-bold-2">'.$wdmstring.$wdmenrolmentcosts[$key]->extendedCurrencySymbol.$wdmenrolmentcosts[$key]->cost .'</span>';
                $currencyhtml = '<span class="pricing--currency h-semibold-4">'.$thecurrency.'</span>';
                $wdmcoursepricedisplay .=  $pricinghtml;
                // $wdmcoursepricedisplay .=  $pricinghtml.$currencyhtml;

                // $wdmcoursepricedisplay .= $wdmstring.$wdmenrolmentcosts[$key]->extendedCurrencySymbol . $wdmenrolmentcosts[$key]->cost;

                // $wdmcurrencydisplay .= $wdmstring.$thecurrency;
            }

        } else if (isset($PAGE->theme->settings->enrolment_payment) && ($PAGE->theme->settings->enrolment_payment == 1)) {
            $wdmcoursepricedisplay = '<span class="pricing--price h-bold-2">'.get_string('course_free', 'theme_remui').'</span>';
            $wdmcoursehascost = 1;
        } else if (isset($PAGE->theme->settings->enrolment_payment) && ($PAGE->theme->settings->enrolment_payment == 0) && $PAGE->user_is_editing()) {
            $wdmcoursepricedisplay = '<span class="pricing--price h-bold-2" style="opacity: 0.2;">'.get_string('course_free', 'theme_remui').'</span>';
            $wdmcoursehascost = 1;
        } else {
            $wdmcoursepricedisplay = '';
            $wdmcoursehascost = 0;
        }

        return array('courseprice' => $wdmcoursepricedisplay, 'hascost' => $wdmcoursehascost, 'currency' => $wdmcurrencydisplay);
    }

    public function get_related_courses () {
        global $COURSE, $OUTPUT;
        $hasnarrowidth = (get_config("theme_remui", "pagewidth") == 'fullwidth') ? false : true;
        $totalcount = false;
        $search = null;
        $category = $COURSE->category;
        $limitfrom = 0;
        $limitto = 10;
        $mycourses = null;
        $categorysort = null;
        $courses = [];
        $filtermodified = true;
        $recentcoursecardsdata = [
            "coursecards" => $this->get_enrolpage_courses($totalcount, $search, $category, $limitfrom, $limitto, $mycourses, $categorysort, $courses, $filtermodified)
        ];
        array_splice($recentcoursecardsdata['coursecards'], 4);
        if ($hasnarrowidth) {
            array_splice($recentcoursecardsdata['coursecards'], 3);
        }
        if(empty($recentcoursecardsdata['coursecards'])){
            return false;
        }
        return $OUTPUT->render_from_template('theme_remui/enrol_page_coursecards', $recentcoursecardsdata);

    }

    public function get_latest_courses() {
        global $COURSE, $OUTPUT, $DB;
        $datacourse = $DB->get_records('course', null, $sort = 'id DESC', $fields = '*', $limitfrom = 0, $limitnum = 20);
        $totalcount = false;
        $search = null;
        $category = null;
        $limitfrom = 0;
        $limitto = 25;
        $mycourses = null;
        $categorysort = null;
        $courses = $datacourse;
        $filtermodified = true;
        $latestcoursecardsdata = [
            "coursecards" => $this->get_enrolpage_courses($totalcount, $search, $category, $limitfrom, $limitto, $mycourses, $categorysort, $courses, $filtermodified)
        ];
        $defaultcardlimit = 12;
        $cardsmaxlimit = 20;
        $coursecounts = get_config('theme_remui', 'latestcoursecount');
        if (is_numeric($coursecounts) && $coursecounts > 0 && $coursecounts <= $cardsmaxlimit) {
            $defaultcardlimit = $coursecounts;
        }
        if (is_numeric($coursecounts) && $coursecounts > 0 &&  $coursecounts >= $cardsmaxlimit) {
            $defaultcardlimit = $cardsmaxlimit;
        }
        array_splice($latestcoursecardsdata['coursecards'], $defaultcardlimit);
        if(empty($latestcoursecardsdata['coursecards'])){
            return false;
        }
        return $OUTPUT->render_from_template('theme_remui/enrol_page_coursecards', $latestcoursecardsdata);
    }

    public function get_enrolpage_courses($totalcount, $search, $category, $limitfrom, $limitto, $mycourses, $categorysort, $courses, $filtermodified) {
        global  $COURSE;
        $coursehandler = new \theme_remui_coursehandler();
        $coursedata = $coursehandler->get_courses(
            $totalcount,
            $search,
            $category,
            $limitfrom,
            $limitto,
            $mycourses,
            $categorysort,
            $courses,
            $filtermodified
        );
        $allcourses = $coursedata;

        unset($allcourses);
        foreach ($coursedata as $course) {
            $allcourses[$course['courseid']] = $course;
        }
        unset($allcourses[$COURSE->id]);
        return $allcourses;
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

    public function action_update_enroll_now_btn($config){
        $config = json_decode($config);
        $variable1 = "enrollnowbtntext".$config->courseid;
        $variable2 = "enrollnowbtnlink".$config->courseid;
        $variable3 = "custompricetext".$config->courseid;

        set_config($variable1,$config->title,"theme_remui");
        set_config($variable2,$config->link,"theme_remui");
        set_config($variable3,$config->customprice,"theme_remui");

        $data = new \stdClass();
        $data->buttontext = format_text(get_config('theme_remui', $variable1), FORMAT_HTML);
        $data->buttonlink = "#";
        $data->customprice = format_text(get_config('theme_remui', $variable3), FORMAT_HTML);

        return $data;
    }

    /**
     * Updates the custom price text for a course.
     *
     * @param string $config A JSON-encoded configuration object containing the course ID and the new custom price text.
     * @return object An object containing the updated custom price text.
     */
    public function action_clear_ustomprice_and_link($config){
        $config = json_decode($config);
        $variable2 = "enrollnowbtnlink".$config->courseid;
        $variable3 = "custompricetext".$config->courseid;

        set_config($variable2,"","theme_remui");
        set_config($variable3,"","theme_remui");

        $data = new \stdClass();
        $data->buttonlink = "#";
        $data->customprice = get_config('theme_remui', $variable3);

        return $data;
    }

    public function action_update_enroll_option($config){
        $config = json_decode($config);
        $variable1 = "enrolloptionshidden".$config->courseid;
        set_config($variable1,$config->enrolloptionshidden,"theme_remui");
        $data = new \stdClass();
        $data->enrolloptionshidden = false;
        if(get_config('theme_remui', $variable1)){
            $data->enrolloptionshidden = true;
        }
        return $data;
    }
    /**
     * Function to fetch the customfield data.
     * @param  int $courseid  Course ID
     * @return Custom field data.
     */
    function get_additional_custom_metadata_html($courseid) {
        global $OUTPUT;
        $remuicustomfieldarray = get_all_remui_course_metadata($courseid);

        $customfielddata = get_course_metadata($courseid);

        $content = "";
        if(isset($customfielddata['edwskilllevel'])){
            unset($remuicustomfieldarray['edwskilllevel']);
        }

        if(isset($customfielddata['edwcourseduration'])){
            unset($remuicustomfieldarray['edwcourseduration']);
        }

        if (isset($customfielddata['edwcourseintrovideourlembedded'])) {
            unset($remuicustomfieldarray['edwcourseintrovideourlembedded']);
        }
        $remuicustomfieldarray = array_values($remuicustomfieldarray);
        foreach($remuicustomfieldarray as $singlecustomfield){
            $singlecustomfield["name"] = format_text($singlecustomfield["name"], FORMAT_HTML);
            $templatecontext['customfield'] = $singlecustomfield;
            $content .= $OUTPUT->render_from_template("theme_remui/enrol_singlecustomfield", $templatecontext);
        }
        return $content;
    }

    /**
     * Function to generate the css which will hide the  the customfield data in main wrapper.
     * @param  int $courseid  Course ID
     * @return Custom field data.
     */
    function get_css_to_hide_custom_metadata_inmainwarpper($courseid) {
        global $OUTPUT;
        $remuicustomfieldarray = get_all_remui_course_metadata($courseid);

        $customfielddata = get_course_metadata($courseid);

        $content = "";
        if(isset($customfielddata['edwskilllevel'])){
            unset($remuicustomfieldarray['edwskilllevel']);
        }

        if(isset($customfielddata['edwcourseduration'])){
            unset($remuicustomfieldarray['edwcourseduration']);
        }

        if (isset($customfielddata['edwcourseintrovideourlembedded'])) {
            unset($remuicustomfieldarray['edwcourseintrovideourlembedded']);
        }
        $remuicustomfieldarray = array_values($remuicustomfieldarray);

        // Prefix each shortname with "id_"
        $shortnames = array_map(function($item) {
            return '.customfields-container .customfield_' . $item['shortname'];
        }, $remuicustomfieldarray);

        // Join shortnames with comma
        $shortnamesString = implode(',', $shortnames);

        // Create the final string
        $resultString = "<style>"."$shortnamesString{display:none}"."</style>";

        return $resultString;
    }
}
