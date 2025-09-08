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

$string['advancedsettings'] = 'Paramètres avancés';
$string['backgroundimage'] = "Image d'arrière-plan";
$string['backgroundimage_desc'] = "L'image à afficher en tant qu'arrière-plan du site. L'image d'arrière-plan que vous téléchargez ici remplacera l'image d'arrière-plan dans les fichiers de préréglage de votre thème.";
$string['brandcolor'] = 'Couleur de marque';
$string['brandcolor_desc'] = 'La couleur de marque.';
$string['bootswatch'] = 'Bootswatch';
$string['bootswatch_desc'] = 'Un bootswatch est un ensemble de variables Bootstrap et de css pour styliser Bootstrap.';
$string['choosereadme'] = 'Edwiser RemUI est un thème Moodle personnalisable conçu pour améliorer votre expérience d\'apprentissage en ligne en répondant aux défis tels que la personnalisation limitée et les préoccupations liées à l\'interface utilisateur. Avec son design moderne et intuitif et ses fonctionnalités complètes, vous pouvez facilement créer un site visuellement époustouflant et personnalisé qui stimule l\'engagement des étudiants et offre une expérience que les apprenants adoreront!';
$string['currentinparentheses'] = '(actuel)';
$string['configtitle'] = 'Edwiser RemUI';
$string['generalsettings'] = 'basique';
$string['loginbackgroundimage'] = "Image d'arrière-plan de la page de connexion";
$string['loginbackgroundimage_desc'] = "L'image à afficher en tant qu'arrière-plan de la page de connexion.";
$string['nobootswatch'] = 'Aucun';
$string['pluginname'] = 'Edwiser RemUI';
$string['presetfiles'] = 'Fichiers de préréglage de thème supplémentaires';
$string['presetfiles_desc'] = "Les fichiers de préréglage peuvent être utilisés pour modifier considérablement l'apparence du thème. Voir <a href='https://docs.moodle.org/dev/remui_Presets'>les préréglages remui</a> pour des informations sur la création et le partage de vos propres fichiers de préréglage, et voir le <a href='https://archive.moodle.net/remui'>Dépôt de préréglages</a> pour les préréglages que d'autres ont partagés.";
$string['preset'] = 'Préréglage de thème';
$string['preset_desc'] = "Choisissez un préréglage pour modifier largement l'apparence du thème.";
$string['privacy:metadata'] = "Le thème remui ne stocke aucune donnée personnelle sur aucun utilisateur.";
$string['rawscss'] = "SCSS brut";
$string['rawscss_desc'] = 'Utilisez ce champ pour fournir du code SCSS ou CSS qui sera injecté à la fin de la feuille de style.';
$string['rawscsspre'] = 'SCSS initial brut';
$string['rawscsspre_desc'] = "Dans ce champ, vous pouvez fournir du code SCSS d'initialisation, il sera injecté avant tout le reste. La plupart du temps, vous utiliserez ce paramètre pour définir des variables.";
$string['region-side-pre'] = 'Droite';
$string['region-side-top'] = 'Haut';
$string['region-side-bottom'] = 'Bas';
$string['showfooter'] = 'Afficher le pied de page';
$string['unaddableblocks'] = 'Blocs non nécessaires';
$string['unaddableblocks_desc'] = "Les blocs spécifiés ne sont pas nécessaires lors de l'utilisation de ce thème et ne seront pas répertoriés dans le menu 'Ajouter un bloc'.";
$string['privacy:metadata:preference:draweropenblock'] = "Préférence de l'utilisateur pour masquer ou afficher le tiroir des blocs.";
$string['privacy:metadata:preference:draweropenindex'] = "Préférence de l'utilisateur pour masquer ou afficher le tiroir de l'index des cours.";
$string['privacy:metadata:preference:draweropennav'] = "Préférence de l'utilisateur pour masquer ou afficher la navigation du menu dans le tiroir.";
$string['privacy:drawerindexclosed'] = "La préférence actuelle pour le tiroir de l'index est fermée.";
$string['privacy:drawerindexopen'] = " préférence actuelle pour le tiroir de l'index est ouverte.";
$string['privacy:drawerblockclosed'] = "La préférence actuelle pour le tiroir des blocs est fermée.";
$string['privacy:drawerblockopen'] = " préférence actuelle pour le tiroir des blocs est ouverte.";
$string['privacy:drawernavclosed'] = " préférence actuelle pour la navigation dans le tiroir est fermée.";
$string['privacy:drawernavopen'] = "référence actuelle pour la navigation dans le tiroir est ouverte.";

// Deprecated since Moodle 4.0.
$string['totop'] = 'Aller en haut';

// Edwiser RemUI Settings Page Strings.

// Settings Tabs strings.
$string['homepagesettings'] = "Page d'accueil";
$string['coursesettings'] = "Page du cours";
$string['footersettings'] = 'Pied de page';
$string["formsettings"] = "Formulaires";
$string["iconsettings"] = "Icônes";
$string['loginsettings'] = 'Page de connexion';

$string['versionforheading'] = '<span class="small remuiversion"> Version {$a}</span>';
$string['themeversionforinfo'] = '<span>Version actuellement installée: Edwiser RemUI v{$a}</span>';

// General Settings.
$string['mergemessagingsidebar'] = 'Fusionner le panneau de messages';
$string['mergemessagingsidebardesc'] = 'Fusionner le panneau de messages dans la barre latérale droite';
$string['logoorsitename'] = 'Choisissez le format de logo du site';
$string['logoorsitenamedesc'] = 'Logo seul - Grand logo de marque <br /> Logo mini - Mini logo de marque <br /> Icône seule - Une icône en tant que marque <br/> Icône et nom du site - Icône avec nom du site';
$string['onlylogo'] = 'Logo seul';
$string['logo'] = 'Logo';
$string['logomini'] = 'Logo mini';
$string['icononly'] = 'Icône seule';
$string['iconsitename'] = 'Icône et nom du site';
$string['logodesc'] = "Vous pouvez ajouter le logo qui sera affiché dans l'en-tête. Notez que la hauteur préférée est de 50px. Si vous souhaitez personnaliser, vous pouvez le faire à partir de la boîte CSS personnalisée.";
$string['logominidesc'] = "Vous pouvez ajouter le logo mini qui sera affiché dans l'en-tête lorsque la barre latérale est rétractée. Notez que la hauteur préférée est de 50px. Si vous souhaitez personnaliser, vous pouvez le faire à partir de la boîte CSS personnalisée.";
$string['siteicon'] = 'Icône du site';
$string['siteicondesc'] = "Vous n'avez pas de logo ? Vous pouvez en choisir un dans cette <a href='https://fontawesome.com/v4.7.0/cheatsheet/' target='_new' ><b style='color:#17a2b8!important'>liste</b></a>. <br /> Il suffit d'entrer le texte après 'fa-'.";
$string['navlogin_popup'] = 'Activer la fenêtre de connexion';
$string['navlogin_popupdesc'] = 'Activer la fenêtre de connexion pour se connecter rapidement sans être redirigé vers la page de connexion.';
$string['coursecategories'] = 'Catégories';
$string['enablecoursecategorymenu'] = "Menu déroulant de catégorie dans l'en-tête";
$string['enablecoursecategorymenudesc'] = "Laissez cela activé si vous souhaitez afficher le menu déroulant des catégories dans l'en-tête";
$string['coursepagesettings'] = "Page de cours";
$string['coursepagesettingsdesc'] = "Paramètres liés aux cours.";
$string['coursecategoriestext'] = "Renommer le menu déroulant de catégorie dans l'en-tête";
$string['coursecategoriestextdesc'] = "Vous pouvez ajouter un nom personnalisé pour le menu déroulant des catégories dans l'en-tête.";
$string['enablerecentcourses'] = 'Activer les cours récents';
$string['enablerecentcoursesdesc'] = "Si activé, le menu déroulant des cours récents sera affiché dans l'en-tête.";
$string['recent'] = 'Récent';
$string['recentcoursesmenu'] = 'Menu des cours récents';
$string['searchcatplaceholdertext'] = 'Rechercher des catégories';
$string['viewallnotifications'] = 'Voir toutes les notifications';
$string['forgotpassword'] = 'Mot de passe oublié ?';
$string['enableannouncement'] = "Activer l'annonce pour l'ensemble du site";
$string['enableannouncementdesc'] = "Activer l'annonce pour tous les utilisateurs.";
$string['enabledismissannouncement'] = "Activer l'annonce pour l'ensemble du site qui peut être supprimée";
$string['enabledismissannouncementdesc'] = "Si activé, permettre aux utilisateurs de supprimer l'annonce.";
$string['brandlogo'] = 'Logo de la marque';
$string['brandname'] = 'Nom de la marque';

$string['announcementtext'] = "Annonce";
$string['announcementtextdesc'] = "Message d'annonce à afficher sur l'ensemble du site.";
$string['announcementtype'] = "Type d'annonce";
$string['announcementtypedesc'] = "Sélectionnez le type d'annonce pour afficher une couleur de fond différente pour l'annonce.";
$string['typeinfo'] = "Information";
$string['typedanger'] = "Urgent";
$string['typewarning'] = "Attention";
$string['typesuccess'] = "Succès";

// Google Analytics.
$string['googleanalytics'] = 'Identifiant de suivi Google Analytics';
$string['googleanalyticsdesc'] = "Veuillez saisir votre identifiant de suivi Google Analytics pour activer l'analyse de votre site web. Le format de l'identifiant de suivi doit être comme suit [UA-XXXXX-Y].<br/> Veuillez noter qu'en incluant ce paramètre, vous enverrez des données à Google Analytics et vous devez vous assurer que vos utilisateurs en sont informés. Notre produit ne stocke aucune des données envoyées à Google Analytics.";
$string['favicon'] = 'Favicon';
$string['favicosize'] = 'La taille attendue est de 16x16 pixels';
$string['favicondesc'] = 'L’"icône favorite" de votre site. C’est un rappel visuel de l’identité du site Web et est affiché dans la barre d’adresse ou dans les onglets du navigateur.';
$string['fontselect'] = 'Sélecteur de type de police';
$string['fontselectdesc'] = 'Choisissez parmi les polices standard ou les <a href="https://fonts.google.com/" target="_new">polices Web Google</a>. Veuillez enregistrer pour afficher les options de votre choix. Remarque : Si la police du personnaliseur visuel est définie sur Standard, alors la police Web Google sera appliquée.';
$string['fontname'] = 'Police du site';
$string['fontnamedesc'] = 'Entrez le nom exact de la police à utiliser pour Moodle.';
$string['fonttypestandard'] = 'Police standard';
$string['fonttypegoogle'] = 'Police Web Google';

$string['sendfeedback'] = "Envoyer des commentaires à Edwiser";
$string['enableedwfeedback'] = "Commentaires et assistance d'Edwiser";
$string['enableedwfeedbackdesc'] = "Activer les commentaires et l'assistance d'Edwiser, visible uniquement par les administrateurs.";
$string["checkfaq"] = "Edwiser RemUI - Vérifier les FAQ";
$string['poweredbyedwiser'] = 'Propulsé par Edwiser';
$string['poweredbyedwiserdesc'] = 'Décochez pour supprimer "Propulsé par Edwiser" de votre site.';
$string['enabledictionary'] = 'Activer le dictionnaire';
$string['enabledictionarydesc'] = "S'il est activé, la fonctionnalité de dictionnaire sera activée et affichera la signification du texte sélectionné dans une fenêtre contextuelle.";
$string['customcss'] = 'CSS personnalisé';
$string['customcssdesc'] = 'Vous pouvez personnaliser le CSS à partir de la zone de texte ci-dessus. Les modifications seront reflétées sur toutes les pages de votre site.';

// Footer Content.
$string['followus'] = 'Suivez-nous';
$string['poweredby'] = 'Propulsé par';

// One click report  bug/feedback.
$string['sendfeedback'] = "Envoyer des commentaires à Edwiser";
$string['descriptionmodal_text1'] = "<p>Les commentaires vous permettent de nous envoyer des suggestions sur nos produits. Nous apprécions les rapports de problèmes, les idées de fonctionnalités et les commentaires généraux.</p><p>Commencez par écrire une brève description :</p>";
$string['descriptionmodal_text2'] = '<p>Ensuite, nous vous permettrons d identifier les zones de la page liées à votre description.</p>';
$string['emptydescription_error'] = "Veuillez entrer une description.";
$string['incorrectemail_error'] = "Veuillez saisir une adresse e-mail valide.";

$string['highlightmodal_text1'] = "Cliquez et faites glisser sur la page pour nous aider à mieux comprendre vos commentaires. Vous pouvez déplacer cette boîte de dialogue si elle gêne.";
$string['highlight_button'] = "Surligner la zone";
$string['blackout_button'] = "Cacher l info";
$string['highlight_button_tooltip'] = "Surligner les zones pertinentes pour vos commentaires.";
$string['blackout_button_tooltip'] = "Masquer toute information personnelle.";

$string['feedbackmodal_next'] = "Prendre une capture d écran et continuer";
$string['feedbackmodal_skipnext'] = 'Passer et continuer';
$string['feedbackmodal_previous'] = 'Retour';
$string['feedbackmodal_submit'] = 'Soumettre';
$string['feedbackmodal_ok'] = 'OK';

