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
$string['nav_name'] = 'Éditeur de blocs';
$string['eb_block_editor_title'] = 'Edwiser Page Builder';
$string['updatecontent'] = 'Tâche de mise à jour du contenu';
$string['cachedef_edwiserblockcontent'] = "Edwiser Page Builder - Données de cache pour stocker le contenu des blocs.";

$string['livecustomizer'] = "Personnalisation en direct";
$string['update'] = "Mettre à jour";
$string['download'] = "Télécharger";
$string['fetchblocklist'] = "Récupérer la liste des blocs";
$string['fetchcardslist'] = "Récupérer la liste des cartes";

$string['failedtodeletefile'] = 'Échec de la suppression du fichier, veuillez vérifier que vous avez suffisamment de permissions pour supprimer le fichier.';

$string['filedeletionsuccessful'] = 'Le fichier a été supprimé avec succès.';
$string['filesavingsuccessful'] = 'Les fichiers ont été enregistrés avec succès.';
$string['filesavingfailed'] = 'Échec de l\'enregistrement des fichiers, veuillez réessayer.';
$string['filedoesnotexist'] = 'Le fichier n\'existe pas. Veuillez rafraîchir et recharger à nouveau.';

$string["unabletofetchjson"] = "Impossible de récupérer le contenu JSON";
$string["provideproperblockname"] = "Veuillez fournir un nom de bloc correct";
$string["blockupdatesuccess"] = "Mise à jour du bloc réussie";
$string["updateblocklistonly"] = "Mettre à jour uniquement la liste des blocs Edwiser, pas son contenu.";
$string["updatelayoutlistonly"] = "Mettre à jour uniquement la liste des mises en page Edwiser, pas leur contenu.";
$string["updateblockcontent"] = "Mettre à jour le contenu du bloc";
$string["nomediafile"] = "Oups ! Aucun fichier multimédia trouvé.";
$string["mediaselpopuptite"] = 'Sélectionner ou télécharger des médias';
$string["mediaselpopuptab1tite"] = 'Télécharger des fichiers';
$string["mediaselpopuptab2tite"] = 'Bibliothèque de médias';
$string["mediaselpopuplbldetials"] = 'Détails des médias';
$string["mediadeletebtn"] = 'Supprimer définitivement';
$string["mediasavebtn"] = 'Enregistrer le fichier';
$string["mediaselectbtn"] = 'Sélectionner le fichier';
$string["deleteblockcontent"] = "Supprimer le contenu du bloc";
$string["blockdeprecated"] = "Bloc obsolète";

$string["createpage"] = "Créer une page";
$string["usetemplate"] = "Utiliser le modèle";
$string["createnewpage"] = "Créer une nouvelle page";
$string["updatepage"] = "Modifier la page";

$string["fullscreenwidth"] = "Page en largeur plein écran";
$string["regularwidth"] = "Largeur de page régulière";

$string["preview"] = "Aperçu";
$string["page"] = "Page";
$string["login"] = "Connexion";
$string["testgroup"] = "Groupe de test";

$string["cannotaddpage"] = "Vérifiez si le plugin de page de module est installé et si vous avez les autorisations nécessaires pour ajouter une page.";
$string['close'] = 'Fermer';

$string['epbfpluginexistinfo'] = 'Si vous rencontrez des problèmes d\'affichage de certains blocs, assurez-vous que le plugin de filtre Edwiser Page Builder est activé. <a href="'.$CFG->wwwroot.'/admin/filters.php'.'">Cliquez ici</a> pour activer le plugin de filtre Edwiser Page Builder.';
$string['epbfpluginnotexistinfo'] = "Le plugin de filtre Edwiser Page Builder n'existe pas, certaines fonctionnalités ne fonctionneront pas.";
$string['Checkforupdate'] = 'Vérifier les mises à jour';
$string['remuiblocks'] = 'Blocs RemUI';
$string['moodleblocks'] = 'Blocs Moodle';

