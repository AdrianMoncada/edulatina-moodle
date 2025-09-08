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
 $string['nav_name'] = 'Editor de Blocos';
 $string['eb_block_editor_title'] = 'Edwiser Page Builder';
 $string['updatecontent'] = 'Atualizar Tarefa de Conteúdo';
 $string['cachedef_edwiserblockcontent'] = "Edwiser Page Builder - Dados em cache para armazenar o conteúdo do bloco.";

 $string['livecustomizer'] = "Personalizador ao Vivo";
 $string['update'] = "Atualizar";
 $string['download'] = "Baixar";
 $string['fetchblocklist'] = "Buscar Lista de Blocos";
 $string['fetchcardslist'] = "Buscar Lista de Cartões";

 $string['failedtodeletefile'] = 'Falha ao excluir o arquivo, por favor, verifique se você tem permissão suficiente para excluir o arquivo.';

 $string['filedeletionsuccessful'] = 'Arquivo excluído com sucesso.';
 $string['filesavingsuccessful'] = 'Arquivos salvos com sucesso';
 $string['filesavingfailed'] = 'Falha ao salvar os arquivos, por favor, tente novamente.';
 $string['filedoesnotexist'] = 'O arquivo não existe, tente atualizar e carregar novamente.';

 $string["unabletofetchjson"] = "Não foi possível buscar o conteúdo JSON";
 $string["provideproperblockname"] = "Por favor, forneça um nome de bloco adequado";
 $string["blockupdatesuccess"] = "Bloco atualizado com sucesso";
 $string["updateblocklistonly"] = "Atualizar apenas a lista de blocos do Edwiser, não seu conteúdo.";
 $string["updatelayoutlistonly"] = "Atualizar apenas a lista de layouts do Edwiser, não seu conteúdo.";
 $string["updateblockcontent"] = "Atualizar o conteúdo do bloco";
 $string["nomediafile"] = "Opa! Nenhum arquivo de mídia encontrado.";
 $string["mediaselpopuptite"] = 'Selecionar ou Fazer Upload de Mídia';
 $string["mediaselpopuptab1tite"] = 'Enviar Arquivos';
 $string["mediaselpopuptab2tite"] = 'Biblioteca de Mídia';
 $string["mediaselpopuplbldetials"] = 'Detalhes da Mídia';
 $string["mediadeletebtn"] = 'Excluir Permanentemente';
 $string["mediasavebtn"] = 'Salvar Arquivo';
 $string["mediaselectbtn"] = 'Selecionar Arquivo';
 $string["deleteblockcontent"] = "Excluir o conteúdo do bloco";
 $string["blockdeprecated"] = "Bloco Descontinuado";

 $string["createpage"] = "Criar Página";
 $string["usetemplate"] = "Usar modelo";
 $string["createnewpage"] = "Criar Nova Página";
 $string["updatepage"] = "Modificar Página";

 $string["fullscreenwidth"] = "Largura da Página em Tela Cheia";
 $string["regularwidth"] = "Largura Regular da Página";

 $string["preview"] = "Visualizar";
 $string["page"] = "Página";
 $string["login"] = "Entrar";
 $string["testgroup"] = "Grupo de Teste";

 $string["cannotaddpage"] = "Verifique se o plugin da página do módulo está instalado e se você tem permissão adequada para adicionar a página.";
 $string['close'] = 'Fechar';

 $string['epbfpluginexistinfo'] = 'Se você estiver enfrentando problemas para exibir alguns blocos, certifique-se de que o plugin do Filtro do Edwiser Page Builder esteja habilitado.
 <a href="'.$CFG->wwwroot.'/admin/filters.php'.'">Clique aqui</a> para habilitar o plugin do Filtro do Edwiser Page Builder.';
 $string['epbfpluginnotexistinfo'] = "O plugin do Filtro do Edwiser Page Builder não existe, algumas funcionalidades não funcionarão.";
 $string['Checkforupdate'] = 'Verificar atualizações';
 $string['remuiblocks'] = 'Blocos RemUI';
 $string['moodleblocks'] = 'Blocos Moodle';

 $string['showblocklayoutaddhead'] = 'Adicionar Layout de Página';
 $string['showblocklayoutaddbody'] = 'Tem certeza de que deseja continuar?
 <br><br> Isso removerá todos os blocos na região do bloco - {$a} e substituirá pelos blocos de layout de página selecionados';

 $string['pagelayoutaddwarningmsg'] = 'É necessário a versão do Tema Edwiser RemUI {$a} ou superior. Por favor, atualize o tema para sua última versão';
 $string['homepagemigrationtitlemsg'] = 'Migração concluída com sucesso';
 $string['homepagemigrationdesc'] = 'Sua página inicial atual foi migrada perfeitamente para o novo construtor de páginas. Clique abaixo para acessar a página inicial e começar a personalizá-la sem esforço, sem necessidade de habilidades de codificação!';
 $string['homepagemigrationnoblockmsg'] = 'Sem conteúdo para exibir. Para criar conteúdo da página inicial usando o construtor de páginas, ative o modo de edição e adicione blocos';
 $string['homepageadvblockmsg'] = "Para adicionar esses blocos na região de conteúdo, ative a opção de construtor de página do Edwiser na página inicial da página de configurações do Edwiser RemUI. <strong>Administração do site → Aparência → Edwiser RemUI → Página de configuração da Página Frontal → Escolha o design da página inicial</strong>";

 $string['edwiserpagebuilder:epb_can_manage_page'] = "Epb pode gerenciar página";
 $string['edwiserpagebuilder:epb_can_view_page'] = "Epb pode visualizar página";

 $string['addnewpage'] = "Adicionar uma nova página";
 $string['next'] = "Próximo";
 $string['pagetitle'] = "Título da página";

 $string['formgeneralheading'] = "Geral";
 $string['pagename'] = "Título/Nome da Página";
 $string['pagename_error'] = "O título da página não pode estar vazio";
 $string['pagecontent'] = "Conteúdo da Página";
 $string['formdisplayheading'] = "Exibição da Página";
 $string['pagelayout_name'] = "Layout da Página";
 $string['startdate'] = "Data de Início da Página";
 $string['enddate'] = "Data de Término da Página";
 $string['capabilities'] = "Capacidades";
 $string['capabilities_placeholder'] = "Todas as capacidades permitidas";
 $string['allowloginonly'] = "Mostrar apenas com login";
 $string['visible'] = "Status de Visibilidade";
 $string['show'] = "Mostrar";
 $string['hide'] = "Esconder";
 $string['seoinfo'] = "SEO";
 $string['seotag'] = "Título Meta";
 $string['seodesc'] = "Descrição Meta";
 $string['allowindex'] = "Indexar esta página";
 $string['submitpublish'] = "Salvar e publicar";
 $string['submitdraft'] = "Salvar como rascunho";

 $string['sitesetting'] = "Páginas Personalizadas";
 $string['sitesetting_desc'] = "Criar novas páginas";
 $string['pagetable_name'] = "Nome da página";
 $string['pagename'] = "Nome da página";
 $string['pagetable_date'] = "Data de modificação";
 $string['pagetable_action'] = "Operações";
 $string['titlepagetableaction'] = "Operações"; 
 $string['no_data_text'] = "Sem dados";
 $string['draft_text'] = "Rascunho";
 $string['hidden_text'] = "Página oculta";
 $string['publish_text'] = "Publicar";
 $string['update_text'] = "Atualizar";
 $string['no'] = 'Não';
 $string['yes'] = 'Sim';

 $string['replicate_toast_msg'] = 'A página foi duplicada em uma guia separada.';
 $string['copyurl_toast_msg'] = 'O link da página foi copiado.';
 $string['delete_toast_msg'] = "A página foi excluída.";
 $string['show_toast_msg'] = "As alterações foram salvas como rascunho. Para torná-lo ATIVO, clique no botão publicar/atualizar.";
 $string['next'] = "Próximo";
 $string['pagetitle'] = "Título da Página";
 $string['selectpagetemplate'] = "Selecione um modelo de página";
 $string['back'] = "Voltar";
 $string['create'] = "Criar";
 $string['chooselayout'] = "Escolher layout";

 $string['pagedeletationmodalhead'] = 'Excluir Página';
 $string['pagedeletationmodaldesc'] = 'Esta ação excluirá permanentemente a página, e todo o seu conteúdo será perdido. Você tem certeza?';
 $string['pagepublishmodalhead'] = 'Confirmação de publicação da página';
 $string['pagepublishmodaldesc'] = 'Você tem certeza de que deseja publicar esta página?';
 $string['pageupdatemodalhead'] = 'Confirmação de atualização da página';
 $string['pageupdatemodaldesc'] = 'Você tem certeza de que deseja atualizar esta página?';

 $string['sitepagessettings'] = "Páginas Personalizadas";
 $string['editpage'] = "Editar Página";
 $string['managepages'] = "Gerenciar páginas";
 $string['select'] = "Selecionar";

 $string["addblanktemplatetext"] = 'Adicionar modelo em branco';

 // Títulos de tooltips
 $string['copyurl'] = "Copiar URL da página";
 $string['pagesettings'] = "Configurações da página";
 $string['replicatepage'] = "Replicar página";
 $string['subheadertitle'] = "navbar da página do site";
 $string['publishpage'] = "Publicar página";
 $string['deletepage'] = "Excluir página";
 $string['editpagetitle'] = "Editar título da página";
 $string['submitpagename'] = "Enviar novo nome da página";
 $string['duplicatepage'] = "Duplicar página";
 $string['showpage'] = "Mostrar";
 $string['hidepage'] = "Esconder";

 $string['pagelinkcopied'] = 'O link da página {$a} foi copiado';
 $string['pagedesc'] = "Descrição da página";
 $string['published'] = "Página publicada com sucesso.";
 $string['updatemsg'] = "Página atualizada com sucesso.";

 $string['default_draft_header_msg'] = "Atualmente, a página está no modo 'Rascunho'. Ative o modo de edição para 'Atualizar ou Publicar'.";
 $string['default_drafthidden_header_msg'] = "Atualmente, a página está no modo 'Rascunho e Oculta'. Ative o modo de edição para 'Atualizar ou Publicar'.";
 $string['default_hidden_header_msg'] = "Atualmente, a página está no modo 'Oculta'. Ative o modo de edição para 'Atualizar ou Publicar'.";
 $string['preview'] = "Visualizar";
 $string['default_preview_header_msg'] = "Atualmente, você está no modo 'Visualização'. Para continuar editando";
 $string['close_preview'] = "Fechar visualização";
 $string['accesserror'] = "Desculpe, não conseguimos encontrar a página que você está procurando.";

 $string['viewallusers'] = 'Ver todos os membros';

 // Adicionar notas
 $string['selectacourse'] = 'Selecionar um Curso';
 $string['selectastudent'] = 'Selecionar Estudante';
 $string['addsitenote'] = 'Adicionar Nota do Site';
 $string['addcoursenote'] = 'Adicionar Nota do Curso';
 $string['addpersonalnote'] = 'Adicionar Nota Pessoal';
 $string['deadlines'] = 'Prazos';
 $string['selectastudent'] = 'Selecionar Estudante';
 $string['nousersenrolledincourse'] = 'Não há usuários matriculados no Curso {$a}.';
 $string['selectcoursetodisplayusers'] = 'Selecione um Curso para exibir seus usuários matriculados aqui.';

 // Tarefas Recentes
 $string['assignmentstobegraded'] = 'Tarefas a serem avaliadas';

 $string['grade'] = 'Nota';

 $string['norecentfeedback'] = 'Nenhum Feedback Recente!';
 $string['norecentforums'] = 'Nenhum Fórum Recente';
 $string['noofstudents'] = 'Número de Estudantes';
 $string['lastpostdate'] = 'Data';


 $string['highestgrade'] = "Nota Mais Alta";
 $string['lowestgrade'] = "Nota Mais Baixa";
 $string['averagegrade'] = "Nota Média";
 $string['viewcourse'] = "Visualizar Curso";
 $string['allActivities'] = "Todas as Atividades";

 // Analytics do Curso
 $string['showing'] = 'Mostrando';
 $string['showingfromto'] = 'Mostrando de {$a->start} a {$a->to} de {$a->total}';
 $string['bars'] = 'barras';
 $string['lastattempt'] = 'Última Tentativa';
 $string['globalattempt'] = 'Média Global';

 // Progresso do Curso
 $string['alwaysload'] = 'Sempre carregar progresso';
 $string['alwaysloaddesc'] = 'Quando marcado, o progresso do curso será sempre carregado.';
 $string['alwaysloadwarning'] = 'Para um grande número de cursos, o cálculo de progresso leva muito tempo. Isso afetará o tempo de carregamento da página do painel. O aviso desaparecerá permanentemente se você continuar. Continuar?';
 $string['loadcourseprogress'] = 'Carregar progresso';
 $string['loadcourseprogressdesc'] = 'Quando marcado, o progresso do curso será carregado. Na atualização da página, ele será redefinido.';
 $string['enrolledstudents'] = "Estudantes";
 $string['coursestartdate'] = "Data de Início";
 $string['progress'] = "Progresso";
 $string['searchforcourses'] = 'Buscar por Cursos';
 $string['datatableinfo'] = "Mostrando _START_ to _END_ of _TOTAL_ entradas"; // Não altere o texto "_START_ to _END_ of _TOTAL_" nesta string;
 $string['search'] = 'Buscar';


 // Enrolled users block
