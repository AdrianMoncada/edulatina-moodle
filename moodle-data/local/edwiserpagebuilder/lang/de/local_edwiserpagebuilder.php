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
 $string['updatecontent'] = 'Inhalt Aufgabe aktualisieren';
 $string['cachedef_edwiserblockcontent'] = "Edwiser Page Builder - Cache-Daten zum Speichern der Blockinhalte.";

 $string['livecustomizer'] = "Live-Anpasser";
 $string['update'] = "Aktualisieren";
 $string['download'] = "Herunterladen";
 $string['fetchblocklist'] = "Blockliste abrufen";
 $string['fetchcardslist'] = "Kartenliste abrufen";

 $string['failedtodeletefile'] = 'Datei konnte nicht gelöscht werden. Bitte überprüfen Sie, ob Sie über ausreichende Berechtigungen zum Löschen der Datei verfügen.';

 $string['filedeletionsuccessful'] = 'Datei wurde erfolgreich gelöscht.';
 $string['filesavingsuccessful'] = 'Dateien wurden erfolgreich gespeichert';
 $string['filesavingfailed'] = 'Dateien konnten nicht gespeichert werden. Bitte versuchen Sie es erneut.';
 $string['filedoesnotexist'] = 'Datei existiert nicht. Versuchen Sie, die Seite neu zu laden.';

 $string["unabletofetchjson"] = "Json-Inhalt konnte nicht abgerufen werden";
 $string["provideproperblockname"] = "Bitte geben Sie einen gültigen Blocknamen an";
 $string["blockupdatesuccess"] = "Block erfolgreich aktualisiert";
 $string["updateblocklistonly"] = "Nur Edwiser Blockliste aktualisieren, nicht den Inhalt.";
 $string["updatelayoutlistonly"] = "Nur Edwiser Layoutliste aktualisieren, nicht den Inhalt.";
 $string["updateblockcontent"] = "Blockinhalt aktualisieren";
 $string["nomediafile"] = "Ooops! Keine Mediendateien gefunden.";
 $string["mediaselpopuptite"] = 'Medien auswählen oder hochladen';
 $string["mediaselpopuptab1tite"] = 'Dateien hochladen';
 $string["mediaselpopuptab2tite"] = 'Medienbibliothek';
 $string["mediaselpopuplbldetials"] = 'Mediendetails';
 $string["mediadeletebtn"] = 'Dauerhaft löschen';
 $string["mediasavebtn"] = 'Datei speichern';
 $string["mediaselectbtn"] = 'Datei auswählen';
 $string["deleteblockcontent"] = "Blockinhalt löschen";
 $string["blockdeprecated"] = "Block veraltet";

 $string["createpage"] = "Seite erstellen";
 $string["usetemplate"] = "Vorlage verwenden";
 $string["createnewpage"] = "Neue Seite erstellen";
 $string["updatepage"] = "Seite bearbeiten";

 $string["fullscreenwidth"] = "Seite in voller Bildschirmbreite";
 $string["regularwidth"] = "Seite in regulärer Breite";

 $string["preview"] = "Vorschau";
 $string["page"] = "Seite";
 $string["login"] = "Anmelden";
 $string["testgroup"] = "Testgruppe";

 $string["cannotaddpage"] = "Überprüfen Sie, ob das Modul-Plugin installiert ist und Sie über ausreichende Berechtigungen zum Hinzufügen von Seiten verfügen.";
 $string['close'] = 'Schließen';

 $string['epbfpluginexistinfo'] = 'Wenn Sie Probleme mit der Anzeige einiger Blöcke haben, stellen Sie bitte sicher, dass das Edwiser Page Builder Filter-Plugin aktiviert ist.
 <a href="'.$CFG->wwwroot.'/admin/filters.php'.'">Hier klicken</a>, um das Edwiser Page Builder Filter-Plugin zu aktivieren.';
 $string['epbfpluginnotexistinfo'] = "Das Edwiser Page Builder Filter-Plugin existiert nicht, einige Funktionen werden nicht funktionieren.";
 $string['Checkforupdate'] = 'Nach Updates suchen';
 $string['remuiblocks'] = 'RemUI Blöcke';
 $string['moodleblocks'] = 'Moodle Blöcke';

 $string['showblocklayoutaddhead'] = 'Seitendesign hinzufügen';
 $string['showblocklayoutaddbody'] = 'Sind Sie sicher, dass Sie fortfahren möchten?
 <br><br> Alle Blöcke im Blockbereich - {$a} werden entfernt und durch die ausgewählten Seitendesignblöcke ersetzt';

 $string['pagelayoutaddwarningmsg'] = 'Die Edwiser RemUI Theme Version {$a} oder höher ist erforderlich. Bitte aktualisieren Sie das Theme auf die neueste Version.';
 $string['homepagemigrationtitlemsg'] = 'Migration erfolgreich abgeschlossen';
 $string['homepagemigrationdesc'] = 'Ihre aktuelle Homepage wurde nahtlos in den neuen Page Builder migriert. Klicken Sie unten, um auf die Homepage zuzugreifen und sie mühelos anzupassen, ohne Programmierkenntnisse!';
 $string['homepagemigrationnoblockmsg'] = 'Kein Inhalt zum Anzeigen. Um Homepage-Inhalte mit dem Page Builder zu erstellen, aktivieren Sie den Bearbeitungsmodus und fügen Sie Blöcke hinzu.';
 $string['homepageadvblockmsg'] = "Um diese Blöcke im Inhaltsbereich hinzuzufügen, aktivieren Sie die Option Edwiser Page Builder für die Homepage von der Edwiser RemUI Einstellungsseite. <strong>Website-Administration → Erscheinungsbild → Edwiser RemUI → Homepage → Wählen Sie das Frontpagedesign</strong>";

 $string['edwiserpagebuilder:epb_can_manage_page'] = "Epb kann Seite verwalten";
 $string['edwiserpagebuilder:epb_can_view_page'] = "Epb kann Seite anzeigen";

 $string['addnewpage'] = "Neue Seite hinzufügen";
 $string['next'] = "Weiter";
 $string['pagetitle'] = "Seitentitel";

 $string['formgeneralheading'] = "Allgemein";
 $string['pagename'] = "Seitentitel/Name";
 $string['pagename_error'] = "Seitentitel darf nicht leer sein";
 $string['pagecontent'] = "Seiteninhalt";
 $string['formdisplayheading'] = "Seitenanzeige";
 $string['pagelayout_name'] = "Seitendesign";
 $string['startdate'] = "Seitenstartdatum";
 $string['enddate'] = "Seitenenddatum";
 $string['capabilities'] = "Fähigkeiten";
 $string['capabilities_placeholder'] = "Alle Fähigkeiten erlaubt";
 $string['allowloginonly'] = "Nur mit Anmeldung anzeigen";
 $string['visible'] = "Sichtbarkeitsstatus";
 $string['show'] = "Anzeigen";
 $string['hide'] = "Verbergen";
 $string['seoinfo'] = "SEO";
 $string['seotag'] = "Meta-Titel";
 $string['seodesc'] = "Meta-Beschreibung";
 $string['allowindex'] = "Diese Seite indizieren";
 $string['submitpublish'] = "Speichern und veröffentlichen";
 $string['submitdraft'] = "Als Entwurf speichern";

 $string['sitesetting'] = "Benutzerdefinierte Seiten";
 $string['sitesetting_desc'] = "Neue Seiten erstellen";
 $string['pagetable_name'] = "Seitenname";
 $string['pagename'] = "Seitenname";
 $string['pagetable_date'] = "Änderungsdatum";
 $string['pagetable_action'] = "Aktionen";
 $string['titlepagetableaction'] = "Aktionen";
 $string['no_data_text'] = "Keine Daten";
 $string['draft_text'] = "Entwurf";
 $string['hidden_text'] = "Verborgene Seite";
 $string['publish_text'] = "Veröffentlichen";
 $string['update_text'] = "Aktualisieren";
 $string['no'] = 'Nein';
 $string['yes'] = 'Ja';

 $string['replicate_toast_msg'] = 'Die Seite wurde in einem separaten Tab dupliziert.';
 $string['copyurl_toast_msg'] = 'Der Seitenlink wurde kopiert.';
 $string['delete_toast_msg'] = "Die Seite wurde gelöscht.";
 $string['show_toast_msg'] = "Änderungen wurden als Entwurf gespeichert. Um sie LIVE zu schalten, klicken Sie auf die Schaltfläche Veröffentlichen/Aktualisieren.";
 $string['next'] = "Weiter";
 $string['pagetitle'] = "Seitentitel";
 $string['selectpagetemplate'] = "Seitentemplate auswählen";
 $string['back'] = "Zurück";
 $string['create'] = "Erstellen";
 $string['chooselayout'] = "Layout wählen";

 $string['pagedeletationmodalhead'] = 'Seite löschen';
 $string['pagedeletationmodaldesc'] = 'Diese Aktion wird die Seite dauerhaft löschen und alle Inhalte gehen verloren. Sind Sie sicher?';
 $string['pagepublishmodalhead'] = 'Bestätigung der Seitenveröffentlichung';
 $string['pagepublishmodaldesc'] = 'Sind Sie sicher, dass Sie diese Seite veröffentlichen möchten?';
 $string['pageupdatemodalhead'] = 'Bestätigung der Seitenaktualisierung';
 $string['pageupdatemodaldesc'] = 'Sind Sie sicher, dass Sie diese Seite aktualisieren möchten?';

 $string['sitepagessettings'] = "Benutzerdefinierte Seiten";
 $string['editpage'] = "Seite bearbeiten";
 $string['managepages'] = "Seiten verwalten";
 $string['select'] = "Auswählen";

 $string["addblanktemplatetext"] = 'Leere Vorlage hinzufügen';

 // Title tooltips.
 $string['copyurl'] = "Seiten-URL kopieren";
 $string['pagesettings'] = "Seiteneinstellungen";
 $string['replicatepage'] = "Seite replizieren";
 $string['subheadertitle'] = "Seiten-Navigationsleiste";
 $string['publishpage'] = "Seite veröffentlichen";
 $string['deletepage'] = "Seite löschen";
 $string['editpagetitle'] = "Seitentitel bearbeiten";
 $string['submitpagename'] = "Neuen Seitentitel absenden";
 $string['duplicatepage'] = "Seite duplizieren";
 $string['showpage'] = "Anzeigen";
 $string['hidepage'] = "Verbergen";

 $string['pagelinkcopied'] = 'Der Link der Seite {$a} wurde kopiert';
 $string['pagedesc'] = "Seitenbeschreibung";
 $string['published'] = "Seite erfolgreich veröffentlicht.";
 $string['updatemsg'] = "Seite erfolgreich aktualisiert.";

 $string['default_draft_header_msg'] = "Derzeit ist die Seite im 'Entwurfsmodus'. Schalten Sie den Bearbeitungsmodus ein, um sie zu 'Aktualisieren oder Veröffentlichen'.";
 $string['default_drafthidden_header_msg'] = "Derzeit ist die Seite im 'Entwurfs- und Verborgenen Modus'. Schalten Sie den Bearbeitungsmodus ein, um sie zu 'Aktualisieren oder Veröffentlichen'.";
 $string['default_hidden_header_msg'] = "Derzeit ist die Seite im 'Verborgenen Modus'. Schalten Sie den Bearbeitungsmodus ein, um sie zu 'Aktualisieren oder Veröffentlichen'.";
 $string['preview'] = "Vorschau";
 $string['default_preview_header_msg'] = "Derzeit befinden Sie sich im 'Vorschau-Modus'. Um weiter zu bearbeiten";
 $string['close_preview'] = "Vorschau schließen";
 $string['accesserror'] = "Entschuldigung, wir können die Seite, die Sie suchen, nicht finden.";

 $string['viewallusers'] = 'Alle Mitglieder anzeigen';

 // Add notes
 $string['selectacourse'] = 'Einen Kurs auswählen';
 $string['selectastudent'] = 'Einen Studenten auswählen';
 $string['addsitenote'] = 'Standortnotiz hinzufügen';
 $string['addcoursenote'] = 'Kursnotiz hinzufügen';
 $string['addpersonalnote'] = 'Persönliche Notiz hinzufügen';
 $string['deadlines'] = 'Fristen';
 $string['selectastudent'] = 'Einen Studenten auswählen';
 $string['nousersenrolledincourse'] = 'Es sind keine Benutzer im Kurs {$a} eingeschrieben.';
 $string['selectcoursetodisplayusers'] = 'Wählen Sie einen Kurs, um die eingeschriebenen Benutzer hier anzuzeigen.';

 // Recent Assignments
 $string['assignmentstobegraded'] = 'Zu bewertende Aufgaben';

 $string['grade'] = 'Bewerten';

 $string['norecentfeedback'] = 'Kein aktuelles Feedback!';
 $string['norecentforums'] = 'Keine aktuellen Foren';
 $string['noofstudents'] = 'Anzahl der Studenten';
 $string['lastpostdate'] = 'Datum des letzten Beitrags';

 $string['highestgrade'] = "Höchste Note";
 $string['lowestgrade'] = "Niedrigste Note";
 $string['averagegrade'] = "Durchschnittsnote";
 $string['viewcourse'] = "Kurs anzeigen";
 $string['allActivities'] = "Alle Aktivitäten";

 // Course Analytics
 $string['showing'] = 'Anzeigen';
 $string['showingfromto'] = 'Zeige {$a->start} bis {$a->to} von {$a->total}';
 $string['bars'] = 'Balken';
 $string['lastattempt'] = 'Letzter Versuch';
 $string['globalattempt'] = 'Globaler Durchschnitt';

 // Course progress
 $string['alwaysload'] = 'Fortschritt immer laden';
 $string['alwaysloaddesc'] = 'Wenn aktiviert, wird der Kursfortschritt immer geladen.';
 $string['alwaysloadwarning'] = 'Bei einer großen Anzahl von Kursen dauert die Fortschrittsberechnung lange. Dies beeinflusst die Ladezeit der Dashboard-Seite. Diese Warnung verschwindet dauerhaft, wenn Sie fortfahren. Fortfahren?';
 $string['loadcourseprogress'] = 'Fortschritt laden';
 $string['loadcourseprogressdesc'] = 'Wenn aktiviert, wird der Kursfortschritt geladen. Beim Aktualisieren der Seite wird er zurückgesetzt.';
 $string['enrolledstudents'] = "Studenten";
 $string['coursestartdate'] = "Startdatum";
 $string['progress'] = "Fortschritt";
 $string['searchforcourses'] = 'Nach Kursen suchen';
 $string['datatableinfo'] = "Zeige _START_ to _END_ of _TOTAL_ Einträgen"; // Do not change "_START_ to _END_ of _TOTAL_" text in this string;
 $string['search'] = 'Suche';