$string['description_heading'] = 'Description';
$string['feedback_email_heading'] = 'E-mail';
$string['additional_info'] = 'Informations supplémentaires';
$string['additional_info_none'] = 'Aucune';
$string['additional_info_browser'] = 'Info du navigateur';
$string['additional_info_page'] = 'Info de la page';
$string['additional_info_pagestructure'] = 'Structure de la page';
$string['feedback_screenshot'] = "Capture d écran";
$string['feebdack_datacollected_desc'] = 'Un aperçu des données collectées est disponible <strong><a href="https://forums.edwiser.org/topic/67/anonymously-tracking-the-usage-of-edwiser-products" target="_blank">ici</a></strong>.';
$string['submit_loading'] = 'Chargement...';
$string['submit_success'] = 'Merci pour votre feedback. Nous apprécions chaque retour que nous recevons.';
$string['submit_error'] = "Malheureusement, une erreur s est produite lors de l envoi de votre feedback. Veuillez réessayer.";
$string['send_feedback_license_error'] = "Veuillez activer la licence pour obtenir une assistance produit.";
$string['disabled'] = 'Désactivé';

$string['nocoursefound'] = 'Aucun cours trouvé';

$string['pagewidth'] = 'Mise en page du thème';
$string['pagewidthdesc'] = 'Ici, vous pouvez choisir la taille de la mise en page des pages.';
$string['defaultpermoodle'] = 'Largeur étroite (par défaut de Moodle)';
$string['fullwidthlayout'] = 'Pleine largeur';

// Footer Page Settings.
$string['footersettings'] = 'Pied de page';
$string['socialmedia'] = 'Réseaux sociaux';
$string['socialmediadesc'] = 'Entrez les liens vers vos réseaux sociaux.';
$string['facebooksetting'] = 'Facebook';
$string['facebooksettingdesc'] = 'Entrez le lien de la page Facebook de votre site. Par exemple, https://www.facebook.com/nomdelapage';
$string['twittersetting'] = 'X (anciennement Twitter)';
$string['twittersettingdesc'] = 'Entrez le lien de la page X de votre site. Par exemple, https://www.x.com/nomdelapage';
$string['linkedinsetting'] = 'LinkedIn';
$string['linkedinsettingdesc'] = 'Entrez le lien de la page LinkedIn de votre site. Par exemple, https://www.linkedin.com/in/nomdelapage';
$string['gplussetting'] = 'Google Plus';
$string['gplussettingdesc'] = 'Entrez le lien de la page Google Plus de votre site. Par exemple, https://plus.google.com/nomdelapage';
$string['youtubesetting'] = 'YouTube';
$string['youtubesettingdesc'] = 'Entrez le lien de la page YouTube de votre site. Par exemple, https://www.youtube.com/channel/UCU1u6QtAAPJrV0v0_c2EISA';
$string['instagramsetting'] = 'Instagram';
$string['instagramsettingdesc'] = 'Entrez le lien de la page Instagram de votre site. Par exemple, https://www.instagram.com/nom';
$string['pinterestsetting'] = 'Pinterest';
$string['pinterestsettingdesc'] = 'Entrez le lien de la page Pinterest de votre site. Par exemple, https://www.pinterest.com/nom';
$string['quorasetting'] = 'Quora';
$string['quorasettingdesc'] = 'Entrez le lien de la page Quora de votre site. Par exemple, https://www.quora.com/nom';
$string['footerbottomtext'] = 'Texte du pied de page en bas à gauche';
$string['footerbottomlink'] = 'Lien du pied de page en bas à gauche';
$string['footerbottomlinkdesc'] = 'Entrez le lien pour la section en bas à gauche du pied de page. Par exemple, http://www.votresociete.com';
$string['footercolumn1heading'] = 'Contenu du pied de page pour la première colonne (gauche)';
$string['footercolumn1headingdesc'] = "Cette section concerne la partie inférieure (colonne 1) de votre page d'accueil.";
$string['footercolumn1title'] = 'Titre de la première colonne du pied de page';
$string['footercolumn1titledesc'] = 'Ajoutez un titre à cette colonne.';
$string['footercolumncustomhtml'] = 'Contenu';
$string['footercolumn1customhtmldesc'] = 'Vous pouvez personnaliser le HTML de cette colonne en utilisant la zone de texte ci-dessus.';
$string['footercolumn2heading'] = 'Contenu du pied de page pour la deuxième colonne (milieu)';
$string['footercolumn2headingdesc'] = 'Cette section concerne la partie inférieure (colonne 2) de votre page d accueil.';
$string['footercolumn2title'] = 'Titre de la deuxième colonne du pied de page';
$string['footercolumn2titledesc'] = 'Ajoutez un titre à cette colonne.';
$string['footercolumn2customhtml'] = 'HTML personnalisé';
$string['footercolumn2customhtmldesc'] = 'Vous pouvez personnaliser le code HTML de cette colonne en utilisant la zone de texte ci-dessus.';
$string['footercolumn3heading'] = 'Contenu du pied de page pour la 3ème colonne (milieu)';
$string['footercolumn3headingdesc'] = 'Cette section concerne la partie inférieure (Colonne 3) de votre page d accueil.';
$string['footercolumn3title'] = 'Titre de la 3ème colonne de pied de page';
$string['footercolumn3titledesc'] = 'Ajoutez un titre à cette colonne.';
$string['footercolumn3customhtml'] = 'HTML personnalisé';
$string['footercolumn3customhtmldesc'] = 'Vous pouvez personnaliser le code HTML de cette colonne en utilisant la zone de texte ci-dessus.';
$string['footercolumn4heading'] = 'Contenu du pied de page pour la 4ème colonne (droite)';
$string['footercolumn4headingdesc'] = 'Cette section concerne la partie inférieure (Colonne 4) de votre page d accueil.';
$string['footercolumn4title'] = 'Titre de la 4ème colonne de pied de page';
$string['footercolumn4titledesc'] = 'Ajoutez un titre à cette colonne.';
$string['footercolumn4customhtml'] = 'HTML personnalisé';
$string['footercolumn4customhtmldesc'] = 'Vous pouvez personnaliser le code HTML de cette colonne en utilisant la zone de texte ci-dessus.';
$string['footerbottomheading'] = 'Paramètres du pied de page inférieur';
$string['footerbottomdesc'] = 'Vous pouvez spécifier votre propre lien à entrer dans la section inférieure du pied de page.';
$string['footerbottomtextdesc'] = 'Ajoutez du texte à la section inférieure du pied de page.';
$string['footercopyrightsshow'] = 'afficher';
$string['footercopyright'] = "Afficher le contenu des droits d'auteur";
$string['footercopyrights'] = '[site] © [année]. Tous droits réservés.';
$string['footercopyrightsdesc'] = "Ajouter du contenu de droits d'auteur dans la partie inférieure de la page.";
$string['footercopyrightstags'] = 'Balises :<br>[site] - Nom du site<br>[année] - Année en cours';
$string['footerbottomlink'] = 'Lien en bas à gauche du pied de page';
$string['footerbottomlinkdesc'] = 'Entrez le lien pour la section en bas à gauche du pied de page. Par exemple, http://www.votreentreprise.com';
$string['footerbottomtext'] = 'Texte en bas à gauche du pied de page';
$string['copyrighttextarea'] = "Contenu des droits d'auteur";
$string['footercolumnsize'] = 'Nombre de widgets';
$string['one'] = 'Un';
$string['two'] = 'Deux';
$string['three'] = 'Trois';
$string['four'] = 'Quatre';
$string['showsocialmediaicon'] = "Afficher les icônes des réseaux sociaux";
$string['footercolumntype'] = 'Type';
$string['footercolumncustommenudesc'] = 'Ajoutez vos éléments de menu dans ce format par exemple.<br><pre>[
    {
        "text": "Ajoutez votre texte ici",
        "address": "http://XYZ.abc"
    },
    {
        "text": "Ajoutez votre texte ici",
        "address": "http://XYZ.abc"
    }, ...
]</pre>
<b style="color:red;">Remarque :</b> Pour ajouter facilement du contenu au pied de page, personnalisez la zone de pied de page avec notre <a href="'.$CFG->wwwroot.'/admin/settings.php?section=themesettingremui#theme_remui_edwiserpersonalizer" onclick= location.href="'.$CFG->wwwroot.'/admin/settings.php?section=themesettingremui#theme_remui_edwiserpersonalizer";location.reload();>Personnalisateur visuel</a>';
$string['gotop'] = 'Haut de page';

$string['menu'] = 'Menu';
$string['content'] = 'Contenu';
$string['footercolumntypedesc'] = 'Vous pouvez choisir le type de widget de pied de page';
$string['socialmediaicondesc'] = 'Cela affichera les icônes des médias sociaux dans cette section';
$string['footercolumncustommmenu'] = 'Ajouter des éléments de menu';
$string['follometext'] = 'Suivez-moi sur {$a}';
$string['footercolumndesc'] = 'Sélectionnez le nombre de widgets dans le pied de page';
$string['footershowlogo'] = 'Afficher le logo du pied de page';
$string['footershowlogodesc'] = 'Afficher le logo dans le pied de page secondaire.';

$string['footertermsandconditionsshow'] = 'Afficher les termes et conditions';
$string['footertermsandconditions'] = 'Lien vers les termes et conditions';
$string['footertermsandconditionsdesc'] = 'Vous pouvez ajouter un lien vers la page des termes et conditions.';
$string['footertermsandconditionsshowdesc'] = 'Termes et conditions du pied de page';
$string['footerprivacypolicyshowdesc'] = 'Lien vers la politique de confidentialité';

$string['footerprivacypolicyshow'] = 'Afficher la politique de confidentialité';
$string['footerprivacypolicy'] = 'Lien vers la politique de confidentialité';
$string['footerprivacypolicydesc'] = 'Vous pouvez ajouter un lien vers la page de la politique de confidentialité.';
$string['termsandconditions'] = 'Termes et conditions';
$string['privacypolicy'] = 'Politique de confidentialité';
$string['typeamessage'] = "Saisissez votre message ici";
$string['allcontacts'] = "Tous les contacts";

// Profile Page.
$string['administrator'] = 'Administrateur';
$string['contacts'] = 'Contacts';
$string['blogentries'] = 'Articles de blog';
$string['discussions'] = 'Discussions';
$string['aboutme'] = 'À propos de moi';
$string['courses'] = 'Cours';
$string['interests'] = 'Intérêts';
$string['institution'] = 'Département et Institution';
$string['location'] = 'Emplacement';
$string['description'] = 'Description';
$string['editprofile'] = 'Modifier le profil';
$string['start_date'] = 'Date de début';
$string['complete'] = 'Complet';
$string['surname'] = 'Nom de famille';
$string['actioncouldnotbeperformed'] = 'Action impossible à effectuer !';
$string['enterfirstname'] = 'Veuillez entrer votre prénom.';
$string['enterlastname'] = 'Veuillez entrer votre nom de famille.';
$string['entervalidphoneno'] = 'Entrez un numéro de téléphone valide';
$string['enteremailid'] = 'Veuillez entrer votre identifiant de messagerie.';
$string['enterproperemailid'] = 'Veuillez entrer un identifiant de messagerie valide.';
$string['detailssavedsuccessfully'] = 'Détails enregistrés avec succès !';
$string['fullname'] = 'Nom complet';
$string['viewcourselow'] = "voir le cours";

$string['focusmodesettings'] = 'Paramètres de mode Focus';
$string['focusmodenormalstatetext'] = 'Focus : ACTIVÉ';
$string['focusmodeactivestatetext'] = 'Focus : DÉSACTIVÉ';
$string['enablefocusmode'] = 'Activer le mode Focus';
$string['enablefocusmodedesc'] = "Si activé, un bouton pour passer en mode d'apprentissage sans distraction apparaîtra sur la page du cours.";
$string['focusmodeenabled'] = 'Mode Focus activé';
$string['focusmodedisabled'] = 'Mode Focus désactivé';
$string['coursedata'] = 'Données du cours';
$string['prev'] = 'Précédent';
$string['next'] = 'Suivant';
$string['enablecoursestats'] = 'Activer les statistiques du cours';
$string['enablecoursestatsdesc'] = "Si activé, l'administrateur, les gestionnaires et les enseignants verront les statistiques de l'utilisateur liées au cours inscrit sur la page de cours unique.";

// Course Stats.
$string['notenrolledanycourse'] = 'Non inscrit à aucun cours.';
$string['enrolledusers'] = 'Étudiants inscrits';
$string['studentcompleted'] = 'Étudiants ayant terminé';
$string['inprogress'] = 'En cours';
$string['yettostart'] = 'Pas encore commencé';
$string['completepercent'] = '{$a}% de cours terminé';
$string['seeallmycourses'] = "<span class='d-none d-lg-block'>Voir tous mes </span> <span>cours en cours</span>";
$string['noactivity'] = 'Pas d’activités dans le cours';
$string['activitydata'] = '{$a->complete} sur {$a->total} activités terminées';

// Login Page Strings.
$string['loginsettingpic'] = 'Téléverser une image de fond';
$string['loginsettingpicdesc'] = 'Téléversez une image comme arrière-plan pour le formulaire de connexion.';
$string['loginpagelayout'] = 'Position du formulaire de connexion';
$string['loginpagelayoutdesc'] = 'Choisissez la conception de la page de connexion.';
$string['logincenter'] = 'Centre';
$string['loginleft'] = 'Côté gauche';
$string['loginright'] = 'Côté droit';
$string['brandlogopos'] = "Afficher le logo sur la page de connexion";
$string['brandlogoposdesc'] = "Si activé, le logo de la marque sera affiché sur la page de connexion.";
$string['hiddenlogo'] = "Désactiver";
$string['sidebarregionlogo'] = 'Sur la carte de connexion';
$string['maincontentregionlogo'] = 'Sur la région centrale';
$string['loginpanellogo'] = "Logo de l'en-tête (page de connexion)";
$string['loginpanellogodesc'] = 'Dépend de la <strong>choix du format de logo de site</strong>.';
$string['signuptextcolor'] = 'Couleur de la description du site';
$string['signuptextcolordesc'] = 'Sélectionnez la couleur du texte pour la description du site.';
$string['brandlogotext'] = "Description du site";
$string['loginpagesitedescription'] = 'Description du site de la page de connexion';
$string['brandlogotextdesc'] = "Ajoutez du texte pour la description du site qui s'affichera sur la page de connexion et d'inscription. Laissez cette zone vide si vous ne voulez pas mettre de description.";
$string['createnewaccount'] = 'Créer un nouveau compte';
$string['welcometobrand'] = 'Bonjour, Bienvenue sur {$a}';
$string['entertologin'] = "Entrez vos coordonnées pour vous connecter à votre compte";
$string['forgotaccount'] = 'Mot de passe oublié ?';
$string['potentialidps'] = 'Ou connectez-vous en utilisant votre compte';
$string['firsttime'] = 'Première utilisation de ce site';

