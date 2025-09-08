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
 * Language file.
 *
 * @package   theme_remui
 * @copyright (c) 2023 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['advancedsettings'] = 'Advanced settings';
$string['backgroundimage'] = 'Background image';
$string['backgroundimage_desc'] = 'The image to display as a background of the site. The background image you upload here will override the background image in your theme preset files.';
$string['brandcolor'] = 'Brand colour';
$string['brandcolor_desc'] = 'The brand colour.';
$string['bootswatch'] = 'Bootswatch';
$string['bootswatch_desc'] = 'A bootswatch is a set of Bootstrap variables and css to style Bootstrap';
$string['choosereadme'] = 'Edwiser RemUI is a customizable Moodle theme designed to elevate your eLearning experience by addressing challenges like limited customization and user interface concerns. With its modern, intuitive design and comprehensive features, you can effortlessly create a visually stunning, branded site that boosts student engagement and delivers an experience learners will love!';
$string['currentinparentheses'] = '(current)';
$string['configtitle'] = 'Edwiser RemUI';
$string['generalsettings'] = 'Basic';
$string['loginbackgroundimage'] = 'Login page background image';
$string['loginbackgroundimage_desc'] = 'The image to display as a background for the login page.';
$string['nobootswatch'] = 'None';
$string['pluginname'] = 'Edwiser RemUI';
$string['presetfiles'] = 'Additional theme preset files';
$string['presetfiles_desc'] = 'Preset files can be used to dramatically alter the appearance of the theme. See <a href="https://docs.moodle.org/dev/remui_Presets">remui presets</a> for information on creating and sharing your own preset files, and see the <a href="https://archive.moodle.net/remui">Presets repository</a> for presets that others have shared.';
$string['preset'] = 'Theme preset';
$string['preset_desc'] = 'Pick a preset to broadly change the look of the theme.';
$string['privacy:metadata'] = 'The remui theme does not store any personal data about any user.';
$string['rawscss'] = 'Raw SCSS';
$string['rawscss_desc'] = 'Use this field to provide SCSS or CSS code which will be injected at the end of the style sheet.';
$string['rawscsspre'] = 'Raw initial SCSS';
$string['rawscsspre_desc'] = 'In this field you can provide initialising SCSS code, it will be injected before everything else. Most of the time you will use this setting to define variables.';
$string['region-side-pre'] = 'Right';
$string['region-side-top'] = 'Top';
$string['region-side-bottom'] = 'Bottom';
$string['showfooter'] = 'Show footer';
$string['unaddableblocks'] = 'Unneeded blocks';
$string['unaddableblocks_desc'] = 'The blocks specified are not needed when using this theme and will not be listed in the \'Add a block\' menu.';
$string['privacy:metadata:preference:draweropenblock'] = 'The user\'s preference for hiding or showing the drawer with blocks.';
$string['privacy:metadata:preference:draweropenindex'] = 'The user\'s preference for hiding or showing the drawer with course index.';
$string['privacy:metadata:preference:draweropennav'] = 'The user\'s preference for hiding or showing the drawer menu navigation.';
$string['privacy:drawerindexclosed'] = 'The current preference for the index drawer is closed.';
$string['privacy:drawerindexopen'] = 'The current preference for the index drawer is open.';
$string['privacy:drawerblockclosed'] = 'The current preference for the block drawer is closed.';
$string['privacy:drawerblockopen'] = 'The current preference for the block drawer is open.';
$string['privacy:drawernavclosed'] = 'The current preference for the navigation drawer is closed.';
$string['privacy:drawernavopen'] = 'The current preference for the navigation drawer is open.';

// Deprecated since Moodle 4.0.
$string['totop'] = 'Go to top';

// Edwiser RemUI Settings Page Strings.

// Settings Tabs strings.
$string['homepagesettings'] = 'Home Page';
$string['coursesettings'] = "Course Page";
$string['footersettings'] = 'Footer';
$string["formsettings"] = "Forms";
$string["iconsettings"] = "Icons";
$string['loginsettings'] = 'Login Page';

$string['versionforheading'] = '<span class="small remuiversion"> Version {$a}</span>';
$string['themeversionforinfo'] = '<span>Currently installed version: Edwiser RemUI v{$a}</span>';

// General Settings.
$string['mergemessagingsidebar'] = 'Merge Message Panel';
$string['mergemessagingsidebardesc'] = 'Merge message panel into right sidebar';
$string['logoorsitename'] = 'Choose site logo format';
$string['logoorsitenamedesc'] = 'Logo Only - Large brand logo<br /> Logo Mini - Mini brand logo  <br /> Icon Only - An icon as brand <br/> Icon and sitename - Icon with sitename';
$string['onlylogo'] = 'Logo Only';
$string['logo'] = 'Logo';
$string['logomini'] = 'Logo Mini';
$string['icononly'] = 'Icon Only';
$string['iconsitename'] = 'Icon and sitename';
$string['logodesc'] = 'You may add the logo to be displayed on the header. Note- Preferred height is 50px. In case you wish to customise, you can do so from the custom CSS box.';
$string['logominidesc'] = 'You may add the logomini to be displayed on the header when sidebar is collapsed. Note- Preferred height is 50px. In case you wish to customise, you can do so from the custom CSS box.';
$string['siteicon'] = 'Site icon';
$string['siteicondesc'] = 'Don\'t have a logo? You could choose one from this <a href="https://fontawesome.com/v4.7.0/cheatsheet/" target="_new" ><b style="color:#17a2b8!important">list</b></a>. <br /> Just enter the text after "fa-".';
$string['navlogin_popup'] = 'Enable Login Popup';
$string['navlogin_popupdesc'] = 'Enable login popup to quickly login without redirecting to the login page.';
$string['coursecategories'] = 'Categories';
$string['enablecoursecategorymenu'] = "Category drop down in header";
$string['enablecoursecategorymenudesc'] = "Keep this enabled if you want to display the category drop-down menu in the header";
$string['coursepagesettings'] = "Course Page";
$string['coursepagesettingsdesc'] = "Courses related settings.";
$string['coursecategoriestext'] = "Rename Category drop-down in the Header";
$string['coursecategoriestextdesc'] = "You can add a custom name for the category drop down menu in the header.";
$string['enablerecentcourses'] = 'Enable Recent Courses';
$string['enablerecentcoursesdesc'] = 'If enabled, Recent courses drop down menu will be displayed in header.';
$string['recent'] = 'Recent';
$string['recentcoursesmenu'] = 'Recent Courses Menu';
$string['searchcatplaceholdertext'] = 'Search categories';
$string['viewallnotifications'] = 'View all notifications';
$string['forgotpassword'] = 'Forgot Password?';
$string['enableannouncement'] = "Enable Site-wide Announcement";
$string['enableannouncementdesc'] = "Enable site-wide announcement for all users.";
$string['enabledismissannouncement'] = "Enable Dismissable Site-wide Announcement";
$string['enabledismissannouncementdesc'] = "If Enabled, allow users to dismiss the announcement.";
$string['brandlogo'] = 'Brand Logo';
$string['brandname'] = 'Brand Name';

$string['announcementtext'] = "Announcement";
$string['announcementtextdesc'] = "Announcement message to be displayed sitewide.";
$string['announcementtype'] = "Announcement type";
$string['announcementtypedesc'] = "Select announcement type to display different background color for the announcement.";
$string['typeinfo'] = "Information";
$string['typedanger'] = "Urgent";
$string['typewarning'] = "Warning";
$string['typesuccess'] = "Success";




// Google Analytics.
$string['googleanalytics'] = 'Google Analytics Tracking ID';
$string['googleanalyticsdesc'] = 'Please enter your Google Analytics Tracking ID to enable analytics on your website. The  tracking ID format shold be like [UA-XXXXX-Y].<br/>Please be aware that by including this setting, you will be sending data to Google Analytics and you should make sure that your users are warned about this. Our product does not store any of the data being sent to Google Analytics.';
$string['favicon'] = 'Favicon';
$string['favicosize'] = 'Expected size is 16x16 pixels';
$string['favicondesc'] = 'Your site’s “favourite icon”. It is a visual reminder of the Web site identity and is displayed in the address bar or in the browser\'s tabs';
$string['fontselect'] = 'Font type selector';
$string['fontselectdesc'] = 'Choose from either Standard fonts or <a href="https://fonts.google.com/" target="_new">Google web fonts</a> types. Please save to show the options for your choice. Note: If visual personalizer font is set to Standard then Google web font will be applied.';
$string['fontname'] = 'Site Font';
$string['fontnamedesc'] = 'Enter the exact name of the font to use for Moodle.';
$string['fonttypestandard'] = 'Standard font';
$string['fonttypegoogle'] = 'Google web font';

$string['sendfeedback'] = "Send Feedback to Edwiser";
$string['enableedwfeedback'] = "Edwiser Feedback & Support";
$string['enableedwfeedbackdesc'] = "Enable Edwiser Feedback & Support, visible to Admins only.";
$string["checkfaq"] = "Edwiser RemUI - Check FAQ";
$string['poweredbyedwiser'] = 'Powered by Edwiser';
$string['poweredbyedwiserdesc'] = 'Uncheck to remove  \'Powered by Edwiser\' from your site.';
$string['enabledictionary'] = 'Enable Dictionary';
$string['enabledictionarydesc'] = 'If enabled, Dictionary feature will be activated and which will show the meaning of selected text in popup.';
$string['customcss'] = 'Custom CSS';
$string['customcssdesc'] = 'You may customise the CSS from the text box above. The changes will be reflected on all the pages of your site.';
// Footer Content.
$string['followus'] = 'Follow Us';
$string['poweredby'] = 'Powered by';

// One click report  bug/feedback.
$string['sendfeedback'] = "Send Feedback to Edwiser";
$string['descriptionmodal_text1'] = "<p>Feedback lets you send us suggestions about our products. We welcome problem reports, feature ideas and general comments.</p><p>Start by writing a brief description:</p>";
$string['descriptionmodal_text2'] = "<p>Next we\'ll let you identify areas of the page related to your description.</p>";
$string['emptydescription_error'] = "Please enter a description.";
$string['incorrectemail_error'] = "Please enter proper email ID.";

$string['highlightmodal_text1'] = "Click and drag on the page to help us better understand your feedback. You can move this dialog if it\'s in the way.";
$string['highlight_button'] = "Highlight area";
$string['blackout_button'] = "Hide info";
$string['highlight_button_tooltip'] = "Highlight areas relevant to your feedback.";
$string['blackout_button_tooltip'] = "Hide any personal information.";

$string['feedbackmodal_next'] = 'Take Screenshot and Continue';
$string['feedbackmodal_skipnext'] = 'Skip and Continue';
$string['feedbackmodal_previous'] = 'Back';
$string['feedbackmodal_submit'] = 'Submit';
$string['feedbackmodal_ok'] = 'Okay';

$string['description_heading'] = 'Description';
$string['feedback_email_heading'] = 'Email';
$string['additional_info'] = 'Additional info';
$string['additional_info_none'] = 'None';
$string['additional_info_browser'] = 'Browser Info';
$string['additional_info_page'] = 'Page Info';
$string['additional_info_pagestructure'] = 'Page Structure';
$string['feedback_screenshot'] = 'Screenshot';
$string['feebdack_datacollected_desc'] = 'An overview of the data collected is available <strong><a href="https://forums.edwiser.org/topic/67/anonymously-tracking-the-usage-of-edwiser-products" target="_blank">here</a></strong>.';

$string['submit_loading'] = 'Loading...';
$string['submit_success'] = 'Thank you for your feedback. We value every piece of feedback we receive.';
$string['submit_error'] = 'Sadly an error occured while sending your feedback. Please try again.';
$string['send_feedback_license_error'] = "Please activate the license to get product support.";
$string['disabled'] = 'Disabled';

$string['nocoursefound'] = 'No Course Found';

$string['pagewidth'] = 'Theme layout';
$string['pagewidthdesc'] = 'Here you can choose layout size for pages.';
$string['defaultpermoodle'] = 'Narrow width (Moodle default)';
$string['fullwidthlayout'] = 'Full width';

