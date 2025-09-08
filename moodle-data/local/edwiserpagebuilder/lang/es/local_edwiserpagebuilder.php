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
 $string['nav_name'] = 'Editor de Bloques';
 $string['eb_block_editor_title'] = 'Edwiser Page Builder';
 $string['updatecontent'] = 'Actualizar Tarea de Contenido';
 $string['cachedef_edwiserblockcontent'] = "Edwiser Page Builder - Caché de datos para almacenar el contenido de los bloques.";

 $string['livecustomizer'] = "Personalizador en Vivo";
 $string['update'] = "Actualizar";
 $string['download'] = "Descargar";
 $string['fetchblocklist'] = "Obtener Lista de Bloques";
 $string['fetchcardslist'] = "Obtener Lista de Tarjetas";

 $string['failedtodeletefile'] = 'Error al eliminar el archivo. Por favor, verifique que tenga los permisos necesarios para eliminar el archivo.';

 $string['filedeletionsuccessful'] = 'El archivo se ha eliminado con éxito.';
 $string['filesavingsuccessful'] = 'Los archivos se han guardado con éxito.';
 $string['filesavingfailed'] = 'Error al guardar los archivos. Por favor, inténtelo de nuevo.';
 $string['filedoesnotexist'] = 'El archivo no existe. Intente actualizar y cargar de nuevo.';

 $string["unabletofetchjson"] = "No se pudo obtener el contenido JSON.";
 $string["provideproperblockname"] = "Por favor, proporcione un nombre de bloque adecuado.";
 $string["blockupdatesuccess"] = "Bloque actualizado con éxito.";
 $string["updateblocklistonly"] = "Actualizar solo la lista de bloques de Edwiser, no su contenido.";
 $string["updatelayoutlistonly"] = "Actualizar solo la lista de diseños de Edwiser, no su contenido.";
 $string["updateblockcontent"] = "Actualizar el contenido del bloque.";
 $string["nomediafile"] = "¡Vaya! No se encontraron archivos multimedia.";
 $string["mediaselpopuptite"] = 'Seleccionar o Subir Multimedia';
 $string["mediaselpopuptab1tite"] = 'Subir Archivos';
 $string["mediaselpopuptab2tite"] = 'Biblioteca de Medios';
 $string["mediaselpopuplbldetials"] = 'Detalles de los Medios';
 $string["mediadeletebtn"] = 'Eliminar Permanentemente';
 $string["mediasavebtn"] = 'Guardar Archivo';
 $string["mediaselectbtn"] = 'Seleccionar Archivo';
 $string["deleteblockcontent"] = "Eliminar el contenido del bloque.";
 $string["blockdeprecated"] = "Bloque Despreciado";

 $string["createpage"] = "Crear Página";
 $string["usetemplate"] = "Usar plantilla";
 $string["createnewpage"] = "Crear Nueva Página";
 $string["updatepage"] = "Modificar Página";

 $string["fullscreenwidth"] = "Página de ancho completo";
 $string["regularwidth"] = "Página de ancho regular";

 $string["preview"] = "Vista previa";
 $string["page"] = "Página";
 $string["login"] = "Iniciar sesión";
 $string["testgroup"] = "Grupo de Prueba";

 $string["cannotaddpage"] = "Verifique que el plugin de página del módulo esté instalado y que tenga los permisos necesarios para agregar una página.";
 $string['close'] = 'Cerrar';

 $string['epbfpluginexistinfo'] = 'Si tiene problemas para mostrar algunos de los bloques, asegúrese de que el plugin de filtro Edwiser Page Builder esté habilitado.
 <a href="'.$CFG->wwwroot.'/admin/filters.php'.'">Haga clic aquí</a> para habilitar el plugin de filtro Edwiser Page Builder.';
 $string['epbfpluginnotexistinfo'] = "El plugin de filtro Edwiser Page Builder no existe, algunas funcionalidades no funcionarán.";
 $string['Checkforupdate'] = 'Buscar actualización';
 $string['remuiblocks'] = 'Bloques RemUI';
 $string['moodleblocks'] = 'Bloques Moodle';

 $string['showblocklayoutaddhead'] = 'Agregar Diseño de Página';
 $string['showblocklayoutaddbody'] = '¿Está seguro de que desea continuar?
 <br><br> Esto eliminará todos los bloques en la región de bloques - {$a} y los reemplazará con los bloques de diseño de página seleccionados.';

 $string['pagelayoutaddwarningmsg'] = 'Se requiere la versión {$a} o superior del tema Edwiser RemUI. Por favor, actualice el tema a su versión más reciente.';
 $string['homepagemigrationtitlemsg'] = 'Migración realizada con éxito';
 $string['homepagemigrationdesc'] = 'Su página de inicio actual se ha migrado sin problemas al nuevo constructor de páginas. Haga clic a continuación para acceder a la página de inicio y comenzar a personalizarla sin esfuerzo, sin necesidad de habilidades de codificación.';
 $string['homepagemigrationnoblockmsg'] = 'No hay contenido para mostrar. Para crear contenido de la página de inicio usando el constructor de páginas, active el modo de edición y agregue bloques.';
 $string['homepageadvblockmsg'] = "Para agregar estos bloques en la región de contenido, habilite la opción Edwiser Page builder para la página de inicio desde la página de configuración de Edwiser RemUI. <strong>Administración del sitio → Apariencia → Edwiser RemUI → Página de inicio → Elegir diseño de página de inicio</strong>";

 $string['edwiserpagebuilder:epb_can_manage_page'] = "Epb puede gestionar la página";
 $string['edwiserpagebuilder:epb_can_view_page'] = "Epb puede ver la página";

 $string['addnewpage'] = "Agregar una nueva página";
 $string['next'] = "Siguiente";
 $string['pagetitle'] = "Título de la página";

 $string['formgeneralheading'] = "General";
 $string['pagename'] = "Título/nombre de la página";
 $string['pagename_error'] = "El título de la página no puede estar vacío.";
 $string['pagecontent'] = "Contenido de la página";
 $string['formdisplayheading'] = "Mostrar página";
 $string['pagelayout_name'] = "Diseño de la página";
 $string['startdate'] = "Fecha de inicio de la página";
 $string['enddate'] = "Fecha de finalización de la página";
 $string['capabilities'] = "Capacidades";
 $string['capabilities_placeholder'] = "Todas las capacidades permitidas";
 $string['allowloginonly'] = "Mostrar solo con inicio de sesión";
 $string['visible'] = "Estado de visibilidad";
 $string['show'] = "Mostrar";
 $string['hide'] = "Ocultar";
 $string['seoinfo'] = "SEO";
 $string['seotag'] = "Meta título";
 $string['seodesc'] = "Meta descripción";
 $string['allowindex'] = "Indexar esta página";
 $string['submitpublish'] = "Guardar y publicar";
 $string['submitdraft'] = "Guardar como borrador";

 $string['sitesetting'] = "Páginas Personalizadas";
 $string['sitesetting_desc'] = "Crear nuevas páginas";
 $string['pagetable_name'] = "Nombre de la página";
 $string['pagetable_date'] = "Fecha de modificación";
 $string['pagetable_action'] = "Acciones";
 $string['titlepagetableaction'] = "Acciones";
 $string['no_data_text'] = "No hay datos";
 $string['draft_text'] = "Borrador";
 $string['hidden_text'] = "Página oculta";
 $string['publish_text'] = "Publicar";
 $string['update_text'] = "Actualizar";
 $string['no'] = 'No';
 $string['yes'] = 'Sí';

 $string['replicate_toast_msg'] = 'La página se ha duplicado en una pestaña separada.';
 $string['copyurl_toast_msg'] = 'El enlace de la página se ha copiado.';
 $string['delete_toast_msg'] = "La página se ha eliminado.";
 $string['show_toast_msg'] = "Los cambios se guardaron en borrador. Para hacerlos EN VIVO, haga clic en el botón de publicar/actualizar.";
 $string['next'] = "Siguiente";
 $string['pagetitle'] = "Título de la página";
 $string['selectpagetemplate'] = "Seleccionar plantilla de página";
 $string['back'] = "Atrás";
 $string['create'] = "Crear";
 $string['chooselayout'] = "Elegir diseño";

 $string['pagedeletationmodalhead'] = 'Eliminar Página';
 $string['pagedeletationmodaldesc'] = 'Esta acción eliminará permanentemente la página, y todo su contenido se perderá. ¿Está seguro?';
 $string['pagepublishmodalhead'] = 'Confirmación de publicación de página';
 $string['pagepublishmodaldesc'] = '¿Está seguro de que desea publicar esta página?';
 $string['pageupdatemodalhead'] = 'Confirmación de actualización de página';
 $string['pageupdatemodaldesc'] = '¿Está seguro de que desea actualizar esta página?';

 $string['sitepagessettings'] = "Páginas Personalizadas";
 $string['editpage'] = "Editar Página";
 $string['managepages'] = "Gestionar páginas";
 $string['select'] = "Seleccionar";

 $string["addblanktemplatetext"] = 'Agregar plantilla en blanco';

 // Title tooltips.
 $string['copyurl'] = "Copiar URL de la página";
 $string['pagesettings'] = "Configuraciones de la página";
 $string['replicatepage'] = "Replicar página";
 $string['subheadertitle'] = "Barra de navegación de la página del sitio";
 $string['publishpage'] = "Publicar página";
 $string['deletepage'] = "Eliminar página";
 $string['editpagetitle'] = "Editar título de la página";
 $string['submitpagename'] = "Enviar nuevo nombre de página";
 $string['duplicatepage'] = "Duplicar página";
 $string['showpage'] = "Mostrar";
 $string['hidepage'] = "Ocultar";

 $string['pagelinkcopied'] = 'El enlace de la página {$a} se ha copiado';
 $string['pagedesc'] = "Descripción de la página";
 $string['published'] = "Página publicada con éxito.";
 $string['updatemsg'] = "Página actualizada con éxito.";

 $string['default_draft_header_msg'] = "Actualmente, la página está en modo 'Borrador'. Active el modo de edición para 'Actualizar o Publicar' la página.";
 $string['default_drafthidden_header_msg'] = "Actualmente, la página está en modo 'Borrador y Oculto'. Active el modo de edición para 'Actualizar o Publicar' la página.";
 $string['default_hidden_header_msg'] = "Actualmente, la página está en modo 'Oculto'. Active el modo de edición para 'Actualizar o Publicar' la página.";
 $string['preview'] = "Vista previa";
 $string['default_preview_header_msg'] = "Actualmente, está en 'Modo de vista previa'. Para continuar editando";
 $string['close_preview'] = "Cerrar vista previa";
 $string['accesserror'] = "Lo sentimos, no podemos encontrar la página que está buscando.";

 $string['viewallusers'] = 'Ver todos los miembros';

 // Add notes
 $string['selectacourse'] = 'Seleccionar un Curso';
 $string['selectastudent'] = 'Seleccionar Estudiante';
 $string['addsitenote'] = 'Agregar Nota del Sitio';
 $string['addcoursenote'] = 'Agregar Nota del Curso';
 $string['addpersonalnote'] = 'Agregar Nota Personal';
 $string['deadlines'] = 'Fechas límite';
 $string['selectastudent'] = 'Seleccionar Estudiante';
 $string['nousersenrolledincourse'] = 'No hay usuarios inscritos en el curso {$a}.';
 $string['selectcoursetodisplayusers'] = 'Seleccione un Curso para mostrar sus usuarios inscritos aquí.';

 // Recent Assignments
 $string['assignmentstobegraded'] = 'Tareas a Calificar';

 $string['grade'] = 'Calificación';

 $string['norecentfeedback'] = '¡Sin Comentarios Recientes!';
 $string['norecentforums'] = 'Sin Foros Recientes';
 $string['noofstudents'] = 'Número de Estudiantes';
 $string['lastpostdate'] = 'Fecha del Último Mensaje';

 $string['highestgrade'] = "Calificación más Alta";
 $string['lowestgrade'] = "Calificación más Baja";
 $string['averagegrade'] = "Calificación Promedio";
 $string['viewcourse'] = "Ver Curso";
 $string['allActivities'] = "Todas las Actividades";

 // Course Analytics
 $string['showing'] = 'Mostrando';
 $string['showingfromto'] = 'Mostrando {$a->start} a {$a->to} de {$a->total}';
 $string['bars'] = 'barras';
 $string['lastattempt'] = 'Último Intento';
 $string['globalattempt'] = 'Promedio Global';

 // Course progress
 $string['alwaysload'] = 'Cargar siempre el progreso';
 $string['alwaysloaddesc'] = 'Cuando está marcado, el progreso del curso siempre se cargará.';
 $string['alwaysloadwarning'] = 'Para un gran número de cursos, el cálculo del progreso toma mucho tiempo. Esto afectará el tiempo de carga de la página del tablero. La advertencia desaparecerá permanentemente si continúa. ¿Continuar?';
 $string['loadcourseprogress'] = 'Cargar progreso';
 $string['loadcourseprogressdesc'] = 'Cuando está marcado, el progreso del curso se cargará. Al actualizar la página se restablecerá.';
 $string['enrolledstudents'] = "Estudiantes";
 $string['coursestartdate'] = "Fecha de Inicio";
 $string['progress'] = "Progreso";
 $string['searchforcourses'] = 'Buscar Cursos';
 $string['datatableinfo'] = "Mostrando _START_ to _END_ of _TOTAL_ entradas"; // No cambie el texto "_START_ to _END_ of _TOTAL_" en esta cadena;
 $string['search'] = 'Buscar';

 // Enrolled users block
