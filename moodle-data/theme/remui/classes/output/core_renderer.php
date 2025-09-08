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
 * Renderers to align Moodle's HTML with that expected by Bootstrap
 *
 * @package    theme_remui
 * @copyright  2012 Bas Brands, www.basbrands.nl
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_remui\output;

use moodle_url;
use html_writer;
use context_system;
use moodle_page;
use block_contents;
// use core\di;
// use core\hook\manager as hook_manager;

class core_renderer extends \core_renderer {
    /**
     * Theme configuration
     * @var object
     */
    protected $themeconfig;

    /**
     * Constructor
     *
     * @param moodle_page $page the page we are doing output for.
     * @param string $target one of rendering target constants
     */
    public function __construct(moodle_page $page, $target) {
        parent::__construct($page, $target);
        $this->themeconfig = array(\theme_config::load('remui'));
    }

    /**
     * Get theme configuration
     * @return object Theme configuration
     */
    public function get_theme_config() {
        return $this->themeconfig;
    }

    /**
     * Returns HTML to display a "Turn editing on/off" button in a form.
     *
     * @param moodle_url $url The URL + params to send through when clicking the button
     * @param string $method
     * @return string HTML the button
     */
    public function edit_button(moodle_url $url, string $method = 'post') {
        if ($this->page->theme->haseditswitch) {
            return;
        }
        $url->param('sesskey', sesskey());
        if ($this->page->user_is_editing()) {
            $url->param('edit', 'off');
            $editstring = get_string('turneditingoff');
        } else {
            $url->param('edit', 'on');
            $editstring = get_string('turneditingon');
        }
        $button = new \single_button($url, $editstring, $method, attributes: ['class' => 'btn btn-primary']);
        return $this->render_single_button($button);
    }

    /**
     * Renders the "breadcrumb" for all pages in remui.
     *
     * @return string the HTML for the navbar.
     */
    public function navbar(): string {
        $newnav = new \theme_remui\remuinavbar($this->page);
        return $this->render_from_template('core/navbar', $newnav);
    }

    /**
     * Renders the context header for the page.
     *
     * @param array $headerinfo Heading information.
     * @param int $headinglevel What 'h' level to make the heading.
     * @return string A rendered context header.
     */
    public function context_header($headerinfo = null, $headinglevel = 1): string {
        global $DB, $USER, $CFG, $SITE;
        require_once($CFG->dirroot . '/user/lib.php');
        $context = $this->page->context;
        $heading = null;
        $imagedata = null;
        $subheader = null;
        $userbuttons = null;

        // Make sure to use the heading if it has been set.
        if (isset($headerinfo['heading'])) {
            $heading = $headerinfo['heading'];
        } else {
            $heading = $this->page->heading;
        }

        // The user context currently has images and buttons. Other contexts may follow.
        if ((isset($headerinfo['user']) || $context->contextlevel == CONTEXT_USER) && $this->page->pagetype !== 'my-index') {
            if (isset($headerinfo['user'])) {
                $user = $headerinfo['user'];
            } else {
                // Look up the user information if it is not supplied.
                $user = $DB->get_record('user', array('id' => $context->instanceid));
            }

            // If the user context is set, then use that for capability checks.
            if (isset($headerinfo['usercontext'])) {
                $context = $headerinfo['usercontext'];
            }

            // Only provide user information if the user is the current user, or a user which the current user can view.
            // When checking user_can_view_profile(), either:
            // If the page context is course, check the course context (from the page object) or;
            // If page context is NOT course, then check across all courses.
            $course = ($this->page->context->contextlevel == CONTEXT_COURSE) ? $this->page->course : null;

            if (user_can_view_profile($user, $course)) {
                // Use the user's full name if the heading isn't set.
                if (empty($heading)) {
                    $heading = fullname($user);
                }

                $imagedata = $this->user_picture($user, array('size' => 100));

                // Check to see if we should be displaying a message button.
                if (!empty($CFG->messaging) && has_capability('moodle/site:sendmessage', $context)) {
                    $userbuttons = array(
                        'messages' => array(
                            'buttontype' => 'message',
                            'title' => get_string('message', 'message'),
                            'url' => new moodle_url('/message/index.php', array('id' => $user->id)),
                            'image' => 'message',
                            'linkattributes' => \core_message\helper::messageuser_link_params($user->id),
                            'page' => $this->page
                        )
                    );

                    if ($USER->id != $user->id) {
                        $iscontact = \core_message\api::is_contact($USER->id, $user->id);
                        $contacttitle = $iscontact ? 'removefromyourcontacts' : 'addtoyourcontacts';
                        $contacturlaction = $iscontact ? 'removecontact' : 'addcontact';
                        $contactimage = $iscontact ? 'removecontact' : 'addcontact';
                        $userbuttons['togglecontact'] = array(
                                'buttontype' => 'togglecontact',
                                'title' => get_string($contacttitle, 'message'),
                                'url' => new moodle_url('/message/index.php', array(
                                        'user1' => $USER->id,
                                        'user2' => $user->id,
                                        $contacturlaction => $user->id,
                                        'sesskey' => sesskey())
                                ),
                                'image' => $contactimage,
                                'linkattributes' => \core_message\helper::togglecontact_link_params($user, $iscontact),
                                'page' => $this->page
                            );
                    }

                    $this->page->requires->string_for_js('changesmadereallygoaway', 'moodle');
                }
            } else {
                $heading = null;
            }
        }

        $prefix = null;
        if ($context->contextlevel == CONTEXT_MODULE) {
            if ($this->page->course->format === 'singleactivity') {
                $heading = $this->page->course->fullname;
            } else {
                $heading = $this->page->cm->get_formatted_name();
                $imagedata = $this->pix_icon('monologo', '', $this->page->activityname, ['class' => 'activityicon']);
                $purposeclass = plugin_supports('mod', $this->page->activityname, FEATURE_MOD_PURPOSE);
                $purposeclass .= ' activityiconcontainer';
                $purposeclass .= ' modicon_' . $this->page->activityname;
                $imagedata = html_writer::tag('div', $imagedata, ['class' => $purposeclass]);
                if($this->page->user_is_editing()){
                    $prefix = get_string('modulename', $this->page->activityname);
                }else{
                    $prefix = "";
                }
            }
        }

        $contextheader = new \context_header($heading, $headinglevel, $imagedata, $userbuttons, $prefix);
        return $this->render_context_header($contextheader);
    }