$string['selectcategory'] = 'Selecionar Categoria';
$string['problemwhileloadingdata'] = 'Desculpe, ocorreu um problema ao carregar os dados.';
$string['nousersincoursecategoryfound'] = 'Nenhum usuário matriculado encontrado nesta Categoria de Curso.';
$string['nocoursecategoryfound'] = 'Nenhuma categoria de curso encontrada no sistema.';

// To Do List
$string['tasks']            = 'Tarefas';
$string['timeline'] = 'Linha do tempo';
$string['addtask'] = 'Adicionar tarefa';
$string['courseevents'] = 'Eventos do curso';
$string['incomplete'] = 'Incompleto';
$string['due'] = 'Devido';
$string['duedate'] = 'Data de Vencimento';
$string['noduedate'] = 'Sem data de vencimento';
$string['createtask'] = 'Criar nova tarefa';
$string['edittask'] = 'Editar tarefa';
$string['nosavebutton'] = 'Nenhum botão de salvar encontrado';
$string['subject'] = 'Assunto';
$string['missingsubject'] = 'Assunto ausente';
$string['summary'] = 'Resumo';
$string['nosummary'] = 'Sem resumo';
$string['selectuser'] = 'Selecionar usuários';
$string['moreassignee'] = '{$a} mais';
$string['notify'] = 'Notificar';
$string['next7days'] = 'Próximos 7 dias';
$string['next30days'] = 'Próximos 30 dias';
$string['next3months'] = 'Próximos 3 meses';
$string['next6months'] = 'Próximos 6 meses';
$string['tasksearch'] = 'Pesquisar por Assunto ou Resumo';
$string['todolist'] = 'Lista de Tarefas';
$string['failedtomarkcomplete'] = 'Falha ao marcar como completo';
$string['failedtomarkincomplete'] = 'Falha ao marcar como incompleto';
$string['failedtodeletetask'] = 'Falha ao excluir tarefa';
$string['notasks'] = 'Não há tarefas disponíveis.';
$string['deletetask'] = 'Excluir tarefa';
$string['deletetaskmessage'] = 'Você deseja excluir a tarefa <strong>"{$a}"</strong>?';
$string['taskdeleted'] = 'Tarefa <strong>{$a}</strong> excluída com sucesso.';
$string['searchresultfor'] = 'Mostrando resultados para <em>{$a}</em>';