$string['selectcategory'] = 'Seleccionar Categoría';
$string['problemwhileloadingdata'] = 'Lo siento, ocurrió un problema al cargar los datos.';
$string['nousersincoursecategoryfound'] = 'No se encontraron usuarios inscritos en esta Categoría de Curso.';
$string['nocoursecategoryfound'] = 'No se encontraron categorías de curso en el Sistema.';

// To Do List
$string['tasks'] = 'Tareas';
$string['timeline'] = 'Cronograma';
$string['addtask'] = 'Agregar tarea';
$string['courseevents'] = 'Eventos del Curso';
$string['incomplete'] = 'Incompleta';
$string['due'] = 'Vencida';
$string['duedate'] = 'Fecha de Vencimiento';
$string['noduedate'] = 'Sin fecha de vencimiento';
$string['createtask'] = 'Crear nueva tarea';
$string['edittask'] = 'Editar tarea';
$string['nosavebutton'] = 'No se encontró botón de guardar';
$string['subject'] = 'Asunto';
$string['missingsubject'] = 'Asunto faltante';
$string['summary'] = 'Resumen';
$string['nosummary'] = 'Sin resumen';
$string['selectuser'] = 'Seleccionar Usuarios';
$string['moreassignee'] = '{$a} más';
$string['notify'] = 'Notificar';
$string['next7days'] = 'Próximos 7 días';
$string['next30days'] = 'Próximos 30 días';
$string['next3months'] = 'Próximos 3 meses';
$string['next6months'] = 'Próximos 6 meses';
$string['tasksearch'] = 'Buscar por Asunto o Resumen';
$string['todolist'] = 'Lista de Tareas';
$string['failedtomarkcomplete'] = 'Error al marcar como completa';
$string['failedtomarkincomplete'] = 'Error al marcar como incompleta';
$string['failedtodeletetask'] = 'Error al eliminar tarea';
$string['notasks'] = 'No hay tareas pendientes.';
$string['deletetask'] = 'Eliminar tarea';
$string['deletetaskmessage'] = '¿Desea eliminar la tarea <strong>"{$a}"</strong>?';
$string['taskdeleted'] = 'Tarea <strong>{$a}</strong> eliminada con éxito.';
$string['searchresultfor'] = 'Mostrando resultados para <em>{$a}</em>';