     /**
      * Renders the header bar.
      *
      * @param context_header $contextheader Header bar object.
      * @return string HTML for the header bar.
      */
    protected function render_context_header(\context_header $contextheader) {

        $classes = 'h2 header-heading';

        if ($this->page->pagelayout == 'course' && $design = get_config('theme_remui', 'courseheaderdesign')) {
            $classes .= ' coursepage design-'.$design;
        }
        if ($this->page->pagelayout == 'standard' && $this->page->pagetype == 'search-index') {
            $contextheader->heading = get_string('globarsearchresult', 'theme_remui');
        }
        // Generate the heading first and before everything else as we might have to do an early return.
        if (!isset($contextheader->heading)) {
            $heading = $this->heading($this->page->heading, $contextheader->headinglevel, $classes);
        } else {
            $heading = $this->heading($contextheader->heading, $contextheader->headinglevel, $classes);
        }
        // All the html stuff goes here.
        $html = html_writer::start_div('page-context-header');

        // Image data.
        if (isset($contextheader->imagedata)) {
            // Header specific image.
            $html .= html_writer::div($contextheader->imagedata, 'page-header-image mr-2');
        }

        // Headings.
        if (isset($contextheader->prefix)) {
            $prefix = html_writer::div($contextheader->prefix, 'text-muted text-uppercase small line-height-3');
            $heading = $prefix . $heading;
        }
        $html .= html_writer::tag('div', $heading, array('class' => 'page-header-headings'));

        // Buttons.
        if (isset($contextheader->additionalbuttons)) {
            $html .= html_writer::start_div('btn-group header-button-group');
            foreach ($contextheader->additionalbuttons as $button) {
                if (!isset($button->page)) {
                    // Include js for messaging.
                    if ($button['buttontype'] === 'togglecontact') {
                        \core_message\helper::togglecontact_requirejs();
                    }
                    if ($button['buttontype'] === 'message') {
                        \core_message\helper::messageuser_requirejs();
                    }
                    $image = $this->pix_icon($button['formattedimage'], $button['title'], 'moodle', array(
                        'class' => 'iconsmall',
                        'role' => 'presentation'
                    ));
                    $image .= html_writer::span($button['title'], 'header-button-title');
                } else {
                    $image = html_writer::empty_tag('img', array(
                        'src' => $button['formattedimage'],
                        'role' => 'presentation'
                    ));
                }
                $html .= html_writer::link($button['url'], html_writer::tag('span', $image), $button['linkattributes']);
            }
            $html .= html_writer::end_div();
        }
        $html .= html_writer::end_div();
        return $html;
    }

    /**
     * See if this is the first view of the current cm in the session if it has fake blocks.
     *
     * (We track up to 100 cms so as not to overflow the session.)
     * This is done for drawer regions containing fake blocks so we can show blocks automatically.
     *
     * @return boolean true if the page has fakeblocks and this is the first visit.
     */
    public function firstview_fakeblocks(): bool {
        global $SESSION;

        $firstview = false;
        if ($this->page->cm) {
            if (!$this->page->blocks->region_has_fakeblocks('side-pre')) {
                return false;
            }
            if (!property_exists($SESSION, 'firstview_fakeblocks')) {
                $SESSION->firstview_fakeblocks = [];
            }
            if (array_key_exists($this->page->cm->id, $SESSION->firstview_fakeblocks)) {
                $firstview = false;
            } else {
                $SESSION->firstview_fakeblocks[$this->page->cm->id] = true;
                $firstview = true;
                if (count($SESSION->firstview_fakeblocks) > 100) {
                    array_shift($SESSION->firstview_fakeblocks);
                }
            }
        }
        return $firstview;
    }
    /**
     * Returns a search box.
     *
     * @param  string $id     The search box wrapper div id, defaults to an autogenerated one.
     * @return string         HTML with the search form hidden by default.
     */
    public function edw_search_box($id = false) {
        global $CFG;

        // Accessing $CFG directly as using \core_search::is_global_search_enabled would
        // result in an extra included file for each site, even the ones where global search
        // is disabled.
        if (empty($CFG->enableglobalsearch) || !has_capability('moodle/search:query', context_system::instance())) {
            return '';
        }

        $data = [
            'edw_navbar' => true,
            'action' => new moodle_url('/search/index.php'),
            'hiddenfields' => (object) ['name' => 'context', 'value' => $this->page->context->id],
            'inputname' => 'q',
            'searchstring' => get_string('search'),
            ];
        return $this->render_from_template('core/search_input_navbar', $data);
    }
    /**
     * This function will help us generate branding logos.
     * @return Branding Context array()
     */
    public function get_branding_context() {
        global $SITE;
        $context = [];

        if ($this->page->pagelayout == 'login') {

            if (\theme_remui\toolbox::get_setting('brandlogopos') == 0) {
                // Brand logo disabled.
                return false;
            }

            $context['incontainer'] = true;
            if (\theme_remui\toolbox::get_setting('brandlogopos') == 2 && \theme_remui\toolbox::get_setting('loginpagelayout') != 'logincenter') {
                $context['incontainer'] = false;
            }

            $loginpanellogo = \theme_remui\toolbox::setting_file_url('loginpanellogo', 'loginpanellogo');

            if ($loginpanellogo) {
                $context['logourl'] = $loginpanellogo;
                return $context;
            }
        }

        $logoorsitename = \theme_remui\toolbox::get_setting('logoorsitename');

        switch ($logoorsitename) {
            case 'logo':
                $logo = \theme_remui\toolbox::setting_file_url('logo', 'logo');
                $darklogo = \theme_remui\toolbox::setting_file_url('darkmodelogo', 'darkmodelogo');
                if (empty($logo)) {
                    $logo = \theme_remui\toolbox::image_url('logo', 'theme');
                }
                $context['logourl'] = $logo;
                if (empty($darklogo)) {
                    $darklogo = $logo;
                }
                $context['darklogourl'] = $darklogo;
                break;
            case 'logomini':
                $logomini = \theme_remui\toolbox::setting_file_url('logomini', 'logomini');
                $darklogomini = \theme_remui\toolbox::setting_file_url('darkmodelogomini', 'darkmodelogomini');
                if (empty($logomini)) {
                    $logomini = \theme_remui\toolbox::image_url('logomini', 'theme');
                }
                $context['logominiurl'] = $logomini;
                if (empty($darklogomini)) {
                    $darklogomini = $logomini;
                }
                $context['darklogominiurl'] = $darklogomini;
                break;
            case 'icononly':
                $context['icononly'] = true;
                $context['color'] = \theme_remui\toolbox::get_theme_setting('sitenamecolor');
                $context['siteicon'] = trim(\theme_remui\toolbox::get_setting('siteicon'));
                break;
            case 'iconsitename':
                $context['iconwithsitename'] = true;
                $context['color'] = \theme_remui\toolbox::get_theme_setting('sitenamecolor');
                $context['siteicon'] = trim(\theme_remui\toolbox::get_setting('siteicon'));
                $context['sitename'] = format_string($SITE->shortname);
                break;
            default:
                $context['iconwithsitename'] = true;
                $context['sitename'] = format_string($SITE->shortname);
                break;
        }

        return $context;
    }

