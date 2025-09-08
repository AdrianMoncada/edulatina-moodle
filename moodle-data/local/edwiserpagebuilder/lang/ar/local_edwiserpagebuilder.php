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

 $string['pluginname'] = 'مُنشئ صفحات إدويزر';
 $string['local_edwiserpagebuilder'] = 'مُنشئ صفحات إدويزر';
 $string['nav_name'] = 'محرر الكتل';
 $string['eb_block_editor_title'] = 'مُنشئ صفحات إدويزر';
 $string['updatecontent'] = 'تحديث مهمة المحتوى';
 $string['cachedef_edwiserblockcontent'] = "مُنشئ صفحات إدويزر - بيانات ذاكرة التخزين المؤقت لتخزين محتويات الكتل.";

 $string['livecustomizer'] = "تخصيص مباشر";
 $string['update'] = "تحديث";
 $string['download'] = "تحميل";
 $string['fetchblocklist'] = "احضار قائمة الكتل";
 $string['fetchcardslist'] = "احضار قائمة البطاقات";

 $string['failedtodeletefile'] = 'فشل في حذف الملف، يرجى التحقق من أن لديك الصلاحيات الكافية لحذف الملف.';

 $string['filedeletionsuccessful'] = 'تم حذف الملف بنجاح.';
 $string['filesavingsuccessful'] = 'تم حفظ الملفات بنجاح';
 $string['filesavingfailed'] = 'فشل في حفظ الملفات، يرجى المحاولة مرة أخرى.';
 $string['filedoesnotexist'] = 'الملف غير موجود، حاول تحديث الصفحة وتحميله مرة أخرى.';

 $string["unabletofetchjson"] = "غير قادر على جلب المحتوى JSON";
 $string["provideproperblockname"] = "يرجى تقديم اسم كتلة صحيح";
 $string["blockupdatesuccess"] = "تم تحديث الكتلة بنجاح";
 $string["updateblocklistonly"] = "تحديث قائمة كتل إدويزر فقط، وليس محتواها.";
 $string["updatelayoutlistonly"] = "تحديث قائمة التخطيطات إدويزر فقط، وليس محتواها.";
 $string["updateblockcontent"] = "تحديث محتوى الكتلة";
 $string["nomediafile"] = "عذرًا! لم يتم العثور على ملفات وسائط.";
 $string["mediaselpopuptite"] = 'حدد أو قم بتحميل الوسائط';
 $string["mediaselpopuptab1tite"] = 'قم بتحميل الملفات';
 $string["mediaselpopuptab2tite"] = 'مكتبة الوسائط';
 $string["mediaselpopuplbldetials"] = 'تفاصيل الوسائط';
 $string["mediadeletebtn"] = 'حذف نهائيًا';
 $string["mediasavebtn"] = 'حفظ الملف';
 $string["mediaselectbtn"] = 'اختيار الملف';
 $string["deleteblockcontent"] = "حذف محتوى الكتلة";
 $string["blockdeprecated"] = "تم إهمال الكتلة";

 $string["createpage"] = "إنشاء صفحة";
 $string["usetemplate"] = "استخدام القالب";
 $string["createnewpage"] = "إنشاء صفحة جديدة";
 $string["updatepage"] = "تعديل الصفحة";

 $string["fullscreenwidth"] = "عرض الشاشة الكاملة للصفحة";
 $string["regularwidth"] = "عرض الصفحة العادي";

 $string["preview"] = "معاينة";
 $string["page"] = "صفحة";
 $string["login"] = "تسجيل الدخول";
 $string["testgroup"] = "مجموعة الاختبار";

 $string["cannotaddpage"] = "تحقق من تثبيت مكون إضافة صفحة الوحدة ولديك الإذن الكافي لإضافة صفحة.";
 $string['close'] = 'إغلاق';

 $string['epbfpluginexistinfo'] = 'إذا كنت تواجه مشكلة في عرض بعض الكتل، يرجى التأكد من تمكين مكون تصفية مُنشئ صفحات إدويزر.
 <a href="'.$CFG->wwwroot.'/admin/filters.php'.'">انقر هنا</a> للانتقال وتمكين مكون تصفية مُنشئ صفحات إدويزر.';
 $string['epbfpluginnotexistinfo'] = "مكون تصفية مُنشئ صفحات إدويزر غير موجود، بعض الوظائف قد لا تعمل.";
 $string['Checkforupdate'] = 'التحقق من التحديث';
 $string['remuiblocks'] = 'كتل RemUI';
 $string['moodleblocks'] = 'كتل Moodle';

 $string['showblocklayoutaddhead'] = 'إضافة تخطيط الصفحة';
 $string['showblocklayoutaddbody'] = 'هل أنت متأكد أنك تريد المتابعة؟
 <br><br> سيتم إزالة جميع الكتل في منطقة الكتلة- {$a} واستبدالها بكتل تخطيط الصفحة المحددة';

 $string['pagelayoutaddwarningmsg'] = 'إصدار Edwiser RemUI Theme {$a} أو أعلى مطلوب. يرجى تحديث السمة إلى أحدث إصدار لها';
 $string['homepagemigrationtitlemsg'] = 'تم الانتقال بنجاح';
 $string['homepagemigrationdesc'] = 'تم تحويل الصفحة الرئيسية الحالية بسلاسة إلى منشئ الصفحات الجديد. انقر أدناه للوصول إلى الصفحة الرئيسية وابدأ في تخصيصها بسهولة، دون الحاجة إلى مهارات البرمجة!';
 $string['homepagemigrationnoblockmsg'] = 'لا توجد محتويات لعرضها. لإنشاء محتوى الصفحة الرئيسية باستخدام منشئ الصفحات، قم بتشغيل وضع التحرير وإضافة كتل.';
 $string['homepageadvblockmsg'] = "لإضافة هذه الكتل في منطقة المحتوى، قم بتمكين منشئ صفحات إدويزر لصفحة الصفحة الرئيسية من صفحة إعدادات Edwiser RemUI. <strong>الإدارة → المظهر → Edwiser RemUI  → الصفحة الرئيسية → اختيار تصميم الصفحة الرئيسية</strong>";

 $string['edwiserpagebuilder:epb_can_manage_page'] = "منشئ الصفحات يمكنه إدارة الصفحة";
 $string['edwiserpagebuilder:epb_can_view_page'] = "منشئ الصفحات يمكنه عرض الصفحة";

 $string['addnewpage'] = 'إضافة صفحة جديدة';
 $string['addnewpagecontent'] = 'إضافة محتوى صفحة جديدة';
 $string['updatepagecontent'] = 'تحديث محتوى الصفحة';
 $string['deletepagecontent'] = 'حذف محتوى الصفحة';
 $string['pagecontentdeleted'] = 'تم حذف محتوى الصفحة بنجاح';
 $string['pagedeletionsuccessful'] = 'تم حذف الصفحة بنجاح.';
 $string['pagesavingsuccessful'] = 'تم حفظ الصفحة بنجاح';
 $string['pagecreatedsuccessful'] = 'تم إنشاء الصفحة بنجاح.';
 $string['unabletocreatepage'] = 'غير قادر على إنشاء الصفحة، يرجى المحاولة مرة أخرى.';
 $string['pagemodulenotfound'] = 'الوحدة النمطية للصفحة غير موجودة.';
 $string['pagecontentupdatefailed'] = 'فشل تحديث محتوى الصفحة، يرجى المحاولة مرة أخرى.';
 $string['pagelist'] = 'قائمة الصفحات';
 $string['pagecontent'] = 'محتوى الصفحة';
 $string['formdisplayheading'] = "عرض الصفحة";