$string['showblocklayoutaddhead'] = 'Ajouter une mise en page de page';
$string['showblocklayoutaddbody'] = 'Êtes-vous sûr de vouloir continuer ?
<br><br> Cela supprimera tous les blocs dans la région de bloc - {$a} et les remplacera par les blocs de mise en page de page sélectionnés';

$string['pagelayoutaddwarningmsg'] = 'La version du thème Edwiser RemUI {$a} ou supérieure est requise. Veuillez mettre à jour le thème vers sa dernière version';
$string['homepagemigrationtitlemsg'] = 'Migration réussie';
$string['homepagemigrationdesc'] = 'Votre page d\'accueil actuelle a été migrée en toute transparence vers le nouveau générateur de pages. Cliquez ci-dessous pour accéder à la page d\'accueil et commencez à la personnaliser sans effort, sans avoir besoin de compétences en programmation !';
$string['homepagemigrationnoblockmsg'] = 'Aucun contenu à afficher. Pour créer du contenu de page d\'accueil à l\'aide du générateur de pages, activez le mode d\'édition et ajoutez des blocs';
$string['homepageadvblockmsg'] = "Pour ajouter ces blocs dans la région de contenu, activez l'option de générateur de pages Edwiser pour la page d'accueil depuis la page de réglages Edwiser RemUI. <strong>Administration du site → Apparence → Edwiser RemUI  → Page d'accueil → Choisissez la conception de la page d'accueil</strong>";

$string['edwiserpagebuilder:epb_can_manage_page'] = "Epb peut gérer la page";
$string['edwiserpagebuilder:epb_can_view_page'] = "Epb peut voir la page";

$string['addnewpage'] = "Ajouter une nouvelle page";
$string['next'] = "Suivant";
$string['pagetitle'] = "Titre de la page";

$string['formgeneralheading'] = "Général";
$string['pagename'] = "Titre/nom de la page";
$string['pagename_error'] = "Le titre de la page ne peut pas être vide";
$string['pagecontent'] = "Contenu de la page";
$string['formdisplayheading'] = "Affichage de la page";
$string['pagelayout_name'] = "Mise en page de la page";
$string['startdate'] = "Date de début de la page";
$string['enddate'] = "Date de fin de la page";
$string['capabilities'] = "Permissions";
$string['capabilities_placeholder'] = "Toutes les autorisations sont autorisées";
$string['allowloginonly'] = "Afficher uniquement avec connexion";
$string['visible'] = "Statut de visibilité";
$string['show'] = "Afficher";
$string['hide'] = "Masquer";
$string['seoinfo'] = "SEO";
$string['seotag'] = "Titre Meta";
$string['seodesc'] = "Description Meta";
$string['allowindex'] = "Indexer cette page";
$string['submitpublish'] = "Enregistrer et publier";
$string['submitdraft'] = "Enregistrer en tant que brouillon";

$string['sitesetting'] = "Pages personnalisées";
$string['sitesetting_desc'] = "Créer de nouvelles pages";
$string['pagetable_name'] = "Nom de la page";
$string['pagename'] = "Nom de la page";
$string['pagetable_date'] = "Date de modification";
$string['pagetable_action'] = "Actions";
$string['titlepagetableaction'] = "Actions";
$string['no_data_text'] = "Aucune donnée";
$string['draft_text'] = "Brouillon";
$string['hidden_text'] = "Page masquée";
$string['publish_text'] = "Publier";
$string['update_text'] = "Mettre à jour";
$string['no'] = 'Non';
$string['yes'] = 'Oui';


