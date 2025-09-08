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

$string['pluginname'] = 'Importador de Sitio Edwiser';
$string['viewtemplate'] = 'Vista previa';
$string['import'] = 'Importar';
$string['importing'] = 'Importando {$a}';
$string['confirmation'] = 'Confirmación';
$string['continue'] = 'Continuar';
$string['yes'] = 'Sí';
$string['no'] = 'No';
$string['invalidsite'] = '{$a} no es un sitio válido.';
$string['invaliddata'] = 'Datos JSON inválidos de {$a}';
$string['invalidurl'] = 'Por favor, introduzca una URL válida';
$string['invalidtemplatetype'] = 'Tipo de plantilla inválido';
$string['templates'] = 'Plantillas';

// Homepage.
$string['homepage'] = 'Página de inicio';
$string['homepagetemplates'] = 'Plantillas de página de inicio';
$string['importhomepage'] = 'Importar página de inicio';
$string['sectionsexists'] = 'Nota: Los cambios no guardados del sitio remoto se descartarán al importar.<br><br>Todo el contenido de su página de inicio se eliminará. ¿Desea continuar?';
$string['viewhomepage'] = 'Ver página de inicio';
$string['importermissing'] = 'URL del sitio no válido o falta el plugin Importador de Sitio Edwiser';
$string['oldhomepage'] = 'Tiene un plugin antiguo de Página de inicio RemUI. Por favor, instale el último para usar la funcionalidad de importación.';

// Courses.
$string['importcourse'] = 'Importar curso';
$string['downloadingcourse'] = 'Descargando archivo del curso';
$string['unabletodownload'] = 'No se puede descargar el archivo desde la URL.';
$string['formatmissingtitle'] = 'Faltante';
$string['formatmissingdescription'] = 'Falta el formato de curso Edwiser. Instálelo para una mejor experiencia. <a href="https://edwiser.org/course-formats/" target="_blank">Haga clic aquí</a> para descargar. Continúe usando el formato de curso predeterminado.';