$string['pagelayout_name'] = "تخطيط الصفحة";
$string['startdate'] = "تاريخ بدء الصفحة";
$string['enddate'] = "تاريخ انتهاء الصفحة";
$string['capabilities'] = "القدرات";
$string['capabilities_placeholder'] = "جميع القدرات مسموح بها";
$string['allowloginonly'] = "عرض فقط عند تسجيل الدخول";
$string['visible'] = "حالة الرؤية";
$string['show'] = "عرض";
$string['hide'] = "إخفاء";
$string['seoinfo'] = "تحسين محركات البحث";
$string['seotag'] = "عنوان الميتا";
$string['seodesc'] = "وصف الميتا";
$string['allowindex'] = "فهرسة هذه الصفحة";
$string['submitpublish'] = "حفظ ونشر";
$string['submitdraft'] = "حفظ كمسودة";

$string['sitesetting'] = "صفحات مخصصة";
$string['sitesetting_desc'] = "إنشاء صفحات جديدة";
$string['pagetable_name'] = "اسم الصفحة";
$string['pagename'] = "اسم الصفحة";
$string['pagetable_date'] = "تاريخ التعديل";
$string['pagetable_action'] = "الإجراءات";
$string['titlepagetableaction'] = "الإجراءات";
$string['no_data_text'] = "لا توجد بيانات";
$string['draft_text'] = "مسودة";
$string['hidden_text'] = "صفحة مخفية";
$string['publish_text'] = "نشر";
$string['update_text'] = "تحديث";
$string['no'] = 'لا';
$string['yes'] = 'نعم';