$string['replicate_toast_msg'] = 'La page a été dupliquée dans un onglet séparé.';
$string['copyurl_toast_msg'] = 'Le lien de la page a été copié.';
$string['delete_toast_msg'] = "La page a été supprimée.";
$string['show_toast_msg'] = "Les modifications sont enregistrées en tant que brouillon. Pour les rendre VIVANTES, cliquez sur le bouton Publier/Mettre à jour.";
$string['next'] = "Suivant";
$string['pagetitle'] = "Titre de la page";
$string['selectpagetemplate'] = "Sélectionner le modèle de page";
$string['back'] = "Retour";
$string['create'] = "Créer";
$string['chooselayout'] = "Choisir la mise en page";

$string['pagedeletationmodalhead'] = 'Supprimer la page';
$string['pagedeletationmodaldesc'] = 'Cette action supprimera définitivement la page et tout son contenu sera perdu. Êtes-vous sûr ?';
$string['pagepublishmodalhead'] = 'Confirmation de publication de la page';
$string['pagepublishmodaldesc'] = 'Êtes-vous sûr de vouloir publier cette page ?';
$string['pageupdatemodalhead'] = 'Confirmation de mise à jour de la page';
$string['pageupdatemodaldesc'] = 'Êtes-vous sûr de vouloir mettre à jour cette page ?';

$string['sitepagessettings'] = "Pages personnalisées";
$string['editpage'] = "Modifier la page";
$string['managepages'] = "Gérer les pages";
$string['select'] = "Sélectionner";

$string["addblanktemplatetext"] = 'Ajouter un modèle vierge';

// Title tooltips.
$string['copyurl'] = "Copier l'URL de la page";
$string['pagesettings'] = "Paramètres de la page";
$string['replicatepage'] = "Dupliquer la page";
$string['subheadertitle'] = "Barre de navigation de la page du site";
$string['publishpage'] = "Publier la page";
$string['deletepage'] = "Supprimer la page";
$string['editpagetitle'] = "Modifier le titre de la page";
$string['submitpagename'] = "Soumettre le nouveau nom de page";
$string['duplicatepage'] = "Dupliquer la page";
$string['showpage'] = "Afficher";
$string['hidepage'] = "Masquer";

$string['pagelinkcopied'] = 'Le lien de la page {$a} a été copié';
$string['pagedesc'] = "Description de la page";
$string['published'] = "Page publiée avec succès.";
$string['updatemsg'] = "Page mise à jour avec succès.";

$string['default_draft_header_msg'] = "Actuellement, la page est en mode 'Brouillon'. Activez le mode édition pour la 'Mettre à jour ou publier'.";
$string['default_drafthidden_header_msg'] = "Actuellement, la page est en mode 'Brouillon et masqué'. Activez le mode édition pour la 'Mettre à jour ou publier'.";
$string['default_hidden_header_msg'] = "Actuellement, la page est en mode 'Masqué'. Activez le mode édition pour la 'Mettre à jour ou publier'.";
$string['preview'] = "Aperçu";
$string['default_preview_header_msg'] = "Actuellement, vous êtes en mode 'Aperçu'. Pour continuer l'édition";
$string['close_preview'] = "Fermer l'aperçu";
$string['accesserror'] = "Désolé, nous ne trouvons pas la page que vous recherchez.";

$string['viewallusers'] = 'Voir tous les membres';

// Add notes
$string['selectacourse'] = 'Sélectionner un cours';
$string['selectastudent'] = 'Sélectionner un étudiant';
$string['addsitenote'] = 'Ajouter une note du site';
$string['addcoursenote'] = 'Ajouter une note de cours';
$string['addpersonalnote'] = 'Ajouter une note personnelle';
$string['deadlines'] = 'Échéances';
$string['selectastudent'] = 'Sélectionner un étudiant';
$string['nousersenrolledincourse'] = 'Aucun utilisateur inscrit dans le cours {$a}.';
$string['selectcoursetodisplayusers'] = 'Sélectionnez un cours pour afficher ses utilisateurs inscrits ici.';

// Recent Assignments
$string['assignmentstobegraded'] = 'Devoirs à évaluer';

$string['grade'] = 'Note';

