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

$string['pluginname'] = 'Edwiser Seitenimporteur';
$string['viewtemplate'] = 'Vorschau';
$string['import'] = 'Importieren';
$string['importing'] = 'Importiere {$a}';
$string['confirmation'] = 'Bestätigung';
$string['continue'] = 'Weiter';
$string['yes'] = 'Ja';
$string['no'] = 'Nein';
$string['invalidsite'] = '{$a} ist keine gültige Seite.';
$string['invaliddata'] = 'Ungültige JSON-Daten von {$a}';
$string['invalidurl'] = 'Bitte geben Sie eine gültige URL ein';
$string['invalidtemplatetype'] = 'Ungültiger Vorlagentyp';
$string['templates'] = 'Vorlagen';

// Homepage.
$string['homepage'] = 'Startseite';
$string['homepagetemplates'] = 'Startseiten-Vorlagen';
$string['importhomepage'] = 'Startseite importieren';
$string['sectionsexists'] = 'Hinweis: Entwurfsänderungen von der entfernten Seite werden beim Importieren verworfen. <br><br>Alle Inhalte Ihrer Startseite werden gelöscht. Möchten Sie fortfahren?';
$string['viewhomepage'] = 'Startseite anzeigen';
$string['importermissing'] = 'Ungültige Seiten-URL oder der Edwiser Seitenimporteur-Plugin fehlt';
$string['oldhomepage'] = 'Sie haben ein altes RemUI Startseiten-Plugin. Installieren Sie bitte das neueste, um die Importfunktionalität zu nutzen.';

// Courses.
$string['importcourse'] = 'Kurs importieren';
$string['downloadingcourse'] = 'Lade Kursdatei herunter';
$string['unabletodownload'] = 'Kann die Datei von der URL nicht herunterladen.';
$string['formatmissingtitle'] = 'Fehlt';
$string['formatmissingdescription'] = 'Edwiser Kursformat fehlt. Installieren Sie es für eine bessere Erfahrung. <a href="https://edwiser.org/course-formats/" target="_blank">Klicken Sie hier</a>, um es herunterzuladen. Sie können das Standard-Kursformat weiterhin verwenden.';