// Signup Page.
$string['createnewaccount'] = 'Créer un nouveau compte';

// Course Page Settings.
$string['coursesettings'] = "Page de cours";
$string['enrolpagesettings'] = "Paramètres de la page d'inscription";
$string['enrolpagesettingsdesc'] = "Gérez le contenu de la page d'inscription ici.";
$string['coursearchivepagesettings'] = "Paramètres de la page d'archives de cours";
$string['coursearchivepagesettingsdesc'] = "Gérez la mise en page et le contenu de la page d'archives de cours.";
$string['courseperpage'] = 'Cours par page';
$string['courseperpagedesc'] = "<strong>Affichage 'Grille' des cours :</strong> En sélectionnant le nombre de cartes de cours dans les paramètres ci-dessus, la page d'archive du cours s'ajustera automatiquement et organisera les cartes en rangées générées dynamiquement.<br>
<strong style='display: inline-block;margin-top: 8px;'>Affichage 'Liste & Résumé' des cours :</strong> Les cours seront affichés selon la sélection effectuée dans les paramètres ci-dessus.";
$string['none'] = 'Aucun';
$string['fade'] = 'Estomper';
$string['slide-top'] = 'Faire glisser vers le haut';
$string['slide-bottom'] = 'Faire glisser vers le bas';
$string['slide-right'] = 'Faire glisser vers la droite';
$string['scale-up'] = 'Agrandir';
$string['scale-down'] = 'Réduire';
$string['courseanimation'] = 'Animation de la carte de cours';
$string['courseanimationdesc'] = "Sélectionnez l'animation de la carte de cours à afficher sur la page d'archives de cours.";

$string['currency'] = 'USD';
$string['currency_symbol'] = '$';
$string['enrolment_payment'] = 'Afficher l\'étiquette \'GRATUIT\' sur les cours avec un coût d\'inscription de \'0\'';
$string['enrolment_payment_desc'] = 'Ce paramètre décide si une étiquette "GRATUIT" apparaît pour les cours sans frais d\'inscription. Si réglé sur "Non", l\'étiquette n\'apparaîtra pas sur la page d\'inscription.';
$string['allrequirepayment'] = 'Non';
$string['somearefree'] = 'Oui';
$string['allarefree'] = 'Tous les cours sont gratuits';

$string['showcoursepricing'] = 'Afficher les prix du cours';
$string['showcoursepricingdesc'] = "Activez ce paramètre pour afficher la section des prix sur la page d'inscription.";
$string['fullwidthcourseheader'] = 'En-tête du cours en pleine largeur';
$string['fullwidthcourseheaderdesc'] = "Activez ce paramètre pour rendre l'en-tête du cours en pleine largeur.";

$string['price'] = 'Prix';
$string['course_free'] = 'GRATUIT';
$string['enrolnow'] = 'maintenant {$a}';
$string['buyand'] = 'Acheter & ';
$string['notags'] = 'Aucun tag.';
$string['tags'] = 'Tags';

$string['enrolment_layout'] = "Disposition de la page d'inscription";
$string['enrolment_layout_desc'] = "Activez la mise en page Edwiser pour une conception de page d'inscription nouvelle et améliorée.";
$string['disable'] = 'Désactiver';
$string['defaultlayout'] = 'Mise en page Moodle par défaut';
$string['enable_layout1'] = 'Mise en page Edwiser';

$string['webpage'] = "Page Web";
$string['categorypagelayout'] = "Mise en page de la page d'archive de cours";
$string['categorypagelayoutdesc'] = "Sélectionnez entre les mises en page de la page d'archive de cours.";
$string['edwiserlayout'] = 'Mise en page Edwiser';
$string['categoryfilter'] = 'Filtre de catégorie';

$string['skill0'] = 'Non étiqueté';
$string['skill1'] = 'Débutant';
$string['skill2'] = 'Intermédiaire';
$string['skill3'] = 'Avancé';

$string['lastupdatedon'] = 'Dernière mise à jour le ';

$string['courseoverview'] = "Présentation du cours";
$string['coursecontent'] = "Contenu du cours";
$string['instructors'] = "Instructeurs";
$string['reviews'] = "Avis";
$string['curatedby'] = 'Instructeurs';
$string["studentsenrolled"] = 'Étudiants inscrits';
$string['lesson'] = 'Leçon';
$string['category'] = 'Catégorie';
$string['review'] = 'Avis';
$string['length'] = 'Durée';
$string['lecture'] = 'Cours';
$string['startdate'] = 'Date de début';
$string['skilllevel'] = 'Niveau de compétence';
$string['language'] = 'Langue';
$string['certificate'] = 'Certificat';
$string['students'] = 'Étudiants';
$string['courses'] = 'Cours';

// Course archive.
$string['cachedef_courses'] = 'Cache des cours';
$string['cachedef_guestcourses'] = 'Cache des cours invités';
$string['cachedef_updates'] = 'Cache des mises à jour';
$string['mycourses'] = "Mes cours";
$string['allcategories'] = 'Toutes les catégories';
$string['categorysort'] = 'Trier les catégories';
$string['sortdefault'] = 'Trier (aucun)';
$string['sortascending'] = 'A à Z';
$string['sortdescending'] = 'Z à A';

// Frontpage Old String.
// Home Page Settings.
$string['homepagesettings'] = 'Page d accueil';
$string['frontpagedesign'] = 'Design de la page d accueil';
$string['frontpagedesigndesc'] = "Activer l'ancien constructeur ou le constructeur de page d'accueil Edwiser RemUI";
$string['frontpagechooser'] = 'Choisissez le design de la page d accueil';
$string['frontpagechooserdesc'] = 'Choisissez le design de la page d accueil.';
$string['frontpagedesignold'] = "Ancien constructeur de page d'accueil";
$string['frontpagedesignolddesc'] = 'Tableau de bord par défaut comme précédent.';
$string['frontpagedesignnew'] = 'Nouveau design';
$string['frontpagedesignnewdesc'] = "Nouveau design frais avec plusieurs sections. Vous pouvez configurer les sections individuellement sur la page d'accueil.";
$string['newhomepagedescription'] = "Cliquez sur Page d'accueil du site dans la barre de navigation pour accéder à Constructeur de page d accueil  et créer votre propre page d accueil";
$string['frontpageloader'] = 'Télécharger une image de chargement pour la page d accueil';
$string['frontpageloaderdesc'] = 'Cela remplace le chargeur par défaut par votre image';
$string['frontpageimagecontent'] = 'Contenu d en-tête';
$string['frontpageimagecontentdesc'] = 'Cette section concerne la partie supérieure de votre page d accueil.';
$string['frontpageimagecontentstyle'] = 'Style';
$string['frontpageimagecontentstyledesc'] = 'Vous pouvez choisir entre Statique et Curseur.';
$string['staticcontent'] = 'Statique';
$string['slidercontent'] = 'Curseur';
$string['addtext'] = 'Ajouter du texte';
$string['defaultaddtext'] = "L'éducation est un chemin éprouvé vers le progrès.";
$string['addtextdesc'] = "Vous pouvez ajouter ici le texte à afficher sur la page d'accueil, de préférence en HTML.";
$string['uploadimage'] = "Télécharger une image";
$string['uploadimagedesc'] = "Vous pouvez télécharger une image pour le contenu du diaporama.";
$string['video'] = "Code d'intégration iframe";
$string['videodesc'] = "Vous pouvez insérer ici le code d'intégration iframe de la vidéo qui doit être intégrée.";
$string['contenttype'] = "Sélectionner le type de contenu";
$string['contentdesc'] = "Vous pouvez choisir entre une image ou donner une URL vidéo.";
$string['imageorvideo'] = "Image/Vidéo";
$string['image'] = "Image";
$string['videourl'] = 'URL de la vidéo';
$string['slideinterval'] = 'Intervalle de diapositives';
$string['slideintervalplaceholder'] = 'Nombre entier positif en millisecondes.';
$string['slideintervaldesc'] = "Vous pouvez régler le temps de transition entre les diapositives. Dans le cas où il n'y a qu'une seule diapositive, cette option n'aura aucun effet. Si l'intervalle est invalide (vide|0|inférieur à 0), alors l'intervalle par défaut sera de 5000 millisecondes.";
$string['slidercount'] = 'Nombre de diapositives';
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
$string['slideimage'] = 'Télécharger des images pour le diaporama';
$string['slideimagedesc'] = 'Vous pouvez télécharger une image pour le contenu de cette diapositive.';
$string['sliderurl'] = 'Ajouter un lien au bouton de la diapositive';
$string['slidertext'] = 'Ajouter du texte à la diapositive';
$string['defaultslidertext'] = '';
$string['slidertextdesc'] = 'Vous pouvez insérer le contenu texte pour cette diapositive. De préférence en HTML.';
$string['sliderbuttontext'] = 'Ajouter du texte au bouton de la diapositive';
$string['sliderbuttontextdesc'] = 'Vous pouvez ajouter du texte au bouton de cette diapositive.';
$string['sliderurldesc'] = "Vous pouvez insérer le lien de la page où l'utilisateur sera redirigé une fois qu'il aura cliqué sur le bouton.";
$string['sliderautoplay'] = 'Définir la lecture automatique du diaporama';
$string['sliderautoplaydesc'] = 'Sélectionnez « oui » si vous souhaitez une transition automatique dans votre diaporama.';
$string['true'] = 'Oui';
$string['false'] = 'Non';
$string['frontpageblocks'] = 'Body Content';
$string['frontpageblocksdesc'] = 'Vous pouvez insérer un titre pour le corps du site.';
$string['frontpageblockdisplay'] = 'Section À Propos';
$string['frontpageblockdisplaydesc'] = 'Vous pouvez afficher ou masquer la section "À propos de nous", vous pouvez également afficher la section "À propos de nous" sous forme de grille.';
$string['donotshowaboutus'] = 'Ne pas afficher';
$string['showaboutusinrow'] = 'Afficher la section en ligne';
$string['showaboutusingridblock'] = 'Afficher la section en bloc de grille';

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
$string['frontpageblocksection1'] = 'Titre du corps pour la 1ère section';
$string['frontpageblockdescriptionsection1'] = 'Description du corps pour la 1ère section';
$string['frontpageblockiconsection1'] = 'Icône Font-Awesome pour la 1ère section';
$string['sectionbuttontext1'] = 'Texte du bouton pour la 1ère section';
$string['sectionbuttonlink1'] = 'Lien URL pour la 1ère section';

// Block section 2.
$string['frontpageblocksection2'] = 'Titre du corps pour la 2ème section';
$string['frontpageblockdescriptionsection2'] = 'Description du corps pour la 2ème section';
$string['frontpageblockiconsection2'] = 'Icône Font-Awesome pour la 2ème section';
$string['sectionbuttontext2'] = 'Texte du bouton pour la 2ème section';
$string['sectionbuttonlink2'] = 'Lien URL pour la 2ème section';

// Block section 3.
$string['frontpageblocksection3'] = 'Titre du corps pour la 3ème section';
$string['frontpageblockdescriptionsection3'] = 'Description du corps pour la 3ème section';
$string['frontpageblockiconsection3'] = 'Icône Font-Awesome pour la 3ème section';
$string['sectionbuttontext3'] = 'Texte du bouton pour la 3ème section';
$string['sectionbuttonlink3'] = 'Lien URL pour la 3ème section';

// Block section 4.
$string['frontpageblocksection4'] = 'Titre du corps pour la 4ème section';
$string['frontpageblockdescriptionsection4'] = 'Description du corps pour la 4ème section';
$string['frontpageblockiconsection4'] = 'Icône Font-Awesome pour la 4ème section';
$string['sectionbuttontext4'] = 'Texte du bouton pour la 4ème section';
$string['sectionbuttonlink4'] = 'Lien URL pour la 4ème section';
$string['defaultdescriptionsection'] = 'Exploitez de manière holistique les technologies just in time via des scénarios d entreprise.';
$string['frontpagetestimonial'] = 'Témoignage de la page d accueil';
$string['frontpagetestimonialdesc'] = 'Section de témoignage de la page d accueil';
$string['enablefrontpageaboutus'] = 'Activer la section de témoignage';
$string['enablefrontpageaboutusdesc'] = 'Activer la section de témoignage sur la page d accueil.';
$string['frontpageaboutusheading'] = 'Titre du témoignage';
$string['frontpageaboutusheadingdesc'] = "Titre par défaut pour le texte d'en-tête de la section";
$string['frontpageaboutustext'] = 'Texte du témoignage';
$string['frontpageaboutustextdesc'] = 'Entrez le texte du témoignage pour la page d accueil.';
$string['frontpageaboutusdefault'] = '<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam.</p>';
$string['testimonialcount'] = 'Nombre de témoignages';
$string['testimonialcountdesc'] = 'Nombre de témoignages à afficher.';
$string['testimonialimage'] = 'Image du témoignage';
$string['testimonialimagedesc'] = 'Image de la personne à afficher avec le témoignage';
$string['testimonialname'] = 'Nom de la personne';
$string['testimonialnamedesc'] = 'Nom de la personne';
$string['testimonialdesignation'] = 'Poste de la personne';
$string['testimonialdesignationdesc'] = 'Poste de la personne.';
$string['testimonialtext'] = 'Témoignage de la personne';
$string['testimonialtextdesc'] = 'Ce que la personne dit';
$string['frontpageblockimage'] = 'Télécharger une image';
$string['frontpageblockimagedesc'] = 'Vous pouvez télécharger une image comme contenu pour cela.';
$string['frontpageblockiconsectiondesc'] = 'Vous pouvez choisir n importe quelle icône de cette <a href="https://fontawesome.com/v4.7.0/cheatsheet/" target="_new">liste</a>. Entrez simplement le texte après "fa-". ';
$string['frontpageblockdescriptionsectiondesc'] = 'Une brève description du titre.';

