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
$string['nav_name'] = 'Edytor bloków';
$string['eb_block_editor_title'] = 'Edwiser Page Builder';
$string['updatecontent'] = 'Aktualizacja zawartości zadania';
$string['cachedef_edwiserblockcontent'] = "Edwiser Page Builder - Dane pamięci podręcznej do przechowywania zawartości bloku.";

$string['livecustomizer'] = "Na żywo dostosowuj";
$string['update'] = "Aktualizacja";
$string['download'] = "Pobierz";
$string['fetchblocklist'] = "Pobierz listę bloków";
$string['fetchcardslist'] = "Pobierz listę kart";

$string['failedtodeletefile'] = 'Nie udało się usunąć pliku. Sprawdź, czy masz wystarczające uprawnienia do jego usunięcia.';

$string['filedeletionsuccessful'] = 'Plik został pomyślnie usunięty.';
$string['filesavingsuccessful'] = 'Pliki zostały pomyślnie zapisane.';
$string['filesavingfailed'] = 'Nie udało się zapisać plików. Spróbuj ponownie.';
$string['filedoesnotexist'] = 'Plik nie istnieje. Spróbuj odświeżyć i załadować ponownie.';

$string["unabletofetchjson"] = "Nie można pobrać zawartości JSON";
$string["provideproperblockname"] = "Proszę podać właściwą nazwę bloku";
$string["blockupdatesuccess"] = "Blok został pomyślnie zaktualizowany";
$string["updateblocklistonly"] = "Zaktualizuj tylko listę bloków Edwiser, bez zawartości.";
$string["updatelayoutlistonly"] = "Zaktualizuj tylko listę układów Edwiser, bez zawartości.";
$string["updateblockcontent"] = "Zaktualizuj zawartość bloku";
$string["nomediafile"] = "Ups! Nie znaleziono plików multimedialnych.";
$string["mediaselpopuptite"] = 'Wybierz lub przesyłaj pliki multimedialne';
$string["mediaselpopuptab1tite"] = 'Prześlij pliki';
$string["mediaselpopuptab2tite"] = 'Biblioteka mediów';
$string["mediaselpopuplbldetials"] = 'Szczegóły mediów';
$string["mediadeletebtn"] = 'Usuń na stałe';
$string["mediasavebtn"] = 'Zapisz plik';
$string["mediaselectbtn"] = 'Wybierz plik';
$string["deleteblockcontent"] = "Usuń zawartość bloku";
$string["blockdeprecated"] = "Blok przestarzały";

$string["createpage"] = "Utwórz stronę";
$string["usetemplate"] = "Użyj szablonu";
$string["createnewpage"] = "Utwórz nową stronę";
$string["updatepage"] = "Modyfikuj stronę";

$string["fullscreenwidth"] = "Pełna szerokość ekranu";
$string["regularwidth"] = "Zwykła szerokość strony";

$string["preview"] = "Podgląd";
$string["page"] = "Strona";
$string["login"] = "Zaloguj się";
$string["testgroup"] = "Grupa testowa";

$string["cannotaddpage"] = "Sprawdź, czy moduł pluginu strony jest zainstalowany i masz odpowiednie uprawnienia do dodawania strony.";
$string['close'] = 'Zamknij';

$string['epbfpluginexistinfo'] = 'Jeśli napotykasz problemy z wyświetlaniem niektórych bloków, upewnij się, że wtyczka filtra Edwiser Page Builder jest włączona.
<a href="'.$CFG->wwwroot.'/admin/filters.php'.'">Kliknij tutaj</a> aby przejść do włączenia wtyczki filtra Edwiser Page Builder.';
$string['epbfpluginnotexistinfo'] = "Wtyczka filtra Edwiser Page Builder nie istnieje, niektóre funkcje mogą nie działać.";
$string['Checkforupdate'] = 'Sprawdź aktualizacje';
$string['remuiblocks'] = 'Bloki RemUI';
$string['moodleblocks'] = 'Bloki Moodle';