    /**
     * Returns the HTML for the site support email link
     *
     * @return string The html code for support and feedback.
     */
    public function edw_feedback_and_support() {
        if (is_siteadmin() && get_config('theme_remui', 'enableedwfeedback')) {
            return true;
        }
        return false;
    }

    /**
     * Returns a string containing a link to the user documentation.
     * Also contains an icon by default. Shown to teachers and admin only.
     *
     * @param string $path The page link after doc root and language, no leading slash.
     * @param string $text The text to be displayed for the link
     * @param boolean $forcepopup Whether to force a popup regardless of the value of $CFG->doctonewwindow
     * @param array $attributes htm attributes
     * @return string
     */
    public function doc_link($path, $text = '', $forcepopup = false, array $attributes = []) {
        global $CFG;

        $icon = $this->pix_icon('book', '', 'moodle', array('class' => 'edw-icon-Report', 'role' => 'presentation'));
        $icon = '<span>'.$icon.'</span>';
        $attributes['href'] = new moodle_url(get_docs_url($path));
        $newwindowicon = '';
        if (!empty($CFG->doctonewwindow) || $forcepopup) {
            $attributes['target'] = '_blank';
            $newwindowicon = $this->pix_icon('i/externallink', get_string('opensinnewwindow'), 'moodle',
            ['class' => 'fa  fa-fw']);
        }
        $icon = html_writer::div($icon, "popover-icon-wrapper");
        $doclinkhtml = $icon.html_writer::tag('a', $text . $newwindowicon, $attributes);
        return $doclinkhtml;
    }

        /**
         * Returns the HTML for the site support email link
         *
         * @return string The html code for check FAQ.
         */
    public function edwiser_check_faq() {
        if (is_siteadmin() && get_config('theme_remui', 'enableedwfeedback')) {
            $attributes = [
                'href' => "https://edwiser.helpscoutdocs.com/category/83-product-support",
                'target' => "_blank",
                'rel' => "nofollow"
            ];

            return html_writer::tag('a', get_string('checkfaq', 'theme_remui'), $attributes);
        }
        return null;
    }

        /**
         * Returns the services and support link for the help pop-up.
         *
         * @return string
         */
    public function services_support_link(): string {
        global $CFG;

        if (during_initial_install() ||
            (isset($CFG->showservicesandsupportcontent) && $CFG->showservicesandsupportcontent == false) ||
            !is_siteadmin()) {
            return '';
        }

        $liferingicon = $this->pix_icon('t/life-ring', '', 'moodle', ['class' => 'fa edw-icon-Support']);
        $newwindowicon = $this->pix_icon('i/externallink', get_string('opensinnewwindow'), 'moodle', ['class' => 'ml-1']);
        $link = 'https://moodle.com/help/?utm_source=CTA-banner&utm_medium=platform&utm_campaign=name~Moodle4+cat~lms+mp~no';
        $content = get_string('moodleservicesandsupport') . $newwindowicon;
        $liferingicon = '<span>'.$liferingicon.'</span>';
        $liferingicon = html_writer::div($liferingicon, 'popover-icon-wrapper');
        $servicesupporthtml = $liferingicon.html_writer::tag('a', $content, ['target' => '_blank', 'href' => $link]);
        return $servicesupporthtml;
    }

    /**
     * Returns the HTML for the site support email link
     *
     * @param array $customattribs Array of custom attributes for the support email anchor tag.
     * @return string The html code for the support email link.
     */
    public function supportemail(array $customattribs = [], bool $embed = false): string {
        global $CFG;

        $label = get_string('contactsitesupport', 'admin');
        $icon = $this->pix_icon('t/email', '', 'moodle');
        $content = $label;

        if (!empty($CFG->supportpage)) {
            $attributes = ['href' => $CFG->supportpage, 'target' => 'blank'];
            $content .= $this->pix_icon('i/externallink', '', 'moodle', ['class' => 'ml-1']);
        } else {
            $attributes = ['href' => $CFG->wwwroot . '/user/contactsitesupport.php'];
        }

        $attributes += $customattribs;
        $icon = '<span>'.$icon.'</span>';
        $icon  = html_writer::div($icon, 'popover-icon-wrapper');
        $supportemailhtml = $icon.html_writer::tag('a', $content, $attributes);
        return $supportemailhtml;
    }