// Footer Page Settings.
$string['footersettings'] = 'Footer';
$string['socialmedia'] = 'Social Media';
$string['socialmediadesc'] = 'Enter the social media links for your site.';
$string['facebooksetting'] = 'Facebook';
$string['facebooksettingdesc'] = 'Enter your site\'s facebook page link. For eg. https://www.facebook.com/pagename';
$string['twittersetting'] = 'X (formerly Twitter)';
$string['twittersettingdesc'] = 'Enter your site\'s X page link. For eg. https://www.x.com/pagename';
$string['linkedinsetting'] = 'Linkedin';
$string['linkedinsettingdesc'] = 'Enter your site\'s linkedin page link. For eg. https://www.linkedin.com/in/pagename';
$string['gplussetting'] = 'Google Plus';
$string['gplussettingdesc'] = 'Enter your site\'s Google Plus page link. For eg. https://plus.google.com/pagename';
$string['youtubesetting'] = 'YouTube';
$string['youtubesettingdesc'] = 'Enter your site\'s YouTube page link. For eg. https://www.youtube.com/channel/UCU1u6QtAAPJrV0v0_c2EISA';
$string['instagramsetting'] = 'Instagram';
$string['instagramsettingdesc'] = 'Enter your site\'s Instagram page link. For eg. https://www.instagram.com/name';
$string['pinterestsetting'] = 'Pinterest';
$string['pinterestsettingdesc'] = 'Enter your site\'s Pinterest page link. For eg. https://www.pinterest.com/name';
$string['quorasetting'] = 'Quora';
$string['quorasettingdesc'] = 'Enter your site\'s Quora page link. For eg. https://www.quora.com/name';
$string['footerbottomtext'] = 'Footer Bottom-Left Text';
$string['footerbottomlink'] = 'Footer Bottom-Left Link';
$string['footerbottomlinkdesc'] = 'Enter the Link for the bottom-left section of Footer. For eg. http://www.yourcompany.com';
$string['footercolumn1heading'] = 'Footer Content for 1st Column (Left)';
$string['footercolumn1headingdesc'] = 'This section relates to the bottom portion (Column 1) of your frontpage.';
$string['footercolumn1title'] = '1st Footer Column title';
$string['footercolumn1titledesc'] = 'Add title to this column.';
$string['footercolumncustomhtml'] = 'Content';
$string['footercolumn1customhtmldesc'] = 'You can customize HTML of this column using above given textbox.';
$string['footercolumn2heading'] = 'Footer Content for 2nd Column (Middle)';
$string['footercolumn2headingdesc'] = 'This section relates to the bottom portion (Column 2) of your frontpage.';
$string['footercolumn2title'] = '2nd Footer Column Title';
$string['footercolumn2titledesc'] = 'Add title to this column.';
$string['footercolumn2customhtml'] = 'Custom HTML';
$string['footercolumn2customhtmldesc'] = 'You can customize HTML of this column using above given textbox.';
$string['footercolumn3heading'] = 'Footer Content for 3rd Column (Middle)';
$string['footercolumn3headingdesc'] = 'This section relates to the bottom portion (Column 3) of your frontpage.';
$string['footercolumn3title'] = '3rd Footer Column Title';
$string['footercolumn3titledesc'] = 'Add title to this column.';
$string['footercolumn3customhtml'] = 'Custom HTML';
$string['footercolumn3customhtmldesc'] = 'You can customize HTML of this column using above given textbox.';
$string['footercolumn4heading'] = 'Footer Content for 4th Column (Right)';
$string['footercolumn4headingdesc'] = 'This section relates to the bottom portion (Column 4) of your frontpage.';
$string['footercolumn4title'] = '4th Footer Column title';
$string['footercolumn4titledesc'] = 'Add title to this column.';
$string['footercolumn4customhtml'] = 'Custom HTML';
$string['footercolumn4customhtmldesc'] = 'You can customize HTML of this column using above given textbox.';
$string['footerbottomheading'] = 'Bottom Footer Setting';
$string['footerbottomdesc'] = 'Here you can specify your own link you want to enter at the bottom section of Footer';
$string['footerbottomtextdesc'] = 'Add text to Bottom Footer Setting.';
$string['footercopyrightsshow'] = 'show';
$string['footercopyright'] = 'Show Copyrights Content';
$string['footercopyrights'] = '[site] © [year]. All rights reserved.';
$string['footercopyrightsdesc'] = 'Add Copyrights content in the bottom of page.';
$string['footercopyrightstags'] = 'Tags:<br>[site]  -  Site name<br>[year]  -  Current year';
$string['footerbottomlink'] = 'Footer Bottom-Left Link';
$string['footerbottomlinkdesc'] = 'Enter the Link for the bottom-left section of Footer. For eg. http://www.yourcompany.com';
$string['footerbottomtext'] = 'Footer Bottom-Left Text';
$string['footerbottomlink'] = 'Footer Bottom-Left Link';
$string['copyrighttextarea'] = 'Copyrights Content';
$string['footercolumnsize'] = 'No of widget';
$string['one'] = 'One';
$string['two'] = 'Two';
$string['three'] = 'Three';
$string['four'] = 'Four';
$string['showsocialmediaicon'] = "Show social media icons";
$string['footercolumntype'] = 'Type';
$string['footercolumncustommenudesc'] = 'Add Your menu items in this formate for eg.<br><pre>[
    {
        "text": "Add your Text here",
        "address": "http://XYZ.abc"
    },
    {
        "text": "Add your Text here",
        "address": "http://XYZ.abc"
    }, ...
]</pre>
<b style="color:red;">Note:</b> To easily add content to the footer customize the footer area with our <a href="'.$CFG->wwwroot.'/admin/settings.php?section=themesettingremui#theme_remui_edwiserpersonalizer" onclick= location.href="'.$CFG->wwwroot.'/admin/settings.php?section=themesettingremui#theme_remui_edwiserpersonalizer";location.reload();>Visual Personalizer </a>';
$string['gotop'] = 'Go top';

$string['menu'] = 'Menu';
$string['content'] = 'Content';
$string['footercolumntypedesc'] = 'You can choose footer widget type';
$string['socialmediaicondesc'] = 'It will show social media icons in this section';
$string['footercolumncustommmenu'] = 'Add menu items';
$string['follometext'] = 'Follow me on {$a}';
$string['footercolumndesc'] = 'Select no of widgets in footer';
$string['footershowlogo'] = 'Show footer logo';
$string['footershowlogodesc'] = 'Show logo in the secondary footer.';

$string['footertermsandconditionsshow'] = 'Show Terms & Conditions';
$string['footertermsandconditions'] = 'Terms & Conditions Link';
$string['footertermsandconditionsdesc'] = 'You can add link for Terms & Conditions page.';
$string['footertermsandconditionsshowdesc'] = 'Footer Terms & Conditions';
$string['footerprivacypolicyshowdesc'] = 'Privacy Policy Link';

$string['footerprivacypolicyshow'] = 'Show Privacy Policy';
$string['footerprivacypolicy'] = 'Privacy Policy Link';
$string['footerprivacypolicydesc'] = 'You can add link for Privacy Policy page.';
$string['termsandconditions'] = 'Terms & Conditions';
$string['privacypolicy'] = 'Privacy Policy';
$string['typeamessage'] = "Type your message here";
$string['allcontacts'] = "All Contacts";

// Profile Page.
$string['administrator'] = 'Administrator';
$string['contacts'] = 'Contacts';
$string['blogentries'] = 'Blog Entries';
$string['discussions'] = 'Discussions';
$string['aboutme'] = 'About Me';
$string['courses'] = 'Courses';
$string['interests'] = 'Interests';
$string['institution'] = 'Department & Institution';
$string['location'] = 'Location';
$string['description'] = 'Description';
$string['editprofile'] = 'Edit Profile';
$string['start_date'] = 'Start date';
$string['complete'] = 'Complete';
$string['surname'] = 'Last Name';
$string['actioncouldnotbeperformed'] = 'Action could not be performed!';
$string['enterfirstname'] = 'Please enter your First Name.';
$string['enterlastname'] = 'Please enter your Last Name.';
$string['entervalidphoneno'] = 'Enter valid phone number';
$string['enteremailid'] = 'Please enter your Email ID.';
$string['enterproperemailid'] = 'Please enter proper Email ID.';
$string['detailssavedsuccessfully'] = 'Details Saved Successfully!';
$string['fullname']  = 'Full Name';
$string['viewcourselow'] = "view course";

$string['focusmodesettings'] = 'Focus Mode Settings';
$string['focusmodenormalstatetext'] = 'Focus:ON';
$string['focusmodeactivestatetext'] = 'Focus:OFF';
$string['enablefocusmode'] = 'Enable Focus Mode';
$string['togglefocusmode'] = "Toggle Focus Mode";
$string['enablefocusmodedesc'] = 'If enabled, a button to switch to distraction free learning will appear on the course page.';
$string['focusmodeenabled'] = 'Focus Mode Enabled';
$string['focusmodedisabled'] = 'Focus Mode Disabled';
$string['coursedata'] = 'Course data';
$string['prev'] = 'Previous';
$string['next'] = 'Next';
$string['enablecoursestats'] = 'Enable Course Stats';
$string['enablecoursestatsdesc'] = 'If enabled, Administrator, Managers and teacher will see user stats related to the enrolled course on the Single Course page.';

// Course Stats.
$string['notenrolledanycourse'] = 'Not enrolled in any course.';
$string['enrolledusers'] = 'Enrolled Students';
$string['studentcompleted'] = 'Students Completed';
$string['inprogress'] = 'In Progress';
$string['yettostart'] = 'Yet to Start';
$string['completepercent'] = '{$a}% Course Completed ';
$string['seeallmycourses'] = "<span class='d-none d-lg-block'>See all my </span>&nbsp;<span>courses in progress</span>";
$string['noactivity'] = 'No activites in the course';
$string['activitydata'] = '{$a->complete} out of {$a->total} activities completed';

// Login Page Strings.
$string['loginsettingpic'] = 'Upload Background Image';
$string['loginsettingpicdesc'] = 'Upload image as a background for login form.';
$string['loginpagelayout'] = 'Login form position';
$string['loginpagelayoutdesc'] = 'Choose login page layout design.';
$string['logincenter'] = 'Center';
$string['loginleft'] = 'Left side';
$string['loginright'] = 'Right side';
$string['brandlogopos'] = "Show Logo on Login page";
$string['brandlogoposdesc'] = "If enabled, the brand logo will be displayed on the login page.";
$string['hiddenlogo'] = "Disable";
$string['sidebarregionlogo'] = 'On the login card';
$string['maincontentregionlogo'] = 'On the central region';
$string['loginpanellogo'] = 'Header logo (Login Page)';
$string['loginpanellogodesc'] = 'Depends on <strong>Choose site logo format setting</strong>';
$string['signuptextcolor'] = 'Site description color';
$string['signuptextcolordesc'] = 'Select the text color for Site description.';
$string['brandlogotext'] = "Site Description";
$string['loginpagesitedescription'] = 'Login Page Site Description';
$string['brandlogotextdesc'] = "Add text for site description which will display on login and signup page. Keep this blank if don't want to put any description.";
$string['createnewaccount'] = 'Create a new account';
$string['welcometobrand'] = 'Hi, Welcome to {$a}';
$string['entertologin'] = "Enter your details to log in your account";
$string['forgotaccount'] = 'Forgot your password?';
$string['potentialidps'] = 'Or login using your account';
$string['firsttime'] = 'First time using this site';
// Signup Page.
$string['createnewaccount'] = 'Create a new account';
// Course Page Settings.
$string['coursesettings'] = "Course Page";
$string['enrolpagesettings'] = "Enrolment Page Settings";
$string['enrolpagesettingsdesc'] = "Manage the enrolment page content here.";
$string['coursearchivepagesettings'] = 'Course Archive Page Settings';
$string['coursearchivepagesettingsdesc'] = 'Manage the layout and content of Course archive page.';
$string['courseperpage'] = 'Courses Per Page';
// $string['courseperpagedesc'] = 'Set the number of courses displayed on the course archive page. Not applicable for mobile view.';

$string['courseperpagedesc'] = "<strong>Course 'Grid' view:</strong> By selecting the number of course cards in the settings above, the course archive page will automatically adjust the display, organizing the cards into dynamically generated rows.<br>
<strong style='display: inline-block;margin-top: 8px;'>Course 'List & Summary' view:</strong> The courses will be displayed according to the selection made in the settings above.";
$string['none'] = 'None';
$string['fade'] = 'Fade';
$string['slide-top'] = 'Slide Top';
$string['slide-bottom'] = 'Slide Bottom';
$string['slide-right'] = 'Slide Right';
$string['scale-up'] = 'Scale Up';
$string['scale-down'] = 'Scale Down';
$string['courseanimation'] = 'Course Card animation';
$string['courseanimationdesc'] = 'Select Course card animation to appear on the course archive page';