$string['showblocklayoutaddhead'] = 'Dodaj układ strony';
$string['showblocklayoutaddbody'] = 'Czy na pewno chcesz kontynuować?
<br><br>Spowoduje to usunięcie wszystkich bloków w obszarze bloku - {$a} i zastąpi je wybranymi blokami układu strony';

$string['pagelayoutaddwarningmsg'] = 'Wymagana jest wersja motywu Edwiser RemUI {$a} lub nowsza. Proszę zaktualizować motyw do najnowszej wersji';
$string['homepagemigrationtitlemsg'] = 'Migracja zakończona pomyślnie';
$string['homepagemigrationdesc'] = 'Twoja obecna strona główna została bezproblemowo przeniesiona do nowego kreatora stron. Kliknij poniżej, aby uzyskać dostęp do strony głównej i zacząć łatwe dostosowywanie, nie wymagające umiejętności programowania!';
$string['homepagemigrationnoblockmsg'] = 'Brak zawartości do wyświetlenia. Aby utworzyć zawartość strony głównej za pomocą kreatora stron, włącz tryb edycji i dodaj bloki';
$string['homepageadvblockmsg'] = "Aby dodać te bloki w obszarze treści, włącz kreator stron Edwiser Page na stronie głównej z ustawień Edwiser RemUI. <strong>Administracja witryny → Wygląd → Edwiser RemUI → Strona główna → Wybierz projekt strony głównej</strong>";

$string['edwiserpagebuilder:epb_can_manage_page'] = "EPB może zarządzać stroną";
$string['edwiserpagebuilder:epb_can_view_page'] = "EPB może wyświetlać stronę";

$string['addnewpage'] = "Dodaj nową stronę";
$string['next'] = "Dalej";
$string['pagetitle'] = "Tytuł strony";

$string['formgeneralheading'] = "Ogólne";
$string['pagename'] = "Nazwa/tytuł strony";
$string['pagename_error'] = "Tytuł strony nie może być pusty";
$string['pagecontent'] = "Zawartość strony";
$string['formdisplayheading'] = "Wyświetlanie strony";
$string['pagelayout_name'] = "Układ strony";
$string['startdate'] = "Data rozpoczęcia strony";
$string['enddate'] = "Data zakończenia strony";
$string['capabilities'] = "Uprawnienia";
$string['capabilities_placeholder'] = "Wszystkie uprawnienia dozwolone";
$string['allowloginonly'] = "Pokaż tylko po zalogowaniu";
$string['visible'] = "Status widoczności";
$string['show'] = "Pokaż";
$string['hide'] = "Ukryj";
$string['seoinfo'] = "SEO";
$string['seotag'] = "Meta tytuł";
$string['seodesc'] = "Meta opis";
$string['allowindex'] = "Zaindeksuj tę stronę";
$string['submitpublish'] = "Zapisz i opublikuj";
$string['submitdraft'] = "Zapisz w formie szkicu";

$string['sitesetting'] = "Strony niestandardowe";
$string['sitesetting_desc'] = "Utwórz nowe strony";
$string['pagetable_name'] = "Nazwa strony";
$string['pagename'] = "Nazwa strony";
$string['pagetable_date'] = "Data modyfikacji";
$string['pagetable_action'] = "Działania";
$string['titlepagetableaction'] = "Działania";
$string['no_data_text'] = "Brak danych";
$string['draft_text'] = "Szkic";
$string['hidden_text'] = "Ukryta strona";
$string['publish_text'] = "Opublikowana";
$string['update_text'] = "Aktualizacja";
$string['no'] = 'Nie';
$string['yes'] = 'Tak';

