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
 * @copyright (c) 2022 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author Sudam Chakor
 */

 global $CFG;

$string['pluginname'] = 'Edwiser Page Builder';
$string['local_edwiserpagebuilder'] = 'Edwiser Page Builder';
$string['nav_name'] = 'Block Editor';
$string['eb_block_editor_title'] = 'Edwiser Page Builder';
$string['updatecontent'] = 'Update Content Task';
$string['cachedef_edwiserblockcontent'] = "Edwiser Page Builder - Cache data to store the block contents.";

$string['livecustomizer'] = "Live Customizer";
$string['update'] = "Update";
$string['download'] = "Download";
$string['fetchblocklist'] = "Fetch Blocks List";
$string['fetchcardslist'] = "Fetch Cards List";

$string['failedtodeletefile'] = 'Failed to delete the file, Please check you have enough permission to delete the file.';

$string['filedeletionsuccessful'] = 'File has been deleted successfully.';
$string['filesavingsuccessful'] = 'Files has been saved successfully';
$string['filesavingfailed'] = 'Failed to save files, please try again.';
$string['filedoesnotexist'] = 'File dose not exist, Try refresh and load agian.';

$string["unabletofetchjson"] = "Unable to fetch the json content";
$string["provideproperblockname"] = "Please, provide proper block name";
$string["blockupdatesuccess"] = "Block Updated successfully";
$string["updateblocklistonly"] = "Update Edwiser Blocks list only, not its content.";
$string["updatelayoutlistonly"] = "Update Edwiser Layout list only, not its content.";
$string["updateblockcontent"] = "Update the block content";
$string["nomediafile"] = "Ooops! No media files found.";
$string["mediaselpopuptite"] = 'Select or Upload Media';
$string["mediaselpopuptab1tite"] = 'Upload Files';
$string["mediaselpopuptab2tite"] = 'Media Library';
$string["mediaselpopuplbldetials"] = 'Media Details';
$string["mediadeletebtn"] = 'Delete Permanently';
$string["mediasavebtn"] = 'Save File';
$string["mediaselectbtn"] = 'Select File';
$string["deleteblockcontent"] = "Delete the block content";
$string["blockdeprecated"] = "Block Deprecated";

$string["createpage"] = "Create Page";
$string["usetemplate"] = "Use template";
$string["createnewpage"] = "Create New Page";
$string["updatepage"] = "Modify Page";

$string["fullscreenwidth"] = "Full Screen width page";
$string["regularwidth"] = "Regular size page width";

$string["preview"] = "Preview";
$string["page"] = "Page";
$string["login"] = "Login";
$string["testgroup"] = "Test Group";

$string["cannotaddpage"] = "Check module page plugin is installed and you have proper permission to add page.";
$string['close'] = 'Close';

$string['epbfpluginexistinfo'] = 'If you are facing an issue displaying some of the blocks please make sure the Edwiser Page Builder Filter plugin is enabled.
<a href="'.$CFG->wwwroot.'/admin/filters.php'.'">Click here</a> to go to enable the Edwiser Page Builder Filter plugin.';
$string['epbfpluginnotexistinfo'] = "Edwiser Page Builder Filter plugin doesn't exist, some functionalities will not work.";
$string['Checkforupdate'] = 'Check for update';
$string['remuiblocks'] = 'RemUI Blocks';
$string['moodleblocks'] = 'Moodle Blocks';

$string['showblocklayoutaddhead'] = 'Add Page Layout';
$string['showblocklayoutaddbody'] = 'Are you sure you want to continue?
<br><br> It will remove all the blocks in the block region- {$a} and replace with the selected page layout blocks';

$string['pagelayoutaddwarningmsg'] = 'The Edwiser RemUI Theme version {$a} or above is required. Please update the theme to its latest version';
$string['homepagemigrationtitlemsg'] = 'Migration successfully done';
$string['homepagemigrationdesc'] = 'Your current Homepage is seamlessly migrated to the new page builder. Click below to access the homepage and begin customizing it effortlessly, without requiring any coding skills!';
$string['homepagemigrationnoblockmsg'] = 'No content to display. To create homepage content using the page builder, turn on edit mode and add blocks';
$string['homepageadvblockmsg'] = "To add these blocks in content region enable Edwiser Page builder for homepage option from Edwiser RemUI settings page. <strong>Site Administration → Appearance → Edwiser RemUI  → Hompe Page → Choose frontpage design</strong>";

$string['edwiserpagebuilder:epb_can_manage_page'] = "Epb can manage page";
$string['edwiserpagebuilder:epb_can_view_page'] = "Epb can view page";

$string['addnewpage'] = "Add a new page";
$string['next'] = "Next";
$string['pagetitle'] = "Page title";