$string['currency'] = 'USD';
$string['currency_symbol'] = '$';
$string['enrolment_payment'] = 'Display \'FREE\' label on course with ‘0’ enroll cost';
$string['enrolment_payment_desc'] = 'This setting decides if a "FREE" label shows up for courses without enrollment fees. If set to "No," the label won\'t appear on the enrolment page.';
$string['allrequirepayment'] = 'No';
$string['somearefree'] = 'Yes';
$string['allarefree'] = 'All courses are free';

$string['showcoursepricing'] = 'Show Course Pricing';
$string['showcoursepricingdesc'] = 'Enable this setting to show the pricing section on enrollment page.';
$string['fullwidthcourseheader'] = 'Full Width Course Header';
$string['fullwidthcourseheaderdesc'] = 'Enable this setting to make course header full width.';

$string['price'] = 'Price';
$string['course_free'] = 'FREE';
$string['enrolnow'] = '{$a} Now';
$string['buyand'] = 'Buy & ';
$string['notags'] = 'No Tags.';
$string['tags'] = 'Tags';

$string['enrolment_layout'] = 'Enrolment Page Layout';
$string['enrolment_layout_desc'] = 'Enable Edwiser Layout for new and improved Enrolment Page design.';
$string['disable'] = 'Disable';
$string['defaultlayout'] = 'Default Moodle layout';
$string['enable_layout1'] = 'Edwiser Layout';

$string['webpage'] = "Web Page";
$string['categorypagelayout'] = 'Course archive Page Layout';
$string['categorypagelayoutdesc'] = 'Select between the Course archive page layouts.';
$string['edwiserlayout'] = 'Edwiser Layout';
$string['categoryfilter'] = 'Category Filter';

$string['skill0'] = 'Untagged';
$string['skill1'] = 'Beginner';
$string['skill2'] = 'Intermediate';
$string['skill3'] = 'Advanced';

$string['lastupdatedon'] = 'Last Updated On ';

$string['courseoverview'] = "Course Overview";
$string['coursecontent'] = "Course Content";
$string['instructors'] = "Instructors";
$string['reviews'] = "Reviews";
$string['curatedby'] = 'Instructors';
$string["studentsenrolled"] = 'Students Enrolled';
$string['lesson'] = 'Lesson';
$string['category'] = 'Category';
$string['review'] = 'Review';
$string['length'] = 'Duration';
$string['lecture'] = 'Lecture';
$string['startdate'] = 'Start Date';
$string['skilllevel'] = 'Skill Level';
$string['language'] = 'Language';
$string['certificate'] = 'Certificate';
$string['students'] = 'Students';
$string['courses'] = 'Courses';

// Course archive.
$string['cachedef_courses'] = 'Cache for courses';
$string['cachedef_guestcourses'] = 'Cache for guest courses';
$string['cachedef_updates'] = 'Cache for updates';
$string['mycourses'] = "My Courses";
$string['allcategories'] = 'All categories';
$string['categorysort'] = 'Sort Categories';
$string['sortdefault'] = 'Sort (none)';
$string['sortascending'] = 'A to Z';
$string['sortdescending'] = 'Z to A';

// Frontpage Old String.
// Home Page Settings.
$string['homepagesettings'] = 'Home Page';
$string['frontpagedesign'] = 'Frontpage Design';
$string['frontpagedesigndesc'] = 'Enable Legacy Builder or Edwiser RemUI Homepage builder';
$string['frontpagechooser'] = 'Choose frontpage design';
$string['frontpagechooserdesc'] = 'Choose your frontpage design.';
$string['frontpagedesignold'] = 'Legacy Homepage Builder';
$string['frontpagedesignolddesc'] = 'Default dashboard like previous.';
$string['frontpagedesignnew'] = 'New design';
$string['frontpagedesignnewdesc'] = 'Fresh new design with multiple sections. You can configure sections individualy on frontpage.';
$string['newhomepagedescription'] = 'Click on \'Site Home\' from the Navigation bar to go to \'Homepage Builder\' and create your own Homepage
<br><div><b style="color:red;">Note:</b> Home Page Builder will be depricated soon</div>
<br><div><a id="homepage-edwpagebuilder-migratorbtn" href="#" class="btn btn-primary ">migrate homepage to pagebuilder</a></div>migrate your  homepage to pagebuilder';
$string['frontpageloader'] = 'Upload loader image for frontpage';
$string['frontpageloaderdesc'] = 'This replace the default loader with your image';
$string['frontpageimagecontent'] = 'Header content';
$string['frontpageimagecontentdesc'] = ' This section relates to the top portion of your frontpage.';
$string['frontpageimagecontentstyle'] = 'Style';
$string['frontpageimagecontentstyledesc'] = 'You can choose between Static & Slider.';
$string['staticcontent'] = 'Static';
$string['slidercontent'] = 'Slider';
$string['addtext'] = 'Add Text';
$string['defaultaddtext'] = 'Education is a time-tested path to progress.';
$string['addtextdesc'] = 'Here you may add the text to be displayed on the front page, preferably in HTML.';
$string['uploadimage'] = 'Upload Image';
$string['uploadimagedesc'] = 'You may upload image as content for slide';
$string['video'] = 'iframe Embedded code';
$string['videodesc'] = ' Here, you may insert the iframe Embedded code of the video that is to be embedded.';
$string['contenttype'] = 'Select Content type';
$string['contentdesc'] = 'You can choose between image or give video url.';
$string['imageorvideo'] = 'Image/ Video';
$string['image'] = 'Image';
$string['videourl'] = 'Video URL';
$string['slideinterval'] = 'Slide interval';
$string['slideintervalplaceholder'] = 'Positive integer number in milliseconds.';
$string['slideintervaldesc'] = 'You may set the transition time between the slides. In case if there is one slide, this option will have no effect. If interval is invalid(empty|0|less than 0) then default interval is 5000 milliseconds.';
$string['slidercount'] = 'No of slides';
$string['slidercountdesc'] = '';
$string['one'] = '1';
$string['two'] = '2';
$string['three'] = '3';
$string['four'] = '4';
$string['five'] = '5';
$string['six'] = '6';
$string['eight'] = '8';
$string['nine'] = '9';
$string['twelve'] = '12';
$string['slideimage'] = 'Upload images for Slider';
$string['slideimagedesc'] = 'You may upload an image as content for this slide.';
$string['sliderurl'] = 'Add link to Slider button';
$string['slidertext'] = 'Add Slider text';
$string['defaultslidertext'] = '';
$string['slidertextdesc'] = 'You may insert the text content for this slide. Preferably in HTML.';
$string['sliderbuttontext'] = 'Add Text button on slide';
$string['sliderbuttontextdesc'] = 'You may add text to the button on this slide.';
$string['sliderurldesc'] = 'You may insert the link of the page where the user will be redirected once they click on the button.';
$string['sliderautoplay'] = 'Set Slider Autoplay';
$string['sliderautoplaydesc'] = 'Select ‘yes’ if you want automatic transition in your slideshow.';
$string['true'] = 'Yes';
$string['false'] = 'No';
$string['frontpageblocks'] = 'Body Content';
$string['frontpageblocksdesc'] = 'You may insert a heading for your site’s body';
$string['frontpageblockdisplay'] = 'About Us Section';
$string['frontpageblockdisplaydesc'] = 'You can show or hide the "About Us" section, also you can show "About Us" section in grid format';
$string['donotshowaboutus'] = 'Do Not Show';
$string['showaboutusinrow'] = 'Show Section in a Row';
$string['showaboutusingridblock'] = 'Show Section in Grid Block';

// About Us.
$string['frontpageaboutus'] = 'Frontpage About us';
$string['frontpageaboutusdesc'] = 'This section is for front page About us';
$string['frontpageaboutustitledesc'] = 'Add title to About Us Section';
$string['frontpageaboutusbody'] = 'Body Description for About Us Section';
$string['frontpageaboutusbodydesc'] = 'A brief description about this Section';
$string['enablesectionbutton'] = 'Enable buttons on Sections';
$string['enablesectionbuttondesc'] = 'Enable the buttons on body sections.';
$string['sectionbuttontextdesc'] = 'Enter the text for button in this Section.';
$string['sectionbuttonlinkdesc'] = 'Enter the URL link for this Section.';
$string['frontpageblocksectiondesc'] = 'Add title to this Section.';

// Block section 1.
$string['frontpageblocksection1'] = 'Body title for 1st Section';
$string['frontpageblockdescriptionsection1'] = 'Body description for 1st Section';
$string['frontpageblockiconsection1'] = 'Font-Awesome icon for 1st Section';
$string['sectionbuttontext1'] = 'Button text for 1st Section';
$string['sectionbuttonlink1'] = 'URL link for 1st Section';

// Block section 2.
$string['frontpageblocksection2'] = 'Body title for 2nd Section';
$string['frontpageblockdescriptionsection2'] = 'Body description for 2nd Section';
$string['frontpageblockiconsection2'] = 'Font-Awesome icon for 2nd Section';
$string['sectionbuttontext2'] = 'Button text for 2nd Section';
$string['sectionbuttonlink2'] = 'URL link for 2nd Section';

// Block section 3.
$string['frontpageblocksection3'] = 'Body title for 3rd Section';
$string['frontpageblockdescriptionsection3'] = 'Body description for 3rd Section';
$string['frontpageblockiconsection3'] = 'Font-Awesome icon for 3rd Section';
$string['sectionbuttontext3'] = 'Button text for 3rd Section';
$string['sectionbuttonlink3'] = 'URL link for 3rd Section';

// Block section 4.
$string['frontpageblocksection4'] = 'Body title for 4th Section';
$string['frontpageblockdescriptionsection4'] = 'Body description for 4th Section';
$string['frontpageblockiconsection4'] = 'Font-Awesome icon for 4th Section';
$string['sectionbuttontext4'] = 'Button text for 4th Section';
$string['sectionbuttonlink4'] = 'URL link for 4th Section';
$string['defaultdescriptionsection'] = 'Holisticly harness just in time technologies via corporate scenarios.';
$string['frontpagetestimonial'] = 'Frontpage Testimonial';
$string['frontpagetestimonialdesc'] = 'Frontpage Testimonial Section';
$string['enablefrontpageaboutus'] = 'Enable Testimonial section';
$string['enablefrontpageaboutusdesc'] = 'Enable the Testimonial section in front page.';
$string['frontpageaboutusheading'] = 'Testimonial Heading';
$string['frontpageaboutusheadingdesc'] = 'Heading for the default heading text for section';
$string['frontpageaboutustext'] = 'Testimonial text';
$string['frontpageaboutustextdesc'] = 'Enter testimonial text for frontpage.';
$string['frontpageaboutusdefault'] = '<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam.</p>';
$string['testimonialcount'] = 'Testimonial Count';
$string['testimonialcountdesc'] = 'Number of testimonials to show.';
$string['testimonialimage'] = 'Testimonial Image';
$string['testimonialimagedesc'] = 'Person image to display with testimonial';
$string['testimonialname'] = 'Person Name';
$string['testimonialnamedesc'] = 'Name of person';
$string['testimonialdesignation'] = 'Person Designation';
$string['testimonialdesignationdesc'] = 'Person\'s designation.';
$string['testimonialtext'] = 'Person\'s Testimonial';
$string['testimonialtextdesc'] = 'What person says';
$string['frontpageblockimage'] = 'Upload image';
$string['frontpageblockimagedesc'] = 'You may upload an image as content for this.';
$string['frontpageblockiconsectiondesc'] = 'You can choose any icon from this <a href="https://fontawesome.com/v4.7.0/cheatsheet/" target="_new">list</a>. Just enter the text after "fa-". ';
$string['frontpageblockdescriptionsectiondesc'] = 'A brief description about the title.';

// Course.
$string['graderreport'] = 'Grader Report';
$string['enroluser'] = 'Enrol Users';
$string['activityeport'] = 'Activity Report';
$string['editcourse'] = 'Edit Course';
$string['imageforcourse'] = 'Image for Course';
// Next Previous Activity.
$string['activityprev'] = 'Previous Activity';
$string['activitynext'] = 'Next Activity';
$string['activitynextpreviousbutton'] = 'Enable Next & Previous activity button';
$string['activitynextpreviousbuttondesc'] = 'When enabled, Next & Previous activity button will appear on the Single Activity page to switch between activities';
$string['disablenextprevious'] = 'Disable';
$string['enablenextprevious'] = 'Enable';
$string['enablenextpreviouswithname'] = 'Enable with Activity name';

// Importer.
$string['importer'] = 'Importer';
$string['importer-missing'] = 'Edwiser Site Importer plugin is missing. Please visit <a href="https://edwiser.org">Edwiser</a> site to download this plugin.';