$string['replicate_toast_msg'] = 'تم نسخ الصفحة في علامة تبويب منفصلة.';
$string['copyurl_toast_msg'] = 'تم نسخ رابط الصفحة.';
$string['delete_toast_msg'] = "تم حذف الصفحة.";
$string['show_toast_msg'] = "تم حفظ التغييرات كمسودة. لجعلها مباشرة انقر على زر النشر/التحديث.";
$string['next'] = "التالي";
$string['pagetitle'] = "عنوان الصفحة";
$string['selectpagetemplate'] = "اختر قالب الصفحة";
$string['back'] = "عودة";
$string['create'] = "إنشاء";
$string['chooselayout'] = "اختر تخطيط";

$string['pagedeletationmodalhead'] = 'حذف الصفحة';
$string['pagedeletationmodaldesc'] = 'سيتم حذف الصفحة بشكل دائم، وستفقد جميع محتوياتها. هل أنت متأكد؟';
$string['pagepublishmodalhead'] = 'تأكيد نشر الصفحة';
$string['pagepublishmodaldesc'] = 'هل أنت متأكد من أنك تريد نشر هذه الصفحة؟';
$string['pageupdatemodalhead'] = 'تأكيد تحديث الصفحة';
$string['pageupdatemodaldesc'] = 'هل أنت متأكد من أنك تريد تحديث هذه الصفحة؟';

$string['sitepagessettings'] = "صفحات مخصصة";
$string['editpage'] = "تحرير الصفحة";
$string['managepages'] = "إدارة الصفحات";
$string['select'] = "اختيار";

$string["addblanktemplatetext"] = 'أضف قالب فارغ';

// Title tooltips.
$string['copyurl'] = "نسخ رابط الصفحة";
$string['pagesettings'] = "إعدادات الصفحة";
$string['replicatepage'] = "نسخ الصفحة";
$string['subheadertitle'] = "شريط التنقل لصفحة الموقع";
$string['publishpage'] = "نشر الصفحة";
$string['deletepage'] = "حذف الصفحة";
$string['editpagetitle'] = "تحرير عنوان الصفحة";
$string['submitpagename'] = "إرسال اسم الصفحة الجديد";
$string['duplicatepage'] = "نسخ الصفحة";
$string['showpage'] = "عرض";
$string['hidepage'] = "إخفاء";

$string['pagelinkcopied'] = 'تم نسخ رابط صفحة {$a}';
$string['pagedesc'] = "وصف الصفحة";
$string['published'] = "تم نشر الصفحة بنجاح.";
$string['updatemsg'] = "تم تحديث الصفحة بنجاح.";

$string['default_draft_header_msg'] = "حاليًا، الصفحة في وضع 'المسودة'. قم بتشغيل وضع التحرير لتحديثها أو نشرها.";
$string['default_drafthidden_header_msg'] = "حاليًا، الصفحة في وضع 'المسودة والمخفية'. قم بتشغيل وضع التحرير لتحديثها أو نشرها.";
$string['default_hidden_header_msg'] = "حاليًا، الصفحة في وضع 'المخفية'. قم بتشغيل وضع التحرير لتحديثها أو نشرها.";
$string['preview'] = "معاينة";
$string['default_preview_header_msg'] = "حاليًا، أنت في وضع 'المعاينة'. للاستمرار في التحرير";
$string['close_preview'] = "إغلاق المعاينة";
$string['accesserror'] = "عذرًا، لا يمكننا العثور على الصفحة التي تبحث عنها.";

$string['viewallusers'] = 'عرض جميع الأعضاء';