$string['replicate_toast_msg'] = 'Strona została zduplikowana w osobnej karcie.';
$string['copyurl_toast_msg'] = 'Skopiowano link do strony.';
$string['delete_toast_msg'] = "Strona została usunięta.";
$string['show_toast_msg'] = "Zmiany zostały zapisane jako szkic. Aby opublikować, kliknij przycisk Publikuj/Aktualizuj.";
$string['next'] = "Dalej";
$string['pagetitle'] = "Tytuł strony";
$string['selectpagetemplate'] = "Wybierz szablon strony";
$string['back'] = "Wróć";
$string['create'] = "Utwórz";
$string['chooselayout'] = "Wybierz układ";

$string['pagedeletationmodalhead'] = 'Usuń stronę';
$string['pagedeletationmodaldesc'] = 'Ta akcja spowoduje trwałe usunięcie strony, a cała jej zawartość zostanie utracona. Czy na pewno chcesz kontynuować?';
$string['pagepublishmodalhead'] = 'Potwierdzenie publikacji strony';
$string['pagepublishmodaldesc'] = 'Czy na pewno chcesz opublikować tę stronę?';
$string['pageupdatemodalhead'] = 'Potwierdzenie aktualizacji strony';
$string['pageupdatemodaldesc'] = 'Czy na pewno chcesz zaktualizować tę stronę?';

$string['sitepagessettings'] = "Strony niestandardowe";
$string['editpage'] = "Edytuj stronę";
$string['managepages'] = "Zarządzaj stronami";
$string['select'] = "Wybierz";

$string["addblanktemplatetext"] = 'Dodaj pusty szablon';

// Tytuły podpowiedzi.
$string['copyurl'] = "Kopiuj link do strony";
$string['pagesettings'] = "Ustawienia strony";
$string['replicatepage'] = "Duplikuj stronę";
$string['subheadertitle'] = "nawigacja strony";
$string['publishpage'] = "Opublikuj stronę";
$string['deletepage'] = "Usuń stronę";
$string['editpagetitle'] = "Edytuj tytuł strony";
$string['submitpagename'] = "Wyślij nową nazwę strony";
$string['duplicatepage'] = "Zduplikuj stronę";
$string['showpage'] = "Pokaż";
$string['hidepage'] = "Ukryj";

$string['pagelinkcopied'] = 'Skopiowano link do strony {$a}';
$string['pagedesc'] = "Opis strony";
$string['published'] = "Strona opublikowana pomyślnie.";
$string['updatemsg'] = "Strona zaktualizowana pomyślnie.";

$string['default_draft_header_msg'] = "Obecnie strona jest w trybie „Szkic”. Włącz tryb edycji, aby ją „Zaktualizować lub Opublikować”.";
$string['default_drafthidden_header_msg'] = "Obecnie strona jest w trybie „Szkic i Ukryty”. Włącz tryb edycji, aby ją „Zaktualizować lub Opublikować”.";
$string['default_hidden_header_msg'] = "Obecnie strona jest w trybie „Ukryty”. Włącz tryb edycji, aby ją „Zaktualizować lub Opublikować”.";
$string['preview'] = "Podgląd";
$string['default_preview_header_msg'] = "Obecnie znajdujesz się w trybie „Podgląd”. Aby kontynuować edycję";
$string['close_preview'] = "Zamknij podgląd";
$string['accesserror'] = "Przepraszamy, nie możemy odnaleźć strony, której szukasz.";

$string['viewallusers'] = 'Wyświetl wszystkich członków';

// Dodaj notatki
$string['selectacourse'] = 'Wybierz kurs';
$string['selectastudent'] = 'Wybierz studenta';
$string['addsitenote'] = 'Dodaj notatkę na stronie';
$string['addcoursenote'] = 'Dodaj notatkę do kursu';
$string['addpersonalnote'] = 'Dodaj osobistą notatkę';
$string['deadlines'] = 'Terminy';
$string['selectastudent'] = 'Wybierz studenta';
$string['nousersenrolledincourse'] = 'Brak użytkowników zapisanych na kursie {$a}.';
$string['selectcoursetodisplayusers'] = 'Wybierz kurs, aby wyświetlić zapisanych na niego użytkowników.';

// Ostatnie zadania
$string['assignmentstobegraded'] = 'Zadania do oceny';