        /**
         * Wrapper for header elements.
         *
         * @return string HTML to display the main header.
         */
    public function full_header() {
        global $COURSE, $DB, $CFG, $USER;

        $template = 'core/full_header';

        $pagetype = $this->page->pagetype;

        $homepage = get_home_page();
        $homepagetype = null;
        // Add a special case since /my/courses is a part of the /my subsystem.
        if ($homepage == HOMEPAGE_MY || $homepage == HOMEPAGE_MYCOURSES) {
            $homepagetype = 'my-index';
        } else if ($homepage == HOMEPAGE_SITE) {
            $homepagetype = 'site-index';
        }
        if ($this->page->include_region_main_settings_in_header_actions() &&
                !$this->page->blocks->is_block_present('settings')) {
            // Only include the region main settings if the page has requested it and it doesn't already have
            // the settings block on it. The region main settings are included in the settings block and
            // duplicating the content causes behat failures.
            $this->page->add_header_action(html_writer::div(
                $this->region_main_settings_menu(),
                'd-print-none',
                ['id' => 'region-main-settings-menu']
            ));
        }

        $header = new \stdClass();
        $header->settingsmenu = $this->context_header_settings_menu();
        $header->contextheader = $this->context_header();
        $header->hasnavbar = empty($this->page->layout_options['nonavbar']);
        $header->navbar = $this->navbar();
        $header->pageheadingbutton = $this->page_heading_button();
        $header->courseheader = $this->course_header();
        $header->headeractions = $this->page->get_header_actions();
        if (!empty($pagetype) && !empty($homepagetype) && $pagetype == $homepagetype) {
            $header->welcomemessage = \core_user::welcome_message();
        }

        if ($this->page->pagelayout == 'course' && $design = get_config('theme_remui', 'courseheaderdesign')) {
            if (strpos($this->page->pagetype, 'course-view-section') !== false) {
                // $header->contextheader = false;
                $header->sectionpage = true;
                $header->coursename = format_text($COURSE->fullname, FORMAT_HTML);
            }
            $coursehandler = new \theme_remui_coursehandler();
            $header->edwcourseheader = true;
            $template = 'theme_remui/edw_course_header' . $design;
            $header->courseimage = $coursehandler->get_course_image($COURSE);
            $header->classes = 'hasbackground' . ' design-' . $design;
            $header->categoryname = format_text($DB->get_record('course_categories', array('id' => $COURSE->category))->name);
            $header->teachers = $coursehandler->get_enrolled_teachers_context($COURSE, true);
            if (is_plugin_available('block_edwiserratingreview')) {
                $rnr = new \block_edwiserratingreview\ReviewManager();
                $header->rnrdesign = $rnr->get_short_design_enrolmentpage($COURSE->id);
            }
        }

        // Used to display the status area  on dashoabard page only.
        $header->canaddblockandstatusarea = $this->page->pagelayout == 'mydashboard';
        $overlayopacity = get_config('theme_remui', 'headeroverlayopacity');

        if(is_numeric($overlayopacity) && ($overlayopacity <= 100)){
            $overlayopacity = $overlayopacity / 100;
            $header->overlayopacity = $overlayopacity;
        }else{
            $header->overlayopacity = 1;
        }

        $content = "";
        $coursecontext = $this->page->context;
        $ismanager = \theme_remui\utility::check_user_admin_cap($USER);

        if(($this->page->pagelayout == 'course'  || ($COURSE->id != 1 && $this->page->pagetype == 'course-edit') || $this->page->pagetype == 'course-view-participants' ) && $ismanager){
            $header->enrollpageurl = $CFG->wwwroot.'/enrol/index.php?id='.$COURSE->id;
            $header->participantspageurl = $CFG->wwwroot.'/user/index.php?id='.$COURSE->id;
            $header->isenrolled = is_enrolled($coursecontext, $USER->id);
            $content = $this->render_from_template("theme_remui/header_enrolpage_button_ui", $header);
        }

        $fullheader = $this->render_from_template($template, $header);

        return $content.$fullheader;
    }
    /**
     * Prints a nice side block with an optional header.
     *
     * @param block_contents $bc HTML for the content
     * @param string $region the region the block is appearing in.
     * @return string the HTML to be output.
     */
    public function block(block_contents $bc, $region) {
        $bc = clone($bc); // Avoid messing up the object passed in.
        if (empty($bc->blockinstanceid) || !strip_tags($bc->title)) {
            $bc->collapsible = block_contents::NOT_HIDEABLE;
        }

        $id = !empty($bc->attributes['id']) ? $bc->attributes['id'] : uniqid('block-');
        $context = new \stdClass();
        $context->skipid = $bc->skipid;
        $context->blockinstanceid = $bc->blockinstanceid ?: uniqid('fakeid-');
        $context->dockable = $bc->dockable;
        $context->id = $id;
        $context->hidden = $bc->collapsible == block_contents::HIDDEN;
        $context->skiptitle = strip_tags($bc->title);
        $context->showskiplink = !empty($context->skiptitle);
        $context->arialabel = $bc->arialabel;
        $context->ariarole = !empty($bc->attributes['role']) ? $bc->attributes['role'] : 'complementary';
        $context->class = $bc->attributes['class'];
        $context->type = $bc->attributes['data-block'];
        $context->title = $bc->title;
        $context->content = $bc->content;
        $context->annotation = $bc->annotation;
        $context->footer = $bc->footer;
        $context->hascontrols = !empty($bc->controls);

        $haystack = array(
            'myoverview',
            'calendar_month',
            'remuiblck',
            'recentlyaccessedcourses',
            'starredcourses'
        );

        if (in_array($bc->attributes['data-block'], $haystack)) {
            $context->isbodytransparent = true;
        }

        if ($context->hascontrols) {
            $context->controls = $this->block_controls($bc->controls, $id);
            $context->controls .= get_block_move_buttons($id);
        }
        if (is_plugin_available('block_edwiseradvancedblock') && $bc->attributes["data-block"] == 'edwiseradvancedblock' ) {
            global $CFG;
            require_once($CFG->dirroot . '/local/edwiserpagebuilder/lib.php');
            $context->livecustomizationbtn = local_edwiserpagebuilder_customizer_button($bc->blockinstanceid);
        }
        return $this->render_from_template('core/block', $context);
    }
    /**
     * Render the login signup form into a nice template for the theme.
     *
     * @param mform $form
     * @return string
     */
    public function render_login_signup_form($form) {
        global $SITE;

        $context = $form->export_for_template($this);
        $context['formhtml'] = str_replace( "col-lg-3 col-md-4", "", $context['formhtml']);
        $context['formhtml'] = str_replace( "col-lg-9 col-md-8", "", $context['formhtml']);
        $context['formhtml'] = str_replace( "form-group row  fitem", "form-group fitem m-0", $context['formhtml']);

        $context['formhtml'] = str_replace(
            "mform full-width-labels",
            "mform full-width-labels d-flex flex-column flex-gap-6",
            $context['formhtml']
        );

        $url = $this->get_logo_url();
        if ($url) {
            $url = $url->out(false);
        }
        $context['logourl'] = $url;
        $context['sitename'] = format_string($SITE->fullname, true,
                ['context' => \context_course::instance(SITEID), "escape" => false]);

        return $this->render_from_template('core/signup_form_layout', $context);
    }
    /**
     * Returns the url of the custom favicon.
     */
    public function favicon() {
        $favicon = \theme_remui\toolbox::setting_file_url('faviconurl', 'faviconurl');
        if (empty($favicon)) {
            return \theme_remui\toolbox::image_url('favicon', 'theme');
        } else {
            return $favicon;
        }
    }
    /**
     * The standard tags (meta tags, links to stylesheets and JavaScript, etc.)
     * that should be included in the <head> tag. Designed to be called in theme
     * layout.php files.
     *
     * @return string HTML fragment.
     */
    public function standard_head_html() {
        global $CFG, $SESSION, $SITE;

        // Before we output any content, we need to ensure that certain
        // page components are set up.

        // Blocks must be set up early as they may require javascript which
        // has to be included in the page header before output is created.
        foreach ($this->page->blocks->get_regions() as $region) {
            $this->page->blocks->ensure_content_created($region, $this);
        }

        $output = '';

        // Give plugins an opportunity to add any head elements. The callback
        // must always return a string containing valid html head content.
        $pluginswithfunction = get_plugins_with_function('before_standard_html_head', 'lib.php');
        foreach ($pluginswithfunction as $plugins) {
            foreach ($plugins as $function) {
                $output .= $function();
            }
        }

        // Get the theme font from setting.
        if (\theme_remui\toolbox::get_setting('fontselect') === "2") {
            $fontname = ucwords(\theme_remui\toolbox::get_setting('fontname'));
            if (isset($fontname) && $fontname) {
                $fonturl = "https://fonts.googleapis.com/css?family={$fontname}:300,400,500,600,700,300italic";
                $output .= "<link href='{$fonturl}' rel='stylesheet' type='text/css'>";
            }
        }

        // Add google analytics code.
        $gatrackingcode = trim(\theme_remui\toolbox::get_setting('googleanalytics'));

        if (!empty($gatrackingcode)) {
            $output .= "<!-- Global site tag (gtag.js) - Google Analytics -->";
            $output .= "<script async src='https://www.googletagmanager.com/gtag/js?id=";
            $output .= $gatrackingcode."'></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '".$gatrackingcode."');
            </script><!-- Google Analytics -->";
        }

        // Allow a url_rewrite plugin to setup any dynamic head content.
        if (isset($CFG->urlrewriteclass) && !isset($CFG->upgraderunning)) {
            $class = $CFG->urlrewriteclass;
            $output .= $class::html_head_setup();
        }

        $output .= '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' . "\n";
        $output .= '<meta name="keywords" content="moodle, ' . $this->page->title . '" />' . "\n";
        // This is only set by the {@link redirect()} method.
        $output .= $this->metarefreshtag;

        // Check if a periodic refresh delay has been set and make sure we arn't
        // already meta refreshing.
        if ($this->metarefreshtag == '' && $this->page->periodicrefreshdelay !== null) {
            $output .= '<meta http-equiv="refresh" content="';
            $output .= $this->page->periodicrefreshdelay.';url='.$this->page->url->out().'" />';
        }

        if(get_moodle_release_version_branch() > '403'){
            // Give plugins an opportunity to add any head elements. The callback
            // must always return a string containing valid html head content.
            $hook = new \core\hook\output\before_standard_head_html_generation($this);
            $hook->process_legacy_callbacks();
            \core\di::get(\core\hook\manager::class)->dispatch($hook);

            // Allow a url_rewrite plugin to setup any dynamic head content.
            if (isset($CFG->urlrewriteclass) && !isset($CFG->upgraderunning)) {
                $class = $CFG->urlrewriteclass;
                $hook->add_html($class::html_head_setup());
            }

            $hook->add_html('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' . "\n");
            $hook->add_html('<meta name="keywords" content="moodle, ' . $this->page->title . '" />' . "\n");
            // This is only set by the {@link redirect()} method
            $hook->add_html($this->metarefreshtag);

            // Check if a periodic refresh delay has been set and make sure we arn't
            // already meta refreshing
            if ($this->metarefreshtag=='' && $this->page->periodicrefreshdelay!==null) {
                $hook->add_html(
                    html_writer::empty_tag('meta', [
                        'http-equiv' => 'refresh',
                        'content' => $this->page->periodicrefreshdelay . ';url='.$this->page->url->out(),
                    ]),
                );
            }

            $output = $hook->get_output();
        }


        // Set up help link popups for all links with the helptooltip class.
        $this->page->requires->js_init_call('M.util.help_popups.setup');

        $focus = $this->page->focuscontrol;
        if (!empty($focus)) {
            if (preg_match("#forms\['([a-zA-Z0-9]+)'\].elements\['([a-zA-Z0-9]+)'\]#", $focus, $matches)) {
                // This is a horrifically bad way to handle focus but it is passed in
                // through messy formslib::moodleform.
                $this->page->requires->js_function_call('old_onload_focus', array($matches[1], $matches[2]));
            } else if (strpos($focus, '.') !== false) {
                // Old style of focus, bad way to do it.
                debugging('This code is using the old style focus event, Please update this code to focus on an element id or the moodleform focus method.', DEBUG_DEVELOPER);
                $this->page->requires->js_function_call('old_onload_focus', explode('.', $focus, 2));
            } else {
                // Focus element with given id.
                $this->page->requires->js_function_call('focuscontrol', array($focus));
            }
        }

        // Get the theme stylesheet - this has to be always first CSS, this loads also styles.css from all plugins;
        // any other custom CSS can not be overridden via themes and is highly discouraged.
        $urls = $this->page->theme->css_urls($this->page);
        foreach ($urls as $url) {
            $this->page->requires->css_theme($url);
        }

        // Get the theme javascript head and footer.
        if ($jsurl = $this->page->theme->javascript_url(true)) {
            $this->page->requires->js($jsurl, true);
        }
        if ($jsurl = $this->page->theme->javascript_url(false)) {
            $this->page->requires->js($jsurl);
        }

        // Get any HTML from the page_requirements_manager.
        $output .= $this->page->requires->get_head_code($this->page, $this);

        // List alternate versions.
        foreach ($this->page->alternateversions as $type => $alt) {
            $output .= html_writer::empty_tag('link', array('rel' => 'alternate',
                    'type' => $type, 'title' => $alt->title, 'href' => $alt->url));
        }

        // Add noindex tag if relevant page and setting applied.
        $allowindexing = isset($CFG->allowindexing) ? $CFG->allowindexing : 0;
        $loginpages = array('login-index', 'login-signup');
        if ($allowindexing == 2 || ($allowindexing == 0 && in_array($this->page->pagetype, $loginpages))) {
            if (!isset($CFG->additionalhtmlhead)) {
                $CFG->additionalhtmlhead = '';
            }
            $CFG->additionalhtmlhead .= '<meta name="robots" content="noindex" />';
        }

        if (!empty($CFG->additionalhtmlhead)) {
            $output .= "\n".$CFG->additionalhtmlhead;
        }

        if ($this->page->pagelayout == 'frontpage') {
            $summary = s(strip_tags(format_text($SITE->summary, FORMAT_HTML)));
            if (!empty($summary)) {
                $output .= "<meta name=\"description\" content=\"$summary\" />\n";
            }
        }

        return $output;
    }
    /**
     * Returns standard navigation between activities in a course.
     *
     * @return string the navigation HTML.
     */
    public function activity_navigation() {
        global $OUTPUT, $CFG;
        $activitynavenable = get_config('theme_remui', 'activitynextpreviousbutton');
        if (!$activitynavenable) {
            return '';
        }

        // First we should check if we want to add navigation.
        $context = $this->page->context;
        if (($this->page->pagelayout !== 'incourse' && $this->page->pagelayout !== 'frametop')
            || $context->contextlevel != CONTEXT_MODULE) {
            return '';
        }

        // If the activity is in stealth mode, show no links.
        if ($this->page->cm->is_stealth()) {
            return '';
        }

        $course = $this->page->cm->get_course();
        $courseformat = course_get_format($course);

        // If the theme implements course index and the current course format uses course index and the current
        // page layout is not 'frametop' (this layout does not support course index), show no links.
        // if ($this->page->theme->usescourseindex && $courseformat->uses_course_index() &&
        // $this->page->pagelayout !== 'frametop') {
        // return '';
        // }

        // Get a list of all the activities in the course.
        $modules = get_fast_modinfo($course->id)->get_cms();

        // Put the modules into an array in order by the position they are shown in the course.
        $allmods = [];
        $activitylist = [];
        foreach ($modules as $module) {
            // Only add activities the user can access, aren't in stealth mode and have a url (eg. mod_label does not).
            if (!$module->uservisible || $module->is_stealth() || (empty($module->url) && $module->modname !== "subsection")) {
                continue;
            }

            if ($module->modname === 'subsection') {
                $allmods[$module->customdata['sectionid']] = $module;
            } else {
                if (isset($module->sectionid) && array_key_exists($module->sectionid, $allmods)) {
                    if (!isset($subsectionsmodules[$module->sectionid])) {
                        $subsectionsmodules[$module->sectionid] = [];
                    }
                    $subsectionsmodules[$module->sectionid][$module->id] = $module;
                } else {
                    $allmods[$module->id] = $module;
                }
            }

            // No need to add the current module to the list for the activity dropdown menu.
            if ($module->id == $this->page->cm->id) {
                continue;
            }
            // Module name.
            $modname = $module->get_formatted_name();

            // Display the hidden text if necessary.
            if (!$module->visible) {
                $modname .= ' ' . get_string('hiddenwithbrackets');
            }
            // Module URL.
            if ($module->modname === 'subsection') {
                $linkurl = new moodle_url('/course/section.php', array('id' => $module->customdata['sectionid']));
            } else {
                $linkurl = new moodle_url($module->url, array('forceview' => 1));
            }
            // Add module URL (as key) and name (as value) to the activity list array.
            $activitylist[$linkurl->out(false)] = $modname;
        }

        $mods = [];

        foreach ($allmods as $key => $value) {
            $mods[$key] = $value;

            if (isset($subsectionsmodules[$key])) {
                $mods = $mods + $subsectionsmodules[$key];
            }
        }

        $nummods = count($mods);

        // If there is only one mod then do nothing.
        if ($nummods == 1) {
            return '';
        }

        // Get an array of just the course module ids used to get the cmid value based on their position in the course.
        $modids = array_keys($mods);

        // Get the position in the array of the course module we are viewing.
        $position = array_search($this->page->cm->id, $modids);

        $prevmod = null;
        $nextmod = null;

        // Check if we have a previous mod to show.
        if ($position > 0) {
            $prevmod = $mods[$modids[$position - 1]];

            if ($mods[$modids[$position - 1]]->sectionnum != $mods[$modids[$position]]->sectionnum) {

                if($CFG->branch >= 404) {
                    $prevSection = $mods[$modids[$position - 1]]->sectionid;
                } else {
                    $prevSection = $mods[$modids[$position - 1]]->sectionnum;
                }

                if (isset($mods[$modids[$position - 1]]->sectionid) && isset($mods[$mods[$modids[$position - 1]]->sectionid])) {
                    $subsectionmodule = $mods[$mods[$modids[$position - 1]]->sectionid];
                    if ($mods[$modids[$position]]->sectionnum === $subsectionmodule->sectionnum) {
                        $prevSection = null;
                    }
                }

                if (isset($mods[$modids[$position]]->sectionid) && isset($mods[$mods[$modids[$position]]->sectionid])) {
                    $subsectionmodule = $mods[$mods[$modids[$position]]->sectionid];
                    if ($mods[$modids[$position-1]]->sectionnum === $subsectionmodule->sectionnum) {
                        $prevSection = null;
                    }
                }
            }

            if ($prevmod->modname === 'subsection') {
                $prevsubsection = $prevmod;
            }
        }
        // $cminfo = get_fast_modinfo($course->id);
        // $sectioninfo = $cminfo->get_section_info($mods[$modids[$position + 1]]->sectionnum);

        // Check if we have a next mod to show.
        if ($position < ($nummods - 1)) {
            // if ($mods[$modids[$position + 1]]->sectionnum == $mods[$modids[$position]]->sectionnum) {
            $nextmod = $mods[$modids[$position + 1]];
            // }

            if ($mods[$modids[$position + 1]]->sectionnum != $mods[$modids[$position]]->sectionnum) {


                if ($CFG->branch >= 404) {
                    $nextSection = $mods[$modids[$position + 1]]->sectionid;
                } else {
                    $nextSection = $mods[$modids[$position + 1]]->sectionnum;
                }

                if (isset($mods[$modids[$position]]->sectionid) && isset($mods[$mods[$modids[$position]]->sectionid])) {
                    $subsectionmodule = $mods[$mods[$modids[$position]]->sectionid];
                    if ($mods[$modids[$position + 1]]->sectionnum === $subsectionmodule->sectionnum) {
                        $nextSection = null;
                    }
                }
            }

            if ($nextmod->modname === 'subsection') {
                $nextsubsection = $nextmod;
            }
        }

        $activitynav = new \core_course\output\activity_navigation($prevmod, $nextmod, $activitylist);

        if ($activitynav->prevlink) {
            $activitynav->prevlink->attributes['class'] = 'btn btn-secondary btn-sm d-flex align-items-center';
            if ($activitynavenable == 1) {
                $activitynav->prevlink->text = get_string('activityprev', 'theme_remui');
            }
        }

        if ($activitynav->nextlink) {
            $activitynav->nextlink->attributes['class'] = 'btn btn-secondary btn-sm d-flex align-items-center';
            if ($activitynavenable == 1) {
                $activitynav->nextlink->text = get_string('activitynext', 'theme_remui');
            }
        }

        if (isset($activitynav->prevlink->text)) {
            if (strlen($activitynav->prevlink->text) > 30) {
                $activitynav->prevlink->text = substr(html_entity_decode($activitynav->prevlink->text), 0, 25) . "... ";
            }
            $activitynav->prevlink->text = str_replace('◄', '', $activitynav->prevlink->text);

            $activitynav->prevlink->text = str_replace($OUTPUT->larrow(), '', $activitynav->prevlink->text);

        }

        if (isset($activitynav->nextlink->text)) {
            if (strlen($activitynav->nextlink->text) <= 30) {
                $activitynav->nextlink->text = str_replace($OUTPUT->rarrow(), '', $activitynav->nextlink->text);
            } else if (strlen($activitynav->nextlink->text) > 30) {
                $activitynav->nextlink->text = substr(html_entity_decode($activitynav->nextlink->text), 0, 25) . "... ". "";
            }
        }

        if (isset($prevsubsection)) {
            $activitynav->prevlink->url = new moodle_url(
                '/course/section.php',
                array('id' => $prevsubsection->customdata['sectionid'])
            );
            $activitynav->prevlink->text =  get_string('prevsubsectionbuttontext', 'theme_remui');
            $activitynav->prevlink->attributes['class'] = 'btn btn-primary btn-sm';
        }

        if (isset($nextsubsection)) {
            $activitynav->nextlink->url = new moodle_url(
                '/course/section.php',
                array('id' => $nextsubsection->customdata['sectionid'])
            );
            $activitynav->nextlink->text =  get_string('nextsubsectionbuttontext', 'theme_remui');
            $activitynav->nextlink->attributes['class'] = 'btn btn-primary btn-sm';
        }

        if (isset($nextSection)) {
            if ($CFG->branch >= 404) {
                $activitynav->nextlink->url = new \moodle_url(
                    "/course/section.php",
                    array(
                        'id' => $nextSection,
                    )
                );
            } else {
                $activitynav->nextlink->url = new \moodle_url(
                    "/course/view.php",
                    array(
                        'id' => $course->id,
                        'section' => $nextSection
                    )
                );
            }

            $activitynav->nextlink->text = get_string('nextsectionbuttontext', 'theme_remui');
            $activitynav->nextlink->attributes['class'] = 'btn btn-primary btn-sm';
        }
        if (isset($prevSection)) {

            if ($CFG->branch >= 404) {
                $activitynav->prevlink->url = new \moodle_url(
                    "/course/section.php",
                    array(
                        'id' => $prevSection,
                    )
                );
            } else {
                $activitynav->prevlink->url = new \moodle_url(
                    "/course/view.php",
                    array(
                        'id' => $course->id,
                        'section' => $prevSection
                    )
                );
            }

            $activitynav->prevlink->text = get_string('prevsectionbuttontext', 'theme_remui');
            $activitynav->prevlink->attributes['class'] = 'btn btn-primary btn-sm';
        }

        $renderer = $this->page->get_renderer('core', 'course');
        return $renderer->render($activitynav);
    }
    /**
     * Generate the add block button when editing mode is turned on and the user can edit blocks.
     *
     * @param string $region where new blocks should be added.
     * @return string html for the add block button.
     */
    public function addblockbutton($region = ''): string {
        $addblockbutton = '';
        if (isset($this->page->theme->addblockposition) &&
                $this->page->user_is_editing() &&
                $this->page->user_can_edit_blocks() &&
                $this->page->pagelayout !== 'mycourses'
        ) {
            $params = ['bui_addblock' => '', 'sesskey' => sesskey()];
            $regiontitle = get_string('side-pre', 'theme_remui');
            if (!empty($region)) {
                $params['bui_blockregion'] = $region;
                $regiontitle = get_string($region, 'theme_remui');
            }
            $url = new moodle_url($this->page->url, $params);
            $btncontext = [
                'link' => $url->out(false),
                'escapedlink' => "?{$url->get_query_string(false)}",
                'pageType' => $this->page->pagetype,
                'pageLayout' => $this->page->pagelayout,
                'subPage' => $this->page->subpage,
                'issiteadmin' => is_siteadmin() && is_plugin_available('block_edwiseradvancedblock') ,
                'edwpbf' => is_plugin_available('filter_edwiserpbf'),
                'pbfnotenable' => filter_get_active_state('edwiserpbf') != 1,
                'regiontitle'  => $regiontitle
            ];

            $templatename = 'core/add_block_button';

            // Block editing and addition will be available if and only if both plugins are available.
            if (is_plugin_available('local_edwiserpagebuilder') && is_plugin_available('block_edwiseradvancedblock')) {
                $templatename = 'local_edwiserpagebuilder/add_block_button';
            }

            $addblockbutton = $this->render_from_template($templatename, $btncontext);
        }
        return $addblockbutton;
    }