// Quiz stats
$string['quizstats'] = 'Tentativa de Quiz';
$string['totalusersattemptedquiz'] = 'Total de usuários que tentaram o Quiz';
$string['totalusersnotattemptedquiz'] = 'Total de usuários que não tentaram o Quiz';

// Notification string start
$string['createsubject'] = '{$a->createdby} atribuiu a você: {$a->subject}';
$string['createmessage'] = 'Tarefa: {$a->subject}<br>Resumo: {$a->summary}<br>Atribuído a: {$a->assignedto}<br>Vencimento: {$a->timedue}';
$string['incompletesubject'] = '{$a->user} marcou {$a->subject} como incompleto.';
$string['incompletemessage'] = $string['createmessage'];
$string['completesubject'] = '{$a->user} completou {$a->subject}.';
$string['completemessage'] = '{$a->user} completou {$a->subject}<br>Resumo: {$a->summary}<br>Vencimento: {$a->timedue}<br>Completado em: {$a->completedon}';
$string['editsubject'] = '{$a->createdby} atualizou a tarefa: {$a->subject}';
$string['editmessage'] = $string['createmessage'];
$string['addedsubject'] = '{$a->createdby} adicionou você na tarefa: {$a->subject}';
$string['addedmessage'] = $string['createmessage'];
$string['removedsubject'] = '{$a->createdby} removeu você da tarefa: {$a->subject}';
$string['removedmessage'] = $string['createmessage'];
// Notification strings end