// Quiz stats
$string['quizstats'] = 'Intento de Cuestionario';
$string['totalusersattemptedquiz'] = 'Total de Usuarios que intentaron el Cuestionario';
$string['totalusersnotattemptedquiz'] = 'Total de Usuarios que no intentaron el Cuestionario';

// Notification string start
$string['createsubject'] = '{$a->createdby} te asignó: {$a->subject}';
$string['createmessage'] = 'Tarea: {$a->subject}<br>Resumen: {$a->summary}<br>Asignado a: {$a->assignedto}<br>Vence: {$a->timedue}';
$string['incompletesubject'] = '{$a->user} marcó {$a->subject} como incompleta.';
$string['incompletemessage'] = $string['createmessage'];
$string['completesubject'] = '{$a->user} completó {$a->subject}.';
$string['completemessage'] = '{$a->user} completó {$a->subject}<br>Resumen: {$a->summary}<br>Vence: {$a->timedue}<br>Completado el: {$a->completedon}';
$string['editsubject'] = '{$a->createdby} actualizó la tarea: {$a->subject}';
$string['editmessage'] = $string['createmessage'];
$string['addedsubject'] = '{$a->createdby} te agregó a la tarea: {$a->subject}';
$string['addedmessage'] = $string['createmessage'];
$string['removedsubject'] = '{$a->createdby} te eliminó de la tarea: {$a->subject}';
$string['removedmessage'] = $string['createmessage'];
// Notification strings end

