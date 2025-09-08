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

$string['pluginname'] = 'Importador de Site Edwiser';
$string['viewtemplate'] = 'Visualizar';
$string['import'] = 'Importar';
$string['importing'] = 'Importando {$a}';
$string['confirmation'] = 'Confirmação';
$string['continue'] = 'Continuar';
$string['yes'] = 'Sim';
$string['no'] = 'Não';
$string['invalidsite'] = '{$a} não é um site válido.';
$string['invaliddata'] = 'Dados JSON inválidos de {$a}';
$string['invalidurl'] = 'Por favor, insira uma URL válida';
$string['invalidtemplatetype'] = 'Tipo de template inválido';
$string['templates'] = 'Templates';

// Homepage.
$string['homepage'] = 'Página Inicial';
$string['homepagetemplates'] = 'Templates da Página Inicial';
$string['importhomepage'] = 'Importar Página Inicial';
$string['sectionsexists'] = 'Nota: As alterações pendentes do site remoto serão descartadas durante a importação. <br><br>Todo o conteúdo da sua página inicial será excluído. Deseja continuar?';
$string['viewhomepage'] = 'Ver Página Inicial';
$string['importermissing'] = 'URL do site inválido ou plugin Importador de Site Edwiser está ausente';
$string['oldhomepage'] = 'Você possui um plugin antigo de Página Inicial RemUI. Por favor, instale o mais recente para usar a funcionalidade de importação.';

// Courses.
$string['importcourse'] = 'Importar curso';
$string['downloadingcourse'] = 'Baixando arquivo do curso';
$string['unabletodownload'] = 'Não foi possível baixar o arquivo da URL.';
$string['formatmissingtitle'] = 'Faltando';
$string['formatmissingdescription'] = 'O formato de curso Edwiser está ausente. Instale-o para uma melhor experiência. <a href="https://edwiser.org/course-formats/" target="_blank">Clique aqui</a> para baixar. Continue usando o formato de curso padrão.';
