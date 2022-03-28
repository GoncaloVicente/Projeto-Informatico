<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->group(
    function () {
        //Rotas Dashboard
        Route::get('user', 'DasboardControllerAPI@perfil');
        Route::get('user/uc', 'DasboardControllerAPI@getUCProf');
        Route::get('ucs/all', 'DasboardControllerAPI@getAllUCs');
        Route::get('aulas/mes', 'DasboardControllerAPI@aulasPorMes');
        Route::get('temas/all', 'DasboardControllerAPI@getAllTemas');
        Route::get('cursos/all', 'DasboardControllerAPI@getAllCursos');
        Route::get('user/cursos', 'DasboardControllerAPI@getCursosProf');
        Route::get('aulas/uc/mes', 'DasboardControllerAPI@aulasPorUCMes');
        Route::get('tutorias/mes', 'DasboardControllerAPI@tutoriasPorMes');
        Route::get('conteudos/all', 'DasboardControllerAPI@getAllConteudos');
        Route::get('tutorias/uc/mes', 'DasboardControllerAPI@tutoriasPorUCMes');
        Route::get('user/autenticado', 'DasboardControllerAPI@userAutenticado');
        Route::get('tutorias/marcadas/all', 'DasboardControllerAPI@getAllTutoriasMarcadas');
        Route::get('tutorias/pendentes/all', 'DasboardControllerAPI@getAllTutoriasPendentes');
        Route::put('/perfil/{id}', 'DasboardControllerAPI@update');

        //Rotas Alunos
        Route::get('alunos', 'AlunoControllerAPI@index');
        Route::get('aluno/aula', 'AlunoControllerAPI@getAlunoAula');
        Route::get('alunos/{search}', 'AlunoControllerAPI@getAlunos');
        Route::get('aluno/unidadeCurricular', 'AlunoControllerAPI@getAlunoUnidadeCurricular');
        Route::post('aluno/new', 'AlunoControllerAPI@store');
        Route::post('aluno/excel', 'AlunoControllerAPI@excel');
        Route::put('/aluno/{id}', 'AlunoControllerAPI@update');

        //Rotas Professores
        Route::get('professores', 'ProfessorControllerAPI@index');
        Route::get('professor/uC', 'ProfessorControllerAPI@getProfessorUc');
        Route::get('professor/curso', 'ProfessorControllerAPI@getProfessorCurso');
        Route::get('professores/{search}', 'ProfessorControllerAPI@getProfessores');
        Route::post('professor/new', 'ProfessorControllerAPI@store');
        Route::put('/professor/{id}', 'ProfessorControllerAPI@update');

        //Rotas Aulas
        Route::get('aulas', 'AulaControllerAPI@index');
        Route::get('tema/conteudo', 'AulaControllerAPI@getTemaConteudo');
        Route::get('aulas/conteudo', 'AulaControllerAPI@getAulaConteudo');
        Route::get('aulas/arquivadas', 'AulaControllerAPI@indexArquivadas');
        Route::patch('aula/codigo/{id}', 'AulaControllerAPI@getCodigo');
        Route::patch('aula/arquivar/{id}', 'AulaControllerAPI@arquivar');
        Route::patch('aula/iniciar/{id}', 'AulaControllerAPI@iniciarAula');
        Route::patch('aula/terminar/{id}', 'AulaControllerAPI@terminarAula');
        Route::patch('aula/desarquivar/{id}', 'AulaControllerAPI@desarquivar');
        Route::post('aula/new', 'AulaControllerAPI@store');
        Route::post('aula/conteudo', 'AulaControllerAPI@adicionarAulaConteudo');
        Route::post('aula/conteudos/{id}', 'AulaControllerAPI@adicionarAulaConteudos');
        Route::put('/aula/{id}', 'AulaControllerAPI@update');

        //Rotas Unidades Curriculares
        Route::get('unidadesCurriculares', 'UnidadeCurricularControllerAPI@index');
        Route::get('unidadeCurricular/professor', 'UnidadeCurricularControllerAPI@getCursoProfessor');
        Route::get('unidadesCurriculares/{search}', 'UnidadeCurricularControllerAPI@getUnidadesCurriculares');
        Route::get('unidadesCurricularescurso/{search}', 'UnidadeCurricularControllerAPI@getUnidadesCurricularesByCursos');
        Route::patch('unidadeCurricular/ativar/{id}', 'UnidadeCurricularControllerAPI@ativarUC');
        Route::patch('unidadeCurricular/desativar/{id}', 'UnidadeCurricularControllerAPI@desativarUC');
        Route::post('unidadeCurricular/new', 'UnidadeCurricularControllerAPI@store');
        Route::put('/unidadeCurricular/{id}', 'UnidadeCurricularControllerAPI@update');

        //Rotas Temas
        Route::delete('tema/delete/{id}','TemaControllerAPI@delete');
        Route::get('temas', 'TemaControllerAPI@index');
        Route::get('tema', 'TemaControllerAPI@getTemas');
        Route::get('temas/{search}', 'TemaControllerAPI@getTema');
        Route::get('tema/conteudos', 'TemaControllerAPI@getTemaConteudo');
        Route::post('tema/new', 'TemaControllerAPI@store');
        Route::put('/tema/{id}', 'TemaControllerAPI@update');

        //Rotas Conteudos
        Route::delete('conteudo/delete/{id}','ConteudoControllerAPI@delete');
        Route::get('conteudos', 'ConteudoControllerAPI@index');
        Route::post('conteudo/new', 'ConteudoControllerAPI@store');
        Route::put('/conteudo/{id}', 'ConteudoControllerAPI@update');

        //Rotas Classificacoes
        Route::get('aula/alunos', 'ClassificacaoControllerAPI@getAlunosAula');
        Route::get('aulas/classificadas', 'ClassificacaoControllerAPI@getAulasClassificadas');
        Route::get('aula/conteudo', 'ClassificacaoControllerAPI@getClassficicacaoPorConteudo');
        Route::get('aluno/classificacao', 'ClassificacaoControllerAPI@getClassficicacaoPorAluno');
        Route::get('aula/atual', 'ClassificacaoControllerAPI@getAulaAtual');

        //Rotas Salas
        Route::get('salas', 'SalaControllerAPI@index');
        Route::get('salas/{search}', 'SalaControllerAPI@getSalas');
        Route::post('sala/new', 'SalaControllerAPI@store');
        Route::put('/sala/{id}', 'SalaControllerAPI@update');

        //Rotas Tutorias
        Route::get('tutorias', 'TutoriaControllerAPI@index');
        Route::get('tutorias/arquivadas', 'TutoriaControllerAPI@indexArquivadas');
        Route::patch('tutorias/arquivar/{id}', 'TutoriaControllerAPI@arquivar');
        Route::patch('tutorias/desarquivar/{id}', 'TutoriaControllerAPI@desarquivar');
        Route::patch('tutorias/confirmar/{id}', 'TutoriaControllerAPI@confirmarTutoria');
        Route::patch('tutorias/retirar/{id}', 'TutoriaControllerAPI@retirarConfirmacaoTutoria');
        Route::post('tutoria/new', 'TutoriaControllerAPI@store');
        Route::put('/tutoria/{id}', 'TutoriaControllerAPI@update');

        //Rotas Cursos
        Route::get('cursos', 'CursoControllerAPI@index');
        Route::get('curso/uc', 'CursoControllerAPI@getCursoUc');
        Route::get('cursos/{search}', 'CursoControllerAPI@getCursos');
        Route::patch('curso/ativar/{id}', 'CursoControllerAPI@ativarCurso');
        Route::patch('curso/desativar/{id}', 'CursoControllerAPI@desativarCurso');
        Route::post('curso/new', 'CursoControllerAPI@store');
    });