// Enrolled users block
$string['selectcategory'] = 'Kategorie auswählen';
$string['problemwhileloadingdata'] = 'Entschuldigung, beim Laden der Daten ist ein Problem aufgetreten.';
$string['nousersincoursecategoryfound'] = 'Keine eingeschriebenen Benutzer in dieser Kurskategorie gefunden.';
$string['nocoursecategoryfound'] = 'Keine Kurskategorien im System gefunden.';

// To Do List
$string['tasks'] = 'Aufgaben';
$string['timeline'] = 'Zeitleiste';
$string['addtask'] = 'Aufgabe hinzufügen';
$string['courseevents'] = 'Kursereignisse';
$string['incomplete'] = 'Unvollständig';
$string['due'] = 'Fällig';
$string['duedate'] = 'Fälligkeitsdatum';
$string['noduedate'] = 'Kein Fälligkeitsdatum';
$string['createtask'] = 'Neue Aufgabe erstellen';
$string['edittask'] = 'Aufgabe bearbeiten';
$string['nosavebutton'] = 'Keine Speichern-Schaltfläche gefunden';
$string['subject'] = 'Betreff';
$string['missingsubject'] = 'Betreff fehlt';
$string['summary'] = 'Zusammenfassung';
$string['nosummary'] = 'Keine Zusammenfassung';
$string['selectuser'] = 'Benutzer auswählen';
$string['moreassignee'] = '{$a} weitere';
$string['notify'] = 'Benachrichtigen';
$string['next7days'] = 'Nächste 7 Tage';
$string['next30days'] = 'Nächste 30 Tage';
$string['next3months'] = 'Nächste 3 Monate';
$string['next6months'] = 'Nächste 6 Monate';
$string['tasksearch'] = 'Nach Betreff oder Zusammenfassung suchen';
$string['todolist'] = 'Aufgabenliste';
$string['failedtomarkcomplete'] = 'Fehler beim Markieren als vollständig';
$string['failedtomarkincomplete'] = 'Fehler beim Markieren als unvollständig';
$string['failedtodeletetask'] = 'Fehler beim Löschen der Aufgabe';
$string['notasks'] = 'Es gibt keine Aufgaben.';
$string['deletetask'] = 'Aufgabe löschen';
$string['deletetaskmessage'] = 'Möchten Sie die Aufgabe <strong>"{$a}"</strong> löschen?';
$string['taskdeleted'] = 'Aufgabe <strong>{$a}</strong> erfolgreich gelöscht.';
$string['searchresultfor'] = 'Ergebnisse anzeigen für <em>{$a}</em>';