// Teacher Dashboard Strings
$string['courseprogress'] = 'Progreso del Curso';
$string['progress'] = 'Progreso';
$string['name'] = 'Nombre';
$string['status'] = 'Estado';
$string['back'] = 'Atrás';
$string['enrolleduserstats'] = 'Estadísticas de Usuarios Inscritos';

// Course stats
$string['coursestats'] = 'Estadísticas del Curso';
$string['enrolledusers'] = 'Usuarios Inscritos';
$string['studentcompleted'] = 'Estudiantes Completados';
$string['inprogress'] = 'En Progreso';
$string['yettostart'] = 'Aún por Comenzar';

// User stats
$string['userstats'] = 'Estadísticas del Usuario';
$string['lastaccesstime'] = 'Último acceso hace {$a->time}';
$string['numsecond'] = '{$a} seg';
$string['numminute'] = '{$a} min';
$string['numhour'] = '{$a} hora';
$string['numday'] = '{$a} día';
$string['nummonth'] = '{$a} mes';
$string['numyear'] = '{$a} año';
$string['enrolmentdate'] = 'Fecha de Inscripción';
$string['nostudentsenrolled'] = 'No hay estudiantes inscritos.';
$string['nocoursecompletion'] = 'La finalización del curso no está habilitada';
$string['searchnameemail'] = 'Buscar por nombre o correo electrónico';
$string['exportcsv'] = 'Exportar CSV';
$string['uneditablewarningmsg'] = 'La vista previa de los datos dentro de este bloque no está disponible mientras se edita. Sin embargo, el contenido se mostrará correctamente una vez que salga del personalizador. <strong>Aún puede agregar, eliminar y personalizar componentes utilizando la barra de edición a la izquierda.</strong>';