//Rotas API Movel
Route::post('aula/registar', 'APIMovel@registarAulaAluno');
Route::get('aula/{id}', 'APIMovel@getAula');
Route::get('aula/{id}/conteudos', 'APIMovel@getConteudosAula');
Route::get('aula/{aula_id}/aluno/{aluno_id}/classificacoes', 'APIMovel@getClassificacoesAlunoAula');
Route::post('classificacao', 'APIMovel@storeClassificacao');
Route::put('classificacao', 'APIMovel@updateClassificacao');
Route::get('aluno/{id}/aulas/anteriores', 'APIMovel@getAulasAnteriores');
Route::get('aula/{aula_id}/aluno/{aluno_id}/classificacoes/total', 'APIMovel@getClassificacoesAlunoAulaTotal');
Route::get('anosLetivos', 'APIMovel@getAnosLetivos');
Route::get('anosCursos', 'APIMovel@getAnosCursos');
Route::get('aluno/{id}/professores', 'APIMovel@getProfessoresUCs');
Route::post('tutoria', 'APIMovel@storeTutoria');
Route::get('aluno/{id}/tutorias', 'APIMovel@getTutoriasAluno');
Route::get('aluno/{id}/tutorias/arquivadas', 'APIMovel@getTutoriasArquivadasAluno');
Route::patch('tutoria/{id}/confirmar', 'APIMovel@confirmarTutoria');
Route::patch('tutoria/{id}/retirar', 'APIMovel@retirarConfirmacaoTutoria');
Route::put('tutoria/{id}/edit', 'APIMovel@updateTutoria');
Route::patch('tutoria/{id}/aluno/arquivar', 'APIMovel@arquivarTutoria');
Route::patch('tutoria/{id}/aluno/recuperar', 'APIMovel@recuperarTutoria');

//Rotas API Movel [Login]
Route::post('login', 'APIMovel@login');