// Information center.
$string['informationcenter'] = 'Information Center';
$string['licensenotactive'] = '<strong>Alert!</strong> License is not activated, please <strong>activate</strong> the license in RemUI settings.';
$string['licensenotactiveadmin'] = '<strong>Alert!</strong> License is not activated, please <strong>activate</strong> the license <a class="text-primary" href="'.$CFG->wwwroot.'/admin/settings.php?section=themesettingremui#informationcenter" >here</a>.';
$string['activatelicense'] = 'Activate License';
$string['deactivatelicense'] = 'Deactivate License';
$string['renewlicense'] = 'Renew License';
$string['deactivated'] = 'Deactivated';
$string['active'] = 'Active';
$string['notactive'] = 'Not Active';
$string['expired'] = 'Expired';
$string['licensekey'] = 'License key';
$string['licensestatus'] = 'License Status';
$string['no_activations_left'] = 'Limit exceeded';
$string['activationfailed'] = 'License Key activation failed. Please try again later.';
$string['noresponsereceived'] = 'No response received from the server. Please try again later.';
$string['licensekeydeactivated'] = 'License Key is deactivated.';
$string['siteinactive'] = 'Site inactive (Press Activate license to activate plugin).';
$string['entervalidlicensekey'] = 'Please enter valid license key.';
$string['nolicenselimitleft'] = 'Maximum activation limit reached, No activations left.';
$string['licensekeyisdisabled'] = 'Your license key is Disabled.';
$string['licensekeyhasexpired'] = "Your license key has Expired. Please, Renew it.";
$string['licensekeyactivated'] = "Your license key is activated.";
$string['entervalidlicensekey'] = "Please enter correct license key.";
$string['edwiserremuilicenseactivation'] = 'Edwiser RemUI License Activation';
$string['enterlicensekey'] = "Enter license key...";
$string['invalid'] = "Invalid";
$string['licensemismatch'] = "License mismatch";
$string['licensemismatchdesc'] = 'Oops! It seems you\'ve used a different product license key to activate the Edwiser RemUI theme. Please use the correct license key from your <a class="text-decoration-underline" href="https://edwiser.org/my-account/">My Account page</a> to activate the Edwiser RemUI theme.';

$string['courseheaderdesign'] = 'Course page header design';
$string['courseheaderdesigndesc'] = 'Choose course page header\'s design';
$string['default'] = 'Default';
$string['headerdesign'] = 'Header design {$a}';
$string['sidebarcoursemenuheading'] = "Course Menu";

// Notification.
$string['inproductnotification'] = "Update user preferences (In-product Notification) - RemUI";

$string["noti_enrolandcompletion"] = 'The modern, professional-looking Edwiser RemUI layouts have helped brilliantly in increasing your overall learner engagement with <b>{$a->enrolment} new course enrollments and {$a->completion} course completions</b> this month';

$string["noti_completion"] = 'Edwiser RemUI has improved your student engagement levels: You have a total of <b>{$a->completion} course completions</b> this month';

$string["noti_enrol"] = 'Your LMS design looks great with Edwiser RemUI: You have <b>{$a->enrolment} new course enrollments</b> in your portal this month';

$string["coolthankx"] = "Cool, Thanks!";

$string['gridview'] = 'Grid View';
$string['listview'] = 'List View';
$string['summaryview'] = 'Summary View';

$string['side-top'] = "Box Content Top";
$string['content'] = "Moodle Default";
$string['side-bottom'] = "Box Content Bottom";
$string['side-pre'] = "Right Sidebar";

$string['sitenamecolor'] = "Site name or icon color.";
$string['sitenamecolordesc'] = "Color for sitename and site icon text, which will also be applied on login page.";

$string['coursesenrolled'] = "Courses Enrolled";
$string['coursescompleted'] = "Courses Completed";
$string['activitiescompleted'] = "Activities Completed";
$string['activitiesdue'] = "Activities Due";

// Customizer Strings
$string['customizer-migrate-notice'] = 'Color settings are migrated to visual personalizer. Please click below button to open visual personalizer.';
$string['customizer-close-heading'] = 'Close visual personalizer';
$string['customizer-close-description'] = 'Unsaved changes will be discarded. Would you like to continue?';
$string['reset'] = 'Reset';
$string['resetall'] = 'Reset All';
$string['reset-settings'] = 'Reset all visual personalizer settings';
$string['reset-settings-description'] = '
<div>Visual personalizer settings will be restored to default. Do you want to continue?</div>
<div class="mt-3"><strong>Reset All:</strong> Reset all settings.</div>
<div class="mt-3"><strong>Reset:</strong> Settings except the follwing settings will be reset to default.</div>
';
$string['link'] = 'Link';
$string['customizer'] = 'Visual personalizer';
$string['error'] = 'Error';
$string['resetdesc'] = 'Reset setting to last save or default when nothing saved';
$string['noaccessright'] = 'Sorry! You don\'t have rights to use this page';

$string['font-family'] = 'Font family';
$string['font-family_help'] = 'Set font family of {$a}';

$string['button-font-family'] = 'Font family';
$string['button-font-family_help'] = 'Set font family of button text';

$string['font-size'] = 'Font size';
$string['font-size_help'] = 'Set font size of {$a}';
$string['font-weight'] = 'Font weight';
$string['font-weight_help'] = 'Set a font weight of {$a}. The font-weight property sets how thick or thin characters in text should be displayed.';
$string['line-height'] = 'Line height';
$string['line-height_help'] = 'Set line height of {$a}';
$string['global'] = 'Global';
$string['global_help'] = 'You can manage global settings like color, font, heading, buttons etc.';
$string['site'] = 'Site';
$string['text-color'] = 'Text color';
$string['welcome-text-color'] = 'Welcome text color';
$string['text-hover-color'] = 'Text Hover color';
$string['text-color_help'] = 'Set text color of {$a}';
$string['content-color'] = 'Content color';
$string['icon-color'] = 'Icon color';
$string['icon-hover-color'] = 'Icon Hover color';
$string['icon-color_help'] = 'Set icon color of {$a}';
$string['link-color'] = 'Link color';
$string['link-color_help'] = 'Set link color of {$a}';
$string['link-hover-color'] = 'Link hover color';
$string['link-hover-color_help'] = 'Set link hover color of {$a}';
$string['typography'] = 'Typography';
$string['inherit'] = 'Inherit';
$string["weight-100"] = '100';
$string["weight-200"] = '200';
$string["weight-300"] = '300';
$string["weight-400"] = '400';
$string["weight-500"] = '500';
$string["weight-600"] = '600';
$string["weight-700"] = '700';
$string["weight-800"] = '800';
$string["weight-900"] = '900';
$string['text-transform'] = 'Text transform';
$string['text-transform_help'] = 'The text-transform property controls the capitalization of text. Set text transform of {$a}.';

$string['button-text-transform'] = 'Text transform';
$string['button-text-transform_help'] = 'The text-transform property controls the capitalization of text. Set text transform for button text';

$string["default"] = 'Default';
$string["none"] = 'None';
$string["capitalize"] = 'Capitalize';
$string["uppercase"] = 'Uppercase';
$string["lowercase"] = 'Lowercase';
$string['background-color'] = 'Background color';
$string['background-hover-color'] = 'Background Hover color';
$string['background-color_help'] = 'Set background color of {$a}';
$string['background-hover-color'] = 'Background hover color';
$string['background-hover-color_help'] = 'Set background hover color of {$a}';
$string['color'] = 'Color';
$string['customizing'] = 'Personalizing';
$string['savesuccess'] = 'Saved successfully.';
$string['mobile'] = 'Mobile';
$string['tablet'] = 'Tablet';
$string['hide-customizer'] = 'Hide visual personalizer';
$string['customcss_help'] = 'You can add custom CSS. This will be applied on all the pages of your site.';

// Customizer Global body.
$string['body'] = 'Body';
$string['body-font-family_desc'] = 'Set font family for entire site. Note if set to Standard then font from RemUI setting will be applied.';
$string['body-font-size_desc'] = 'Set base font size for entire site.';
$string['body-fontweight_desc'] = 'Set font weight for entire site.';
$string['body-text-transform_desc'] = 'Set text transform for entire site.';
$string['body-lineheight_desc'] = 'Set line height for entire site.';
$string['faviconurl_help'] = 'Favicon url';

// Customizer Global heading.
$string['heading'] = 'Heading';
$string['use-custom-color'] = 'Use custom color';
$string['use-custom-color_help'] = 'Use custom color for {$a}';
$string['typography-heading-all-heading'] = 'Headings (H1 - H6)';
$string['typography-heading-h1-heading'] = 'Heading 1';
$string['typography-heading-h2-heading'] = 'Heading 2';
$string['typography-heading-h3-heading'] = 'Heading 3';
$string['typography-heading-h4-heading'] = 'Heading 4';
$string['typography-heading-h5-heading'] = 'Heading 5';
$string['typography-heading-h6-heading'] = 'Heading 6';

// Customizer Colors.
$string['primary-color'] = 'Primary color';
$string['primary-color_help'] = 'Apply brand primary color to entire site. This color will be applied to the button, text links, On hover and for active header menu items, On hover and for active icons
    <br><b>Note:</b> Changing primary color won\'t change the button colors if you have changed the button colors via their individuals settings (<b>Global > Buttons> Button Color Settings</b>). Reset the button colors from their individual settings to change the button change by globally chaning the primary color from here ';

$string['secondary-color'] = 'Ascent color';
$string['secondary-color_help'] = 'Apply ascent color to entire site. This color will be applied to Icons on the Stats block on the Dashboard page, tags on course cards, course header banners';

$string['page-background'] = 'Page background';
$string['page-background_help'] = 'Set custom page background to page content area. You can choose color, gradient or image. Gradient color angle is 100deg.';

$string['page-background-color'] = 'Page background color';
$string['page-background-color_help'] = 'Set background color to page content area.';

$string['page-background-image'] = 'Page background image';
$string['page-background-image_help'] = 'Set image as background for page content area.';

$string['gradient'] = 'Gradient';
$string['gradient-color1'] = 'Gradient color 1';
$string['gradient-color1_help'] = 'Set first color of gradient';
$string['gradient-color2'] = 'Gradient color 2';
$string['gradient-color2_help'] = 'Set second color of gradient';
$string['gradient-color-angle'] = 'Gradient Angle';
$string['gradient-color-angle_help'] = 'Set angle for gradient colors';

$string['page-background-imageattachment'] = 'Background image attachment';
$string['page-background-imageattachment_help'] = 'The background-attachment property sets whether a background image scrolls with the rest of the page, or is fixed.';

$string['image'] = 'Image';
$string['additional-css'] = 'Additional css';
$string['left-sidebar'] = 'Left sidebar';
$string['main-sidebar'] = 'Main sidebar';
$string['sidebar-links'] = 'Sidebar links';
$string['secondary-sidebar'] = 'Secondary sidebar';
$string['header'] = 'Header';
$string['headertypography'] = 'Header typography';
$string['headercolors'] = 'Header colors';
$string['menu'] = 'Menu';
$string['site-identity'] = 'Site Identity';
$string['primary-header'] = 'Primary header';
$string['color'] = 'Color';