    /**
     * Renders the login form.
     *
     * @param \core_auth\output\login $form The renderable.
     * @return string
     */
    public function render_login(\core_auth\output\login $form) {
        global $CFG, $SITE;

        $context = $form->export_for_template($this);

        $context->errorformatted = $this->error_text($context->error);
        $url = $this->get_logo_url();
        if ($url) {
            $url = $url->out(false);
        }
        $context->logourl = $url;
        $context->sitename = format_string($SITE->fullname, true,
        ['context' => \context_course::instance(SITEID), "escape" => false]);
        $context->extraimageforloginbtn = \theme_remui\toolbox::image_url('missingloginbtnimg', 'theme');
        return $this->render_from_template('core/loginform', $context);
    }

        /**
         * Returns standard main content placeholder.
         * Designed to be called in theme layout.php files.
         *
         * @return string HTML fragment.
         */
    public function main_content() {
        // This is here because it is the only place we can inject the "main" role over the entire main content area
        // without requiring all theme's to manually do it, and without creating yet another thing people need to
        // remember in the theme.
        // This is an unfortunate hack. DO NO EVER add anything more here.
        // DO NOT add classes.
        // DO NOT add an id.
        $regionplaceholder = '';
        if (in_array("content", $this->page->blocks->get_regions())) {
            $addblockbuttoncontent = $this->addblockbutton('content');
            if (trim($addblockbuttoncontent) != '') {
                $regionplaceholder = '<div id="block-region-content-indicator" class="container-fluid block-indicator">
                    <font class="text-center p-px-2d5 m-0  bg-white block-indicator-text-wrapper ">
                    '.get_string('content', 'theme_remui').'
                    </font>
                </div>';
            }
        }
        return '<div role="main">'.$this->unique_main_content_token.'</div>'.$regionplaceholder;
    }

