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

$string['pluginname'] = 'Importer strony Edwiser';
$string['viewtemplate'] = 'Podgląd';
$string['import'] = 'Importuj';
$string['importing'] = 'Importowanie {$a}';
$string['confirmation'] = 'Potwierdzenie';
$string['continue'] = 'Kontynuuj';
$string['yes'] = 'Tak';
$string['no'] = 'Nie';
$string['invalidsite'] = '{$a} nie jest prawidłową stroną.';
$string['invaliddata'] = 'Nieprawidłowe dane JSON z {$a}';
$string['invalidurl'] = 'Proszę podać prawidłowy adres URL';
$string['invalidtemplatetype'] = 'Nieprawidłowy typ szablonu';
$string['templates'] = 'Szablony';

// Homepage.
$string['homepage'] = 'Strona główna';
$string['homepagetemplates'] = 'Szablony strony głównej';
$string['importhomepage'] = 'Importuj stronę główną';
$string['sectionsexists'] = 'Uwaga: Zmiany robocze ze zdalnej strony zostaną odrzucone podczas importowania. <br><br>Cała zawartość z twojej strony głównej zostanie usunięta. Czy chcesz kontynuować?';
$string['viewhomepage'] = 'Zobacz stronę główną';
$string['importermissing'] = 'Nieprawidłowy adres URL strony lub brak wtyczki Edwiser Site Importer';
$string['oldhomepage'] = 'Masz starą wtyczkę RemUI Homepage. Zainstaluj najnowszą, aby użyć funkcji importowania.';

// Courses.
$string['importcourse'] = 'Importuj kurs';
$string['downloadingcourse'] = 'Pobieranie pliku kursu';
$string['unabletodownload'] = 'Nie można pobrać pliku z podanego URL.';
$string['formatmissingtitle'] = 'Brakujący';
$string['formatmissingdescription'] = 'Brakuje formatu kursu Edwiser. Zainstaluj go, aby uzyskać lepsze doświadczenia. <a href="https://edwiser.org/course-formats/" target="_blank">Kliknij tutaj</a>, aby pobrać. Możesz kontynuować korzystanie z domyślnego formatu kursu.';