// Add notes
$string['selectacourse'] = 'اختر دورة';
$string['selectastudent'] = 'اختر طالب';
$string['addsitenote'] = 'إضافة ملاحظة للموقع';
$string['addcoursenote'] = 'إضافة ملاحظة للدورة';
$string['addpersonalnote'] = 'إضافة ملاحظة شخصية';
$string['deadlines'] = 'المواعيد النهائية';
$string['selectastudent'] = 'اختر طالب';
$string['nousersenrolledincourse'] = 'لا يوجد مستخدمون مسجلون في دورة {$a}.';
$string['selectcoursetodisplayusers'] = 'اختر دورة لعرض مستخدميها المسجلين هنا.';

// Recent Assignments
$string['assignmentstobegraded'] = 'واجبات تحتاج إلى تصحيح';

$string['grade'] = 'الدرجة';

$string['norecentfeedback'] = 'لا توجد ملاحظات حديثة!';
$string['norecentforums'] = 'لا توجد منتديات حديثة';
$string['noofstudents'] = 'عدد الطلاب';
$string['lastpostdate'] = 'التاريخ';

$string['highestgrade'] = "أعلى درجة";
$string['lowestgrade'] = "أدنى درجة";
$string['averagegrade'] = "متوسط الدرجة";
$string['viewcourse'] = "عرض الدورة";
$string['allActivities'] = "جميع الأنشطة";

// Course Analytics
$string['showing'] = 'عرض';
$string['showingfromto'] = 'عرض من {$a->start} إلى {$a->to} من {$a->total}';
$string['bars'] = 'الأعمدة';
$string['lastattempt'] = 'آخر محاولة';
$string['globalattempt'] = 'المتوسط العالمي';

// Course progress
$string['alwaysload'] = 'تحميل التقدم دائمًا';
$string['alwaysloaddesc'] = 'عند التحديد، سيتم تحميل تقدم الدورة دائمًا.';
$string['alwaysloadwarning'] = 'لعدد كبير من الدورات، يستغرق حساب التقدم وقتًا طويلًا. سيؤثر ذلك على وقت تحميل صفحة لوحة التحكم. سيختفي التحذير بشكل دائم إذا استمرت. متابعة؟';
$string['loadcourseprogress'] = 'تحميل التقدم';
$string['loadcourseprogressdesc'] = 'عند التحديد، سيتم تحميل تقدم الدورة. عند تحديث الصفحة، سيتم إعادة التعيين.';
$string['enrolledstudents'] = "الطلاب";
$string['coursestartdate'] = "تاريخ البدء";
$string['progress'] = "التقدم";
$string['searchforcourses'] = 'البحث عن دورات';
$string['datatableinfo'] = "عرض _START_ to _END_ of _TOTAL_ مدخلات"; // لا تقم بتغيير النص "_START_ to _END_ of _TOTAL_";
$string['search'] = 'بحث';

// Enrolled users block
$string['selectcategory'] = 'اختر فئة';
$string['problemwhileloadingdata'] = 'عذرًا، حدثت مشكلة أثناء تحميل البيانات.';
$string['nousersincoursecategoryfound'] = 'لم يتم العثور على مستخدمين مسجلين في هذه الفئة الدراسية.';
$string['nocoursecategoryfound'] = 'لم يتم العثور على فئات دراسية في النظام.';

// To Do List
$string['tasks'] = 'المهام';
$string['timeline'] = 'الجدول الزمني';
$string['addtask'] = 'إضافة مهمة';
$string['courseevents'] = 'أحداث الدورة';
$string['incomplete'] = 'غير مكتمل';
$string['due'] = 'مستحق';
$string['duedate'] = 'تاريخ الاستحقاق';
$string['noduedate'] = 'لا يوجد تاريخ استحقاق';
$string['createtask'] = 'إنشاء مهمة جديدة';
$string['edittask'] = 'تحرير المهمة';
$string['nosavebutton'] = 'لم يتم العثور على زر الحفظ';
$string['subject'] = 'الموضوع';
$string['missingsubject'] = 'الموضوع مفقود';
$string['summary'] = 'الملخص';
$string['nosummary'] = 'لا يوجد ملخص';
$string['selectuser'] = 'اختر المستخدمين';
$string['moreassignee'] = '{$a} المزيد';
$string['notify'] = 'إخطار';
$string['next7days'] = 'الأيام السبعة القادمة';
$string['next30days'] = 'الأيام الثلاثون القادمة';
$string['next3months'] = 'الأشهر الثلاثة القادمة';
$string['next6months'] = 'الأشهر الستة القادمة';
$string['tasksearch'] = 'البحث حسب الموضوع أو الملخص';
$string['todolist'] = 'قائمة المهام';
$string['failedtomarkcomplete'] = 'فشل في وضع العلامة كمكتمل';
$string['failedtomarkincomplete'] = 'فشل في وضع العلامة كغير مكتمل';
$string['failedtodeletetask'] = 'فشل في حذف المهمة';
$string['notasks'] = 'لا توجد مهام للقيام بها.';
$string['deletetask'] = 'حذف المهمة';
$string['deletetaskmessage'] = 'هل تريد حذف المهمة <strong>"{$a}"</strong>؟';
$string['taskdeleted'] = 'تم حذف المهمة <strong>{$a}</strong> بنجاح.';
$string['searchresultfor'] = 'عرض النتائج لـ <em>{$a}</em>';