// Course.
$string['graderreport'] = "Rapport d'évaluation";
$string['enroluser'] = 'Inscrire des utilisateurs';
$string['activityeport'] = 'Rapport d activité';
$string['editcourse'] = 'Modifier le cours';
$string['imageforcourse'] = 'Image du cours';
// Next Previous Activity.
$string['activityprev'] = 'Activité précédente';
$string['activitynext'] = 'Activité suivante';
$string['activitynextpreviousbutton'] = 'Activer le bouton Activité suivante et précédente';
$string['activitynextpreviousbuttondesc'] = "Lorsqu'il est activé, le bouton Activité suivante et précédente apparaîtra sur la page de l'activité unique pour passer d'une activité à l'autre";
$string['disablenextprevious'] = 'Désactiver';
$string['enablenextprevious'] = 'Activer';
$string['enablenextpreviouswithname'] = 'Activer avec le nom de l activité';

// Importer.
$string['importer'] = 'Importateur';
$string['importer-missing'] = 'Le plugin Edwiser Site Importer est manquant. Veuillez visiter le site <a href="https://edwiser.org">Edwiser</a> pour télécharger ce plugin.';

// Information center.
$string['informationcenter'] = "Centre d'information";
$string['licensenotactive'] = "<strong>Alerte!</strong> La licence n'est pas activée, veuillez <strong>activer</strong> la licence dans les paramètres de RemUI.";
$string['licensenotactiveadmin'] = '<strong>Alert!</strong> License is not activated, please <strong>activate</strong> the license <a class="text-primary" href="'.$CFG->wwwroot.'/admin/settings.php?section=themesettingremui#informationcenter" >here</a>.';
$string['activatelicense'] = 'Activer la licence';
$string['deactivatelicense'] = 'Désactiver la licence';
$string['renewlicense'] = 'Renouveler la licence';
$string['deactivated'] = 'Désactivée';
$string['active'] = 'Activée';
$string['notactive'] = 'Non active';
$string['expired'] = 'Expirée';
$string['licensekey'] = 'Clé de licence';
$string['licensestatus'] = 'Statut de la licence';
$string['no_activations_left'] = 'Limite dépassée';
$string['activationfailed'] = "L'activation de la clé de licence a échoué. Veuillez réessayer ultérieurement.";
$string['noresponsereceived'] = 'Aucune réponse reçue du serveur. Veuillez réessayer ultérieurement.';
$string['licensekeydeactivated'] = 'La clé de licence est désactivée.';
$string['siteinactive'] = 'Site inactif (Appuyez sur Activer la licence pour activer le plugin).';
$string['entervalidlicensekey'] = 'Veuillez entrer une clé de licence valide.';
$string['nolicenselimitleft'] = 'Limite d activation maximale atteinte, aucune activation restante.';
$string['licensekeyisdisabled'] = 'Votre clé de licence est désactivée.';
$string['licensekeyhasexpired'] = "Votre clé de licence a expiré. Veuillez la renouveler.";
$string['licensekeyactivated'] = "Votre clé de licence est activée.";
$string['entervalidlicensekey'] = "Veuillez entrer la clé de licence correcte.";
$string['edwiserremuilicenseactivation'] = 'Activation de la licence Edwiser RemUI';
$string['enterlicensekey'] = "Entrer la clé de licence...";
$string['invalid'] = "Invalide";
$string['licensemismatch'] = "Incompatibilité de licence";
$string['licensemismatchdesc'] = 'Oups ! Il semble que vous ayez utilisé une clé de licence différente pour activer le thème Edwiser RemUI. Veuillez utiliser la bonne clé de licence depuis votre <a class="text-decoration-underline" href="https://edwiser.org/my-account/">page Mon compte</a> pour activer le thème Edwiser RemUI.';

$string['courseheaderdesign'] = 'Design de l en-tête de la page de cours';
$string['courseheaderdesigndesc'] = 'Choisissez le design de l en-tête de la page de cours';
$string['default'] = 'Par défaut';
$string['headerdesign'] = 'Design de l en-tête {$a}';
$string['sidebarcoursemenuheading'] = "Menu du cours";

// Notification.
$string['inproductnotification'] = "Mettre à jour les préférences utilisateur (Notification dans le produit) - RemUI";

$string["noti_enrolandcompletion"] = 'Les mises en page modernes et professionnelles d Edwiser RemUI ont contribué brillamment à augmenter l engagement global de vos apprenants avec <b>{$a->enrolment} nouvelles inscriptions à des cours et {$a->completion} achèvements de cours</b> ce mois-ci';

$string["noti_completion"] = 'Edwiser RemUI a amélioré vos niveaux d engagement des étudiants : Vous avez un total de <b>{$a->completion} achèvements de cours</b> ce mois-ci';

$string["noti_enrol"] = 'Le design de votre LMS est magnifique avec Edwiser RemUI : Vous avez <b>{$a->enrolment} nouvelles inscriptions à des cours</b> sur votre portail ce mois-ci';

$string["coolthankx"] = "Génial, Merci!";

$string['gridview'] = 'Vue en grille';
$string['listview'] = 'Vue en liste';
$string['summaryview'] = 'Vue de synthèse';

$string['side-top'] = "Contenu de la boîte en haut";
$string['content'] = "Par défaut Moodle";
$string['side-bottom'] = "Contenu de la boîte en bas";
$string['side-pre'] = "Barre latérale droite";

$string['sitenamecolor'] = "Couleur du nom ou de l'icône du site.";
$string['sitenamecolordesc'] = "Couleur pour le nom du site et le texte de l'icône du site, qui sera également appliquée sur la page de connexion.";

$string['coursesenrolled'] = "Cours inscrits";
$string['coursescompleted'] = "Cours terminés";
$string['activitiescompleted'] = "Activités terminées";
$string['activitiesdue'] = "Activités à faire";

// Customizer Strings
$string['customizer-migrate-notice'] = 'Les paramètres de couleur sont migrés vers le personnalisateur visuel. Veuillez cliquer sur le bouton ci-dessous pour ouvrir le personnalisateur visuel.';
$string['customizer-close-heading'] = 'Fermer le personnalisateur visuel';
$string['customizer-close-description'] = 'Les modifications non sauvegardées seront supprimées. Voulez-vous continuer?';
$string['reset'] = 'Réinitialiser';
$string['resetall'] = 'Tout Réinitialiser';
$string['reset-settings'] = 'Réinitialiser tous les paramètres du personnalisateur visuel';
$string['reset-settings-description'] = '
<div>Les paramètres du personnalisateur visuel seront restaurés par défaut. Voulez-vous continuer ?</div>
<div class="mt-3"><strong>Réinitialiser tout :</strong> Réinitialiser tous les paramètres.</div>
<div class="mt-3"><strong>Réinitialiser :</strong> Les paramètres sauf les paramètres suivants seront réinitialisés par défaut.</div>
';

$string['link'] = 'Lien';
$string['customizer'] = 'Personnalisateur visuel';
$string['error'] = 'Erreur';
$string['resetdesc'] = 'Réinitialiser les paramètres à la dernière sauvegarde ou aux valeurs par défaut si aucune sauvegarde n a été effectuée';
$string['noaccessright'] = 'Désolé! Vous n avez pas les droits pour utiliser cette page';

$string['font-family'] = 'Police de caractères';
$string['font-family_help'] = 'Définir la police de caractères de {$a}';

$string['button-font-family'] = 'Police de caractères';
$string['button-font-family_help'] = 'Définir la police de caractères du texte de bouton';

$string['font-size'] = 'Taille de police';
$string['font-size_help'] = 'Définir la taille de police de {$a}';
$string['font-weight'] = 'Graisse de police';
$string['font-weight_help'] = 'Définir la graisse de police de {$a}. La propriété font-weight permet de régler l épaisseur ou la finesse des caractères dans un texte.';
$string['line-height'] = 'Hauteur de ligne';
$string['line-height_help'] = 'Définir la hauteur de ligne de {$a}';
$string['global'] = 'Global';
$string['global_help'] = 'Vous pouvez gérer les paramètres globaux tels que la couleur, la police, les titres, les boutons, etc.';
$string['site'] = 'Site';
$string['text-color'] = 'Couleur du texte';
$string['welcome-text-color'] = 'Couleur du texte de bienvenue';
$string['text-hover-color'] = 'Couleur du texte au survol';
$string['text-color_help'] = 'Définir la couleur du texte de {$a}';
$string['content-color'] = 'Couleur du contenu';
$string['icon-color'] = 'Couleur de l icône';
$string['icon-hover-color'] = 'Couleur de l icône au survol';
$string['icon-color_help'] = 'Définir la couleur de l icône de {$a}';
$string['link-color'] = 'Couleur du lien';
$string['link-color_help'] = 'Définir la couleur du lien de {$a}';
$string['link-hover-color'] = 'Couleur du lien au survol';
$string['link-hover-color_help'] = 'Définir la couleur du lien au survol de {$a}';
$string['typography'] = 'Typographie';
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
$string['text-transform'] = 'Transformation de texte';
$string['text-transform_help'] = 'La propriété text-transform contrôle la capitalisation du texte. Définissez la transformation de texte de {$a}.';

$string['button-text-transform'] = 'Transformation de texte';
$string['button-text-transform_help'] = 'La propriété text-transform contrôle la capitalisation du texte. Définissez la transformation de texte pour le texte du bouton.';

$string["default"] = 'Défaut';
$string["none"] = 'Aucun';
$string["capitalize"] = 'Majuscule initiale';
$string["uppercase"] = 'Majuscule';
$string["lowercase"] = 'Minuscule';
$string['background-color'] = 'Couleur de fond';
$string['background-hover-color'] = 'Couleur de survol de fond';
$string['background-color_help'] = 'Définir la couleur de fond de {$a}';
$string['background-hover-color'] = 'Couleur de survol de fond';
$string['background-hover-color_help'] = 'Définir la couleur de survol de fond de {$a}';
$string['color'] = 'Couleur';
$string['customizing'] = 'Personnalisation';
$string['savesuccess'] = 'Enregistré avec succès.';
$string['mobile'] = 'Mobile';
$string['tablet'] = 'Tablette';
$string['hide-customizer'] = 'Cacher la personnalisation';
$string['customcss_help'] = 'Vous pouvez ajouter du CSS personnalisé. Cela sera appliqué sur toutes les pages de votre site.';

// Customizer Global body.
$string['body'] = 'Corps';
$string['body-font-family_desc'] = 'Définir la police pour l ensemble du site. Remarque : si elle est définie sur Standard, la police de la configuration de RemUI sera appliquée.';
$string['body-font-size_desc'] = 'Définir la taille de police de base pour l ensemble du site.';
$string['body-fontweight_desc'] = 'Définir le poids de police pour l ensemble du site.';
$string['body-text-transform_desc'] = 'Définir la transformation de texte pour l ensemble du site.';
$string['body-lineheight_desc'] = 'Définir la hauteur de ligne pour l ensemble du site.';
$string['faviconurl_help'] = 'URL de favicon';

// Customizer Global heading.
$string['heading'] = 'En-tête';
$string['use-custom-color'] = 'Utiliser une couleur personnalisée';
$string['use-custom-color_help'] = 'Utiliser une couleur personnalisée pour {$a}';
$string['typography-heading-all-heading'] = 'Titres (H1 - H6)';
$string['typography-heading-h1-heading'] = 'Titre 1';
$string['typography-heading-h2-heading'] = 'Titre 2';
$string['typography-heading-h3-heading'] = 'Titre 3';
$string['typography-heading-h4-heading'] = 'Titre 4';
$string['typography-heading-h5-heading'] = 'Titre 5';
$string['typography-heading-h6-heading'] = 'Titre 6';

// Customizer Colors.
$string['primary-color'] = 'Couleur primaire';
$string['primary-color_help'] = 'Appliquer la couleur primaire de la marque à l ensemble du site. Cette couleur sera appliquée aux boutons, liens texte, survol et pour les éléments de menu d en-tête actifs, survol et pour les icônes actives
<br><b>Remarque:</b> Le changement de la couleur primaire n affectera pas les couleurs des boutons si vous avez changé les couleurs des boutons via leurs paramètres individuels (<b>Global > Boutons > Paramètres de couleur des boutons</b>). Réinitialisez les couleurs des boutons à partir de leurs paramètres individuels pour changer la couleur des boutons en changeant globalement la couleur primaire à partir d ici.';

$string['secondary-color'] = 'Couleur d ascension';
$string['secondary-color_help'] = 'Appliquer la couleur d ascension à l ensemble du site. Cette couleur sera appliquée aux icônes sur le bloc de statistiques sur la page du tableau de bord, aux étiquettes sur les cartes de cours, aux bannières d en-tête de cours.';

$string['page-background'] = 'Fond de page';
$string['page-background_help'] = 'Définir un fond de page personnalisé pour la zone de contenu de la page. Vous pouvez choisir la couleur, le dégradé ou l image. L angle de couleur de dégradé est de 100°.';

$string['page-background-color'] = 'Couleur de fond de page';
$string['page-background-color_help'] = 'Définir la couleur de fond de la zone de contenu de la page.';

