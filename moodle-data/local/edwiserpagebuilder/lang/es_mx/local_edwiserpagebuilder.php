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
 $string['cachedef_edwiserblockcontent'] = "Edwiser Page Builder - Cache de datos para almacenar el contenido de los bloques.";

 $string['livecustomizer'] = "Personalizador en Vivo";
 $string['update'] = "Actualizar";
 $string['download'] = "Descargar";
 $string['fetchblocklist'] = "Obtener Lista de Bloques";
 $string['fetchcardslist'] = "Obtener Lista de Tarjetas";

 $string['failedtodeletefile'] = 'No se pudo eliminar el archivo. Por favor, verifique que tiene los permisos necesarios para eliminar el archivo.';

 $string['filedeletionsuccessful'] = 'El archivo ha sido eliminado exitosamente.';
 $string['filesavingsuccessful'] = 'El archivo ha sido guardado exitosamente';
 $string['filesavingfailed'] = 'No se pudo guardar el archivo, por favor intente nuevamente.';
 $string['filedoesnotexist'] = 'El archivo no existe, intente actualizar y cargar nuevamente.';

 $string["unabletofetchjson"] = "No se pudo obtener el contenido JSON";
 $string["provideproperblockname"] = "Por favor, proporcione un nombre adecuado para el bloque";
 $string["blockupdatesuccess"] = "Bloque actualizado exitosamente";
 $string["updateblocklistonly"] = "Actualizar solo la lista de bloques de Edwiser, no su contenido.";
 $string["updatelayoutlistonly"] = "Actualizar solo la lista de diseños de Edwiser, no su contenido.";
 $string["updateblockcontent"] = "Actualizar el contenido del bloque";
 $string["nomediafile"] = "¡Ups! No se encontraron archivos multimedia.";
 $string["mediaselpopuptite"] = 'Seleccionar o Subir Multimedia';
 $string["mediaselpopuptab1tite"] = 'Subir Archivos';
 $string["mediaselpopuptab2tite"] = 'Biblioteca Multimedia';
 $string["mediaselpopuplbldetials"] = 'Detalles del Archivo Multimedia';
 $string["mediadeletebtn"] = 'Eliminar Permanentemente';
 $string["mediasavebtn"] = 'Guardar Archivo';
 $string["mediaselectbtn"] = 'Seleccionar Archivo';
 $string["deleteblockcontent"] = "Eliminar el contenido del bloque";
 $string["blockdeprecated"] = "Bloque Obsoleto";

 $string["createpage"] = "Crear Página";
 $string["usetemplate"] = "Usar plantilla";
 $string["createnewpage"] = "Crear Nueva Página";
 $string["updatepage"] = "Modificar Página";

 $string["fullscreenwidth"] = "Página de ancho completo";
 $string["regularwidth"] = "Página de tamaño regular";

 $string["preview"] = "Vista Previa";
 $string["page"] = "Página";
 $string["login"] = "Iniciar Sesión";
 $string["testgroup"] = "Grupo de Prueba";

 $string["cannotaddpage"] = "Verifique que el plugin del módulo de página esté instalado y que tenga los permisos adecuados para agregar una página.";
 $string['close'] = 'Cerrar';

 $string['epbfpluginexistinfo'] = 'Si tiene problemas para mostrar algunos de los bloques, asegúrese de que el plugin de filtro de Edwiser Page Builder esté habilitado.
 <a href="'.$CFG->wwwroot.'/admin/filters.php'.'">Haga clic aquí</a> para habilitar el plugin de filtro de Edwiser Page Builder.';
 $string['epbfpluginnotexistinfo'] = "El plugin de filtro de Edwiser Page Builder no existe, algunas funcionalidades no funcionarán.";
 $string['Checkforupdate'] = 'Buscar actualizaciones';
 $string['remuiblocks'] = 'Bloques RemUI';
 $string['moodleblocks'] = 'Bloques Moodle';

 $string['showblocklayoutaddhead'] = 'Agregar Diseño de Página';
 $string['showblocklayoutaddbody'] = '¿Está seguro de que desea continuar?
 <br><br> Esto eliminará todos los bloques en la región de bloques- {$a} y los reemplazará con los bloques de diseño de página seleccionados';

 $string['pagelayoutaddwarningmsg'] = 'Se requiere la versión {$a} o superior del tema Edwiser RemUI. Por favor, actualice el tema a su última versión';
 $string['homepagemigrationtitlemsg'] = 'Migración realizada con éxito';
 $string['homepagemigrationdesc'] = 'Su página de inicio actual se ha migrado sin problemas al nuevo creador de páginas. Haga clic a continuación para acceder a la página de inicio y comenzar a personalizarla sin esfuerzo, ¡sin necesidad de habilidades de codificación!';
 $string['homepagemigrationnoblockmsg'] = 'No hay contenido para mostrar. Para crear contenido de la página de inicio utilizando el creador de páginas, active el modo de edición y agregue bloques';
 $string['homepageadvblockmsg'] = "Para agregar estos bloques en la región de contenido, habilite la opción de Edwiser Page Builder para la página de inicio desde la página de configuración de Edwiser RemUI. <strong>Administración del sitio → Apariencia → Edwiser RemUI  → Página de inicio → Elegir diseño de la página de inicio</strong>";

 $string['edwiserpagebuilder:epb_can_manage_page'] = "Epb puede gestionar la página";
 $string['edwiserpagebuilder:epb_can_view_page'] = "Epb puede ver la página";

 $string['addnewpage'] = "Agregar una nueva página";
 $string['next'] = "Siguiente";
 $string['pagetitle'] = "Título de la página";

 $string['formgeneralheading'] = "General";
 $string['pagename'] = "Título/nombre de la página";
 $string['pagename_error'] = "El título de la página no puede estar vacío";
 $string['pagecontent'] = "Contenido de la página";
 $string['formdisplayheading'] = "Visualización de la página";
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
 $string['seotag'] = "Título meta";
 $string['seodesc'] = "Descripción meta";
 $string['allowindex'] = "Indexar esta página";
 $string['submitpublish'] = "Guardar y publicar";
 $string['submitdraft'] = "Guardar como borrador";

 $string['sitesetting'] = "Páginas Personalizadas";
 $string['sitesetting_desc'] = "Crear nuevas páginas";
 $string['pagetable_name'] = "Nombre de la página";
 $string['pagename'] = "Nombre de la página";
 $string['pagetable_date'] = "Fecha de modificación";
 $string['pagetable_action'] = "Acciones";
 $string['titlepagetableaction'] = "Acciones";
 $string['no_data_text'] = "No hay datos";
 $string['draft_text'] = "Borrador";
 $string['hidden_text'] = "Página Oculta";
 $string['publish_text'] = "Publicar";
 $string['update_text'] = "Actualizar";
 $string['no'] = 'No';
 $string['yes'] = 'Sí';

 $string['replicate_toast_msg'] = 'La página se ha duplicado en una pestaña separada.';
 $string['copyurl_toast_msg'] = 'El enlace de la página ha sido copiado.';
 $string['delete_toast_msg'] = "La página ha sido eliminada.";
 $string['show_toast_msg'] = "Los cambios se guardaron como borrador. Para hacerlo en VIVO, haga clic en el botón publicar/actualizar.";
 $string['next'] = "Siguiente";
 $string['pagetitle'] = "Título de la página";
 $string['selectpagetemplate'] = "Seleccionar plantilla de página";
 $string['back'] = "Atrás";
 $string['create'] = "Crear";
 $string['chooselayout'] = "Elegir diseño";

 $string['pagedeletationmodalhead'] = 'Eliminar Página';
 $string['pagedeletationmodaldesc'] = 'Esta acción eliminará permanentemente la página y todo su contenido se perderá. ¿Está seguro?';
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
 $string['pagesettings'] = "Configuración de la página";
 $string['replicatepage'] = "Replicar página";
 $string['subheadertitle'] = "barra de navegación de la página del sitio";
 $string['publishpage'] = "Publicar página";
 $string['deletepage'] = "Eliminar página";
 $string['editpagetitle'] = "Editar título de la página";
 $string['submitpagename'] = "Enviar nuevo nombre de la página";
 $string['duplicatepage'] = "Duplicar página";
 $string['showpage'] = "Mostrar";
 $string['hidepage'] = "Ocultar";

 $string['pagelinkcopied'] = 'El enlace de la página {$a} ha sido copiado';
 $string['pagedesc'] = "Descripción de la página";
 $string['published'] = "Página publicada exitosamente.";
 $string['updatemsg'] = "Página actualizada exitosamente.";

 $string['default_draft_header_msg'] = "Actualmente, la página está en modo 'Borrador'. Active el modo de edición para 'Actualizar o Publicar'.";
 $string['default_drafthidden_header_msg'] = "Actualmente, la página está en modo 'Borrador y Oculto'. Active el modo de edición para 'Actualizar o Publicar'.";
 $string['default_hidden_header_msg'] = "Actualmente, la página está en modo 'Oculto'. Active el modo de edición para 'Actualizar o Publicar'.";
 $string['preview'] = "Vista Previa";
 $string['default_preview_header_msg'] = "Actualmente, está en 'Modo de Vista Previa'. Para continuar editando";
 $string['close_preview'] = "Cerrar vista previa";
 $string['accesserror'] = "Lo sentimos, no podemos encontrar la página que está buscando.";

 $string['viewallusers'] = 'Ver todos los miembros';

 // Add notes
 $string['selectacourse'] = 'Seleccionar un Curso';
 $string['selectastudent'] = 'Seleccionar Estudiante';
 $string['addsitenote'] = 'Agregar Nota del Sitio';
 $string['addcoursenote'] = 'Agregar Nota del Curso';
 $string['addpersonalnote'] = 'Agregar Nota Personal';
 $string['deadlines'] = 'Fechas Límite';
 $string['selectastudent'] = 'Seleccionar Estudiante';
 $string['nousersenrolledincourse'] = 'No hay usuarios inscritos en el curso {$a}.';
 $string['selectcoursetodisplayusers'] = 'Seleccione un curso para mostrar sus usuarios inscritos aquí.';

 // Recent Assignments
 $string['assignmentstobegraded'] = 'Asignaciones para Calificar';

 $string['grade'] = 'Calificar';

 $string['norecentfeedback'] = '¡Sin Comentarios Recientes!';
 $string['norecentforums'] = 'Sin Foros Recientes';
 $string['noofstudents'] = 'Número de Estudiantes';
 $string['lastpostdate'] = 'Fecha del Último Post';

 $string['highestgrade'] = "Nota Más Alta";
 $string['lowestgrade'] = "Nota Más Baja";
 $string['averagegrade'] = "Nota Promedio";
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
 $string['loadcourseprogressdesc'] = 'Cuando está marcado, el progreso del curso se cargará. Al actualizar la página, se restablecerá.';
 $string['enrolledstudents'] = "Estudiantes";
 $string['coursestartdate'] = "Fecha de Inicio";
 $string['progress'] = "Progreso";
 $string['searchforcourses'] = 'Buscar Cursos';
 $string['datatableinfo'] = "Mostrando _START_ to _END_ of _TOTAL_ entradas"; // No cambiar el texto "_START_ to _END_ of _TOTAL_" en esta cadena;
 $string['search'] = 'Buscar';

 $string['selectcategory'] = 'Seleccionar Categoría';
 $string['problemwhileloadingdata'] = 'Lo siento, ocurrió un problema al cargar los datos.';
 $string['nousersincoursecategoryfound'] = 'No se encontraron usuarios inscritos en esta categoría de curso.';
 $string['nocoursecategoryfound'] = 'No se encontraron categorías de curso en el sistema.';

 $string['tasks'] = 'Tareas';
 $string['timeline'] = 'Línea de tiempo';
 $string['addtask'] = 'Agregar tarea';
 $string['courseevents'] = 'Eventos del curso';
 $string['incomplete'] = 'Incompleto';
 $string['due'] = 'Vencido';
 $string['duedate'] = 'Fecha de vencimiento';
 $string['noduedate'] = 'Sin fecha de vencimiento';
 $string['createtask'] = 'Crear nueva tarea';
 $string['edittask'] = 'Editar tarea';
 $string['nosavebutton'] = 'No se encontró el botón de guardar';
 $string['subject'] = 'Asunto';
 $string['missingsubject'] = 'Falta el asunto';
 $string['summary'] = 'Resumen';
 $string['nosummary'] = 'Sin resumen';
 $string['selectuser'] = 'Seleccionar usuarios';
 $string['moreassignee'] = '{$a} más';
 $string['notify'] = 'Notificar';
 $string['next7days'] = 'Próximos 7 días';
 $string['next30days'] = 'Próximos 30 días';
 $string['next3months'] = 'Próximos 3 meses';
 $string['next6months'] = 'Próximos 6 meses';
 $string['tasksearch'] = 'Buscar por asunto o resumen';
 $string['todolist'] = 'Lista de tareas';
 $string['failedtomarkcomplete'] = 'No se pudo marcar como completado';
 $string['failedtomarkincomplete'] = 'No se pudo marcar como incompleto';
 $string['failedtodeletetask'] = 'No se pudo eliminar la tarea';
 $string['notasks'] = 'No hay tareas disponibles.';
 $string['deletetask'] = 'Eliminar tarea';
 $string['deletetaskmessage'] = '¿Desea eliminar la tarea <strong>"{$a}"</strong>?';
 $string['taskdeleted'] = 'Tarea <strong>{$a}</strong> eliminada exitosamente.';
 $string['searchresultfor'] = 'Mostrando resultados para <em>{$a}</em>';

 $string['quizstats'] = 'Intentos de cuestionario';
 $string['totalusersattemptedquiz'] = 'Total de usuarios que intentaron el cuestionario';
 $string['totalusersnotattemptedquiz'] = 'Total de usuarios que no intentaron el cuestionario';

 $string['createsubject'] = '{$a->createdby} te asignó: {$a->subject}';
 $string['createmessage'] = 'Tarea: {$a->subject}<br>Resumen: {$a->summary}<br>Asignado a: {$a->assignedto}<br>Vencimiento: {$a->timedue}';
 $string['incompletesubject'] = '{$a->user} marcó {$a->subject} como incompleto.';
 $string['incompletemessage'] = $string['createmessage'];
 $string['completesubject'] = '{$a->user} completó {$a->subject}.';
 $string['completemessage'] = '{$a->user} completó {$a->subject}<br>Resumen: {$a->summary}<br>Vencimiento: {$a->timedue}<br>Completado en:{$a->completedon}';
 $string['editsubject'] = '{$a->createdby} actualizó la tarea: {$a->subject}';
 $string['editmessage'] = $string['createmessage'];
 $string['addedsubject'] = '{$a->createdby} te añadió en la tarea: {$a->subject}';
 $string['addedmessage'] = $string['createmessage'];
 $string['removedsubject'] = '{$a->createdby} te eliminó de la tarea: {$a->subject}';
 $string['removedmessage'] = $string['createmessage'];

 $string['courseprogress'] = 'Progreso del curso';
 $string['progress'] = "Progreso";
 $string['name'] = "Nombre";
 $string['status'] = "Estado";
 $string['back'] = "Volver";
 $string['enrolleduserstats'] = 'Estadísticas de usuarios inscritos';

 $string['coursestats'] = 'Estadísticas del curso';
 $string['enrolledusers'] = 'Usuarios inscritos';
 $string['studentcompleted'] = 'Estudiantes completados';
 $string['inprogress'] = 'En progreso';
 $string['yettostart'] = 'Aún por comenzar';

 $string['userstats'] = 'Estadísticas del usuario';
 $string['lastaccesstime'] = '{$a->time} atrás';
 $string['numsecond'] = '{$a} seg';
 $string['numminute'] = '{$a} min';
 $string['numhour'] = '{$a} hora';
 $string['numday'] = '{$a} día';
 $string['nummonth'] = '{$a} mes';
 $string['numyear'] = '{$a} año';
 $string['enrolmentdate'] = 'Fecha de inscripción';
 $string['nostudentsenrolled'] = 'No hay estudiantes inscritos.';
 $string['nocoursecompletion'] = 'La finalización del curso no está habilitada';
 $string['searchnameemail'] = 'Buscar por nombre o correo electrónico';
 $string['exportcsv'] = 'Exportar CSV';

 $string['availableonlyadminteacher'] = "Este bloque está disponible solo para el Administrador, Profesor y Gerente.";
 $string['availableonlyadminmanager'] = "Este bloque está disponible solo para el Administrador y Gerente.";
 $string['parametermustbeobjectorintegerorstring'] = "El parámetro debe ser un objeto, un entero o una cadena.";

 $string['filterpluginreleasenoteice'] = "El plugin de filtro de 'Edwiser Page Builder' no está actualizado. Visite '<a target='_blank' href=' http://edwiser.org/my-account'>Mi cuenta</a>' en el sitio de Edwiser para descargar y actualizar el plugin.";

 $string['courseprogressblockdesc'] = 'Este bloque es visible para Profesores y Creadores de cursos. Muestra el ritmo al que los estudiantes están progresando en un curso.';
 $string['enrolledusersblockdesc'] = 'Este bloque es visible para Gerentes y Administradores. Muestra gráficamente todos los estudiantes que se han registrado en un curso.';
 $string['quizattemptsblockdesc'] = 'Este bloque es visible para Profesores y Creadores de cursos. Muestra un informe gráfico de todos los intentos y no intentos de cuestionarios por parte de los estudiantes.';
 $string['courseanalyticsblockdesc'] = 'Este bloque funciona mejor para Estudiantes. Muestra un informe gráfico de todas las calificaciones que ha obtenido en los cursos en los que está inscrito.';
 $string['latestmembersblockdesc'] = 'Este bloque es visible para Profesores, Gerentes y Administradores. Muestra todos los estudiantes que se han registrado recientemente en el LMS.';
 $string['addnotesblockdesc'] = 'Este bloque es útil para un Profesor o Creador de cursos. Permite enviar notas o instrucciones relacionadas con el curso a los estudiantes rápidamente.';
 $string['recentfeedbackblockdesc'] = 'Este bloque es útil para los Estudiantes. Pueden buscar los comentarios y sugerencias más recientes de sus profesores relacionados con diversas actividades de Moodle en las que participan.';
 $string['recentforumsblockdesc'] = 'Este bloque es útil para los Estudiantes. Pueden realizar un seguimiento de todas las actualizaciones e interacciones más recientes que ocurren en un foro en el que están suscritos.';
 $string['coursesncategoriesblockdesc'] = 'Este bloque funciona para todos, pero para Profesores, Creadores de cursos y Gerentes, proporciona enlaces rápidos relacionados con el curso para tomar acciones necesarias rápidamente.';
 $string['todolistblockdesc'] = 'Un bloque de gestión de tareas que funciona mejor para todos los roles de usuario. Las tareas pueden crearse y asignarse tanto a uno mismo como a otros.';

 $string['homepagemigrationfailtitlemsg'] = 'Error en la migración';
 $string['tryagain'] = 'Intentar de nuevo';
 $string['viewhomepage'] = 'Ver página de inicio';

 $string['staticblocks'] = "Bloques estáticos";
 $string['dynamicblocks'] = "Bloques dinámicos";
 $string['layoutblocks'] = "Diseños";

 $string['staticallcategory'] = "Todas las categorías";
 $string['dynamicallcategory'] = "Todos los bloques dinámicos";
 $string['layoutallcategory'] = "Todos los diseños";


$string['updatedblocksinfotext'] = "Todos los bloques de remui están actualizados";
$string['formpageselector'] = "Selector de página";
$string['formpagename'] = "Nombre de la página";
$string['formpagewidth'] = "Ancho de la página";
$string['featuredcoursesblockdesc'] = "El bloque de cursos destacados está diseñado para mostrar tu mejor contenido y atraer a los estudiantes.";
$string["blockimportexportwarning"] = "Error: Archivo no válido. Verifique que el archivo subido sea un archivo JSON válido de Edwiser.";