$string['grade'] = 'Ocena';

$string['norecentfeedback'] = 'Brak ostatnich informacji zwrotnej!';
$string['norecentforums'] = 'Brak ostatnich forów';
$string['noofstudents'] = 'Liczba studentów';
$string['lastpostdate'] = 'Data';

$string['highestgrade'] = "Najwyższa ocena";
$string['lowestgrade'] = "Najniższa ocena";
$string['averagegrade'] = "Średnia ocen";
$string['viewcourse'] = "Wyświetl kurs";
$string['allActivities'] = "Wszystkie działania";

// Analiza kursu
$string['showing'] = 'Pokazuje';
$string['showingfromto'] = 'Pokazywanie od {$a->start} do {$a->to} z {$a->total}';
$string['bars'] = 'słupki';
$string['lastattempt'] = 'Ostatnia próba';
$string['globalattempt'] = 'Średnia globalna';

// Postęp w kursie
$string['alwaysload'] = 'Zawsze ładuj postęp';
$string['alwaysloaddesc'] = 'Po zaznaczeniu postęp kursu będzie zawsze ładowany.';
$string['alwaysloadwarning'] = 'Dla dużej liczby kursów obliczenie postępu zajmuje długo czasu. Spowoduje to dłuższy czas ładowania strony panelu. Czy chcesz kontynuować?';
$string['loadcourseprogress'] = 'Ładuj postęp';
$string['loadcourseprogressdesc'] = 'Po zaznaczeniu postęp kursu będzie ładowany. Po odświeżeniu strony zostanie zresetowany.';
$string['enrolledstudents'] = "Studenci";
$string['coursestartdate'] = "Data rozpoczęcia kursu";
$string['progress'] = "Postęp";
$string['searchforcourses'] = 'Szukaj kursów';
$string['datatableinfo'] = "Pokazywanie _START_ to _END_ of _TOTAL_ wpisów"; // Nie zmieniaj tekstu "_START_ to _END_ of _TOTAL_" w tym ciągu;
$string['search'] = 'Szukaj';


// Enrolled users block
$string['selectcategory'] = 'Wybierz kategorię';
$string['problemwhileloadingdata'] = 'Przepraszamy, wystąpił problem podczas ładowania danych.';
$string['nousersincoursecategoryfound'] = 'Nie znaleziono zapisanych użytkowników w tej kategorii kursu.';
$string['nocoursecategoryfound'] = 'Nie znaleziono kategorii kursów w systemie.';

// To Do List
$string['tasks'] = 'Zadania';
$string['timeline'] = 'Oś czasu';
$string['addtask'] = 'Dodaj zadanie';
$string['courseevents'] = 'Wydarzenia w kursie';
$string['incomplete'] = 'Niekompletne';
$string['due'] = 'Termin';
$string['duedate'] = 'Termin wykonania';
$string['noduedate'] = 'Brak terminu';
$string['createtask'] = 'Utwórz nowe zadanie';
$string['edittask'] = 'Edytuj zadanie';
$string['nosavebutton'] = 'Nie znaleziono przycisku zapisywania';
$string['subject'] = 'Temat';
$string['missingsubject'] = 'Brak tematu';
$string['summary'] = 'Podsumowanie';
$string['nosummary'] = 'Brak podsumowania';
$string['selectuser'] = 'Wybierz użytkowników';
$string['moreassignee'] = '{$a} więcej';
$string['notify'] = 'Powiadom';
$string['next7days'] = 'Następne 7 dni';
$string['next30days'] = 'Następne 30 dni';
$string['next3months'] = 'Następne 3 miesiące';
$string['next6months'] = 'Następne 6 miesięcy';
$string['tasksearch'] = 'Wyszukaj według tematu lub podsumowania';
$string['todolist'] = 'Lista zadań do zrobienia';
$string['failedtomarkcomplete'] = 'Nie udało się oznaczyć jako zakończone';
$string['failedtomarkincomplete'] = 'Nie udało się oznaczyć jako niezakończone';
$string['failedtodeletetask'] = 'Nie udało się usunąć zadania';
$string['notasks'] = 'Brak dostępnych zadań do wykonania.';
$string['deletetask'] = 'Usuń zadanie';
$string['deletetaskmessage'] = 'Czy chcesz usunąć zadanie <strong>"{$a}"</strong>?';
$string['taskdeleted'] = 'Zadanie <strong>{$a}</strong> zostało pomyślnie usunięte.';
$string['searchresultfor'] = 'Wyświetlanie wyników dla <em>{$a}</em>';