$string['formgeneralheading'] = "General";
$string['pagename'] = "Page title/name";
$string['pagename_error'] = "Page title can't be empty";
$string['pagecontent'] = "Page content";
$string['formdisplayheading'] = "Page display";
$string['pagelayout_name'] = "Page layout";
$string['startdate'] = "Page start date";
$string['enddate'] = "Page end date";
$string['capabilities'] = "Capabilities";
$string['capabilities_placeholder'] = "All capabilities allowed";
$string['allowloginonly'] = "Show with login only";
$string['visible'] = "Visibility status";
$string['show'] = "Show";
$string['hide'] = "Hide";
$string['seoinfo'] = "SEO";
$string['seotag'] = "Meta title";
$string['seodesc'] = "Meta description";
$string['allowindex'] = "Index this page";
$string['submitpublish'] = "Save and publish";
$string['submitdraft'] = "Save to draft";

$string['sitesetting'] = "Custom Pages";
$string['sitesetting_desc'] = "Create new pages";
$string['pagetable_name'] = "Page name";
$string['pagename'] = "Page name";
$string['pagetable_date'] = "Date modified";
$string['pagetable_action'] = "Actions";
$string['titlepagetableaction'] = "Actions";
$string['no_data_text'] = "No data";
$string['draft_text'] = "Draft";
$string['hidden_text'] = "Hidden page";
$string['publish_text'] = "Publish";
$string['update_text'] = "Update";
$string['no'] = 'No';
$string['yes'] = 'Yes';


$string['replicate_toast_msg'] = 'The page has been duplicated in a separate tab.';
$string['copyurl_toast_msg'] = 'The page link copied.';
$string['delete_toast_msg'] = "The page has been deleted.";
$string['show_toast_msg'] = "Changes are saved to draft. To make it LIVE click publish/update button.";
$string['next'] = "Next";
$string['pagetitle'] = "Page title";
$string['selectpagetemplate'] = "Select page template";
$string['back'] = "Back";
$string['create'] = "Create";
$string['chooselayout'] = "Choose layout";

$string['pagedeletationmodalhead'] = 'Delete Page';
$string['pagedeletationmodaldesc'] = 'This action will permanently delete the page, and all its content will be lost. Are you sure?';
$string['pagepublishmodalhead'] = 'Page publish confirmation';
$string['pagepublishmodaldesc'] = 'Are you sure, you want to publish this page?';
$string['pageupdatemodalhead'] = 'Page update confirmation';
$string['pageupdatemodaldesc'] = 'Are you sure, you want to update this page?';

$string['sitepagessettings'] = "Custom Pages";
$string['editpage'] = "Edit Page";
$string['managepages'] = "Manage pages";
$string['select'] = "Select";

$string["addblanktemplatetext"] = 'Add blank template';

// Title tooltips.
$string['copyurl'] = "Copy page url";
$string['pagesettings'] = "Page settings";
$string['replicatepage'] = "Replicate page";
$string['subheadertitle'] = "site page navbar";
$string['publishpage'] = "Publish page";
$string['deletepage'] = "Delete page";
$string['editpagetitle'] = "Edit page title";
$string['submitpagename'] = "Submit new page name";
$string['duplicatepage'] = "Duplicate page";
$string['showpage'] = "Show";
$string['hidepage'] = "Hide";

$string['pagelinkcopied'] = 'The {$a}  page link copied';
$string['pagedesc'] = "Page description";
$string['published'] = "Page published successfully.";
$string['updatemsg'] = "Page updated successfully.";

$string['default_draft_header_msg'] = "Currently, the page is in ‘Draft’ mode. Turn ON the edit mode to ‘Update or Publish’ it.";
$string['default_drafthidden_header_msg'] = "Currently, the page is in ‘Draft and Hidden’ mode. Turn ON the edit mode to ‘Update or Publish’ it.";
$string['default_hidden_header_msg'] = "Currently, the page is in ‘Hidden’ mode. Turn ON the edit mode to ‘Update or Publish’ it.";
$string['preview'] = "Preview";
$string['default_preview_header_msg'] = "Currently, you’re in ‘Preview mode’. To continue editing";
$string['close_preview'] = "Close preview";
$string['accesserror'] = "Sorry, we can’t find the page you’re looking for.";

$string['viewallusers'] = 'View all members';

// Add notes
$string['selectacourse'] = 'Select a Course';
$string['selectastudent'] = 'Select Student';
$string['addsitenote'] = 'Add Site Note';
$string['addcoursenote'] = 'Add Course Note';
$string['addpersonalnote'] = 'Add Personal Note';
$string['deadlines'] = 'Deadlines';
$string['selectastudent'] = 'Select Student';
$string['nousersenrolledincourse'] = 'There are no users enrolled in {$a} Course.';
$string['selectcoursetodisplayusers'] = 'Select a Course to display its Enrolled users here.';