$string['page-background-image'] = 'Image de fond de page';
$string['page-background-image_help'] = 'Définir une image comme fond pour la zone de contenu de la page.';

$string['gradient'] = 'Dégradé';
$string['gradient-color1'] = 'Couleur de dégradé 1';
$string['gradient-color1_help'] = 'Définir la première couleur du dégradé';
$string['gradient-color2'] = 'Couleur de dégradé 2';
$string['gradient-color2_help'] = 'Définir la deuxième couleur du dégradé';
$string['gradient-color-angle'] = 'Angle du dégradé';
$string['gradient-color-angle_help'] = 'Définir l angle des couleurs de dégradé';

$string['page-background-imageattachment'] = 'Attachement d image de fond';
$string['page-background-imageattachment_help'] = 'La propriété background-attachment définit si une image de fond se déplace avec le reste de la page ou reste fixe.';
$string['image'] = 'Image';
$string['additional-css'] = 'CSS supplémentaire';
$string['left-sidebar'] = 'Barre latérale gauche';
$string['main-sidebar'] = 'Barre latérale principale';
$string['sidebar-links'] = 'Liens de la barre latérale';
$string['secondary-sidebar'] = 'Barre latérale secondaire';
$string['header'] = 'En-tête';
$string['headertypography'] = 'Typographie de l en-tête';
$string['headercolors'] = 'Couleurs de l en-tête';
$string['menu'] = 'Menu';
$string['site-identity'] = 'Identité du site';
$string['primary-header'] = 'En-tête principal';
$string['color'] = 'Couleur';

// Customizer Buttons.
$string['buttons'] = 'Boutons';
$string['border'] = 'Bordure';
$string['border-width'] = 'Largeur de bordure';
$string['border-width_help'] = 'Définir la largeur de bordure de {$a}';
$string['border-color'] = 'Couleur de bordure';
$string['border-color_help'] = 'Définir la couleur de bordure de {$a}';
$string['border-hover-color'] = 'Couleur de survol de bordure';
$string['border-hover-color_help'] = 'Définir la couleur de survol de bordure de {$a}';
$string['border-radius'] = 'Rayon de bordure';
$string['border-radius_help'] = 'Définir le rayon de bordure de {$a}';
$string['letter-spacing'] = 'Espacement des lettres';
$string['letter-spacing_help'] = 'Définir l espacement des lettres de {$a}';
$string['text'] = 'Texte';
$string['padding'] = 'Rembourrage';
$string['padding-top'] = 'Rembourrage supérieur';
$string['padding-top_help'] = 'Définir le rembourrage supérieur de {$a}';
$string['padding-right'] = 'Rembourrage droit';
$string['padding-right_help'] = 'Définir le rembourrage droit de {$a}';
$string['padding-bottom'] = 'Rembourrage inférieur';
$string['padding-bottom_help'] = 'Définir le rembourrage inférieur de {$a}';
$string['padding-left'] = 'Rembourrage gauche';
$string['padding-left_help'] = 'Définir le rembourrage gauche de {$a}';
$string['secondary'] = 'Secondaire';
$string['colors'] = 'Couleurs';
$string['commonbuttonsettings'] = 'Paramètres communs';
$string['buttonsizesettings'] = 'Tailles des boutons';
$string['buttonsizesettingshead'] = '{$a}';
$string['commonfontsettings'] = 'Police de caractère';
$string['buttoncolorsettings'] = 'Paramètres de couleur de bouton';
// Customizer Header.
$string['header-background-color_help'] = 'Définir la couleur de fond de l en-tête. Cette couleur ne sera pas appliquée si l option <strong>Définir la couleur de fond de l en-tête comme celle de l image du logo</strong> est activée.';
$string['site-logo'] = 'Logo du site';
$string['header-menu'] = 'Menu de l en-tête';
$string['box-shadow-size'] = 'Taille de l ombre de la boîte';
$string['box-shadow-size_help'] = 'Définir la taille de l ombre de la boîte pour l en-tête du site';
$string['box-shadow-blur'] = 'Flou de l ombre de la boîte';
$string['box-shadow-blur_help'] = 'Définir le flou de l ombre de la boîte pour l en-tête du site';
$string['box-shadow-color'] = 'Couleur de l ombre de la boîte';
$string['box-shadow-color_help'] = 'Définir la couleur de l ombre de la boîte pour l en-tête du site';
$string['layout-desktop'] = 'Mise en page pour ordinateur de bureau';
$string['layout-desktop_help'] = 'Définir la mise en page de l en-tête pour le bureau';
$string['layout-mobile'] = 'Mise en page mobile';
$string['layout-mobile_help'] = 'Définir la mise en page de l en-tête pour les appareils mobiles';
$string['header-left'] = 'Icône à gauche, menu à droite';
$string['header-right'] = 'Icône à droite, menu à gauche';
$string['header-top'] = 'Icône en haut, menu en bas';
$string['hover'] = 'Survoler';
$string['logo'] = 'Logo';
$string['applynavbarcolor'] = 'Définir la couleur de fond de l en-tête de la même couleur que celle du fond du logo';
$string['applynavbarcolor_help'] = 'La couleur de fond du logo sera appliquée à l ensemble de l en-tête. Le changement de couleur de fond du logo changera la couleur de fond de l en-tête. Vous pouvez toujours appliquer une couleur de texte personnalisée et une couleur de survol aux menus de l en-tête.';
$string['header-background-color-warning'] = 'Ne sera pas utilisé si <strong>Définir la couleur du site dans la barre de navigation</strong> est activé.';
$string['logosize'] = 'Le ratio d aspect attendu est de 130:33 pour la vue de gauche, 140:33 pour la vue de droite.';
$string['logominisize'] = 'Le ratio d aspect attendu est de 40:33.';
$string['sitenamewithlogo'] = 'Nom du site avec logo (vue supérieure uniquement)';

// Customizer Sidebar.
$string['link-text'] = 'Texte du lien';
$string['link-text_help'] = 'Définir la couleur du texte de lien de {$a}';
$string['link-icon'] = 'Icône de lien';
$string['link-icon_help'] = 'Définir la couleur de l icône de lien de {$a}';
$string['active-link-color'] = 'Couleur du lien actif';
$string['active-link-color_help'] = 'Définir une couleur personnalisée pour le lien actif de {$a}';
$string['active-link-background'] = 'Fond de lien actif';
$string['active-link-background_help'] = 'Définir une couleur personnalisée pour le fond de lien actif de {$a}';
$string['link-hover-background'] = 'Fond de survol de lien';
$string['link-hover-background_help'] = 'Définir le fond de survol de lien à {$a}';
$string['link-hover-text'] = 'Texte de survol de lien';
$string['link-hover-text_help'] = 'Définir la couleur du texte de survol de lien de {$a}';

// Customizer Footer.
$string['footer'] = 'Pied de page';
$string['basic'] = 'Design du pied de page';
$string['socialall'] = 'Liens de médias sociaux';
$string['advance'] = 'Zone principale du pied de page';
$string['footercolumn'] = 'Widget';
$string['footercolumnwidgetno'] = 'Sélectionner le nombre de widgets';
$string['footercolumndesc'] = 'Nombre de widgets à afficher dans le pied de page.';
$string['footercolumntype'] = 'Sélectionner le type';
$string['footercolumnsettings'] = 'Paramètres de colonne de pied de page';
$string['footercolumntypedesc'] = 'Vous pouvez choisir le type de widget de pied de page';
$string['footercolumnsocial'] = 'Liens de médias sociaux';
$string['footercolumnsocialdesc'] = 'Sélectionnez les liens à afficher. Appuyez sur la touche "ctrl" sur le clavier pour sélectionner plusieurs liens';
$string['footercolumntitle'] = 'Ajouter un titre';
$string['footercolumntitledesc'] = 'Ajouter un titre à ce widget.';
$string['footercolumncustomhtml'] = 'Contenu';
$string['footercolumncustomhtmldesc'] = 'Vous pouvez personnaliser le contenu de ce widget en utilisant l éditeur ci-dessous.';
$string['both'] = 'Les deux';
$string['footercolumnsize'] = 'Ajuster la largeur du widget';
$string['footercolumnsizenote'] = 'Faites glisser la ligne verticale pour ajuster la taille du widget.';
$string['footercolumnsizedesc'] = 'Vous pouvez définir la taille individuelle du widget.';
$string['footercolumnmenu'] = 'Menu';
$string['footercolumnmenureset'] = 'Menus de colonne de pied de page';
$string['footercolumnmenudesc'] = 'Menu de liens';
$string['footermenu'] = 'Menu';
$string['footermenudesc'] = 'Ajouter un menu dans le widget de pied de page.';
$string['customizermenuadd'] = 'Ajouter un élément de menu';
$string['customizermenuedit'] = 'Modifier l élément de menu';
$string['customizermenumoveup'] = 'Déplacer l élément de menu vers le haut';
$string['customizermenuemovedown'] = 'Déplacer l élément de menu vers le bas';
$string['customizermenuedelete'] = 'Supprimer l élément de menu';
$string['menutext'] = 'Texte';
$string['menuaddress'] = 'Adresse';
$string['menuorientation'] = 'Orientation du menu';
$string['menuorientationdesc'] = 'Définir l orientation du menu. L orientation peut être verticale ou horizontale.';
$string['menuorientationvertical'] = 'Vertical';
$string['menuorientationhorizontal'] = 'Horizontal';
$string['footerfacebook'] = 'Facebook';
$string['footertwitter'] = 'X (anciennement Twitter)';
$string['footerlinkedin'] = 'Linkedin';
$string['footergplus'] = 'Google Plus';
$string['footeryoutube'] = 'Youtube';
$string['footerinstagram'] = 'Instagram';
$string['footerpinterest'] = 'Pinterest';
$string['footerquora'] = 'Quora';
$string['footershowlogo'] = 'Afficher le logo';
$string['footershowlogodesc'] = 'Afficher le logo dans le pied de page secondaire.';
$string['footersecondarysocial'] = 'Afficher les liens de médias sociaux';
$string['footersecondarysocialdesc'] = 'Afficher les liens de médias sociaux dans le pied de page secondaire.';
$string['footertermsandconditionsshow'] = 'Afficher les conditions d utilisation';
$string['footertermsandconditions'] = 'Lien des conditions d utilisation';
$string['footertermsandconditionsdesc'] = 'Vous pouvez ajouter un lien vers la page des conditions d utilisation.';
$string['footerprivacypolicyshow'] = 'Afficher la politique de confidentialité';
$string['footerprivacypolicy'] = 'Lien de la politique de confidentialité';
$string['footerprivacypolicydesc'] = 'Vous pouvez ajouter un lien vers la page de la politique de confidentialité.';
$string['footercopyrightsshow'] = 'Afficher le contenu des droits d auteur';
$string['footercopyrights'] = 'Contenu des droits d auteur';
$string['footercopyrightsdesc'] = 'Ajouter le contenu des droits d auteur en bas de la page.';
$string['footercopyrightstags'] = 'Balises :<br>[site] - Nom du site<br>[year] - Année en cours';
$string['termsandconditions'] = 'Conditions d utilisation';
$string['privacypolicy'] = 'Politique de confidentialité';
$string['footerfont'] = 'Police de caractères';
$string['footerbasiccolumntitle'] = 'Titre de la colonne';
$string['divider-color'] = 'Couleur de la séparation';
$string['divider-color_help'] = 'Définir la couleur de la séparation de {$a}';
$string['text-hover-color'] = 'Couleur du texte en survol';
$string['text-hover-color_help'] = 'Définir la couleur du texte en survol de {$a}';
$string['link-color'] = 'Couleur du lien';
$string['link-color_help'] = 'Définir la couleur du lien de {$a}';
$string['link-hover-color'] = 'Couleur du lien en survol';
$string['link-hover-color_help'] = 'Définir la couleur du survol du lien de {$a}';
$string['icon-default-color'] = 'Couleur d’icône par défaut';
$string['icon-default-color_help'] = 'Couleur d’icône par défaut de {$a}';
$string['icon-hover-color'] = 'Couleur de survol de l’icône';
$string['icon-hover-color_help'] = 'Définir la couleur de survol de l’icône de {$a}';
$string['footerfontsize_help'] = 'Définir la taille de la police';
$string['footer-color-heading1'] = 'Couleurs de pied de page';
$string['footer-color-heading2'] = 'Liens de pied de page';
$string['footer-color-heading3'] = 'Icônes de pied de page';

$string['footerfontfamily'] = 'Police de caractères';
$string['footerfontfamily_help'] = 'Police de caractères';
$string['footerfontsize'] = 'Taille de police';
$string['footerfontsize_help'] = 'Taille de police de caractères de pied de page';
$string['footerfontweight'] = 'Poids de police';
$string['footerfontweight_help'] = 'Poids de police de caractères de pied de page';
$string['footerfonttext-transform'] = 'Casse du texte';
$string['footerfonttext-transform_help'] = 'Casse du texte';
$string['footerfontlineheight'] = 'Espacement entre les lignes';
$string['footerfontlineheight_help'] = 'Espacement entre les lignes';
$string['footerfontltrspace'] = 'Espacement entre les lettres';
$string['footerfontltrspace_help'] = 'Définir l’espacement entre les lettres de {$a}';

$string['footer-columntitle-fontfamily'] = 'Police de caractères';
$string['footer-columntitle-fontfamily_help'] = 'Police de caractères';
$string['footer-columntitle-fontsize'] = 'Taille de police';
$string['footer-columntitle-fontsize_help'] = 'Taille de police de caractères de titre de colonne de pied de page';
$string['footer-columntitle-fontweight'] = 'Poids de police';
$string['footer-columntitle-fontweight_help'] = 'Poids de la police du titre de la colonne du pied de page';
$string['footer-columntitle-textransform'] = 'Mise en forme du texte';
$string['footer-columntitle-textransform_help'] = 'Mise en forme du texte';
$string['footer-columntitle-lineheight'] = 'Interligne';
$string['footer-columntitle-lineheight_help'] = 'Interligne';
$string['footer-columntitle-ltrspace'] = 'Espacement des lettres';
$string['footer-columntitle-ltrspace_help'] = 'Espacement des lettres';
$string['footer-columntitle-color'] = 'Couleur';
$string['footer-columntitle-color_help'] = 'Couleur';