// Quiz stats
$string['quizstats'] = 'محاولة الاختبار';
$string['totalusersattemptedquiz'] = 'إجمالي المستخدمين الذين حاولوا الاختبار';
$string['totalusersnotattemptedquiz'] = 'إجمالي المستخدمين الذين لم يحاولوا الاختبار';

// Notification string start
$string['createsubject'] = '{$a->createdby} خصص لك: {$a->subject}';
$string['createmessage'] = 'مهمة: {$a->subject}<br>ملخص: {$a->summary}<br>مخصص لـ: {$a->assignedto}<br>مستحق: {$a->timedue}';
$string['incompletesubject'] = '{$a->user} وضع علامة على {$a->subject} كغير مكتمل.';
$string['incompletemessage'] = $string['createmessage'];
$string['completesubject'] = '{$a->user} أكمل {$a->subject}.';
$string['completemessage'] = '{$a->user} أكمل {$a->subject}<br>ملخص: {$a->summary}<br>مستحق: {$a->timedue}<br>أكمل في: {$a->completedon}';
$string['editsubject'] = '{$a->createdby} حدث المهمة: {$a->subject}';
$string['editmessage'] = $string['createmessage'];
$string['addedsubject'] = '{$a->createdby} أضافك في المهمة: {$a->subject}';
$string['addedmessage'] = $string['createmessage'];
$string['removedsubject'] = '{$a->createdby} أزالك من المهمة: {$a->subject}';
$string['removedmessage'] = $string['createmessage'];
// Notification stings end

// Teacher Dashboard Strings
$string['courseprogress'] = 'تقدم الدورة';
$string['progress'] = "التقدم";
$string['name'] = "الاسم";
$string['status'] = "الحالة";
$string['back'] = "عودة";
$string['enrolleduserstats'] = 'إحصائيات المستخدمين المسجلين';

// Course stats
$string['coursestats'] = 'إحصائيات الدورة';
$string['enrolledusers'] = 'المستخدمين المسجلين';
$string['studentcompleted'] = 'الطلاب الذين أكملوا';
$string['inprogress'] = 'قيد التقدم';
$string['yettostart'] = 'لم تبدأ بعد';

// User stats
$string['userstats'] = 'إحصائيات المستخدمين';
$string['lastaccesstime'] = '{$a->time} منذ';
$string['numsecond'] = '{$a} ثانية';
$string['numminute'] = '{$a} دقيقة';
$string['numhour'] = '{$a} ساعة';
$string['numday'] = '{$a} يوم';
$string['nummonth'] = '{$a} شهر';
$string['numyear'] = '{$a} سنة';
$string['enrolmentdate'] = 'تاريخ التسجيل';
$string['nostudentsenrolled'] = 'لا يوجد طلاب مسجلين.';
$string['nocoursecompletion'] = 'إكمال الدورة غير ممكّن';
$string['searchnameemail'] = 'البحث حسب الاسم أو البريد الإلكتروني';
$string['exportcsv'] = 'تصدير CSV';
$string['uneditablewarningmsg'] = 'لا يتوفر معاينة البيانات داخل هذه الكتلة أثناء التحرير. ومع ذلك، سيتم عرض المحتوى بشكل صحيح بمجرد خروجك من المخصص. <strong>لا يزال بإمكانك إضافة وإزالة وتخصيص المكونات باستخدام شريط التحرير على اليسار.</strong>';