// Quiz stats
$string['quizstats'] = 'Quizversuch';
$string['totalusersattemptedquiz'] = 'Gesamte Benutzer, die das Quiz versucht haben';
$string['totalusersnotattemptedquiz'] = 'Gesamte Benutzer, die das Quiz nicht versucht haben';

// Notification string start
$string['createsubject'] = '{$a->createdby} hat Ihnen zugewiesen: {$a->subject}';
$string['createmessage'] = 'Aufgabe: {$a->subject}<br>Zusammenfassung: {$a->summary}<br>Zugewiesen an: {$a->assignedto}<br>Fällig: {$a->timedue}';
$string['incompletesubject'] = '{$a->user} hat {$a->subject} als unvollständig markiert.';
$string['incompletemessage'] = $string['createmessage'];
$string['completesubject'] = '{$a->user} hat {$a->subject} abgeschlossen.';
$string['completemessage'] = '{$a->user} hat {$a->subject} abgeschlossen<br>Zusammenfassung: {$a->summary}<br>Fällig: {$a->timedue}<br>Abgeschlossen am: {$a->completedon}';
$string['editsubject'] = '{$a->createdby} hat die Aufgabe aktualisiert: {$a->subject}';
$string['editmessage'] = $string['createmessage'];
$string['addedsubject'] = '{$a->createdby} hat Sie in die Aufgabe hinzugefügt: {$a->subject}';
$string['addedmessage'] = $string['createmessage'];
$string['removedsubject'] = '{$a->createdby} hat Sie aus der Aufgabe entfernt: {$a->subject}';
$string['removedmessage'] = $string['createmessage'];
// Notification strings end