$string['openinnewtab'] = 'Ouvrir dans un nouvel onglet';
$string['useheaderlogo'] = 'Utiliser le même logo que celui de l en-tête';
$string['secondaryfooterlogo'] = 'Ajouter un nouveau logo';
$string['logosettings'] = 'Réglages du logo';
$string['loginformsettings'] = 'Réglages du formulaire de connexion';
$string['loginpagesettings'] = 'Réglages de la page de connexion';
$string['footersecondary'] = 'Zone inférieure du pied de page';
$string['footer-columns'] = 'Colonnes du pied de page';
$string['footer-columntitle-color_help'] = 'Définir la couleur du texte de {$a}';
$string['footer-logo-color'] = 'Sélectionner la couleur de l icône ou du texte';
$string['footer-logo-color_help'] = 'Sélectionner la couleur de l icône ou du texte';
// Customizer login.
$string['login'] = 'Connexion';
$string['panel'] = 'Panneau';
$string['page'] = 'Page';
$string['loginbackgroundopacity'] = 'Opacité du fond d écran de la page de connexion';
$string['loginbackgroundopacity_help'] = 'Appliquer une superposition sur l image de fond de la page de connexion.';
$string['loginpanelbackgroundcolor_help'] = 'Appliquer une couleur de fond au panneau de connexion.';
$string['loginpaneltextcolor_help'] = 'Appliquer une couleur de texte au panneau de connexion.';
$string['loginpanelcontentcolor_help'] = 'Appliquer une couleur de texte au contenu du panneau de connexion.';
$string['loginpanellinkcolor_help'] = 'Appliquer une couleur de lien au panneau de connexion.';
$string['loginpanellinkhovercolor_help'] = 'Appliquer une couleur de survol de lien au panneau de connexion.';
$string['login-panel-position'] = 'Position du panneau de connexion';
$string['login-panel-position_help'] = 'Définir la position du panneau de connexion et d inscription.';
$string['login-page-info'] = '<p><b>Remarque :</b> La page de connexion ne peut pas être prévisualisée dans le personnalisateur visuel car seuls les utilisateurs déconnectés peuvent la voir. Vous pouvez tester le paramètre en enregistrant et en ouvrant la page de connexion en mode incognito.</p>';
$string['login-page-setting'] = 'Style de fond de la page';
$string['login-page-backgroundgradient1'] = 'Sélectionner la couleur 1';
$string['login-page-backgroundgradient2'] = 'Sélectionner la couleur 2';
$string['loginpanelbackgroundcolor'] = 'Couleur de fond de la page';
$string['loginpagebackgroundcolor'] = 'Sélectionner la couleur de fond';
$string['loginpagebackgroundcolor_help'] = 'Définir le fond de la page de connexion. Vous pouvez choisir une couleur, un dégradé ou une image.';
$string['login-page-background_help'] = 'Appliquer une couleur de fond au panneau de connexion';

/*Customizer Strings*/
$string['primary'] = 'Primaire';
$string['dashboardsettingdesc'] = 'Paramètres relatifs au tableau de bord';
$string['dashboardsetting'] = 'Tableau de bord';
$string['dashboardpage'] = 'Page de tableau de bord';
$string['enabledashboardcoursestats'] = 'Activer les statistiques de cours du tableau de bord';
$string['enabledashboardcoursestatsdesc'] = "Si activé, affichera les statistiques de cours sur la page du tableau de bord.";

$string['customizecontrolsclose'] = 'Fermer';

// Personnalisation rapide du personnalisateur.
$string['quicksetup'] = 'Configuration rapide';
$string['pallet'] = 'Palette';
$string['colorpallet'] = 'Palettes de couleurs';
$string['currentpallet'] = 'Palette actuelle';
$string['currentfont'] = 'Police actuelle';
$string['colorpalletdesc'] = 'Description des palettes de couleurs';
$string['preset1'] = 'Préréglage 1';
$string['preset2'] = 'Préréglage 2';
$string['sitefavicon'] = 'Favicon du site';

$string['themecolors'] = 'Couleurs de thème';
$string['brandcolors-heading'] = 'Couleurs de marque';
$string['border-color'] = 'Couleur de bordure';
$string['border-hover-color'] = 'Couleur de survol de bordure';
$string['smart-colors-heading'] = "Appliquer des couleurs globales";
$string['smart-colors-info'] = "<p>Les couleurs globales et leurs nuances/teintes seront appliquées au site pour créer une combinaison de couleurs visuellement éblouissante</p><p><b>Note:</b> Vous avez la flexibilité de personnaliser les couleurs des éléments individuels à tout moment en visitant simplement leurs paramètres spécifiques.</p>";
$string['apply'] = "Appliquer";
$string['backgroundsettings'] = 'Paramètres de fond';

$string['ascent-background-color'] = 'Couleur de fond de montée';
$string['ascent-background-color_help'] = 'Définissez la couleur de fond de montée. Cette couleur sera appliquée à l arrière-plan des balises sur le site, à l exception des balises sur les cartes de cours et de l en-tête de bannière de cours.';
$string['element-background-color'] = 'Couleur de fond de l élément';
$string['element-background-color_help'] = 'Définissez la couleur de fond de l élément. Cette couleur est appliquée à l arrière-plan pour les petits textes, l arrière-plan lors du survol des textes déroulants, l arrière-plan des en-têtes de section, des info-bulles, etc.';

$string['light-border-color'] = 'Couleur de bordure claire';
$string['themecolors-lightbordercolor_help'] = 'Définissez la couleur de bordure claire. Cette couleur est appliquée en tant que bordure pour les éléments avec des arrière-plans blancs comme la liste déroulante de notification sur l en-tête, les cartes de cours, la liste déroulante de recherche de cours et sur les lignes de division sur les éléments de bloc, etc.';

$string['medium-border-color'] = 'Couleur de bordure moyenne';
$string['themecolors-mediumbordercolor_help'] = 'Définissez la couleur de la bordure moyenne. Cette couleur est appliquée en tant que couleur de bordure et de séparateur. Elle est spécifiquement appliquée en tant que couleur de bordure pour les menus déroulants et la boîte de recherche, ainsi que pour les arrière-plans d éléments pour lesquels la couleur d arrière-plan de l élément est appliquée (Vous pouvez trouver le paramètre de couleur d arrière-plan de l élément sous <b>Thème de couleurs > Paramètres d arrière-plan</b>), par exemple pour l arrière-plan du petit texte, l arrière-plan des en-têtes de section, les infobulles, etc.';

$string['borderssettings'] = 'Paramètres de bordure';

// Quick Menu settings.
$string['enablequickmenu'] = 'Activer le menu rapide';
$string['enablequickmenudesc'] = 'Menu flottant de liens rapides pour un accès plus facile aux pages.';

// Left Navigation Drawer.
$string['coursearchivepage'] = 'Page d archive de cours';
$string['createanewcourse'] = 'Créer un nouveau cours';
$string['remuisettings'] = 'Paramètres RemUI';

$string['bodysettingslinking'] = 'Paramètres avancés de lien';
$string['bodysettingslinking_help'] = 'Lorsque activé, les paramètres de Petit paragraphe et de Petit texte d information seront liés aux paramètres du corps.';
$string['bodysettingslinked'] = 'Lié aux paramètres du corps';
$string['normal-para-font'] = "Paragraphe normal";
$string['smallpara-font'] = "Petit paragraphe";
$string['smallinfo-font'] = "Petit texte d'information";

$string['interactiveicons'] = 'Icônes interactives';
$string['noninteractiveicons'] = 'Icônes non interactives';
$string['singlecolorsicon'] = "Icône de couleur unique";
$string['scicon-color'] = 'Couleur';
$string['scicon-color_help'] = 'Couleur d état de repos de l icône de couleur unique';
$string['scicon-hover'] = 'Survol';
$string['scicon-hover_help'] = 'Couleur d état survolé de l icône de couleur unique';
$string['scicon-active'] = 'Actif';
$string['scicon-active_help'] = 'Couleur d état actif de l icône de couleur unique';

$string['dualcolorsicon'] = "Icône bicolore";
$string['dcicon-color'] = 'Couleur';
$string['dcicon-color_help'] = 'Couleur d état de repos de l icône bicolore';
$string['dcicon-hover'] = 'Survol';
$string['dcicon-hover_help'] = 'Couleur d état survolé de l icône bicolore';
$string['dcicon-active'] = 'Actif';
$string['dcicon-active_help'] = 'Couleur d état actif de l icône bicolore';

$string['non-interactive-color'] = 'Couleur';
$string['non-interactive-color_help'] = 'Couleur de l icône non interactive';
$string['textlink'] = 'Lien de texte';


$string['header-logo-setting'] = 'Paramètres du logo de l en-tête';
$string['logo-bg-color'] = 'Couleur de fond du logo';
$string['logo-bg-color_help'] = 'Définir la couleur de fond du logo de l en-tête.';
$string['header-design-settings'] = 'Paramètres de conception de l en-tête';
$string['hide-show-menu-item'] = 'Masquer/Afficher l élément de menu';
$string['hide-dashboard'] = 'Masquer le tableau de bord';
$string['hide-dashboard_help'] = 'En activant cette option, l élément "Tableau de bord" de l en-tête sera masqué.';
$string['hide-home'] = 'Masquer la page d accueil';
$string['hide-home_help'] = 'En activant cette option, l élément "Accueil" de l en-tête sera masqué.';
$string['hide-my-courses'] = 'Masquer "Mes cours"';
$string['hide-my-courses_help'] = 'En activant cette option, les éléments "Mes cours" et les éléments imbriqués de cours de l en-tête seront masqués.';
$string['hide-site-admin'] = 'Masquer "Administration du site"';
$string['hide-site-admin_help'] = 'En activant cette option, l élément "Administration du site" de l en-tête sera masqué.';
$string['hide-recent-courses'] = 'Masquer les cours récents';
$string['hide-recent-courses_help'] = 'En activant cette option, le menu déroulant "Cours récents" de l en-tête sera masqué.';
$string['header-menu-element-bg-color'] = 'Couleur de fond de l élément de menu';
$string['header-menu-element-bg-color_help'] = 'Couleur de fond de l élément de menu.';
$string['header-menu-divider-bg-color'] = 'Couleur de séparation des éléments de menu';
$string['header-menu-divider-bg-color_help'] = 'Couleur de séparation des éléments de menu.';
$string['hds-iconcolor'] = 'Couleur de l icône de l en-tête';
$string['hds-boxshadow'] = 'Ombre de la boîte de l en-tête';

$string['hds-menuitems'] = 'Éléments du menu de l en-tête';
$string['hds-menu-fontsize_desc'] = 'Définir la taille de police pour les éléments du menu de l en-tête';
$string['hds-menu-color'] = 'Couleur des éléments du menu';
$string['hds-menu-color_desc'] = 'Définir la couleur des éléments du menu de l en-tête';
$string['hds-menu-hover-color'] = 'Couleur survol des éléments du menu';
$string['hds-menu-hover-color_desc'] = 'Définir la couleur survol des éléments du menu de l en-tête';
$string['hds-menu-active-color'] = 'Couleur active des éléments du menu';
$string['hds-menu-active-color_desc'] = 'Définir la couleur active des éléments du menu de l en-tête';

$string['hds-icon-color'] = 'Couleur des icônes';
$string['hds-icon-color_help'] = 'Couleur des icônes du menu de l en-tête';
$string['hds-icon-hover-color'] = 'Couleur survol des icônes';
$string['hds-icon-hover-color_help'] = 'Couleur survol des icônes du menu de l en-tête';
$string['hds-icon-active-color'] = 'Couleur active des icônes';
$string['hds-icon-active-color_help'] = 'Couleur active des icônes du menu de l en-tête';

$string['preset1'] = "Préréglage 1";
$string['preset2'] = "Préréglage 2";
$string['preset3'] = "Préréglage 3";
$string['fonts'] = "Polices";
$string['show'] = "Afficher";
$string['hide'] = "Masquer";