// Customizer Buttons.
$string['buttons'] = 'Buttons';
$string['border'] = 'Border';
$string['border-width'] = 'Border width';
$string['border-width_help'] = 'Set border width of {$a}';
$string['border-color'] = 'Border color';
$string['border-color_help'] = 'Set border color of {$a}';
$string['border-hover-color'] = 'Border hover color';
$string['border-hover-color_help'] = 'Set border hover color of {$a}';
$string['border-radius'] = 'Border radius';
$string['border-radius_help'] = 'Set border radius of {$a}';
$string['letter-spacing'] = 'Letter spacing';
$string['letter-spacing_help'] = 'Set letter spacing of {$a}';
$string['text'] = 'Text';
$string['padding'] = 'Padding';
$string['padding-top'] = 'Padding top';
$string['padding-top_help'] = 'Set padding top of {$a}';
$string['padding-right'] = 'Padding right';
$string['padding-right_help'] = 'Set padding right of {$a}';
$string['padding-bottom'] = 'Padding bottom';
$string['padding-bottom_help'] = 'Set padding bottom of {$a}';
$string['padding-left'] = 'Padding left';
$string['padding-left_help'] = 'Set padding left of {$a}';
$string['secondary'] = 'Secondary';
$string['colors'] = 'Colors';
$string['commonbuttonsettings'] = 'Common Settings';
$string['buttonsizesettings'] = 'Button Sizes';
$string['buttonsizesettingshead'] = '{$a}';
$string['commonfontsettings'] = 'Font';
$string['buttoncolorsettings'] = 'Button Color Settings';
// Customizer Header.
$string['header-background-color_help'] = 'Set background color of header. This will not be applied if <strong>Set Header Background color same as logo background color</strong> is enabled.';
$string['site-logo'] = 'Site logo';
$string['header-menu'] = 'Header menu';
$string['box-shadow-size'] = 'Box shadow size';
$string['box-shadow-size_help'] = 'Set box shadow size for site header';
$string['box-shadow-blur'] = 'Box shadow blur';
$string['box-shadow-blur_help'] = 'Set box shadow blur for site header';
$string['box-shadow-color'] = 'Box shadow color';
$string['box-shadow-color_help'] = 'Set box shadow color for site header';
$string['layout-desktop'] = 'Layout desktop';
$string['layout-desktop_help'] = 'Set header\'s layout for desktop';
$string['layout-mobile'] = 'Layout mobile';
$string['layout-mobile_help'] = 'Set header\'s layout for mobile';
$string['header-left'] = 'Left icon right menu';
$string['header-right'] = 'Right icon left menu';
$string['header-top'] = 'Top icon bottom menu';
$string['hover'] = 'Hover';
$string['logo'] = 'Logo';
$string['applynavbarcolor'] = 'Set Header Background color same as logo background color';
$string['applynavbarcolor_help'] = 'Logo background color will be applied to entire header. Changing logo background color will change background color of header. You can still apply custom text color and hover color to header menus.';
$string['header-background-color-warning'] = 'Will not be used if <strong>Set site color of navbar</strong> is enabled.';
$string['logosize'] = 'Expected aspect ratio is 130:33 for left view, 140:33 for right view.';
$string['logominisize'] = 'Expected aspect ratio is 40:33.';
$string['sitenamewithlogo'] = 'Site name with logo(Top view only)';

// Customizer Sidebar.
$string['link-text'] = 'Link text';
$string['link-text_help'] = 'Set link text color of {$a}';
$string['link-icon'] = 'Link icon';
$string['link-icon_help'] = 'Set link icon color of {$a}';
$string['active-link-color'] = 'Active link color';
$string['active-link-color_help'] = 'Set custom color to active link of {$a}';
$string['active-link-background'] = 'Active link background';
$string['active-link-background_help'] = 'Set custom color to active link background of {$a}';
$string['link-hover-background'] = 'Link hover background';
$string['link-hover-background_help'] = 'Set link hover background to {$a}';
$string['link-hover-text'] = 'Link hover text';
$string['link-hover-text_help'] = 'Set link hover text color of {$a}';

// Customizer Footer.
$string['footer'] = 'Footer';
$string['basic'] = 'Footer design';
$string['socialall'] = 'Social media links';
$string['advance'] = 'Main footer area';
$string['footercolumn'] = 'Widget';
$string['footercolumnwidgetno'] = 'Select number of widgets';
$string['footercolumndesc'] = 'Number of widgets to show in footer.';
$string['footercolumntype'] = 'Select type';
$string['footercolumnsettings'] = 'Footer Column Settings';
$string['footercolumntypedesc'] = 'You can choose footer widget type';
$string['footercolumnsocial'] = 'Social media links';
$string['footercolumnsocialdesc'] = 'Select the links to the displayed. Press and hold "ctrl" on the keyboard to select multiple links';
$string['footercolumntitle'] = 'Add title';
$string['footercolumntitledesc'] = 'Add title to this widget.';
$string['footercolumncustomhtml'] = 'Content';
$string['footercolumncustomhtmldesc'] = 'You can customize content of this widgest using below given editor.';
$string['both'] = 'Both';
$string['footercolumnsize'] = 'Adjust widget width';
$string['footercolumnsizenote'] = 'Drag vertical line to adjust widget size.';
$string['footercolumnsizedesc'] = 'You can set individual widget size.';
$string['footercolumnmenu'] = 'Menu';
$string['footercolumnmenureset'] = 'Footer Column Menus';
$string['footercolumnmenudesc'] = 'Link menu';
$string['footermenu'] = 'Menu';
$string['footermenudesc'] = 'Add menu in footer widget.';
$string['customizermenuadd'] = 'Add menu item';
$string['customizermenuedit'] = 'Edit menu item';
$string['customizermenumoveup'] = 'Move menu item up';
$string['customizermenuemovedown'] = 'Move menu item down';
$string['customizermenuedelete'] = 'Delete menu item';
$string['menutext'] = 'Text';
$string['menuaddress'] = 'Address';
$string['menuorientation'] = 'Menu orientation';
$string['menuorientationdesc'] = 'Set orientation of menu. Orientation can be either vertical or horizontal.';
$string['menuorientationvertical'] = 'Vertical';
$string['menuorientationhorizontal'] = 'Horizontal';
$string['footerfacebook'] = 'Facebook';
$string['footertwitter'] = 'X (formerly Twitter)';
$string['footerlinkedin'] = 'Linkedin';
$string['footergplus'] = 'Google Plus';
$string['footeryoutube'] = 'Youtube';
$string['footerinstagram'] = 'Instagram';
$string['footerpinterest'] = 'Pinterest';
$string['footerquora'] = 'Quora';
$string['footershowlogo'] = 'Show Logo';
$string['footershowlogodesc'] = 'Show logo in the secondary footer.';
$string['footersecondarysocial'] = 'Show social media links';
$string['footersecondarysocialdesc'] = 'Show social media links in the secondary footer.';
$string['footertermsandconditionsshow'] = 'Show Terms & Conditions';
$string['footertermsandconditions'] = 'Terms & Conditions Link';
$string['footertermsandconditionsdesc'] = 'You can add link for Terms & Conditions page.';
$string['footerprivacypolicyshow'] = 'Show Privacy Policy';
$string['footerprivacypolicy'] = 'Privacy Policy Link';
$string['footerprivacypolicydesc'] = 'You can add link for Privacy Policy page.';
$string['footercopyrightsshow'] = 'Show Copyrights Content';
$string['footercopyrights'] = 'Copyrights Content';
$string['footercopyrightsdesc'] = 'Add Copyrights content in the bottom of page.';
$string['footercopyrightstags'] = 'Tags:<br>[site]  -  Site name<br>[year]  -  Current year';
$string['termsandconditions'] = 'Terms & Conditions';
$string['privacypolicy'] = 'Privacy Policy';
$string['footerfont'] = 'Font';
$string['footerbasiccolumntitle'] = 'Column title';
$string['divider-color'] = 'Divider color';
$string['divider-color_help'] = 'Set divider color of {$a}';
$string['text-hover-color'] = 'Text hover color';
$string['text-hover-color_help'] = 'Set text hover color of {$a}';
$string['link-color'] = 'Link color';
$string['link-color_help'] = 'Set link color of {$a}';
$string['link-hover-color'] = 'Link hover color';
$string['link-hover-color_help'] = 'Set link hover color of {$a}';
$string['icon-default-color'] = 'Icon color';
$string['icon-default-color_help'] = 'Icon color of {$a}';
$string['icon-hover-color'] = 'Icon hover color';
$string['icon-hover-color_help'] = 'Icon hover color of {$a}';
$string['footerfontsize_help'] = 'Set font size';
$string['footer-color-heading1'] = 'Footer colors';
$string['footer-color-heading2'] = 'Footer links';
$string['footer-color-heading3'] = 'Footer icons';

$string['footerfontfamily'] = 'Font family';
$string['footerfontfamily_help'] = 'Font family';
$string['footerfontsize'] = 'Font size';
$string['footerfontsize_help'] = 'Footer font size';
$string['footerfontweight'] = 'Font weight';
$string['footerfontweight_help'] = 'Footer font weight';
$string['footerfonttext-transform'] = 'Text case';
$string['footerfonttext-transform_help'] = 'Text case';
$string['footerfontlineheight'] = 'Line spacing';
$string['footerfontlineheight_help'] = 'Line spacing';
$string['footerfontltrspace'] = 'Letter spacing';
$string['footerfontltrspace_help'] = 'Set letter spacing of {$a}';

$string['footer-columntitle-fontfamily'] = 'Font family';
$string['footer-columntitle-fontfamily_help'] = 'Font family';
$string['footer-columntitle-fontsize'] = 'Font size';
$string['footer-columntitle-fontsize_help'] = 'Footer column title font size';
$string['footer-columntitle-fontweight'] = 'Font weight';
$string['footer-columntitle-fontweight_help'] = 'Footer column title font weight';
$string['footer-columntitle-textransform'] = 'Text case';
$string['footer-columntitle-textransform_help'] = 'Text case';
$string['footer-columntitle-lineheight'] = 'Line spacing';
$string['footer-columntitle-lineheight_help'] = 'Line spacing';
$string['footer-columntitle-ltrspace'] = 'Letter spacing';
$string['footer-columntitle-ltrspace_help'] = 'Letter spacing';
$string['footer-columntitle-color'] = 'Color';
$string['footer-columntitle-color_help'] = 'Color';

$string['openinnewtab'] = 'Open in a new tab';
$string['useheaderlogo'] = 'Use the same logo from header';
$string['secondaryfooterlogo'] = 'Add a new logo';
$string['logosettings'] = 'Logo settings';
$string['loginformsettings'] = 'Login form settings';
$string['loginpagesettings'] = 'Login page settings';
$string['footersecondary'] = 'Footer bottom area';
$string['footer-columns'] = 'Footer columns';
$string['footer-columntitle-color_help'] = 'Set text color of {$a}';
$string['footer-logo-color'] = 'Select Icon or Text color';
$string['footer-logo-color_help'] = 'Select Icon or Text color';
// Customizer login.
$string['login'] = 'Login';
$string['panel'] = 'Panel';
$string['page'] = 'Page';
$string['loginbackgroundopacity'] = 'Background overlay opacity';
$string['loginbackgroundopacity_help'] = 'Apply  overlay to login page background image.';
$string['loginpanelbackgroundcolor_help'] = 'Apply background color to login panel.';
$string['loginpaneltextcolor_help'] = 'Apply text color to login panel.';
$string['loginpanelcontentcolor_help'] = 'Apply text color to login panel content.';
$string['loginpanellinkcolor_help'] = 'Apply link color to login panel.';
$string['loginpanellinkhovercolor_help'] = 'Apply link hover color to login panel.';
$string['login-panel-position'] = 'Login panel position';
$string['login-panel-position_help'] = 'Set position for login and registration panel';
$string['login-page-info'] = '<p><b>Note: </b>The login page cannot be previewed in visual personalizer because logged-out users can only view it. You can test the setting by saving and opening the login page in incognito mode.</p>';
$string['login-page-setting'] = 'Page background style';
$string['login-page-backgroundgradient1'] = 'Select Color 1';
$string['login-page-backgroundgradient2'] = 'Select Color 2';
$string['loginpanelbackgroundcolor'] = 'Page background Color';
$string['loginpagebackgroundcolor'] = 'Select background Color';
$string['loginpagebackgroundcolor_help'] = 'Set Login page background. You can choose color, gradient or image.';
$string['login-page-background_help'] = 'Apply background color to login panel';

/*Customizer Strings*/
$string['primary'] = 'Primary';

$string['dashboardsettingdesc'] = 'Dashboard related settings';
$string['dashboardsetting'] = 'Dashboard';
$string['dashboardpage'] = 'Dashboard page';
$string['enabledashboardcoursestats'] = 'Enable Dashboard Course Stats';
$string['enabledashboardcoursestatsdesc'] = 'If enabled, will show course stats on dashboard page';

$string['customizecontrolsclose'] = "Close";

// Quick setup customizer.
$string['quicksetup'] = 'Quick setup';
$string['pallet'] = 'Pallete';
$string['colorpallet'] = 'Color palettes';
$string['currentpallet'] = 'Current Pallete';
$string['currentfont'] = 'Current font';
$string['colorpalletdesc'] = 'Color palettes description';
$string['preset1'] = 'Preset 1';
$string['preset2'] = 'Preset 2';
$string['sitefavicon'] = 'Site favicon';

$string['themecolors'] = 'Theme colors';
$string['brandcolors-heading'] = 'Brand colors';
$string['border-color'] = 'Border color';
$string['border-hover-color'] = 'Border Hover color';
$string['smart-colors-heading'] = "Apply global colors";
$string['smart-colors-info'] = "<p>The global colors and its shades/ tints will be applied to the site to create a visually stunning color combination</p><p><b>Note: </b>You have the flexibility to personalize the colors of individual elements at any time by simply visiting their specific settings.</p>";
$string['apply'] = "Apply";
$string['backgroundsettings'] = 'Background settings';