// Teacher Dashboard Strings
$string['courseprogress'] = 'Kursfortschritt';
$string['progress'] = 'Fortschritt';
$string['name'] = 'Name';
$string['status'] = 'Status';
$string['back'] = 'Zurück';
$string['enrolleduserstats'] = 'Statistiken der eingeschriebenen Benutzer';

// Course stats
$string['coursestats'] = 'Kursstatistiken';
$string['enrolledusers'] = 'Eingeschriebene Benutzer';
$string['studentcompleted'] = 'Abgeschlossene Studenten';
$string['inprogress'] = 'In Bearbeitung';
$string['yettostart'] = 'Noch nicht begonnen';

// User stats
$string['userstats'] = 'Benutzerstatistiken';
$string['lastaccesstime'] = 'Zuletzt zugegriffen vor {$a->time}';
$string['numsecond'] = '{$a} Sekunde';
$string['numminute'] = '{$a} Minute';
$string['numhour'] = '{$a} Stunde';
$string['numday'] = '{$a} Tag';
$string['nummonth'] = '{$a} Monat';
$string['numyear'] = '{$a} Jahr';
$string['enrolmentdate'] = 'Einschreibedatum';
$string['nostudentsenrolled'] = 'Keine eingeschriebenen Studenten.';
$string['nocoursecompletion'] = 'Kursabschluss ist nicht aktiviert';
$string['searchnameemail'] = 'Nach Namen oder E-Mail suchen';
$string['exportcsv'] = 'CSV exportieren';
$string['uneditablewarningmsg'] = 'Eine Vorschau der Daten in diesem Block ist während der Bearbeitung nicht verfügbar. Der Inhalt wird jedoch korrekt angezeigt, sobald Sie den Anpassungsmodus verlassen. <strong>Sie können weiterhin Komponenten mit der Bearbeitungsleiste auf der linken Seite hinzufügen, entfernen und anpassen.</strong>';