// Recent Assignments
$string['assignmentstobegraded'] = 'Assignments to be Graded';

$string['grade'] = 'Grade';

$string['norecentfeedback'] = 'No Recent Feedback !';
$string['norecentforums'] = 'No Recent Forums';
$string['noofstudents'] = 'Number of Students';
$string['lastpostdate'] = 'Date';


$string['highestgrade'] = "Highest Grade";
$string['lowestgrade'] = "Lowest Grade";
$string['averagegrade'] = "Average Grade";
$string['viewcourse'] = "View Course";
$string['allActivities'] = "All Activities";

// Course Analytics
$string['showing'] = 'Showing';
$string['showingfromto'] = 'Showing {$a->start} to {$a->to} of {$a->total}';
$string['bars'] = 'bars';
$string['lastattempt'] = 'Last Attempt';
$string['globalattempt'] = 'Global Average';

// Course progress
$string['alwaysload'] = 'Always load progress';
$string['alwaysloaddesc'] = 'When checked course progress will be always loaded.';
$string['alwaysloadwarning'] = 'For large number of courses, progress calculation takes long time. This will affect loading time of dashboard page. Warning will disappear permanently if you continue. Continue?';
$string['loadcourseprogress'] = 'Load progress';
$string['loadcourseprogressdesc'] = 'When checked course progress will be loaded. On page refresh it will be reset.';
$string['enrolledstudents'] = "Students";
$string['coursestartdate'] = "Start Date";
$string['progress'] = "Progress";
$string['searchforcourses'] = 'Search For Courses';
$string['datatableinfo'] = "Showing _START_ to _END_ of _TOTAL_ entries"; // Do not change "_START_ to _END_ of _TOTAL_" text in this string;
$string['search'] = 'Search';


// Enrolled users block
$string['selectcategory'] = 'Select Category';
$string['problemwhileloadingdata'] = 'Sorry, Some problem occured while loading data.';
$string['nousersincoursecategoryfound'] = 'No enrolled users found in this Course Category.';
$string['nocoursecategoryfound'] = 'No Course categories found in the System.';

// To Do List
$string['tasks']            = 'Tasks';
$string['timeline'] = 'Timeline';
$string['addtask'] = 'Add task';
$string['courseevents'] = 'Course Events';
$string['incomplete'] = 'Incomplete';
$string['due'] = 'Due';
$string['duedate'] = 'Due Date';
$string['noduedate'] = 'No due date';
$string['createtask'] = 'Create new task';
$string['edittask'] = 'Edit task';
$string['nosavebutton'] = 'No save button found';
$string['subject'] = 'Subject';
$string['missingsubject'] = 'Subject missing';
$string['summary'] = 'Summary';
$string['nosummary'] = 'No summary';
$string['selectuser'] = 'Select Users';
$string['moreassignee'] = '{$a} more';
$string['notify'] = 'Notify';
$string['next7days'] = 'Next 7 days';
$string['next30days'] = 'Next 30 days';
$string['next3months'] = 'Next 3 months';
$string['next6months'] = 'Next 6 months';
$string['tasksearch'] = 'Search by Subject or Summary';
$string['todolist'] = 'To Do List';
$string['failedtomarkcomplete'] = 'Failed to mark as complete';
$string['failedtomarkincomplete'] = 'Failed to mark as incomplete';
$string['failedtodeletetask'] = 'Failed to delete task';
$string['notasks'] = 'There’s no to-do available.';
$string['deletetask'] = 'Delete task';
$string['deletetaskmessage'] = 'Do you want to delete <strong>"{$a}"</strong> task?';
$string['taskdeleted'] = 'Task <strong>{$a}</strong> deleted successfully.';
$string['searchresultfor'] = 'Showing results for <em>{$a}</em>';

// Quiz stats
$string['quizstats'] = 'Quiz Attempt';
$string['totalusersattemptedquiz'] = 'Total Users attempted Quiz';
$string['totalusersnotattemptedquiz'] = 'Total Users not attempted Quiz';

// Notification string start
$string['createsubject'] = '{$a->createdby} assigned you: {$a->subject}';
$string['createmessage'] = 'Task: {$a->subject}<br>Summary: {$a->summary}<br>Assigned to: {$a->assignedto}<br>Due: {$a->timedue}';
$string['incompletesubject'] = '{$a->user} marked {$a->subject} as incomplete.';
$string['incompletemessage'] = $string['createmessage'];
$string['completesubject'] = '{$a->user} completed {$a->subject}.';
$string['completemessage'] = '{$a->user} completed {$a->subject}<br>Summary: {$a->summary}<br>Due: {$a->timedue}<br>Completed on:{$a->completedon}';
$string['editsubject'] = '{$a->createdby} updated the task: {$a->subject}';
$string['editmessage'] = $string['createmessage'];
$string['addedsubject'] = '{$a->createdby} added you in the task: {$a->subject}';
$string['addedmessage'] = $string['createmessage'];
$string['removedsubject'] = '{$a->createdby} removed you from the task: {$a->subject}';
$string['removedmessage'] = $string['createmessage'];
// Notification stings end