$string['ascent-background-color'] = 'Ascent background color';
$string['ascent-background-color_help'] = 'Set the Ascent background color. This color will be applied to background of the tags on the site except for the tags on the course cards and course header banner';
$string['element-background-color'] = 'Element background color';
$string['element-background-color_help'] = 'Set the Element background color. This color is applied to the backgound for small text, background on hover for dropdown texts, background of section headers , tooltips etc';

$string['light-border-color'] = 'Light border color';
$string['themecolors-lightbordercolor_help'] = 'Set the Light border color. This color is applied as Border to elements with White backgrounds like Notification dropdown on header, Course Cards, search for course dropdown and on divider lines on the block elements etc';

$string['medium-border-color'] = 'Medium border color';
$string['themecolors-mediumbordercolor_help'] = 'Set the  Medium border color. This color is applied as the Border color and divider color. It is spefically applied as border color for Dropdowns and search box and also to elements background for whom the element background color is applied (You can find the Element background color setting under <b>Theme Colors > Background settings</b>)  for examples like background for small text, background of section headers , tooltips etc';
$string['borderssettings'] = 'Borders settings';

// Quick Menu settings.
$string['enablequickmenu'] = 'Enable Quick menu';
$string['enablequickmenudesc'] = 'Quick links floating menu for easier access to pages.';

// Left Navigation Drawer.
$string['coursearchivepage'] = 'Course Archive Page';
$string['createanewcourse'] = 'Create A New Course';
$string['remuisettings'] = 'RemUI Settings';

$string['bodysettingslinking'] = 'Link Advance settings';
$string['bodysettingslinking_help'] = 'When enabled, settings from Small Paragraph and Small Info Text will be linked with body settings.';
$string['bodysettingslinked'] = 'Linked with body settings';
$string['normal-para-font'] = "Normal paragraph";
$string['smallpara-font'] = "Small paragraph";
$string['smallinfo-font'] = "Small info text";

$string['interactiveicons'] = 'Interactive icons';
$string['noninteractiveicons'] = 'Non-interactive icons';
$string['singlecolorsicon'] = "Single colors icon";
$string['scicon-color'] = 'Color';
$string['scicon-color_help'] = 'Single-color-icon rest state color';
$string['scicon-hover'] = 'Hover';
$string['scicon-hover_help'] = 'Single-color-icon hover state color';
$string['scicon-active'] = 'Active';
$string['scicon-active_help'] = 'Single-color-icon active state color';

$string['dualcolorsicon'] = "Dual colors icon";
$string['dcicon-color'] = 'Color';
$string['dcicon-color_help'] = 'Dual-color-icon rest state color';
$string['dcicon-hover'] = 'Hover';
$string['dcicon-hover_help'] = 'Dual-color-icon hover state color';
$string['dcicon-active'] = 'Active';
$string['dcicon-active_help'] = 'Dual-color-icon active state color';

$string['non-interactive-color'] = 'Color';
$string['non-interactive-color_help'] = 'Non interactive icon color';
$string['textlink'] = 'Text link';

$string['header-logo-setting'] = 'Header logo settings';
$string['logo-bg-color'] = 'Logo background color';
$string['logo-bg-color_help'] = 'Set background color to header brand logo.';
$string['header-design-settings'] = 'Header design settings';
$string['hide-show-menu-item'] = 'Hide/Show menu item';
$string['hide-dashboard'] = 'Hide Dashboard';
$string['hide-dashboard_help'] = 'By enabling this, Dashboard item from header will be hidden';
$string['hide-home'] = 'Hide Home';
$string['hide-home_help'] = 'By enabling this, Home item from header will be hidden';
$string['hide-my-courses'] = 'Hide My Courses';
$string['hide-my-courses_help'] = 'By enabling this, My courses and nested course items from header will be hidden';
$string['hide-site-admin'] = 'Hide Site Administration';
$string['hide-site-admin_help'] = 'By enabling this, Site Administration item from header will be hidden';
$string['hide-recent-courses'] = 'Hide Recent Courses';
$string['hide-recent-courses_help'] = 'By enabling this, Recent Courses dropdown from header will be hidden';
$string['header-menu-element-bg-color'] = 'Element background color';
$string['header-menu-element-bg-color_help'] = 'Element background color';
$string['header-menu-divider-bg-color'] = 'Element divider color';
$string['header-menu-divider-bg-color_help'] = 'Element divider color';
$string['hds-iconcolor'] = 'Header icon color';
$string['hds-boxshadow'] = 'Header box shadow';

$string['hds-menuitems'] = 'Header menu items';
$string['hds-menu-fontsize_desc'] = 'Set font size for header menu items';
$string['hds-menu-color'] = 'Menu item color';
$string['hds-menu-color_desc'] = 'Set header menu item color';
$string['hds-menu-hover-color'] = 'Menu item hover color';
$string['hds-menu-hover-color_desc'] = 'Set header menu item hover color';
$string['hds-menu-active-color'] = 'Menu item active color';
$string['hds-menu-active-color_desc'] = 'Set header menu item active color';

$string['hds-icon-color'] = 'Icons color';
$string['hds-icon-color_help'] = 'Header menu icons color';
$string['hds-icon-hover-color'] = 'Icons hover color';
$string['hds-icon-hover-color_help'] = 'Header menu icons hover color';
$string['hds-icon-active-color'] = 'Icons active color';
$string['hds-icon-active-color_help'] = 'Header menu icons color active state color';

$string['preset1'] = "Preset 1";
$string['preset2'] = "Preset 2";
$string['preset3'] = "Preset 3";
$string['fonts'] = "Fonts";
$string['show'] = "Show";
$string['hide'] = "Hide";

$string['other-bg-color'] = 'Other background colors';
$string['text-link-panel'] = 'Text link';
$string['colorpalletes'] = 'Color palettes';
$string['selectpallete'] = 'Select palette';
$string['selectfont'] = 'Select font';

$string['socialiconspanel'] = "Social icons panel";
$string['social-icons-info'] = "<p>To display the social media icons at the bottom on any column with content, go to <b>Footer > Footer Main Area > Widget > Select type = Content </b> and turn on the show social media icons setting.</p>";
$string['social-icons-heading'] = "Social media icons";
$string["custommenulinktext"] = 'Custom menu items';
$string["custommenulink"] = '<h6>Custom menu items</h6><p> To Add / Edit / Delete custom menu items go to Site Administration > Appearance > Theme Settings > <a href="{$a}/admin/settings.php?section=themesettingsadvanced#admin-custommenuitems" target ="_blank" class="text-decoration-none">Custom menu items</a> <p>';
$string['note'] = 'Note';
$string['social-media-selection-note'] = "<p>Press Ctrl to select/deselect the media</p>";

$string['editmodeswitch'] = "Edit Mode Switch";
$string['continue'] = 'Continue';
$string['viewcourse'] = 'View Course';
$string['hiddencourse'] = 'Hidden Course';
$string['openquickmenu'] = 'Open quick menu';
$string['closequickmenu'] = 'Close quick menu';
$string['start'] = 'Start';

$string['readmore'] = 'Read More';
$string['readless'] = 'Read Less';
$string['setting'] = 'Settings';
$string['lastaccess'] = 'Last access ';
$string['certificate'] = 'Certificates';
$string['badge'] = 'Badges';
$string['firstname'] = 'First name';
$string['lastname'] = 'Last name';
$string['badgefrom'] = 'Badges from {$a}';
$string['timelinenoevenettext'] = 'No upcoming activities due';
$string['description']  = 'Description';
$string['instructorcounttitle'] = "Additional teachers available in the course";

$string['personalizer'] = "Visual Personalizer";
$string['edwpersonalizer'] = "Visual Personalizer";
$string['editinpersonalizer'] = "Edit with Personalizer";
$string['activepersonalizer'] = "Viewing in Edwiser Personalizer.";
$string['searchtotalcount'] = 'Showing {$a} results';
$string['noresutssearchmsg'] = "<h4 class ='p-p-6 text-center m-0 '>Nothing to Display</h4>";
$string['globarsearchresult'] = "Global Search  Results";
$string['searchresultdesctext']  = 'Showing result for';
$string['noresultfoundmg'] = "<h4 class ='p-p-6 text-center m-0 '>No Results Found</h4>";

$string['enrol_relatedcourses'] = 'Related Courses';
$string['enrol_latestcourses'] = 'Latest Courses';
$string['enrol_coursecardesc'] = 'Discover your perfect program in our courses.';
$string['enrol_viewall'] = 'View All';

$string['showrelatedcourse'] = "Show Related Courses";
$string['showrelatedcoursedesc'] = "Enable this setting to show the related courses on enrollment page.";

$string['showlatestcourse'] = 'Show Latest Courses';
$string['showlatestcoursedesc'] = 'Enable this setting to show the latest course on enrollment page.';

$string['latestcoursecount'] = 'Latest Courses Block Count';
$string['latestcoursecountdesc'] = 'Set a number for the latest courses displayed on the enrollment page';

$string['allcourescattext'] = 'All categories';
$string['archivecoursecounttext'] = 'Courses';
$string['coursecardlessonstext'] = 'Lessons';
$string['prevsectionbuttontext'] = 'Prev Section';
$string['nextsectionbuttontext'] = 'Next Section';

$string['eight'] = '8';
$string['twelve'] = '12';
$string['sixteen'] = '16';
$string['twenty'] = '20';

// My Course Page.
$string['resume'] = 'Resume';
$string['start'] = 'Start';
$string['completed'] = 'Completed';


$string['siteannouncementheading'] = 'Site-wide announcement';
$string['siteannouncementheadingdesc'] = 'Enable site-wide announcement for all users.';
$string['seosettingsheading'] = 'SEO settings';
$string['seosettingsheadingdesc'] = 'Optimize your website\'s visibility on search engines.';
$string['sitecustomizationhead'] = 'Site customization';
$string['sitecustomizationheaddesc'] = 'Choose fonts, layout size for pages and you may customize with the CSS.';
$string['advancefeatureshead'] = 'Advance features settings';
$string['advancefeaturesheaddesc'] = 'Enhance your learning experience with advanced settings.';
$string['mainfooterareahead'] = 'Main footer area';
$string['mainfooterareaheaddesc'] = 'Main footer area setting';

// heading-advance weight settings
$string['heading-adv-setting'] = 'Font Weight Settings';
$string['heading-regular-fontweight'] = 'Font weight regular';
$string['heading-semibold-fontweight'] = 'Font weight semibold';
$string['heading-bold-fontweight'] = 'Font weight bold';
$string['heading-exbold-fontweight'] = 'Font weight extrabold';

// Usage tracking.
$string["usagedatatracker"] = "Usage data tracker";
$string['enableusagetracking'] = "Enable Usage Tracking";
$string['enableusagetrackingdesc'] = "<strong>USAGE TRACKING NOTICE</strong>

<hr class='text-muted' />

<p>Edwiser from now on will collect anonymous data to generate product usage statistics.</p>

<p>This information will help us guide the development in right direction and the Edwiser community prosper.</p>

<p>Having said that we don't gather your personal data or of your students during this process. You can disable this from the plugin whenever you wish to opt out of this service.</p>

<p>An overview of the data collected is available <strong><a href='https://forums.edwiser.org/topic/67/anonymously-tracking-the-usage-of-edwiser-products' target='_blank'>here</a></strong>.</p>";



$string['profileinterestinfo'] = 'To Edit Interests Go To Profile Settings -> Edit Profile ->';
$string['profileinterest'] = 'Interests';
$string['citytowntext'] = 'City/Town';
$string['selectcountrystring'] = 'Select a country...';

$string['heading-fontweight_desc'] = 'Set heading\'s  font weight for entire site.';
$string['small-para-fontweight_desc'] = 'Set small para font weight for entire site.';
$string['small-info-fontweight_desc'] = 'Set small info  font weight for entire site.';

$string['full-width-top'] = 'Full-width Top';
$string['full-bottom'] = 'Full-width Bottom';

$string['homepageedwpagebuilderoption'] = "Use Edwiser Pagebuilder for homepage";

$string['livecustomizer'] = "Live Customizer";

$string['loaderimagehead'] = 'Site Loader Image';
$string['loaderimagedesc'] = 'Choose loader image for your site';

$string['region-full-bottom'] = 'Full width bottom region';
$string['region-full-width-top'] = 'Full width top region';

$string['homepagetransparentheadertitle'] = 'Transparent Header Style';
$string['homepagetransparentheaderdesc']  = "Make your homepage header transparent";

$string['frontpageheadercolortitle'] = 'Choose header text color';
$string['frontpageheadercolordesc']  = "Choose header text color";