$string['availableonlyadminteacher'] = "Este bloque está disponible solo para el Administrador, Profesor y Gerente.";
$string['availableonlyadminmanager'] = "Este bloque está disponible solo para el Administrador y Gerente.";
$string['parametermustbeobjectorintegerorstring'] = "El parámetro debe ser un objeto, un entero o una cadena.";

$string['filterpluginreleasenoteice'] = "El 'plugin de filtro Edwiser Page Builder' no está actualizado. Por favor, vaya a su '<a target='_blank' href=' http://edwiser.org/my-account'>Mi Cuenta</a>' en el sitio de Edwiser para descargar y actualizar el plugin.";

$string['courseprogressblockdesc'] = 'Este bloque es visible para Profesores y Creadores de Cursos. Muestra el ritmo al que los estudiantes están progresando en un curso.';
$string['enrolledusersblockdesc'] = 'Este bloque es visible para Gerentes y Administradores. Muestra gráficamente todos los estudiantes que se han registrado en un curso.';
$string['quizattemptsblockdesc'] = 'Este bloque es visible para Profesores y Creadores de Cursos. Muestra un informe gráfico de todos los intentos de cuestionarios y no intentos por parte de los estudiantes.';
$string['courseanalyticsblockdesc'] = 'Este bloque funciona mejor para los Estudiantes. Muestra un informe gráfico de todas las calificaciones que ha obtenido en los cursos inscritos.';
$string['latestmembersblockdesc'] = 'Este bloque es visible para Profesores, Gerentes y Administradores. Muestra todos los estudiantes que se han registrado recientemente en el LMS.';
$string['addnotesblockdesc'] = 'Este bloque es útil para un Profesor o Creador de Cursos. Les permite enviar Notas relacionadas con el curso o instrucciones a los Estudiantes rápidamente.';
$string['recentfeedbackblockdesc'] = 'Este bloque es útil para los Estudiantes. Pueden ver los últimos comentarios y sugerencias de sus profesores relacionados con varias actividades de Moodle en las que participan.';
$string['recentforumsblockdesc'] = 'Este bloque es útil para los Estudiantes. Pueden realizar un seguimiento de todas las últimas actualizaciones e interacciones que ocurren en un foro al que se han suscrito.';
$string['coursesncategoriesblockdesc'] = 'Este bloque funciona para todos, pero para Profesores, Creadores de Cursos y Gerentes proporciona enlaces rápidos relacionados con el curso para tomar las acciones necesarias rápidamente.';
$string['todolistblockdesc'] = 'Un bloque de Gestión de Tareas que funciona mejor para todos los roles de usuario. Se pueden crear y asignar tareas a uno mismo y a otros.';

$string['homepagemigrationfailtitlemsg'] = 'Migración fallida';
$string['tryagain'] = 'Intentar de nuevo';
$string['viewhomepage'] = 'Ver Página de Inicio';

$string['staticblocks'] = "Estáticos";
$string['dynamicblocks'] = "Dinámicos";
$string['layoutblocks'] = "Diseños";

$string['staticallcategory'] = "Todas las categorías";
$string['dynamicallcategory'] = "Todos los bloques dinámicos";
$string['layoutallcategory'] = "Todos los diseños";

$string['updatedblocksinfotext'] = "Todos los bloques de remui están actualizados";
$string['formpageselector'] = "Selector de página";
$string['formpagename'] = "Nombre de la página";
$string['formpagewidth'] = "Ancho de la página";

$string['featuredcoursesblockdesc'] = "El bloque de cursos destacados está diseñado para mostrar tu mejor contenido y atraer a los estudiantes.";
$string["blockimportexportwarning"] = "Error: Archivo no válido. Asegúrese de que el archivo cargado sea un archivo JSON de Edwiser válido.";