$string['norecentfeedback'] = 'Aucun retour récent !';
$string['norecentforums'] = 'Aucun forum récent';
$string['noofstudents'] = 'Nombre d\'étudiants';
$string['lastpostdate'] = 'Date';

$string['highestgrade'] = "Note la plus élevée";
$string['lowestgrade'] = "Note la plus basse";
$string['averagegrade'] = "Note moyenne";
$string['viewcourse'] = "Voir le cours";
$string['allActivities'] = "Toutes les activités";

// Course Analytics
$string['showing'] = 'Affichage';
$string['showingfromto'] = 'Affichage de {$a->start} à {$a->to} sur {$a->total}';
$string['bars'] = 'barres';
$string['lastattempt'] = 'Dernière tentative';
$string['globalattempt'] = 'Moyenne globale';

// Course progress
$string['alwaysload'] = 'Charger toujours le progrès';
$string['alwaysloaddesc'] = 'Lorsque cette option est cochée, le progrès du cours sera toujours chargé.';
$string['alwaysloadwarning'] = 'Pour un grand nombre de cours, le calcul du progrès prend beaucoup de temps. Cela affectera le temps de chargement de la page du tableau de bord. L\'avertissement disparaîtra définitivement si vous continuez. Continuer ?';
$string['loadcourseprogress'] = 'Charger le progrès';
$string['loadcourseprogressdesc'] = 'Lorsque cette option est cochée, le progrès du cours sera chargé. À chaque rafraîchissement de la page, il sera réinitialisé.';
$string['enrolledstudents'] = "Étudiants";
$string['coursestartdate'] = "Date de début";
$string['progress'] = "Progrès";
$string['searchforcourses'] = 'Rechercher des cours';
$string['datatableinfo'] = "Affichage _START_ to _END_ of _TOTAL_ entrées"; // Ne pas modifier le texte "_START_ to _END_ of _TOTAL_" dans cette chaîne;
$string['search'] = 'Rechercher';

// Enrolled users block
$string['selectcategory'] = 'Sélectionner une catégorie';
$string['problemwhileloadingdata'] = 'Désolé, un problème est survenu lors du chargement des données.';
$string['nousersincoursecategoryfound'] = 'Aucun utilisateur inscrit trouvé dans cette catégorie de cours.';
$string['nocoursecategoryfound'] = 'Aucune catégorie de cours trouvée dans le système.';

// To Do List
$string['tasks'] = 'Tâches';
$string['timeline'] = 'Chronologie';
$string['addtask'] = 'Ajouter une tâche';
$string['courseevents'] = 'Événements du cours';
$string['incomplete'] = 'Incomplet';
$string['due'] = 'Échéance';
$string['duedate'] = 'Date d’échéance';
$string['noduedate'] = 'Aucune date d’échéance';
$string['createtask'] = 'Créer une nouvelle tâche';
$string['edittask'] = 'Modifier la tâche';
$string['nosavebutton'] = 'Aucun bouton de sauvegarde trouvé';
$string['subject'] = 'Sujet';
$string['missingsubject'] = 'Sujet manquant';
$string['summary'] = 'Résumé';
$string['nosummary'] = 'Aucun résumé';
$string['selectuser'] = 'Sélectionner des utilisateurs';
$string['moreassignee'] = '{$a} de plus';
$string['notify'] = 'Notifier';
$string['next7days'] = '7 prochains jours';
$string['next30days'] = '30 prochains jours';
$string['next3months'] = '3 prochains mois';
$string['next6months'] = '6 prochains mois';
$string['tasksearch'] = 'Rechercher par sujet ou résumé';
$string['todolist'] = 'Liste des tâches';
$string['failedtomarkcomplete'] = 'Échec de la marquage comme complet';
$string['failedtomarkincomplete'] = 'Échec de la marquage comme incomplet';
$string['failedtodeletetask'] = 'Échec de la suppression de la tâche';
$string['notasks'] = 'Aucune tâche disponible.';
$string['deletetask'] = 'Supprimer la tâche';
$string['deletetaskmessage'] = 'Voulez-vous supprimer la tâche <strong>"{$a}"</strong> ?';
$string['taskdeleted'] = 'Tâche <strong>{$a}</strong> supprimée avec succès.';
$string['searchresultfor'] = 'Affichage des résultats pour <em>{$a}</em>';