$string['transparentheaderheader'] = 'Homepage header style';
$string['transparentheaderheaderdesc'] = 'Enable / disable transparent header style';

$string['hidehomepageelement'] = 'Hide Home Page Elements';
$string['hidehomepageelementdesc'] = 'Hide content header, sub navigation, and activity section';

$string['hideheadercontenttitle'] = 'Hide Content Header';
$string['hideheadercontentdesc'] = 'If enabled, the Site Name and Moodle’s secondary navigation will be removed on the home page';

$string['hideactivitysectiontitle'] = 'Hide Activity section';
$string['hideactivitysectiondesc'] = 'If enabled, the activity section will be hide on home page.';

$string['floataddblockbtnregionselectionmsg'] = 'New blocks will be added currently visible "{$a}" region';

// settings page deprication design strings
$string['settingpage-dep-top-st1'] = 'Introducing a better way to build and customize Homepages!';
$string['settingpage-dep-top-st2'] = 'We are excited to present the Edwiser RemUI Page Builder to create homepage along with newly designed template library consisting of 30+ blocks templates and 7 homepage layouts';
$string['settingpage-dep-top-st3'] = '1. Update the Edwiser RemUI Page Builder to version v4.2.0 and above form <a href="https://edwiser.org/my-account/" target="_blank">here</a>';

$string['settingpagedepbottomst1'] = 'Select the Page Builder in the drop down above, and go to the Homepage to create a new homepage design.';
$string['settingpagedepbottomst2'] = 'Learn More';
$string['settingpagedepbottomst3'] = 'OR';

$string['settingpagedepbottomsecondaryst1'] = 'Automatically migrate your homepage builder content to the Edwiser Page Builder.';
$string['settingpagedepbottomsecondaryst2'] = '<span class="para-semibold-1 m-0">Note:</span> Edwiser RemUI page builder plugin version v4.2.0 and the Homepage builder plugin version v4.1.3 is required.';
$string['settingpagedepbottomsecondaryst3'] = 'What will happen?';
$string['settingpagedepbottomsecondaryst4'] = 'The code and content of each section of the current homepage will be moved to a custom HTML block in the Edwiser RemUI Page Builder. The page\'s design and content will remain the same, and you will be able to easily edit it in a <strong> No-code way using the Edwiser RemUI Page Builder</strong>.';
$string['settingpagedepbottomsecondaryst5'] = '<span class="para-semibold-1 m-0">Note:</span> This is the final update regarding the Homepage Builder. It has been now merged into the Edwiser Page Builder';


$string['upgradeherelinktext'] = 'upgrade here';

$string['addnewpage'] = "Add a new page";

$string['edwiserfeedback'] = "Edwiser Feedback";
$string['edwiserhelp'] = "Moodle Help";
$string['edwisersupport'] = "Edwiser Support";


// Course page new settings and improvement stirings
$string['courseinfocontrolhead'] = "Course Information Control";
$string['courseinfocontroldesc'] = "Control the visibility of course-related information throughout the entire site";

$string['coursedatevisibilityhead'] = "Show ‘Date’ on the course";
$string['coursedatevisibilitydesc'] = "Show ‘Date’ on the course";

$string['hidedate'] = "Do not show";
$string['showstartdate'] = "Show start date ";
$string['showupdatedate'] = "Show ‘Updated on’ date";
$string['showstartwhenend'] = "Show ‘Start date’ when the ‘End date’ is set";


$string['enrolleduserscountvisibilityhead'] = "Show ‘Enrolled students’ information";
$string['enrolleduserscountvisibilitydesc'] = "Disable to hide the ‘Enrolled students’ information";

$string['lessonsvisiblityoncoursecardhead'] = "Show ‘Lessons’ information";
$string['lessonsvisiblityoncoursecarddesc'] = "Disable to hide the ‘Lessons’ information";

$string['coursecardsettingshead'] = "Course Card";
$string['coursecardsettingsdesc'] = "Course card related settings";

$string['headeroverlayopacityhead'] = "Change the opacity of overlay";
$string['headeroverlayopacitydesc'] = "The default value is already set to '100'. To adjust opacity, please enter a value between 0 and 100";

$string['showless'] = 'Show Less';
$string['showmore'] = 'Show More';

$string['coursestarted'] = "Started";
$string['courseupdated'] = "Updated";

$string['coursecardlessonssingletext'] = 'Lesson';
$string['coursecardsenrolledetxt'] = 'Enrolled';

$string['showenrolledtexthead'] = 'Show title ‘Enrolled’';
$string['showenrolledtextdesc'] = '';


$string['showenrolledtextinputhead'] = '';
$string['showenrolledtextinputdesc'] = 'Rename the title ‘Enrolled’.<br><strong>Max. 8 characters recommended</strong>';
$string['showenrolledtextinputdefaulttext'] = 'Enrolled';

$string['showlessontexthead'] = 'Show title ‘Lesson’';
$string['showlessontextdesc'] = '';


$string['showlessontextinputhead'] = '';
$string['showlessontextinputdesc'] = 'Rename the title ‘Lessons’.<br><strong>Max. 8 characters recommended</strong>';
$string['showlessontextinputdefaulttext'] = 'Lessons';

$string['editcoursetitle'] = 'Edit course title';
$string['changecategory'] = 'Change category';
$string['editreviewapproval'] = 'Edit review approval';
$string['addchangevideo'] = 'Add/Change video';
$string['novideomessage'] = 'There is no video.<br>Click on the above link to add a video.';
$string['changecourseimage'] = 'Change course image';
$string['changebtntextandlink'] = 'Add custom enrollment link & price';
$string['edit'] = 'Edit';
$string['viewalltext'] = 'View all';
$string['addremuicustomfield'] = 'Add RemUI custom field';
$string['editremuicustomfield'] = 'Edit RemUI custom field';
$string['howtoaddcustomfield'] = 'How to \'Add and Edit\' RemUI custom fields?';
$string['changebtntext'] = 'Change button text';
$string['addlink'] = 'Add link';
$string['save'] = 'Save';
$string['cancel'] = 'Cancel';
$string['updateenrollmentmethods'] = 'Update <span class="text-lowercase">{$a}</span> methods';
$string['hideenrollmentoptions'] = 'Hide <span class="text-lowercase">{$a}</span> options';
$string['showenrollmentoptions'] = 'Show <span class="text-lowercase">{$a}</span> options';
$string['editcoursetext'] = 'Edit course text';
$string['editcoursecontent'] = 'Edit course content';
$string['manageinstructors'] = 'Manage instructors';
$string['message'] = 'Message';
$string['email'] = 'Email:';
$string['editcoursessectionsettings'] = 'Edit courses section settings';
$string['sectionishiddenmessage'] = 'This section is hidden.<br>To make it visible, click on the above link ‘Show enrollment options’';
$string['noreviewmessage'] = 'Currently, there is no review.<br> To check \'Pending for approval\' reviews click on the ‘Edit review approval’ link.';
$string['backtothecourse'] = 'Back to the course';
$string['viewcourseenrollmentpage'] = 'View course <span class="text-lowercase">{$a}</span> page';
$string['unenroll'] = 'Unenroll';
$string['toactivateenrollmenttext'] = 'yourself to activate the enrollment page link';
$string['showhidefreelabel'] = 'Show/Hide \'FREE\' label';
$string['norelatedcoursemessage'] = '\'Related courses\' section is hidden.<br>To make it visible, click on the above link ‘Edit courses section settings’';
$string['nolatestcoursemessage'] = '\'Latest courses\' section is hidden.<br>To make it visible, click on the above link ‘Edit courses section settings’';
$string['showhidefreelabel'] = 'Show/Hide ‘FREE’ label';
$string['editpricing'] = 'Edit pricing';
$string['nocontentmessage'] = 'There is no content in this section.<br>To add content, click on the above link ‘Edit course text’';
$string['noinstructormessage'] = 'There is no instructor enroll in this course.<br>To add instructor, click on the above link ‘Manage instructors’ ';
$string['noinstructor'] = 'No instructor';

// Dark mode settings strings
$string['darkmodetitilestring'] = 'Dark mode';
$string['lightmodetitlestring'] = 'Light mode';
$string['darkmodesettingshead'] = 'Dark mode settings';
$string['darkmodesettingsheaddesc'] = 'Control your website\'s light and dark mode';
$string['enabledarkmode'] = 'Enable dark mode functionality';
$string['enabledarkmodedesc'] = '';
$string['dmoption_disable'] = 'Disable';
$string['dmoption_allowonallpages'] = 'Allow on all pages';
$string['dmoption_excludepages'] = 'Allow on all pages excluding these pages';
$string['dmoption_includepages'] = 'Allow only on these pages';
$string['darkmodeincludepages'] = 'Include only on these pages';
$string['darkmodeincludepagesdesc']  = '<div><strong>To manage dark mode on specific pages simply add the URL of the page.</strong>
<pre>Example:
    To include/exclude dark mode on a specific course page (e.g. the course with id=2)
    <MoodleSite.com>/course/view.php?id=2
</pre>
<strong>To manage dark mode on group of pages</strong>
<pre>Example:
    To include/exclude dark mode on all course pages
    <moodlesite.com>/course/view.php%
</pre>
For more detailed explanation <a href="https://edwiser.org/documentation/edwiser-remui/dark-mode/" target="_blank">click here</a>.</div>';

$string['darkmodeexcludepages'] = 'Exclude pages';
$string['darkmodeexcludepagesdesc']  = '<div><strong>To manage dark mode on specific pages simply add the URL of the page.</strong>
<pre>Example:
    To include/exclude dark mode on a specific course page (e.g. the course with id=2)
    <MoodleSite.com>/course/view.php?id=2
</pre>
<strong>To manage dark mode on group of pages</strong>
<pre>Example:
    To include/exclude dark mode on all course pages
    <moodlesite.com>/course/view.php%
</pre>
For more detailed explanation <a href="https://edwiser.org/documentation/edwiser-remui/dark-mode/" target="_blank">click here</a>.</div>';

$string['customizerdarkmodewarning'] = "Please be aware that changes made in Visual Personalizer will be applied in the 'light mode' of the site and will automatically reflect in the 'dark mode' as well.";
$string['customizerdarkmodedonotshowbtntext'] = 'Don’t show again';
$string['customizerdarkmodeok'] = 'Okay';
$string['previewswitchon'] = 'Switch ON';
$string['previewswitchoff'] = 'Switch OFF';
$string['darkmodepreview'] = 'Dark mode preview';
$string['darkmodecustomizernote'] = '<li>In ‘visual personalizer’ all the changes will be done on the ‘light mode’ of the site, and it will automatically reflected on the ’dark mode’.</li>
<li >The visual personalizer settings will be disabled while previewing in the dark mode.</li>';
$string["switchtodm"] = "Dark mode";
$string["switchtolm"] = "Light mode";
$string["disabledmwarning"] = "To enable the visual personalizer, switch OFF the dark mode preview.";



$string["here"] = "here";
$string["clickhere"] = "Click here";
$string["settingpagedepbottomsecondaryst2b"] = '<a href="https://edwiser.org/my-account/" target="_blank" >Click here</a> to download and update the plugins to its latest version.';
$string['settingpage-dep-top-st4'] = '1. Download and install the Edwiser RemUI Page Builder to version v4.2.0 and above form <a href="https://edwiser.org/my-account/" target="_blank">here</a>';
$string['viewcoursetitle'] = 'View Course';
$string['okay'] = 'Okay!';
$string['forcefulmigrate'] = 'Forceful Migrate';

$string['moodleblocks'] = 'Moodle Blocks';

$string['citytown'] = 'City/Town';
$string['searchtext'] = 'Search text';
$string['enablesiteloader'] = "Enable/Disable Loader Image";
$string['enablesiteloaderdesc'] = "To disable the loader GIF on the site, uncheck the box labeled \"Enable/Disable Loader Image.\" To enable it, simply check the box.";
$string['aria:courseimage'] = 'Course image';

$string['addcustomprice'] = 'Add a custom price';
$string['enablepricingsettingstext'] = 'Enabling the default pricing will remove the ‘custom price and custom enrollment link’.';
$string['enabledefaultpricing'] = 'Enable default pricing';
$string["dashboardstatsupdate"] = "RemUI stats update";