// Quiz stats
$string['quizstats'] = 'Próba quizowa';
$string['totalusersattemptedquiz'] = 'Liczba użytkowników, którzy podjęli próbę quizu';
$string['totalusersnotattemptedquiz'] = 'Liczba użytkowników, którzy nie podjęli próby quizu';

// Notification string start
$string['createsubject'] = '{$a->createdby} przydzielił ci: {$a->subject}';
$string['createmessage'] = 'Zadanie: {$a->subject}<br>Podsumowanie: {$a->summary}<br>Przydzielone do: {$a->assignedto}<br>Termin: {$a->timedue}';
$string['incompletesubject'] = '{$a->user} oznaczył zadanie {$a->subject} jako niekompletne.';
$string['incompletemessage'] = $string['createmessage'];
$string['completesubject'] = '{$a->user} ukończył zadanie {$a->subject}.';
$string['completemessage'] = '{$a->user} ukończył zadanie {$a->subject}<br>Podsumowanie: {$a->summary}<br>Termin: {$a->timedue}<br>Ukończone dnia: {$a->completedon}';
$string['editsubject'] = '{$a->createdby} zaktualizował zadanie: {$a->subject}';
$string['editmessage'] = $string['createmessage'];
$string['addedsubject'] = '{$a->createdby} dodał cię do zadania: {$a->subject}';
$string['addedmessage'] = $string['createmessage'];
$string['removedsubject'] = '{$a->createdby} usunął cię z zadania: {$a->subject}';
$string['removedmessage'] = $string['createmessage'];
// Notification stings end

// Teacher Dashboard Strings
$string['courseprogress'] = 'Postęp kursu';
$string['progress'] = "Postęp";
$string['name'] = "Nazwa";
$string['status'] = "Status";
$string['back'] = "Powrót";
$string['enrolleduserstats'] = 'Statystyki zapisanych użytkowników';

// Course stats
$string['coursestats'] = 'Statystyki kursu';
$string['enrolledusers'] = 'Zapisani użytkownicy';
$string['studentcompleted'] = 'Ukończyło studenci';
$string['inprogress'] = 'W toku';
$string['yettostart'] = 'Do rozpoczęcia';

// User stats
$string['userstats'] = 'Statystyki użytkownika';
$string['lastaccesstime'] = '{$a->time} temu';
$string['numsecond'] = '{$a} s';
$string['numminute'] = '{$a} min';
$string['numhour'] = '{$a} godz';
$string['numday'] = '{$a} dni';
$string['nummonth'] = '{$a} mies';
$string['numyear'] = '{$a} lat';
$string['enrolmentdate'] = 'Data zapisu';
$string['nostudentsenrolled'] = 'Brak zapisanych studentów.';
$string['nocoursecompletion'] = 'Ukończenie kursu nie jest włączone';
$string['searchnameemail'] = 'Wyszukaj po nazwie lub e-mailu';
$string['exportcsv'] = 'Eksportuj CSV';
$string['uneditablewarningmsg'] = 'Podgląd danych w tym bloku jest niedostępny podczas edycji. Jednak zawartość będzie poprawnie wyświetlana po wyjściu z edytora. <strong>Nadal możesz dodawać, usuwać i dostosowywać komponenty za pomocą paska edycji po lewej stronie.</strong>';

