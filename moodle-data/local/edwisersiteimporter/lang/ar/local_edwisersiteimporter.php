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
 * Edwiser Importer plugin
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author    Yogesh Shirsath
 * @copyright (c) 2020 WisdmLabs (https://wisdmlabs.com/) <support@wisdmlabs.com>
 */

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'مستورد موقع إدويزر';
$string['viewtemplate'] = 'معاينة';
$string['import'] = 'استيراد';
$string['importing'] = 'جارٍ استيراد {$a}';
$string['confirmation'] = 'تأكيد';
$string['continue'] = 'متابعة';
$string['yes'] = 'نعم';
$string['no'] = 'لا';
$string['invalidsite'] = '{$a} ليس موقعًا صالحًا.';
$string['invaliddata'] = 'بيانات JSON غير صالحة من {$a}';
$string['invalidurl'] = 'الرجاء إدخال رابط صالح';
$string['invalidtemplatetype'] = 'نوع قالب غير صالح';
$string['templates'] = 'القوالب';

// Homepage.
$string['homepage'] = 'الصفحة الرئيسية';
$string['homepagetemplates'] = 'قوالب الصفحة الرئيسية';
$string['importhomepage'] = 'استيراد الصفحة الرئيسية';
$string['sectionsexists'] = 'ملاحظة: سيتم تجاهل التغييرات المسودة من الموقع البعيد أثناء الاستيراد. <br><br>سيتم حذف جميع المحتويات من صفحتك الرئيسية. هل ترغب في المتابعة؟';
$string['viewhomepage'] = 'عرض الصفحة الرئيسية';
$string['importermissing'] = 'رابط الموقع غير صالح أو مفقود مكون استيراد موقع إدويزر';
$string['oldhomepage'] = 'لديك إضافة قديمة لصفحة البداية RemUI. يرجى تثبيت الإصدار الأحدث لاستخدام وظائف الاستيراد.';

// Courses.
$string['importcourse'] = 'استيراد الدورة';
$string['downloadingcourse'] = 'تحميل ملف الدورة';
$string['unabletodownload'] = 'غير قادر على تحميل الملف من الرابط.';
$string['formatmissingtitle'] = 'مفقود';
$string['formatmissingdescription'] = 'تم فقدان تنسيق الدورة من إدويزر. قم بتثبيته لتجربة أفضل. <a href="https://edwiser.org/course-formats/" target="_blank">انقر هنا</a> للتحميل. تابع باستخدام تنسيق الدورة الافتراضي.';