// Teacher Dashboard Strings
$string['courseprogress']   = 'Progresso do Curso';
$string['progress'] = "Progresso";
$string['name'] = "Nome";
$string['status'] = "Status";
$string['back'] = "Voltar";
$string['enrolleduserstats'] = 'Estatísticas de Usuários Matriculados';

// Course stats
$string['coursestats'] = 'Estatísticas do Curso';
$string['enrolledusers'] = 'Usuários Matriculados';
$string['studentcompleted'] = 'Estudantes Concluídos';
$string['inprogress'] = 'Em Progresso';
$string['yettostart'] = 'Ainda não começou';

// User stats
$string['userstats'] = 'Estatísticas do Usuário';
$string['lastaccesstime'] = '{$a->time} atrás';
$string['numsecond'] = '{$a} seg';
$string['numminute'] = '{$a} min';
$string['numhour'] = '{$a} hora';
$string['numday'] = '{$a} dia';
$string['nummonth'] = '{$a} mês';
$string['numyear'] = '{$a} ano';
$string['enrolmentdate'] = 'Data de Matrícula';
$string['nostudentsenrolled'] = 'Nenhum aluno matriculado.';
$string['nocoursecompletion'] = 'A conclusão do curso não está habilitada';
$string['searchnameemail'] = 'Buscar por nome ou e-mail';
$string['exportcsv'] = 'Exportar CSV';
$string['uneditablewarningmsg'] = 'A visualização dos dados dentro deste bloco não está disponível durante a edição. No entanto, o conteúdo será exibido corretamente quando você sair do personalizador. <strong>Você ainda pode adicionar, remover e personalizar componentes usando a barra de edição à esquerda.</strong>';