$string["filters"] = "Filters";
$string["applyfilters"] = "Apply filters";
$string["clear"] = "Clear";
$string["level"] = "Level";
$string["ratings"] = "Ratings";
$string["free"] = "Free";
$string["paid"] = "Paid";
$string["rating4"] = "4 & above";
$string["rating3"] = "3 & above";
$string["newest"] = "Newest";
$string["oldest"] = "Oldest";
$string["highrating"] = "High rating";
$string["lowrating"] = "Low rating";
$string["date"] = "Date";
$string["alphabetical"] = "Alphabetical";
$string["showcourseperpage"] = "Show course per page";
$string["close"] = "Close";
$string["row2"] = "Show:2 Row";
$string["row3"] = "Show:3 Row";
$string["row4"] = "Show:4 Row";
$string["row5"] = "Show:5 Row";
$string["row6"] = "Show:6 Row";
$string["filteremptymsg"] = "NOTE: To view the filters, add filter properties, like Levels, Price, Ratings, and Languages to the course.";
$string['courseindexoptions'] = 'Course index options';
$string['gotosection'] = 'Go to section {$a}';

// This sectionaddmax string is for overriding core languages to remove error for other moodle versions
$string['sectionaddmax'] = 'You have reached the maximum number of sections allowed for a course...';

$string['sectionaddmax'] = 'You have reached the maximum number of sections allowed for a course...';
$string['prevsubsectionbuttontext'] = 'Prev Subsection';
$string['nextsubsectionbuttontext'] = 'Next Subsection';

// Setup wizard strings start here
$string['setuppagetitle'] = 'RemUI setup wizard';
$string['setupwizardmodal:heading'] = 'How it works?';
$string['setupwizardmodal:msg1'] = 'Set up your site effortlessly.';
$string['setupwizardmodal:msg2'] = 'Automatic download, installation, and activation.';
$string['setupwizardmodal:msg3'] = 'Enter your license key to skip manual steps.';
$string['setupwizardmodal:msg4'] = 'Get your site ready instantly.';
$string['setupwizardmodal:msg5'] = 'To get started, please activate the RemUI theme by checking the box below.';
$string['setupwizardmodal:activateremui'] = 'Activate the RemUI theme';
$string['setupwizardmodal:continuesetup'] = 'Continue setup';
$string['setupwizardmodal:note'] = '<strong>NOTE:</strong> If you choose to ‘Cancel’, and want to run the setup wizard later, you can find it under <strong>RemUI settings > Basic tab.</strong>';

$string['wearechecking'] = 'We are checking..';
$string['checkingdone'] = 'Checking done.';
$string['moodleversion'] = 'Moodle version';
$string['writepermissioncheck'] = 'Server write permission to install the plugins';
$string['internetconnectincheck'] = 'Internet connection to install the plugins';
$string['allowurlfopencheck'] = '\'allow_url_fopen\' (PHP configuration directive) to download plugins from remote server.';

$string['setupwizard:warning1'] = 'It seems that you’re using older Moodle version. Use ‘4.2’ or above Moodle version';
$string['setupwizard:warning2'] = 'It seems that you don\'t have write permissions for the following Moodle folders: {$a->nonwriteablestr}. Please check with the server administrator.';
$string['setupwizard:warning3'] = 'You are not connected to suitable internet connection.';
$string['setupwizard:warning4'] = '\'allow_url_fopen\' is disabled in your PHP settings. Please enable it to continue.';

$string['setupwizard:success1'] = 'You’re using the correct Moodle version.';
$string['setupwizard:success2'] = "You’ve write permission on the server.";
$string['setupwizard:success3'] = 'You’re connected to the internet.';
$string['setupwizard:success4'] = '\'allow_url_fopen\' is enabled';

$string['setupwizard:info1'] = 'Please take a moment to share a few details . This will help us configure the setup to match your needs and streamline your experience.';
$string['setupwizard:info5'] = 'Relax, while your site is getting ready!';
$string['setupwizard:info6'] = 'We are downloading, installing and enabling all the required plugins on your site.';
$string['setupwizard:info7'] = 'Plugin installation is in progress. This may take a few moments. Please <strong>do not ‘Close or Refresh’</strong> this page.';

$string['edwiseraddons'] = 'Edwiser add-ons';
$string['submitandcontinue'] = 'Submit & Continue';
$string['setupwizard:licensehead'] = "Activate your Edwiser RemUI license";
$string['setupwizard:licensedesc'] = "To unlock the full potential of the Edwiser RemUI theme, please enter your license key. You can find your license key in the email received after purchase or by logging into your Edwiser account.";
$string['setupwizard:licenseformtext1'] = "Add your license key";
$string['setupwizard:licenseformtext2'] = "Not sure where to find your license key?";
$string['setupwizard:licenseformtext3'] = "Click here for guidance";
$string['setupwizard:licenseforminputplaceholder'] = "License key";
$string['submit'] = 'Submit';
$string['setupwizard:saveandinstallplugins'] = 'Save & install plugins';
$string['downloadsuccessmsg'] = 'Download successful';
$string['installsuccessmsg'] = 'Installation successful';
$string['setratingreviewoncourse'] = 'Set ratings & reviews for all courses';
$string['courseformatsetmsg'] = 'Set as default course format with card format view';
$string['setashomepage'] = 'Set as home page builder';
$string['enablesuccessmsg'] = 'Enabled successfully';
$string['finish'] = 'Finish';
$string['somthingwentwrong'] = 'Something went wrong. ';
$string['alreadyinstalled'] = 'Already installed';
$string['ratingreviewaddedallcoursesmsg'] = 'Edwiser ratings & reviews added to courses sucessfully';
$string['submitvisityoursite'] = 'Submit & visit your site!';
$string['hadissues'] = 'Had issues';
$string['normal'] = 'Normal';
$string['smoothandfast'] = 'Smooth and fast';
$string['messageafterinstallation'] = '<strong>IMPORTANT:</strong> If you’ve purchased the Course Creator Suite or Edwiser Bundle, there are a few plugins that still require manual setup. For more details and step-by-step instructions, check out the documentation below:';
$string['setupwizardcomplitionmsg'] = 'You’ve successfully setup your site. Did you know it can take experts up to 2 days to do this? You’ve done it in less than an hour. Now you’re ready to explore powerful features and make the most of your site.';
$string['congratulations'] = 'Congratulations!';
$string['yoursiteisready'] = ' Your site is ready.';
$string['setupwizard:emailus'] = 'Email Us';
$string['setupwizard:contactsupport'] = 'Contact Support';
$string['setupwizard:mylicensekey'] = 'My License Key';
$string['setupwizard:RemUIdocumenation'] = 'Edwiser RemUI Documentation';
$string['setupwizard:alldocumentation'] = 'All Documentations';
$string["otherpagenotice"] = "<strong>Note:</strong> You can access the above custom pages from the footer.";

$string["done"] = "Done";
$string["default"] = "Default";
$string["pagewidthinfo"] = "Page width set to ‘Full width’";
$string["enrollayoutinfo"] ="Enable ‘Edwiser Layout’ for new and improved Enrolment page design.";
$string["colorschemehead"] = "Color scheme selected";
$string["fontfamilyhead"] = "Font family selected";
$string["siteiconnamehead"] = "Logo selected ‘ Site name & Icon’";
$string["homepageselectionhead"] = "Home page template selected";
$string["otherpageselectionhead"] ="Other page templates selected";
$string["democourseimporthead"] = "Demo courses imported (Only visible to admin)";
$string["personalizertophead"] = "Your site is ready. If you want to personalize it further, please go to ‘Visual Personalizer’.";
$string["editwithpersonalizertopctatext"] = "View Visual Personalizer";

$string["personalizerbottomhead"] = "Don’t know how to personalize your site?";
$string["editwithpersonalizerbottomctatext"] = "Check documentation";
$string["setupwizardsettingpagehead"] = "Setup wizard";
$string["setupwizardsettingpagedesc"] = "The setup was interrupted. Please click the button below to continue.";
$string["setupwizard"] = "Enable setup wizard";
$string["setupwizarddesc"] = '<a id="resume-setup" data-action="{$a->setupstep}" class="btn btn-secondary" href="'.$CFG->wwwroot.'/theme/remui/setup.php'.'"> Resume setup</a>';
// $string["setupwizarddesc"] = '<a id="resume-setup" data-action="{$a->setupstep}" class="btn btn-primary" href="'.$CFG->wwwroot.'/theme/remui/setup.php?action={$a->setupstep}'.'"> Resume setup</a>';
$string["skipfornow"] = "Skip for now";
$string["downloadfailed"] = "Download failed";
$string["tryagain"] = "Please try again!";
$string["view"] = "View";
$string["licensetooltipmsg"] = "The license key is a 32-character alphanumeric code available in your account and purchase receipt";
$string["onlyfornewsites"] = "Sorry! This page is for new sites only.";
// Setup Wizard strings end here
// Site sync strings
$string['site_sync_button_title'] = 'Go to Site Sync page';
$string['sitesyncplugintabtext'] = "Site Sync (new)";

$string['exportblock'] = "Export Block";
$string['whatsappsetting'] = "WhatsApp";
$string['whatsappsettingdesc'] = "Enter your site's WhatsApp  link. For eg. https://wa.me/1XXXXXXXXXX";
$string['footerwhatsapp'] = "WhatsApp";
$string['telegramsetting'] = "Telegram";
$string['telegramsettingdesc'] = "Enter your site's Telegram  link. For eg. https://t.me/someusername";
$string['footertelegram'] = "Telegram";

$string['accessbilityfeatureshead'] = 'Accessibility Tool Settings';
$string['accessbilityfeaturesheaddesc'] = 'Multiple settings that helps the users with disabilities';
$string['enableaccessibilitytools'] = 'Enable Accessibility Tool';
$string['enableaccessibilitytoolsdesc'] = 'If disabled, the tool will not be displayed on the entire site.';
$string['disable-aw-for-me'] = 'Disable accessibility tool for me ';
$string['enable-aw-for-me'] = 'Enable accessibility tool for me ';
$string['disable-aw-for-me-notice'] = 'Accessibility tool is disabled.';
$string['enable-aw-for-me-notice'] = 'Accessibility tool is enabled.';

//
$string['darkmodelogo'] = 'Logo for ‘Dark’ mode';
//
$string['darkmodelogomini'] = 'Logo Mini for ‘Dark’ mode';
//
$string['darkmodelogodesc'] = 'If this field is empty, the logo uploaded in ‘Logo’ field will be displayed when the ‘Dark mode’ is ON. You may add the logo to be displayed on the header. Note- Preferred height is 50px. In case you wish to customise, you can do so from the custom CSS box.';
//
$string['darkmodelogominidesc'] = 'If this field is empty, the logo uploaded in ‘Logo Mini’ field will be displayed when the ‘Dark mode’ is ON. You may add the logo to be displayed on the header. Note- Preferred height is 50px. In case you wish to customise, you can do so from the custom CSS box.';
$string['darkmodelogo'] = "Logo for ‘Dark’ mode";
$string['darkmodelogodesc'] = "If this field is empty, the logo uploaded in ‘Logo’ field will be displayed when the ‘Dark mode’ is ON. You may add the logo to be displayed on the header. Note- Preferred height is 50px. In case you wish to customise, you can do so from the custom CSS box.";
$string['darkmodelogosize'] = "Expected aspect ratio is 40:33";
$string['darkmodelogomini'] = "Logo Mini for ‘Dark’ mode";
$string['darkmodelogominidesc'] = "If this field is empty, the logo uploaded in ‘Logo Mini’ field will be displayed when the ‘Dark mode’ is ON. You may add the logo to be displayed on the header. Note- Preferred height is 50px. In case you wish to customise, you can do so from the custom CSS box.";
$string['darkmodelogominisize'] = "Expected aspect ratio is 40:33";
$string['secondaryfooterlogodarkmode'] = 'Logo for ‘Dark’ mode';
$string['secondaryfooterlogodarkmode_help'] = 'Logo for ‘Dark’ mode';

$string['focusmode'] = 'Focus Mode';
$string['focusmodedesc'] = '<p class="m-0">Focus Mode ON: A button to switch to distraction free learning will appear on the course page.</p>
<p class="m-0">Focus Mode OFF: The switch to distraction free learning will NOT appear on the course page.</p>
<p class="m-0">Force Focus Mode ON for all courses: All courses will be displayed in Focus Mode by default for all learners. Learners can switch it OFF if required. </p>';
$string['focusmodeon'] = 'Focus Mode ON';
$string['focusmodeoff'] = 'Focus Mode OFF';
$string['forcefocusmode'] = 'Force Focus Mode ON for all courses';
$string['focusmodeactiveadminmsg'] = 'Focus mode is active for student users';
$string['focusmodeactivenavinfo'] = 'Focus Mode is ON. Click ‘X’ at right bottom to close it.';

$string['moredetails'] = "More Details";
$string['templatesloading'] = 'Templates are loading — may take 5–10 mins.';