$string['other-bg-color'] = 'Autres couleurs de fond';
$string['text-link-panel'] = 'Lien de texte';
$string['colorpalletes'] = 'Palettes de couleurs';
$string['selectpallete'] = 'Sélectionner une palette';
$string['selectfont'] = 'Sélectionner la police';
$string['socialiconspanel'] = "Panneau d'icônes sociales";
$string['social-icons-info'] = "<p>Pour afficher les icônes des réseaux sociaux en bas de n'importe quelle colonne avec du contenu, accédez à <b>Pied de page > Zone principale du pied de page > Widget > Sélectionner le type = Contenu</b> et activez l'option d'affichage des icônes des réseaux sociaux.</p>";
$string['social-icons-heading'] = "Icônes des réseaux sociaux";
$string["custommenulinktext"] = 'Liens de menu personnalisés';
$string["custommenulink"] = '<h6>Liens de menu personnalisés</h6><p>Pour ajouter / modifier / supprimer des liens de menu personnalisés, accédez à Administration du site > Apparence > Paramètres de thème > <a href="{$a}/admin/settings.php?section=themesettingsadvanced#admin-custommenuitems" target ="_blank" class="text-decoration-none">Liens de menu personnalisés</a></p>';
$string['note'] = 'Note';
$string['social-media-selection-note'] = "<p>Appuyez sur Ctrl pour sélectionner/désélectionner les médias</p>";
$string['editmodeswitch'] = "Bascule du mode d'édition";
$string['continue'] = 'Continuer';
$string['viewcourse'] = 'Voir le cours';
$string['hiddencourse'] = 'Cours masqué';
$string['openquickmenu'] = 'Ouvrir le menu rapide';
$string['closequickmenu'] = 'Fermer le menu rapide';
$string['start'] = 'Démarrer';
$string['readmore'] = 'Lire la suite';
$string['readless'] = 'Réduire';
$string['setting'] = 'Paramètres';
$string['lastaccess'] = 'Dernier accès';
$string['certificate'] = 'Certificats';
$string['badge'] = 'Badges';
$string['firstname'] = 'Prénom';
$string['lastname'] = 'Nom de famille';
$string['badgefrom'] = 'Badges de {$a}';
$string['timelinenoevenettext'] = "Aucune activité à venir";
$string['description'] = 'Description';
$string['instructorcounttitle'] = "Enseignants supplémentaires disponibles dans le cours";
$string['personalizer'] = 'Personnalisateur visuel';
$string['edwpersonalizer'] = 'Personnalisateur visuel';
$string['editinpersonalizer'] = 'Modifier avec le personnaliseur';
$string['activepersonalizer'] = 'Affichage dans le Personnalisateur Edwiser.';
$string['searchtotalcount'] = 'Affichage de {$a} résultats';
$string['noresutssearchmsg'] = "<h4 class ='p-p-6 text-center m-0 '>Rien à afficher</h4>";
$string['globarsearchresult'] = "Résultats de la recherche globale";
$string['searchresultdesctext'] = 'Affichage des résultats pour';
$string['noresultfoundmg'] = "<h4 class ='p-p-6 text-center m-0'>Aucun résultat trouvé</h4>";

$string['enrol_relatedcourses'] = 'Cours associés';
$string['enrol_latestcourses'] = 'Derniers cours';
$string['enrol_coursecardesc'] = 'Découvrez le programme parfait pour vous dans nos cours.';
$string['enrol_viewall'] = 'Voir tout';

$string['showrelatedcourse'] = "Afficher les cours associés";
$string['showrelatedcoursedesc'] = "Activez ce paramètre pour afficher les cours associés sur la page d'inscription.";

$string['showlatestcourse'] = 'Afficher les derniers cours';
$string['showlatestcoursedesc'] = 'Activez ce paramètre pour afficher les derniers cours sur la page d inscription.';

$string['latestcoursecount'] = 'Nombre de blocs des derniers cours';
$string['latestcoursecountdesc'] = 'Définissez un nombre pour les derniers cours affichés sur la page d\'inscription';

$string['allcourescattext'] = 'Toutes les catégories';
$string['archivecoursecounttext'] = 'Cours';
$string['coursecardlessonstext'] = 'Leçons';
$string['prevsectionbuttontext'] = 'Section précédente';
$string['nextsectionbuttontext'] = 'Section suivante';

$string['eight'] = '8';
$string['twelve'] = '12';
$string['sixteen'] = '16';
$string['twenty'] = '20';

$string['resume'] = 'Reprendre';
$string['start'] = 'Commencer';
$string['completed'] = 'Terminé';

$string['siteannouncementheading'] = 'Annonce pour l\'ensemble du site';
$string['siteannouncementheadingdesc'] = 'Activer une annonce pour l\'ensemble du site pour tous les utilisateurs.';
$string['seosettingsheading'] = 'Paramètres de référencement (SEO)';
$string['seosettingsheadingdesc'] = 'Optimiser la visibilité de votre site web sur les moteurs de recherche.';
$string['sitecustomizationhead'] = 'Personnalisation du site';
$string['sitecustomizationheaddesc'] = 'Choisir les polices, la taille de la mise en page pour les pages et personnaliser avec le CSS.';
$string['advancefeatureshead'] = 'Paramètres des fonctionnalités avancées';
$string['advancefeaturesheaddesc'] = 'Améliorer votre expérience d\'apprentissage avec des paramètres avancés.';
$string['mainfooterareahead'] = 'Zone principale du pied de page';
$string['mainfooterareaheaddesc'] = 'Réglages de la zone principale du pied de page.';

// heading-advance weight settings
$string['heading-adv-setting'] = 'Paramètres du poids de la police';
$string['heading-regular-fontweight'] = 'Poids de la police régulier';
$string['heading-semibold-fontweight'] = 'Poids de la police semi-gras';
$string['heading-bold-fontweight'] = 'Poids de la police gras';
$string['heading-exbold-fontweight'] = 'Poids de la police extra-gras';

// Usage tracking.
$string["usagedatatracker"] = "Usage data tracker";
$string['enableusagetracking'] = "Activer le tracking d'utilisation";
$string['enableusagetrackingdesc'] = "<strong>AVIS DE SUIVI DE L'UTILISATION</strong>

<hr class='text-muted' />

<p>Edwiser collectera désormais des données anonymes pour générer des statistiques d'utilisation des produits.</p>

<p>Ces informations nous aideront à guider le développement dans la bonne direction et à faire prospérer la communauté Edwiser.</p>

<p>Cela dit, nous ne collectons pas vos données personnelles ni celles de vos étudiants au cours de ce processus. Vous pouvez désactiver cela à partir du plugin chaque fois que vous souhaitez vous désinscrire de ce service.</p>

<p>Un aperçu des données collectées est disponible <strong><a href='https://forums.edwiser.org/topic/67/anonymously-tracking-the-usage-of-edwiser-products' target='_blank'>ici</a></strong>.</p>";


$string['profileinterestinfo'] = 'Pour éditer les centres d\'intérêt, allez dans les paramètres de profil -> Modifier le profil ->';
$string['profileinterest'] = 'Centres d\'intérêt';
$string['citytowntext'] = 'Ville';
$string['selectcountrystring'] = 'Sélectionnez un pays...';


$string['heading-fontweight_desc'] = "Définir l'épaisseur de la police des titres pour l'ensemble du site.";
$string['small-para-fontweight_desc'] = "Définir l'épaisseur de la police des petits paragraphes pour l'ensemble du site.";
$string['small-info-fontweight_desc'] = "Définir l'épaisseur de la police des petites informations pour l'ensemble du site.";

$string['full-width-top'] = "Haut en pleine largeur";
$string['full-bottom'] = "Bas en pleine largeur";

$string['homepageedwpagebuilderoption'] = "Utilisez Edwiser Pagebuilder pour la page d'accueil";

$string['livecustomizer'] = "Personnalisateur en direct";

$string['loaderimagehead'] = "Image de chargement du site";
$string['loaderimagedesc'] = "Choisissez l'image de chargement pour votre site";

$string['region-full-bottom'] = "Région en bas en pleine largeur";
$string['region-full-width-top'] = "Région en haut en pleine largeur";

$string['homepagetransparentheadertitle'] = "Style d'en-tête transparent";
$string['homepagetransparentheaderdesc'] = "Rendez l'en-tête de votre page d'accueil transparent";

$string['frontpageheadercolortitle'] = "Choisir la couleur du texte de l'en-tête";
$string['frontpageheadercolordesc'] = "Choisissez la couleur du texte de l'en-tête";

$string['transparentheaderheader'] = "Style de l'en-tête de la page d'accueil";
$string['transparentheaderheaderdesc'] = "Activer/désactiver le style d'en-tête transparent";

$string['hidehomepageelement'] = "Masquer les éléments de la page d'accueil";
$string['hidehomepageelementdesc'] = "Masquer l'en-tête du contenu, la sous-navigation et la section d'activité";

$string['hideheadercontenttitle'] = "Masquer l'en-tête du contenu";
$string['hideheadercontentdesc'] = "Si activé, le nom du site et la navigation secondaire de Moodle seront supprimés de la page d'accueil.";

$string['hideactivitysectiontitle'] = "Masquer la section d'activité";
$string['hideactivitysectiondesc'] = "Si activé, la section d'activité sera masquée sur la page d'accueil.";

$string['floataddblockbtnregionselectionmsg'] = 'Les nouveaux blocs seront ajoutés à la région actuellement visible "{$a}"';

// Chaînes de design de la page de configuration dépréciée
$string['settingpage-dep-top-above-st'] = "Cliquez sur 'Accueil du site' dans la barre de navigation pour accéder au 'Constructeur de page d'accueil' et créer votre propre page d'accueil";
$string['settingpage-dep-top-st1'] = "Présentation d'une meilleure façon de créer et de personnaliser les pages d'accueil !";
$string['settingpage-dep-top-st2'] = "Nous sommes ravis de vous présenter le constructeur de pages Edwiser RemUI pour créer une page d'accueil avec une nouvelle bibliothèque de modèles comprenant plus de 30 modèles de blocs et 7 mises en page de page d'accueil.";
$string['settingpage-dep-top-st3'] = '1. Mettez à jour le constructeur de pages Edwiser RemUI à la version v4.2.0 et supérieure à partir de <a href="https://edwiser.org/my-account/" target="_blank">ici</a>';

$string['settingpagedepbottomst1'] = 'Sélectionnez le constructeur de pages dans le menu déroulant ci-dessus, et allez sur la page d\'accueil pour créer un nouveau design de page d\'accueil.';
$string['settingpagedepbottomst2'] = "En savoir plus";
$string['settingpagedepbottomst3'] = "OU";

$string['settingpagedepbottomsecondaryst1'] = 'Migrez automatiquement le contenu de votre constructeur de pages d\'accueil vers le constructeur de pages Edwiser.';
$string['settingpagedepbottomsecondaryst2'] = '<span class="para-semibold-1 m-0">Remarque :</span> La version du plugin Edwiser RemUI page builder v4.2.0 et la version du plugin Homepage builder v4.1.3 sont nécessaires.';
$string['settingpagedepbottomsecondaryst3'] = "Que se passera-t-il ?";
$string['settingpagedepbottomsecondaryst4'] = "Le code et le contenu de chaque section de la page d'accueil actuelle seront déplacés dans un bloc HTML personnalisé du constructeur de pages Edwiser RemUI. La conception et le contenu de la page resteront les mêmes, et vous pourrez facilement les modifier de manière <strong> sans code en utilisant le constructeur de pages Edwiser RemUI</strong>.";
$string['settingpagedepbottomsecondaryst5'] = '<span class="para-semibold-1 m-0">Remarque :</span> Il s\'agit de la dernière mise à jour concernant le constructeur de pages d\'accueil. Il a maintenant été fusionné dans le constructeur de pages Edwiser.';


$string['upgradeherelinktext'] = 'mettre à niveau ici';


$string['addnewpage'] = "Ajouter une nouvelle page";

$string['edwiserfeedback'] = "Retour Edwiser";
$string['edwiserhelp'] = "Aide Moodle";
$string['edwisersupport'] = "Support Edwiser";

// Course page new settings and improvement stirings
$string['courseinfocontrolhead'] = "Contrôle des informations sur le cours";
$string['courseinfocontroldesc'] = "Contrôlez la visibilité des informations liées au cours sur l'ensemble du site";

$string['coursedatevisibilityhead'] = "Afficher la 'Date' sur le cours";
$string['coursedatevisibilitydesc'] = "Afficher la 'Date' sur le cours";

$string['hidedate'] = "Ne pas afficher";
$string['showstartdate'] = "Afficher la date de début";
$string['showupdatedate'] = "Afficher la date de mise à jour";
$string['showstartwhenend'] = "Afficher la date de début lorsque la date de fin est définie";

$string['enrolleduserscountvisibilityhead'] = "Afficher les informations sur les \'Étudiants inscrits\'";
$string['enrolleduserscountvisibilitydesc'] = "Désactiver pour masquer les informations sur les \'Étudiants inscrits\'";

$string['lessonsvisiblityoncoursecardhead'] = "Afficher les informations sur les \'Leçons\'";
$string['lessonsvisiblityoncoursecarddesc'] = "Désactiver pour masquer les informations sur les \'Leçons'";

$string['coursecardsettingshead'] = "Carte du cours";
$string['coursecardsettingsdesc'] = "Paramètres liés à la carte du cours";

$string['headeroverlayopacityhead'] = "Modifier l'opacité du recouvrement";
$string['headeroverlayopacitydesc'] = "La valeur par défaut est déjà réglée sur '100'. Pour ajuster l'opacité, veuillez entrer une valeur entre 0 et 100";

$string['showless'] = 'Afficher moins';
$string['showmore'] = 'Afficher plus';

$string['coursestarted'] = "Commencé :";
$string['courseupdated'] = "Mis à jour :";

$string['coursecardlessonssingletext'] = 'Leçon';
$string['coursecardsenrolledetxt'] = 'Inscrit';

$string['showenrolledtexthead'] = 'Afficher le titre "Inscrit"';
$string['showenrolledtextdesc'] = '';


$string['showenrolledtextinputhead'] = '';
$string['showenrolledtextinputdesc'] = 'Renommer le titre \'Enrolled\'.<br><strong>Max. 8 caractères recommandés</strong>';
$string['showenrolledtextinputdefaulttext'] = 'Enrolled';

$string['showlessontexthead'] = 'Afficher le titre "Leçon"';
$string['showlessontextdesc'] = '';


$string['showlessontextinputhead'] = '';
$string['showlessontextinputdesc'] = 'Renommer le titre \'Lessons\'.<br><strong>Max. 8 caractères recommandés</strong>';
$string['showlessontextinputdefaulttext'] = 'Lessons';