$string['availableonlyadminteacher'] = "Este bloco está disponível apenas para Admin, Professor e Gerente.";
$string['availableonlyadminmanager'] = "Este bloco está disponível apenas para Admin e Gerente.";
$string['parametermustbeobjectorintegerorstring'] = "O parâmetro deve ser um objeto, um número inteiro ou uma string.";

$string['filterpluginreleasenoteice'] ="O 'Plugin de Filtro do Edwiser Page Builder' não está atualizado. Visite '<a target='_blank' href=' http://edwiser.org/my-account'>Minha Conta</a>' no site Edwiser para baixar e atualizar o plugin.";

$string['courseprogressblockdesc'] = 'Este bloco é visível para Professores e Criadores de Cursos. Ele exibe o ritmo em que os estudantes estão progredindo em um curso.';
$string['enrolledusersblockdesc'] = 'Este bloco é visível para Gerentes e Administradores. Ele exibe graficamente todos os alunos que se registraram em um curso.';
$string['quizattemptsblockdesc'] = 'Este bloco é visível para Professores e Criadores de Cursos. Ele exibe um relatório gráfico de todas as tentativas e não tentativas de quiz pelos alunos.';
$string['courseanalyticsblockdesc'] = 'Este bloco é ideal para Estudantes. Ele exibe um relatório gráfico de todas as notas que você obteve nos cursos matriculados.';
$string['latestmembersblockdesc'] = 'Este bloco é visível para Professores, Gerentes e Administradores. Ele exibe todos os alunos que se registraram recentemente na plataforma.';
$string['addnotesblockdesc'] = 'Este bloco é útil para Professores ou Criadores de Cursos. Ele permite enviar rapidamente notas ou instruções relacionadas ao curso para os alunos.';
$string['recentfeedbackblockdesc'] = 'Este bloco é útil para Estudantes. Eles podem verificar os comentários e sugestões mais recentes de seus professores relacionados às várias atividades do Moodle das quais fazem parte.';
$string['recentforumsblockdesc'] = 'Este bloco é útil para Estudantes. Eles podem acompanhar todas as atualizações e interações mais recentes que ocorrem em um fórum no qual estão inscritos.';
$string['coursesncategoriesblockdesc'] = 'Este bloco funciona para todos, mas para Professores, Criadores de Cursos e Gerentes, ele fornece links rápidos relacionados ao curso para tomar ações necessárias rapidamente.';
$string['todolistblockdesc'] = 'Um bloco de gerenciamento de tarefas que funciona melhor para todos os papéis de usuário. As tarefas podem ser criadas e atribuídas a si mesmo ou a outros.';

$string['homepagemigrationfailtitlemsg'] = 'Falha na migração';
$string['tryagain'] = 'Tente novamente';
$string['viewhomepage'] = 'Ver página inicial';

$string['staticblocks'] = "Blocos Estáticos";
$string['dynamicblocks'] = "Blocos Dinâmicos";
$string['layoutblocks'] = "Layouts";

$string['staticallcategory'] = "Todas as categorias";
$string['dynamicallcategory'] = "Todos os blocos dinâmicos";
$string['layoutallcategory'] = "Todos os layouts";

$string['updatedblocksinfotext'] = "Todos os blocos remui estão atualizados";
$string['formpageselector'] = "Seletor de página";
$string['formpagename'] = "Nome da página";
$string['formpagewidth'] = "Largura da página";
$string['featuredcoursesblockdesc'] = "O bloco de cursos em destaque foi projetado para mostrar seu melhor conteúdo e atrair alunos.";
$string["blockimportexportwarning"] = "Erro: Arquivo inválido. Certifique-se de que o arquivo enviado seja um arquivo JSON Edwiser válido.";