$string['availableonlyadminteacher'] = "Ten blok jest dostępny tylko dla Administratora, Nauczyciela i Menadżera.";
$string['availableonlyadminmanager'] = "Ten blok jest dostępny tylko dla Administratora i Menadżera.";
$string['parametermustbeobjectorintegerorstring'] = "Parametr musi być obiektem, liczbą całkowitą lub ciągiem znaków.";

$string['filterpluginreleasenoteice'] ="Wtyczka filtru 'Edwiser Page Builder' nie jest zaktualizowana. Proszę przejdź do swojego '<a target='_blank' href=' http://edwiser.org/my-account'>Moje konto</a>' na stronie Edwiser, aby pobrać i zaktualizować wtyczkę.";

$string['courseprogressblockdesc'] = 'Ten blok jest widoczny dla Nauczycieli i Twórców kursów. Wyświetla tempo postępów studentów w kursie.';
$string['enrolledusersblockdesc'] = 'Ten blok jest widoczny dla Menadżerów i Administratorów. Graficznie przedstawia wszystkich studentów zapisanych na kursie.';
$string['quizattemptsblockdesc'] = 'Ten blok jest widoczny dla Nauczycieli i Twórców kursów. Wyświetla graficzny raport wszystkich prób i braków prób quizowych przez studentów.';
$string['courseanalyticsblockdesc'] = 'Ten blok najlepiej działa dla Studentów. Wyświetla graficzny raport wszystkich ocen uzyskanych w zapisanych kursach.';
$string['latestmembersblockdesc'] = 'Ten blok jest widoczny dla Nauczycieli, Menadżerów i Administratorów. Wyświetla wszystkich studentów, którzy niedawno zarejestrowali się w LMS.';
$string['addnotesblockdesc'] = 'Ten blok jest przydatny dla Nauczyciela lub Twórcy kursów. Pozwala im szybko wysyłać związane z kursami notatki lub instrukcje do studentów.';
$string['recentfeedbackblockdesc'] = 'Ten blok jest przydatny dla Studentów. Mogą sprawdzać najnowsze komentarze i sugestie od swoich nauczycieli dotyczące różnych aktywności w Moodle, których są częścią.';
$string['recentforumsblockdesc'] = 'Ten blok jest przydatny dla Studentów. Mogą śledzić wszystkie najnowsze aktualizacje i interakcje, które mają miejsce na forum, na którym są zapisani.';
$string['coursesncategoriesblockdesc'] = 'Ten blok działa dla wszystkich, ale dla Nauczycieli, Twórców kursów i Menadżerów zapewnia szybki dostęp do powiązanych z kursem linków, aby szybko podjąć niezbędne działania.';
$string['todolistblockdesc'] = 'Blok zarządzania zadaniami, który najlepiej działa dla wszystkich ról użytkowników. Zadania można tworzyć i przydzielać zarówno sobie, jak i innym.';

$string['homepagemigrationfailtitlemsg'] = 'Nieudana migracja';
$string['tryagain'] = 'Spróbuj ponownie';
$string['viewhomepage'] = 'Wyświetl stronę główną';

$string['staticblocks'] = "Statyczne";
$string['dynamicblocks'] = "Dynamiczne";
$string['layoutblocks'] = "Układy";

$string['staticallcategory'] = "Wszystkie kategorie";
$string['dynamicallcategory'] = "Wszystkie dynamiczne bloki";
$string['layoutallcategory'] = "Wszystkie układy";

$string['updatedblocksinfotext'] = "Wszystkie bloki remui są aktualne";
$string['formpageselector'] = "Selektor strony";
$string['formpagename'] = "Nazwa strony";
$string['formpagewidth'] = "Szerokość strony";
$string['featuredcoursesblockdesc'] = "Blok polecanych kursów został zaprojektowany, aby prezentować najlepsze treści i przyciągać uczniów.";
$string["blockimportexportwarning"] = "Błąd: Nieprawidłowy plik. Upewnij się, że przesłany plik jest prawidłowym plikiem Edwiser JSON.";