$string['editcoursetitle'] = 'Modifier le titre du cours';
$string['changecategory'] = 'Changer la catégorie';
$string['editreviewapproval'] = 'Modifier l\'approbation de l\'évaluation';
$string['addchangevideo'] = 'Ajouter/Modifier la vidéo';
$string['novideomessage'] = 'Il n\'y a pas de vidéo.<br>Cliquez sur le lien ci-dessus pour ajouter une vidéo.';
$string['changecourseimage'] = 'Changer l\'image du cours';
$string['changebtntextandlink'] = 'Ajouter lien et prix';
$string['edit'] = 'Modifier';
$string['viewalltext'] = 'Voir tout';
$string['addremuicustomfield'] = 'Ajouter un champ personnalisé RemUI';
$string['editremuicustomfield'] = 'Modifier le champ personnalisé RemUI';
$string['howtoaddcustomfield'] = 'Comment \'Ajouter et Modifier\' les champs personnalisés RemUI ?';
$string['changebtntext'] = 'Changer le texte du bouton';
$string['addlink'] = 'Ajouter un lien';
$string['save'] = 'Enregistrer';
$string['cancel'] = 'Annuler';
$string['updateenrollmentmethods'] = 'Mettre à jour les méthodes d\'inscription <span class="text-lowercase">{$a}</span>';
$string['hideenrollmentoptions'] = 'Masquer les options d\'inscription <span class="text-lowercase">{$a}</span>';
$string['showenrollmentoptions'] = 'Afficher les options d\'inscription <span class="text-lowercase">{$a}</span>';
$string['editcoursetext'] = 'Modifier le texte du cours';
$string['editcoursecontent'] = 'Modifier le contenu du cours';
$string['manageinstructors'] = 'Gérer les instructeurs';
$string['message'] = 'Message';
$string['email'] = 'Courriel :';
$string['editcoursessectionsettings'] = 'Modifier les paramètres de la section des cours';
$string['sectionishiddenmessage'] = 'Cette section est masquée.<br>Pour la rendre visible, cliquez sur le lien ci-dessus "Afficher les options d\'inscription".';
$string['noreviewmessage'] = 'Actuellement, il n\'y a pas d\'évaluation.<br> Pour vérifier les évaluations "En attente d\'approbation", cliquez sur le lien ci-dessus "Modifier l\'approbation de l\'évaluation".';
$string['backtothecourse'] = 'Retour au cours';
$string['viewcourseenrollmentpage'] = 'Voir la page d\'inscription au cours <span class="text-lowercase">{$a}</span>';
$string['unenroll'] = 'Se désinscrire';
$string['toactivateenrollmenttext'] = 'pour activer le lien de la page d\'inscription';
$string['showhidefreelabel'] = 'Afficher/Masquer l\'étiquette "GRATUIT"';
$string['norelatedcoursemessage'] = 'La section "Cours associés" est masquée.<br>Pour la rendre visible, cliquez sur le lien ci-dessus "Modifier les paramètres de la section des cours".';
$string['nolatestcoursemessage'] = 'La section "Derniers cours" est masquée.<br>Pour la rendre visible, cliquez sur le lien ci-dessus "Modifier les paramètres de la section des cours".';
$string['showhidefreelabel'] = 'Afficher/Masquer l\'étiquette "GRATUIT"';
$string['editpricing'] = 'Modifier les tarifs';
$string['nocontentmessage'] = 'Il n\'y a aucun contenu dans cette section.<br>Pour ajouter du contenu, cliquez sur le lien ci-dessus "Modifier le texte du cours".';
$string['noinstructormessage'] = 'Aucun instructeur n\'est inscrit dans ce cours.<br>Pour ajouter un instructeur, cliquez sur le lien ci-dessus "Gérer les instructeurs". ';
$string['noinstructor'] = 'Aucun instructeur';

$string['darkmodetitilestring'] = 'Mode sombre';
$string['lightmodetitlestring'] = 'Mode clair';
$string['darkmodesettingshead'] = 'Paramètres du mode sombre';
$string['darkmodesettingsheaddesc'] = 'Contrôlez le mode clair et sombre de votre site web';
$string['enabledarkmode'] = 'Activer la fonctionnalité du mode sombre';
$string['enabledarkmodedesc'] = '';
$string['dmoption_disable'] = 'Désactiver';
$string['dmoption_allowonallpages'] = 'Autoriser sur toutes les pages';
$string['dmoption_excludepages'] = 'Autoriser sur toutes les pages à l\'exception de ces pages';
$string['dmoption_includepages'] = 'Autoriser uniquement sur ces pages';
$string['darkmodeincludepages'] = 'Inclure uniquement sur ces pages';
$string['darkmodeincludepagesdesc']  = '<div><strong>Pour gérer le mode sombre sur des pages spécifiques, ajoutez simplement l\'URL de la page.</strong>
<pre>Exemple :
    Pour inclure/exclure le mode sombre sur une page de cours spécifique (par exemple, le cours avec l\'id=2)
    <MoodleSite.com>/course/view.php?id=2
</pre>
<strong>Pour gérer le mode sombre sur un groupe de pages</strong>
<pre>Exemple :
    Pour inclure/exclure le mode sombre sur toutes les pages de cours
    <moodlesite.com>/course/view.php%
</pre>
Pour une explication plus détaillée, <a href="https://edwiser.org/documentation/edwiser-remui/dark-mode/" target="_blank">cliquez ici</a>.</div>';

$string['darkmodeexcludepages'] = 'Exclure des pages';
$string['darkmodeexcludepagesdesc']  = '<div><strong>Pour gérer le mode sombre sur des pages spécifiques, ajoutez simplement l\'URL de la page.</strong>
<pre>Exemple :
    Pour inclure/exclure le mode sombre sur une page de cours spécifique (par exemple, le cours avec l\'id=2)
    <MoodleSite.com>/course/view.php?id=2
</pre>
<strong>Pour gérer le mode sombre sur un groupe de pages</strong>
<pre>Exemple :
    Pour inclure/exclure le mode sombre sur toutes les pages de cours
    <moodlesite.com>/course/view.php%
</pre>
Pour une explication plus détaillée, <a href="https://edwiser.org/documentation/edwiser-remui/dark-mode/" target="_blank">cliquez ici</a>.</div>';

$string['customizerdarkmodewarning'] = "Veuillez noter que les modifications apportées dans le Personnaliseur visuel seront appliquées dans le 'mode clair' du site et se refléteront automatiquement dans le 'mode sombre' également.";
$string['customizerdarkmodedonotshowbtntext'] = 'Ne plus afficher';
$string['customizerdarkmodeok'] = 'D\'accord';
$string['previewswitchon'] = 'Activer';
$string['previewswitchoff'] = 'Désactiver';
$string['darkmodepreview'] = 'Aperçu du mode sombre';
$string['darkmodecustomizernote'] = '<li>Dans le "personnaliseur visuel", toutes les modifications seront apportées sur le "mode clair" du site et se refléteront automatiquement dans le "mode sombre".</li>
<li>Les paramètres du personnaliseur visuel seront désactivés lors de la prévisualisation en mode sombre.</li>';
$string["switchtodm"] = "Mode sombre";
$string["switchtolm"] = "Mode clair";
$string["disabledmwarning"] = "Pour activer le personnaliseur visuel, désactivez la prévisualisation du mode sombre.";


$string["here"] = "ici";
$string["clickhere"] = "Cliquez ici";
$string["settingpagedepbottomsecondaryst2b"] = '<a href="https://edwiser.org/my-account/" target="_blank" >Cliquez ici</a> pour télécharger et mettre à jour les plugins vers leur dernière version.';
$string['settingpage-dep-top-st4'] = '1. Téléchargez et installez le Edwiser RemUI Page Builder à la version v4.2.0 et supérieure depuis <a href="https://edwiser.org/my-account/" target="_blank">ici</a>';
$string['viewcoursetitle'] = 'Voir le cours';
$string['okay'] = 'Okay!';
$string['forcefulmigrate'] = 'Migration forcée';

$string['moodleblocks'] = 'Blocs Moodle';

$string['citytown'] = 'Ville';
$string['searchtext'] = 'Texte de recherche';
$string['enablesiteloader'] = "Activer/Désactiver l'image de chargement";
$string['enablesiteloaderdesc'] = "Pour désactiver le GIF de chargement sur le site, décochez la case intitulée \"Activer/Désactiver l'image de chargement\". Pour l'activer, cochez simplement la case.";
$string['aria:courseimage'] = 'Image du cours';

$string['addcustomprice'] = 'Ajouter un prix personnalisé';
$string['enablepricingsettingstext'] = "L'activation des prix par défaut supprimera le « prix personnalisé et le lien d'inscription personnalisé ».";
$string['enabledefaultpricing'] = 'Activer les prix par défaut';
$string["dashboardstatsupdate"] = "Mise à jour des statistiques RemUI";

$string["filters"] = "Filtres";
$string["applyfilters"] = "Appliquer les filtres";
$string["clear"] = "Effacer";
$string["level"] = "Niveau";
$string["ratings"] = "Évaluations";
$string["free"] = "Gratuit";
$string["paid"] = "Payé";
$string["rating4"] = "4 et plus";
$string["rating3"] = "3 et plus";
$string["newest"] = "Le plus récent";
$string["oldest"] = "Le plus ancien";
$string["highrating"] = "Haute évaluation";
$string["lowrating"] = "Basse évaluation";
$string["date"] = "Date";
$string["alphabetical"] = "Alphabétique";
$string["showcourseperpage"] = "Afficher le cours par page";
$string["close"] = "Fermer";
$string["row2"] = "Afficher:2 ligne";
$string["row3"] = "Afficher:3 lignes";
$string["row4"] = "Afficher:4 lignes";
$string["row5"] = "Afficher:5 lignes";
$string["row6"] = "Afficher:6 lignes";

$string["filteremptymsg"] = "REMARQUE : Pour afficher les filtres, ajoutez des propriétés de filtre telles que Niveaux, Prix, Évaluations et Langues au cours.";

$string['sectionaddmax'] = 'Vous avez atteint le nombre maximum de sections autorisées pour un cours...';
$string['prevsubsectionbuttontext'] = 'Sous-section précédente';
$string['nextsubsectionbuttontext'] = 'Sous-section suivante';
// Site sync strings
$string['site_sync_button_title'] = 'Aller à la page de synchronisation du site';
$string['sitesyncplugintabtext'] = "Synchronisation du site (nouveau)";


$string['whatsappsetting'] = "WhatsApp";
$string['whatsappsettingdesc'] = "Entrez le lien WhatsApp de votre site. Par exemple : https://wa.me/1XXXXXXXXXX";
$string['footerwhatsapp'] = "WhatsApp";
$string['telegramsetting'] = "Telegram";
$string['telegramsettingdesc'] = "Entrez le lien Telegram de votre site. Par exemple : https://t.me/someusername";
$string['footertelegram'] = "Telegram";

$string['accessbilityfeatureshead'] = 'Paramètres de l’outil d’accessibilité';
$string['accessbilityfeaturesheaddesc'] = 'Plusieurs paramètres qui aident les utilisateurs en situation de handicap';
$string['enableaccessibilitytools'] = 'Activer l’outil d’accessibilité';
$string['enableaccessibilitytoolsdesc'] = 'Si désactivé, l’outil ne sera pas affiché sur l’ensemble du site.';
$string['disable-aw-for-me'] = 'Désactiver l’outil d’accessibilité pour moi';
$string['enable-aw-for-me'] = 'Activer l’outil d’accessibilité pour moi';
$string['disable-aw-for-me-notice'] = 'L’outil d’accessibilité est désactivé.';
$string['enable-aw-for-me-notice'] = 'L’outil d’accessibilité est activé.';

$string['darkmodelogo'] = "Logo pour le mode sombre";
$string['darkmodelogomini'] = "Logo mini pour le mode sombre";
$string['darkmodelogodesc'] = "Si ce champ est vide, le logo téléchargé dans le champ ‘Logo’ sera affiché lorsque le mode sombre est activé. Vous pouvez ajouter le logo à afficher dans l'en-tête. Remarque - Hauteur préférée : 50px. Si vous souhaitez le personnaliser, vous pouvez le faire à partir de la zone CSS personnalisée.";
$string['darkmodelogominidesc'] = "Si ce champ est vide, le logo téléchargé dans le champ ‘Logo Mini’ sera affiché lorsque le mode sombre est activé. Vous pouvez ajouter le logo à afficher dans l'en-tête. Remarque - Hauteur préférée : 50px. Si vous souhaitez le personnaliser, vous pouvez le faire à partir de la zone CSS personnalisée.";
$string['darkmodelogosize'] = "Le ratio d'aspect attendu est de 40:33";
$string['darkmodelogominisize'] = "Le ratio d'aspect attendu est de 40:33";
$string['secondaryfooterlogodarkmode'] = "Logo pour le mode sombre";
$string['secondaryfooterlogodarkmode_help'] = "Logo pour le mode sombre";

$string['focusmode'] = 'Mode Concentration';
$string['focusmodedesc'] = '<p class="m-0">Mode Concentration Activé : Un bouton pour passer en mode d\'apprentissage sans distraction apparaîtra sur la page du cours.</p>
<p class="m-0">Mode Concentration Désactivé : Le bouton pour passer en mode sans distraction n\'apparaîtra PAS sur la page du cours.</p>
<p class="m-0">Forcer le Mode Concentration pour tous les cours : Tous les cours seront affichés par défaut en mode concentration pour tous les apprenants. Les apprenants peuvent le désactiver s\'ils le souhaitent.</p>';
$string['focusmodeon'] = 'Mode Concentration Activé';
$string['focusmodeoff'] = 'Mode Concentration Désactivé';
$string['forcefocusmode'] = 'Forcer le Mode Concentration pour tous les cours';
$string['focusmodeactiveadminmsg'] = 'Le mode concentration est actif pour les utilisateurs étudiants';
$string['focusmodeactivenavinfo'] = 'Le mode focus est ACTIVÉ. Cliquez sur « X » en bas à droite pour le fermer.';

$string['moredetails'] = "Plus de Détails";
$string['templatesloading_fr'] = 'Les modèles sont en cours de chargement — cela peut prendre 5 à 10 minutes.';