$string['availableonlyadminteacher'] = "Dieser Block ist nur für den Administrator, Lehrer und Manager verfügbar.";
$string['availableonlyadminmanager'] = "Dieser Block ist nur für den Administrator und Manager verfügbar.";
$string['parametermustbeobjectorintegerorstring'] = "Der Parameter muss ein Objekt, eine Ganzzahl oder ein String sein.";

$string['filterpluginreleasenoteice'] = "Das 'Edwiser Page Builder Filter Plugin' ist nicht aktualisiert. Bitte gehen Sie zu Ihrem '<a target='_blank' href=' http://edwiser.org/my-account'>Mein Konto</a>' auf der Edwiser-Website, um das Plugin herunterzuladen und zu aktualisieren.";

$string['courseprogressblockdesc'] = 'Dieser Block ist für Lehrer & Kursentwickler sichtbar. Er zeigt die Fortschrittsgeschwindigkeit der Studenten in einem Kurs an.';
$string['enrolledusersblockdesc'] = 'Dieser Block ist für Manager & Administratoren sichtbar. Er zeigt grafisch alle Studenten an, die in einem Kurs eingeschrieben sind.';
$string['quizattemptsblockdesc'] = 'Dieser Block ist für Lehrer & Kursentwickler sichtbar. Er zeigt einen grafischen Bericht über alle Quizversuche und Nichtversuche von Studenten an.';
$string['courseanalyticsblockdesc'] = 'Dieser Block funktioniert am besten für Studenten. Er zeigt einen grafischen Bericht über alle Noten an, die Sie in eingeschriebenen Kursen erhalten haben.';
$string['latestmembersblockdesc'] = 'Dieser Block ist für Lehrer, Manager & Administratoren sichtbar. Er zeigt alle Studenten an, die sich kürzlich beim LMS registriert haben.';
$string['addnotesblockdesc'] = 'Dieser Block ist nützlich für einen Lehrer oder Kursentwickler. Er ermöglicht es ihnen, schnell kursbezogene Notizen oder Anweisungen an Studenten zu senden.';
$string['recentfeedbackblockdesc'] = 'Dieser Block ist nützlich für Studenten. Sie können sich die neuesten Kommentare und Vorschläge ihrer Lehrer zu verschiedenen Moodle-Aktivitäten ansehen, an denen sie teilnehmen.';
$string['recentforumsblockdesc'] = 'Dieser Block ist nützlich für Studenten. Sie können alle neuesten Updates und Interaktionen verfolgen, die in einem Forum stattfinden, in dem sie abonniert sind.';
$string['coursesncategoriesblockdesc'] = 'Dieser Block funktioniert für alle, aber für Lehrer, Kursentwickler & Manager bietet er schnelle Links zum Kurs, um notwendige Maßnahmen schnell zu ergreifen.';
$string['todolistblockdesc'] = 'Ein Aufgabenverwaltungsblock, der am besten für alle Benutzerrollen funktioniert. Aufgaben können erstellt und sowohl sich selbst als auch anderen zugewiesen werden.';

$string['homepagemigrationfailtitlemsg'] = 'Migration fehlgeschlagen';
$string['tryagain'] = 'Erneut versuchen';
$string['viewhomepage'] = 'Startseite anzeigen';

$string['staticblocks'] = "Statisch";
$string['dynamicblocks'] = "Dynamisch";
$string['layoutblocks'] = "Layouts";

$string['staticallcategory'] = "Alle Kategorien";
$string['dynamicallcategory'] = "Alle dynamischen Blöcke";
$string['layoutallcategory'] = "Alle Layouts";

$string['updatedblocksinfotext'] = "Alle remui-Blöcke sind auf dem neuesten Stand";
$string['formpageselector'] = "Seitenauswahl";
$string['formpagename'] = "Seitenname";
$string['formpagewidth'] = "Seitenbreite";
$string['featuredcoursesblockdesc'] = "Der Featured-Kurs-Block ist dazu gedacht, Ihre Top-Inhalte zu präsentieren und Lernende anzuziehen.";
$string["blockimportexportwarning"] = "Fehler: Ungültige Datei. Bitte stellen Sie sicher, dass die hochgeladene Datei eine gültige Edwiser JSON-Datei ist.";