        /**
         * Outputs the closing section of a container.
         *
         * @return string the HTML to output.
         */
    public function container_end() {
        $this->page->requires->strings_for_js(array(
            'noresutssearchmsg',
            'searchtotalcount',
            'searchresultdesctext'
        ), 'theme_remui');
        return $this->opencontainers->pop('container');
    }

     /**
     * Get the HTML for blocks in the given region.
     *
     * @since Moodle 2.5.1 2.6
     * @param string $region The region to get HTML for.
     * @param array $classes Wrapping tag classes.
     * @param string $tag Wrapping tag.
     * @param boolean $fakeblocksonly Include fake blocks only.
     * @return string HTML.
     */
    public function blocks($region, $classes = array(), $tag = 'aside', $fakeblocksonly = false) {
        $displayregion = $this->page->apply_theme_region_manipulations($region);
        $classes = (array)$classes;
        $classes[] = 'block-region';
        $attributes = array(
            'id' => 'block-region-'.preg_replace('#[^a-zA-Z0-9_\-]+#', '-', $displayregion),
            'class' => join(' ', $classes),
            'data-blockregion' => $displayregion,
            'data-droptarget' => '1'
        );
        $content = '';
        if ($this->page->blocks->region_has_content($displayregion, $this)) {
            $content =  $this->blocks_for_region($displayregion, $fakeblocksonly);
        }
        return html_writer::tag($tag, $content, $attributes);
    }
}