// Teacher Dashboard Strings
$string['courseprogress']   = 'Course Progress';
$string['progress'] = "Progress";
$string['name'] = "Name";
$string['status'] = "Status";
$string['back'] = "Back";
$string['enrolleduserstats'] = 'Enrolled Users Stats';

// Course stats
$string['coursestats'] = 'Course Statistics';
$string['enrolledusers'] = 'Enrolled Users';
$string['studentcompleted'] = 'Students Completed';
$string['inprogress'] = 'In Progress';
$string['yettostart'] = 'Yet to Start';

// User stats
$string['userstats'] = 'User Statistics';
$string['lastaccesstime'] = '{$a->time} ago';
$string['numsecond'] = '{$a} sec';
$string['numminute'] = '{$a} min';
$string['numhour'] = '{$a} hour';
$string['numday'] = '{$a} day';
$string['nummonth'] = '{$a} month';
$string['numyear'] = '{$a} year';
$string['enrolmentdate'] = 'Enrolment Date';
$string['nostudentsenrolled'] = 'No students enrolled.';
$string['nocoursecompletion'] = 'Course completion is not enabled';
$string['searchnameemail'] = 'Search by name or email';
$string['exportcsv'] = 'Export CSV';
$string['uneditablewarningmsg'] = 'Preview of the data within this block is unavailable while editing. However, the content will be displayed correctly once you exit the customizer. <strong>You can still add, remove, and customize components using the editing bar on the left.</strong>';

$string['availableonlyadminteacher'] = "This block is available only for the Admin, Teacher and Manager.";
$string['availableonlyadminmanager'] = "This block is available only for the Admin and Manager.";
$string['parametermustbeobjectorintegerorstring'] = "The parameter must be an object, an integer, or a string.";

$string['filterpluginreleasenoteice'] ="The 'Edwiser Page Builder Filter plugin' is not updated. Please go to your '<a target='_blank' href=' http://edwiser.org/my-account'>My Account</a>' on Edwiser site to download and update the plugin.";

$string['courseprogressblockdesc'] = 'This block is visible to Teachers & Course Creators. It displays the pace at which students are progressing in a course.';
$string['enrolledusersblockdesc'] = 'This block is visible to Managers & Admins. It graphically displays all the students who have registered in a course.';
$string['quizattemptsblockdesc'] = 'This block is visible to Teachers & Course Creators. It displays a graphical report of all the quiz attempts and non-attempts by students.';
$string['courseanalyticsblockdesc'] = 'This block works best for Students. It displays a graphical report of all the grades that you have earned in enrolled courses.
';
$string['latestmembersblockdesc'] = 'This block is visible to Teachers, Managers & Admins. It displays all the students who recently registered to the LMS.';
$string['addnotesblockdesc'] = 'This block is useful for a Teacher or Course Creator. It lets them send course related Notes or instructions to Students quickly.';
$string['recentfeedbackblockdesc'] = 'This block is useful for Students. They could look for latest comments and suggestion from their teachers related to various Moodle activities that they are part of.';
$string['recentforumsblockdesc'] = 'This block is useful for Students. They could keep track of all the latest updates and interactions that happens on a forum in which they have subscribed.';
$string['coursesncategoriesblockdesc'] = 'This block works for everyone but for Teachers, Course Creators & Managers it provides quick links related to the course to take necessary actions quickly.';
$string['todolistblockdesc'] = 'A Task Management block that works best for all user roles. Tasks could be created and assigned to self as well as others.';

$string['homepagemigrationfailtitlemsg'] = 'Migration failed';
$string['tryagain'] = 'Try again';
$string['viewhomepage'] = 'View Home page';

$string['staticblocks'] = "Static";
$string['dynamicblocks'] = "Dynamic";
$string['layoutblocks'] = "Layouts";

$string['staticallcategory'] = "All categories";
$string['dynamicallcategory'] = "All dynamic blocks";
$string['layoutallcategory'] = "All layouts";

$string['updatedblocksinfotext'] = "All remui blocks are upto date";
$string['formpageselector'] = "Page Selector";
$string['formpagename'] = "Page Name";
$string['formpagewidth'] = "Page Width";

$string['featuredcoursesblockdesc'] = "The Featured Course Block is designed to showcase your top content and attract learners.";

$string["blockimportexportwarning"] = "Error: Invalid file. Please ensure the uploaded file is a valid Edwiser JSON block.";