// Quiz stats
$string['quizstats'] = 'Tentative de Quiz';
$string['totalusersattemptedquiz'] = 'Nombre total d’utilisateurs ayant tenté le Quiz';
$string['totalusersnotattemptedquiz'] = 'Nombre total d’utilisateurs n’ayant pas tenté le Quiz';

// Notification string start
$string['createsubject'] = '{$a->createdby} vous a assigné : {$a->subject}';
$string['createmessage'] = 'Tâche : {$a->subject}<br>Résumé : {$a->summary}<br>Assigné à : {$a->assignedto}<br>Échéance : {$a->timedue}';
$string['incompletesubject'] = '{$a->user} a marqué {$a->subject} comme incomplet.';
$string['incompletemessage'] = $string['createmessage'];
$string['completesubject'] = '{$a->user} a terminé {$a->subject}.';
$string['completemessage'] = '{$a->user} a terminé {$a->subject}<br>Résumé : {$a->summary}<br>Échéance : {$a->timedue}<br>Terminé le : {$a->completedon}';
$string['editsubject'] = '{$a->createdby} a mis à jour la tâche : {$a->subject}';
$string['editmessage'] = $string['createmessage'];
$string['addedsubject'] = '{$a->createdby} vous a ajouté dans la tâche : {$a->subject}';
$string['addedmessage'] = $string['createmessage'];
$string['removedsubject'] = '{$a->createdby} vous a retiré de la tâche : {$a->subject}';
$string['removedmessage'] = $string['createmessage'];
// Notification stings end

// Teacher Dashboard Strings
$string['courseprogress'] = 'Avancement du cours';
$string['progress'] = "Progression";
$string['name'] = "Nom";
$string['status'] = "Statut";
$string['back'] = "Retour";
$string['enrolleduserstats'] = 'Statistiques des utilisateurs inscrits';

// Course stats
$string['coursestats'] = 'Statistiques du cours';
$string['enrolledusers'] = 'Utilisateurs inscrits';
$string['studentcompleted'] = 'Étudiants terminés';
$string['inprogress'] = 'En cours';
$string['yettostart'] = 'À démarrer';

// User stats
$string['userstats'] = 'Statistiques de l’utilisateur';
$string['lastaccesstime'] = 'Il y a {$a->time}';
$string['numsecond'] = '{$a} sec';
$string['numminute'] = '{$a} min';
$string['numhour'] = '{$a} heure';
$string['numday'] = '{$a} jour';
$string['nummonth'] = '{$a} mois';
$string['numyear'] = '{$a} an';
$string['enrolmentdate'] = 'Date d’inscription';
$string['nostudentsenrolled'] = 'Aucun étudiant inscrit.';
$string['nocoursecompletion'] = 'La complétion du cours n’est pas activée';
$string['searchnameemail'] = 'Recherche par nom ou email';
$string['exportcsv'] = 'Exporter CSV';
$string['uneditablewarningmsg'] = 'La prévisualisation des données dans ce bloc n’est pas disponible pendant l’édition. Cependant, le contenu sera affiché correctement une fois que vous quitterez le mode de personnalisation. <strong>Vous pouvez toujours ajouter, supprimer et personnaliser des composants à l’aide de la barre d’édition à gauche.</strong>';

