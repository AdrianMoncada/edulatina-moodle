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

$string['pluginname'] = 'Importateur de site Edwiser';
$string['viewtemplate'] = 'Aperçu';
$string['import'] = 'Importer';
$string['importing'] = 'Importation de {$a}';
$string['confirmation'] = 'Confirmation';
$string['continue'] = 'Continuer';
$string['yes'] = 'Oui';
$string['no'] = 'Non';
$string['invalidsite'] = '{$a} n\'est pas un site valide.';
$string['invaliddata'] = 'Données JSON non valides depuis {$a}';
$string['invalidurl'] = 'Veuillez saisir une URL valide';
$string['invalidtemplatetype'] = 'Type de modèle invalide';
$string['templates'] = 'Modèles';

// Homepage.
$string['homepage'] = 'Page d\'accueil';
$string['homepagetemplates'] = 'Modèles de page d\'accueil';
$string['importhomepage'] = 'Importer la page d\'accueil';
$string['sectionsexists'] = 'Note : Les modifications en brouillon du site distant seront ignorées lors de l\'importation. <br><br>Tout le contenu de votre page d\'accueil sera supprimé. Voulez-vous continuer ?';
$string['viewhomepage'] = 'Voir la page d\'accueil';
$string['importermissing'] = 'URL du site invalide ou plugin d\'importation de site Edwiser manquant';
$string['oldhomepage'] = 'Vous utilisez une ancienne version du plugin RemUI Homepage. Veuillez installer la dernière version pour utiliser la fonctionnalité d\'importation.';

// Courses.
$string['importcourse'] = 'Importer le cours';
$string['downloadingcourse'] = 'Téléchargement du fichier de cours';
$string['unabletodownload'] = 'Impossible de télécharger le fichier depuis l\'URL.';
$string['formatmissingtitle'] = 'Manquant';
$string['formatmissingdescription'] = 'Le format de cours Edwiser est manquant. Installez-le pour une meilleure expérience. <a href="https://edwiser.org/course-formats/" target="_blank">Cliquez ici</a> pour télécharger. Continuez à utiliser le format de cours par défaut.';