$string['availableonlyadminteacher'] = "هذه الكتلة متاحة فقط للمدير والمعلم والمدير.";
$string['availableonlyadminmanager'] = "هذه الكتلة متاحة فقط للمدير والمدير.";
$string['parametermustbeobjectorintegerorstring'] = "يجب أن يكون المعامل كائنًا أو عددًا صحيحًا أو سلسلة.";

$string['filterpluginreleasenoteice'] = "لم يتم تحديث 'مكون الفلتر Edwiser Page Builder'. يرجى الذهاب إلى '<a target='_blank' href=' http://edwiser.org/my-account'>حسابي</a>' على موقع Edwiser لتنزيل وتحديث المكون.";

$string['courseprogressblockdesc'] = 'هذه الكتلة مرئية للمعلمين ومبدعي الدورات. تعرض وتيرة تقدم الطلاب في الدورة.';
$string['enrolledusersblockdesc'] = 'هذه الكتلة مرئية للمديرين والمديرين. تعرض جميع الطلاب الذين سجلوا في دورة بطريقة بيانية.';
$string['quizattemptsblockdesc'] = 'هذه الكتلة مرئية للمعلمين ومبدعي الدورات. تعرض تقريرًا بيانيًا لجميع محاولات الاختبار وعدم المحاولات من قبل الطلاب.';
$string['courseanalyticsblockdesc'] = 'هذه الكتلة تعمل بشكل أفضل للطلاب. تعرض تقريرًا بيانيًا لجميع الدرجات التي حصلت عليها في الدورات المسجلة.';
$string['latestmembersblockdesc'] = 'هذه الكتلة مرئية للمعلمين والمديرين والمديرين. تعرض جميع الطلاب الذين سجلوا مؤخرًا في نظام إدارة التعلم.';
$string['addnotesblockdesc'] = 'هذه الكتلة مفيدة للمعلم أو منشئ الدورة. تمكنهم من إرسال ملاحظات أو تعليمات متعلقة بالدورة إلى الطلاب بسرعة.';
$string['recentfeedbackblockdesc'] = 'هذه الكتلة مفيدة للطلاب. يمكنهم الاطلاع على آخر التعليقات والاقتراحات من معلميهم المتعلقة بالأنشطة المختلفة في Moodle التي يشاركون فيها.';
$string['recentforumsblockdesc'] = 'هذه الكتلة مفيدة للطلاب. يمكنهم تتبع جميع التحديثات والتفاعلات الأخيرة التي تحدث في المنتدى الذي اشتركوا فيه.';
$string['coursesncategoriesblockdesc'] = 'هذه الكتلة تعمل للجميع ولكن بالنسبة للمعلمين ومبدعي الدورات والمديرين، فإنها توفر روابط سريعة تتعلق بالدورة لاتخاذ الإجراءات اللازمة بسرعة.';
$string['todolistblockdesc'] = 'كتلة إدارة المهام تعمل بشكل أفضل لجميع الأدوار. يمكن إنشاء المهام وتعيينها للنفس وكذلك للآخرين.';

$string['homepagemigrationfailtitlemsg'] = 'فشل الترحيل';
$string['tryagain'] = 'حاول مرة أخرى';
$string['viewhomepage'] = 'عرض الصفحة الرئيسية';

$string['staticblocks'] = "ثابتة";
$string['dynamicblocks'] = "ديناميكية";
$string['layoutblocks'] = "تخطيطات";

$string['staticallcategory'] = "جميع الفئات";
$string['dynamicallcategory'] = "جميع الكتل الديناميكية";
$string['layoutallcategory'] = "جميع التخطيطات";

$string['updatedblocksinfotext'] = "جميع كتل remui محدثة";
$string['formpageselector'] = "محدد الصفحة";
$string['formpagename'] = "اسم الصفحة";
$string['formpagewidth'] = "عرض الصفحة";
$string['featuredcoursesblockdesc'] = "تم تصميم كتلة الدورة المميزة لعرض أفضل محتوياتك وجذب المتعلمين.";
$string["blockimportexportwarning"] = "خطأ: ملف غير صالح. يرجى التأكد من أن الملف الذي تم تحميله هو ملف Edwiser JSON صالح.";