$string['availableonlyadminteacher'] = "Ce bloc est disponible uniquement pour l’Administrateur, l’Enseignant et le Gestionnaire.";
$string['availableonlyadminmanager'] = "Ce bloc est disponible uniquement pour l’Administrateur et le Gestionnaire.";
$string['parametermustbeobjectorintegerorstring'] = "Le paramètre doit être un objet, un entier ou une chaîne de caractères.";

$string['filterpluginreleasenoteice'] ="Le plugin de filtre 'Edwiser Page Builder' n’est pas mis à jour. Veuillez vous rendre sur votre '<a target='_blank' href=' http://edwiser.org/my-account'>Mon Compte</a>' sur le site d’Edwiser pour télécharger et mettre à jour le plugin.";

$string['courseprogressblockdesc'] = 'Ce bloc est visible par les Enseignants et les Créateurs de cours. Il affiche le rythme auquel les étudiants progressent dans un cours.';
$string['enrolledusersblockdesc'] = 'Ce bloc est visible par les Gestionnaires et les Administrateurs. Il affiche graphiquement tous les étudiants inscrits à un cours.';
$string['quizattemptsblockdesc'] = 'Ce bloc est visible par les Enseignants et les Créateurs de cours. Il affiche un rapport graphique de toutes les tentatives de quiz et des non-tentatives par les étudiants.';
$string['courseanalyticsblockdesc'] = 'Ce bloc est idéal pour les étudiants. Il affiche un rapport graphique de toutes les notes que vous avez obtenues dans les cours auxquels vous êtes inscrit.';
$string['latestmembersblockdesc'] = 'Ce bloc est visible par les Enseignants, les Gestionnaires et les Administrateurs. Il affiche tous les étudiants qui se sont récemment inscrits à la plateforme d’apprentissage.';
$string['addnotesblockdesc'] = 'Ce bloc est utile pour un Enseignant ou un Créateur de cours. Il leur permet d’envoyer rapidement des Notes ou des instructions liées au cours aux étudiants.';
$string['recentfeedbackblockdesc'] = 'Ce bloc est utile pour les étudiants. Ils peuvent consulter les commentaires et suggestions récents de leurs enseignants concernant les diverses activités Moodle auxquelles ils participent.';
$string['recentforumsblockdesc'] = 'Ce bloc est utile pour les étudiants. Ils peuvent suivre toutes les dernières mises à jour et interactions qui se produisent sur un forum auquel ils sont abonnés.';
$string['coursesncategoriesblockdesc'] = 'Ce bloc fonctionne pour tous, mais pour les Enseignants, les Créateurs de cours et les Gestionnaires, il fournit des liens rapides relatifs au cours pour prendre des mesures nécessaires rapidement.';
$string['todolistblockdesc'] = 'Un bloc de gestion des tâches qui convient à tous les rôles d’utilisateur. Les tâches peuvent être créées et attribuées à soi-même ainsi qu’à d’autres.';

$string['homepagemigrationfailtitlemsg'] = 'Échec de la migration';
$string['tryagain'] = 'Réessayer';
$string['viewhomepage'] = 'Voir la page d’accueil';

$string['staticblocks'] = "Statique";
$string['dynamicblocks'] = "Dynamique";
$string['layoutblocks'] = "Dispositions";

$string['staticallcategory'] = "Toutes les catégories";
$string['dynamicallcategory'] = "Tous les blocs dynamiques";
$string['layoutallcategory'] = "Toutes les dispositions";

$string['updatedblocksinfotext'] = "Tous les blocs remui sont à jour";
$string['formpageselector'] = "Sélecteur de page";
$string['formpagename'] = "Nom de la page";
$string['formpagewidth'] = "Largeur de la page";
$string['featuredcoursesblockdesc'] = "Le bloc de cours en vedette est conçu pour mettre en valeur votre contenu de qualité et attirer les apprenants.";
$string["blockimportexportwarning"] = "Erreur : Fichier invalide. Veuillez vous assurer que le fichier téléchargé est un fichier JSON Edwiser valide.";