<?php

namespace App\Http\Controllers;

use App\Aula;
use App\Aluno;
use App\Conteudo;
use App\Classificacao;
use App\Aula_has_Aluno;
use App\Aula_Has_Conteudo;
use App\UnidadeCurricular;
use App\Aluno_Has_UnidadeCurricular;
use App\UnidadeCurricular_Has_Professor;
use App\Tutoria;
use App\Professor;
use App\User;

use App\Events\TutoriaConfirmedMov;
use App\Events\TutoriaWithdrawConfirmationMov;
use App\Events\TutoriaCreatedMov;
use App\Events\TutoriaChangedMov;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

use App\Http\Resources\Conteudo as ConteudoResource;
use App\Http\Resources\Aula as AulaResource;
use App\Http\Resources\Tutoria as TutoriaResource;

class APIMovel extends Controller
{
    public function login(Request $request)
    {/*
        if(!isset($request->username) || !isset($request->password)){
            return response()->json(['msg'=>'Insira o número de estudante e a senha'],400);
        }

        $adServer = "ldap://dc1c2.ipleiria.pt";

        $ldap = ldap_connect($adServer);
        $username = $request->username;
        $password = $request->password;

        $ldaprdn = 'ipleiria' . "\\" . $username;

        ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

        $bind = @ldap_bind($ldap, $ldaprdn, $password);
    
        if ($bind) {
            $filter="(sAMAccountName=$username)";
            $result = ldap_search($ldap,"dc=ipleiria,dc=pt",$filter);
            $info = ldap_get_entries($ldap, $result);
            for ($i=0; $i<$info["count"]; $i++)
            {
                if($info['count'] > 1)
                    break;
                $msg = "<p>You are accessing <strong> ". $info[$i]["sn"][0] .", " . $info[$i]["givenname"][0] ."</strong><br /> (" . $info[$i]["samaccountname"][0] .")</p>\n";
                var_dump($info);
                $userDn = $info[$i]["distinguishedname"][0];
            }
            @ldap_close($ldap);
        } else {
            $msg = "As credenciais indicadas não coincidem com as registadas no sistema";
        }

        return response()->json(['msg'=>$msg]);*/
        
        if(!isset($request->username) || !isset($request->password)){
            return response()->json(['msg'=>'Insira o número de estudante e a senha'],400);
        }

        $user = User::where('email','=',$request->username."@my.ipleiria.pt")
                    ->get();

        if($user->isEmpty()){
            return response()->json(['msg'=>'As credenciais indicadas não coincidem com as registadas no sistema'],404);
        }
        
        $password = Hash::check($request->password, $user[0]->password);
        if(!$password){
            return response()->json(['msg'=>'As credenciais indicadas não coincidem com as registadas no sistema'],404);
        }

        if($user[0]->tipoUser != "e"){
            return response()->json(['msg'=>'A entrada nesta aplicação é apenas permitida aos estudantes'],404);
        }
        
        $aluno = Aluno::where('numero','=',$request->username)->get();

        if($aluno->isEmpty()){
            Aluno::create(['numero'=>$request->username,'nome'=>$user[0]->name]);
        }

        return response()->json($aluno[0]);
    }

    public function registarAulaAluno(Request $request)
    {
        if(!isset($request->codigo_aula) || !isset($request->aluno_id)){
            return response()->json(['msg'=>'Para associar um aluno a uma aula é necessário um aluno e uma aula'],400);
        }

        $aula = Aula::where('codigo','=',$request->codigo_aula)->get();
        $aluno = Aluno::find($request->aluno_id);

        if($aula->isEmpty()){
            return response()->json(['msg'=>'Não existe nenhuma aula associada ao código inserido'],404);
        }

        if(empty($aluno)){
            return response()->json(['msg'=>'O aluno não existe'],404);
        }

        if($aula[0]->estado == 1){
            return response()->json(['msg'=>'A aula já terminou'],404);
        }

        $aula_aluno = Aula_has_Aluno::where('aula_id','=',$aula[0]->id)
                                    ->where('aluno_id','=',$aluno->id)
                                    ->get();

        if($aula_aluno->isNotEmpty()){
            return response()->json($aula_aluno[0]);
        }

        $aula_aluno = Aula_has_Aluno::create(['aula_id'=>$aula[0]->id,'aluno_id'=>$aluno->id]);
        return response()->json($aula_aluno);
    }

    public function getAula($id)
    {
        $aula = Aula::find($id);

        return response()->json(AulaResource::collection([$aula])[0]);
    }

    public function getConteudosAula($id)
    {
        $conteudos = DB::table('conteudo')->join('aula_has_conteudo','conteudo.id','=','aula_has_conteudo.conteudo_id')
                                        ->where('aula_id','=',$id)
                                        ->get();

        return response()->json(ConteudoResource::collection($conteudos));
    }

    public function getClassificacoesAlunoAula($aula_id,$aluno_id)
    {
        $classificacoes = Classificacao::where('aula_id','=',$aula_id)
                                        ->where('aluno_id','=',$aluno_id)
                                        ->get(['conteudo_id','valor']);

        return response()->json($classificacoes);
    }

    public function storeClassificacao(Request $request)
    {
        if(!isset($request->valor) || !isset($request->conteudo_id) || !isset($request->aluno_id) || !isset($request->aula_id)){
            return response()->json(['msg'=>'Para registar uma classificação é necessário um valor, um conteúdo, um aluno e uma aula'],400);
        }

        if($request->valor > 5 || $request->valor < 1){
            return response()->json(['msg'=>'O valor da classificação deve estar entre 1 e 5'],404);
        }

        $conteudo = Conteudo::find($request->conteudo_id);
        $aluno = Aluno::find($request->aluno_id);
        $aula = Aula::find($request->aula_id);

        if(empty($conteudo)){
            return response()->json(['msg'=>'O conteúdo não existe'],404);
        }

        if(empty($aluno)){
            return response()->json(['msg'=>'O aluno não existe'],404);
        }

        if(empty($aula)){
            return response()->json(['msg'=>'A aula não existe'],404);
        }

        if($aula->estado == 1){
            return response()->json(['msg'=>'A aula já terminou', 'estado'=>1],404);
        }

        $classificacao = Classificacao::where('conteudo_id','=',$conteudo->id)
                                        ->where('aluno_id','=',$aluno->id)
                                        ->where('aula_id','=',$aula->id)
                                        ->get();

        if(!$classificacao->isEmpty()){
            $classificacao = $classificacao[0];

            $classificacao->valor = $request->valor;
            $classificacao->save();
        }else{
            $classificacao = Classificacao::create(['valor'=>$request->valor,'conteudo_id'=>$conteudo->id,'aluno_id'=>$aluno->id,'aula_id'=>$aula->id]);
        }

        return response()->json($classificacao);
    }

    public function updateClassificacao(Request $request)
    {
        if(!isset($request->valor) || !isset($request->conteudo_id) || !isset($request->aluno_id) || !isset($request->aula_id)){
            return response()->json(['msg'=>'Para atualizar uma classificação é necessário um valor, um conteúdo, um aluno e uma aula'],400);
        }

        if($request->valor > 5 || $request->valor < 1){
            return response()->json(['msg'=>'O valor da classificação deve estar entre 1 e 5'],404);
        }

        $conteudo = Conteudo::find($request->conteudo_id);
        $aluno = Aluno::find($request->aluno_id);
        $aula = Aula::find($request->aula_id);

        if(empty($conteudo)){
            return response()->json(['msg'=>'O conteúdo não existe'],404);
        }

        if(empty($aluno)){
            return response()->json(['msg'=>'O aluno não existe'],404);
        }

        if(empty($aula)){
            return response()->json(['msg'=>'A aula não existe'],404);
        }

        if($aula->estado == 1){
            return response()->json(['msg'=>'A aula já terminou', 'estado'=>1],404);
        }

        $classificacao = Classificacao::where('conteudo_id','=',$conteudo->id)
                                        ->where('aluno_id','=',$aluno->id)
                                        ->where('aula_id','=',$aula->id)
                                        ->get();

        if($classificacao->isEmpty()){
            return response()->json(['msg'=>'Não é possível atualizar uma classificação que não existe'],404);
        }

        $classificacao = $classificacao[0];

        $classificacao->valor = $request->valor;
        $classificacao->save();

        return response()->json($classificacao);
    }

    public function getAulasAnteriores($id)
    {
        $uc = request('uc');
        $data_inicial = request('dataI');
        $data_final = request('dataF');
        $ano_letivo = request('anoLetivo');
        $semestre = request('semestre');
        $ano = request('ano');
        $dataSort = request('dataS');
        $ucSort = request('ucS');

        $query = Aula::query()->join('aula_has_aluno','aula.id','=','aula_has_aluno.aula_id')
                            ->join('unidadecurricular','aula.unidade_curricular_id','=','unidadecurricular.id')
                            ->join('professor','aula.professor_id','=','professor.id')
                            ->where('aula_has_aluno.aluno_id','=',$id)
                            ->where('aula.estado','=',1);

        if (isset($uc)) {
            $query->where('unidadecurricular.nome', 'like', '%' . $uc . '%');
        }

        if (isset($data_inicial)) {
            $query->where('aula.data', '>=',$data_inicial);
        }

        if (isset($data_final)) {
            $query->where('aula.data', '<=',$data_final);
        }

        if (isset($ano_letivo)){
            $query->where('unidadecurricular.anoLetivo', '=', $ano_letivo);
        }

        if (isset($semestre)){
            $query->where('unidadecurricular.semestre', '=', $semestre);
        }

        if (isset($ano)){
            $query->where('unidadecurricular.ano', '=', $ano);
        }

        if (isset($dataSort)){
            $query->orderBy('aula.data',$dataSort);
        }

        if (isset($ucSort)){
            $query->orderBy('unidadecurricular.nome',$ucSort);
        }

        $query->select('aula.id as id','aula.data as data','professor.nome as professor','unidadecurricular.nome as unidade_curricular','unidadecurricular.anoLetivo as anoLetivo','unidadecurricular.semestre as semestre','unidadecurricular.ano as anoCurso');
        $aulas = $query->paginate(10);

        return response()->json($aulas);
    }

    public function getClassificacoesAlunoAulaTotal($aula_id,$aluno_id)
    {
        $contSort = request('conteudoS');
        $classSort = request('classificacaoS');

        $query = DB::table('conteudo')->join('aula_has_conteudo','conteudo.id','=','aula_has_conteudo.conteudo_id')
                                            ->leftJoin('classificacao',function($q) use ($aluno_id,$aula_id)
                                            {
                                                $q->on('aula_has_conteudo.conteudo_id','=','classificacao.conteudo_id')
                                                ->where('classificacao.aluno_id','=',$aluno_id)
                                                ->where('classificacao.aula_id','=',$aula_id);
                                            })
                                            ->join('tema','conteudo.tema_id','=','tema.id')
                                            ->where('aula_has_conteudo.aula_id','=',$aula_id);

        if (isset($contSort)){
            $query->orderBy('conteudo.nome',$contSort);
        }

        if (isset($classSort)){
            $query->orderBy('classificacao.valor',$classSort);
        }

        $classificacoes = $query->select('conteudo.id as id','conteudo.nome as conteudo','tema.nome as tema','conteudo.tipo as tipo','conteudo.descricao as descricao','classificacao.valor as valor')
                                ->paginate(10);

        return response()->json($classificacoes);
    }

    public function getAnosLetivos()
    {
        $anosLetivos = UnidadeCurricular::select('anoLetivo')->distinct('anoLetivo')->orderBy('anoLetivo')->get();

        $output = array();
        foreach ($anosLetivos as $anoLetivo) {
            $output[] = $anoLetivo->anoLetivo;
        }

        return response()->json($output);
    }

    public function getAnosCursos()
    {
        $anosCursos = UnidadeCurricular::select('ano')->distinct('ano')->orderBy('ano')->get();

        $output = array();
        foreach ($anosCursos as $anoCurso) {
            $output[] = $anoCurso->ano;
        }

        return response()->json($output);
    }

    public function getProfessoresUCs($id){
        $query = DB::table('aluno_has_unidade_curricular')
                                ->join('unidade_curricular_has_professor','aluno_has_unidade_curricular.uc_id','=','unidade_curricular_has_professor.uc_id')
                                ->join('professor','unidade_curricular_has_professor.professor_id','=','professor.id')
                                ->join('unidadecurricular','unidade_curricular_has_professor.uc_id','=','unidadecurricular.id')
                                ->where('aluno_has_unidade_curricular.aluno_id','=',$id)
                                ->where('unidadecurricular.estado','=',1)
                                ->distinct('professor.id')
                                ->select('professor.id as professor_id','professor.nome as professor_nome');

        $professores = $query->paginate(10);

        foreach ($professores as $professor) {
            $professor->ucs = UnidadeCurricular_Has_Professor::join('aluno_has_unidade_curricular','unidade_curricular_has_professor.uc_id','=','aluno_has_unidade_curricular.uc_id')
                                                                ->join('unidadecurricular','aluno_has_unidade_curricular.uc_id','=','unidadecurricular.id')
                                                                ->where('unidade_curricular_has_professor.professor_id','=',$professor->professor_id)
                                                                ->where('aluno_has_unidade_curricular.aluno_id','=',$id)
                                                                ->get(['unidadecurricular.id','unidadecurricular.nome','unidadecurricular.anoLetivo','unidadecurricular.semestre']);
        }

        return response()->json($professores);
    }

    public function storeTutoria(Request $request){
        if(!isset($request->aluno_id) || !isset($request->professor_id) || !isset($request->data) || !isset($request->hora) || !isset($request->assunto) || !isset($request->uc_id)){
            return response()->json(['msg'=>'Para marcar uma tutoria é necessário um aluno, um professor, uma data, uma hora, um assunto e uma unidade curricular'],400);
        }

        $professor = Professor::find($request->professor_id);
        $aluno = Aluno::find($request->aluno_id);
        $uc = UnidadeCurricular::find($request->uc_id);

        if(empty($professor)){
            return response()->json(['msg'=>'O professor não existe'],404);
        }
        if(empty($aluno)){
            return response()->json(['msg'=>'O aluno não existe'],404);
        }
        if(empty($uc)){
            return response()->json(['msg'=>'A unidade curricular não existe'],404);
        }

        $tutoria = array(
            'pedido'=>'a',
            'data'=>$request->data,
            'horaInicio'=>$request->hora,
            'assunto'=>$request->assunto,
            'estado'=>0,
            'professor_id'=>$request->professor_id,
            'aluno_id'=>$request->aluno_id,
            'unidade_curricular_id'=>$request->uc_id,
            'isArchivedProfessor' => 0,
            'isArchivedAluno' => 0
        );

        if(isset($request->descricao)){
            $tutoria['descricao'] = $request->descricao;
        }

        $tutoria = Tutoria::create($tutoria);

        event(new TutoriaCreatedMov($tutoria));

        return response()->json($tutoria);
    }

    public function getTutoriasAluno($id){
        $data_inicial = request('dataI');
        $data_final = request('dataF');
        $hora = request('hora');
        $pedido = request('pedido');
        $professor = request('professor');
        $assunto = request('assunto');
        $estado = request('estado');
        $uc = request('uc');
        $dataSort = request('dataS');
        $professorSort = request('professorS');
        $estadoSort = request('estadoS');

        $query = Tutoria::join('professor','tutoria.professor_id','=','professor.id')
                        ->join('unidadecurricular','tutoria.unidade_curricular_id','=','unidadecurricular.id')
                        ->where('tutoria.aluno_id','=',$id)
                        ->where('tutoria.isArchivedAluno','=',0);

        if (isset($data_inicial)) {
            $query->where('tutoria.data', '>=',$data_inicial);
        }

        if (isset($data_final)) {
            $query->where('tutoria.data', '<=',$data_final);
        }

        if (isset($hora)) {
            $query->where('tutoria.horaInicio', '=',$hora);
        }

        if (isset($pedido)) {
            $query->where('tutoria.pedido', '=',$pedido);
        }

        if (isset($professor)) {
            $query->where('professor.nome', 'like', '%' . $professor . '%');
        }

        if (isset($uc)) {
            $query->where('unidadecurricular.nome', 'like', '%' . $uc . '%');
        }

        if (isset($assunto)) {
            $query->where('tutoria.assunto', 'like', '%' . $assunto . '%');
        }

        if (isset($estado)) {
            $query->where('tutoria.estado', '=',$estado);
        }

        if (isset($estadoSort)){
            $query->orderBy('tutoria.estado',$estadoSort);
        }

        if (isset($dataSort)){
            $query->orderBy('tutoria.data',$dataSort);
        }

        if (isset($professorSort)){
            $query->orderBy('professor.nome',$professorSort);
        }

        $totalTutorias = $query->get()->count();

        $query->select('tutoria.id','tutoria.pedido','tutoria.data','tutoria.horaInicio','tutoria.assunto','tutoria.descricao','tutoria.estado','tutoria.sala_id','tutoria.professor_id','tutoria.aluno_id','tutoria.unidade_curricular_id','tutoria.created_at','tutoria.updated_at');
        $tutorias = $query->paginate(10);

        $returnData = new \stdClass();
        $returnData->data = TutoriaResource::collection($tutorias);
        $returnData->total = $totalTutorias;
        return response()->json($returnData);
    }

    public function confirmarTutoria($id)
    {
        $tutoria = Tutoria::find($id);

        if(empty($tutoria)){
            return response()->json(['msg'=>'O pedido de tutoria não existe'],404);
        }

        $tutorias = Tutoria::where('data','=',$tutoria->data)
                            ->where('horaInicio','=',$tutoria->horaInicio)
                            ->where('estado','=',1)
                            ->where('isArchivedAluno','=',0)
                            ->get();

        if(!$tutorias->isEmpty()){
            return response()->json(['msg'=>'Já existe uma tutoria marcada para o mesmo dia e hora'],404); 
        }

        $tutoria->estado = 1;
        $tutoria->save();

        event(new TutoriaConfirmedMov($tutoria));

        return response()->json($tutoria);
    }

    public function retirarConfirmacaoTutoria($id)
    {
        $tutoria = Tutoria::find($id);
                
        if(empty($tutoria)){
            return response()->json(['msg'=>'O pedido de tutoria não existe'],404);
        }

        $tutoria->estado = 0;
        $tutoria->save();

        event(new TutoriaWithdrawConfirmationMov($tutoria));

        return response()->json($tutoria);
    }

    public function updateTutoria(Request $request, $id){
        if(!isset($request->data) || !isset($request->horaInicio)){
            return response()->json(['msg'=>'Para editar uma tutoria é necessária uma data e uma hora de início'],400);
        }

        $tutoria = Tutoria::find($id);

        if(empty($tutoria)){
            return response()->json(['msg'=>'O pedido de tutoria não existe'],404);
        }

        $tutoria->data = $request->data;
        $tutoria->horaInicio = $request->horaInicio;
        $tutoria->pedido = 'a';

        if(isset($request->descricao)){
            $tutoria->descricao = $request->descricao;
        }else{
            $tutoria->descricao = null;
        }

        $tutoria->save();

        event(new TutoriaChangedMov($tutoria));

        return response()->json($tutoria);
    }

    public function arquivarTutoria($id)
    {
        $tutoria = Tutoria::find($id);

        if(empty($tutoria)){
            return response()->json(['msg'=>'O pedido de tutoria não existe'],404);
        }

        $tutoria->isArchivedAluno = 1;
        $tutoria->save();

        return response()->json($tutoria);
    }

    public function recuperarTutoria($id)
    {
        $tutoria = Tutoria::find($id);

        if(empty($tutoria)){
            return response()->json(['msg'=>'O pedido de tutoria não existe'],404);
        }

        $tutoria->isArchivedAluno = 0;
        $tutoria->save();

        return response()->json($tutoria);
    }

    public function getTutoriasArquivadasAluno($id){
        $data_inicial = request('dataI');
        $data_final = request('dataF');
        $hora = request('hora');
        $pedido = request('pedido');
        $professor = request('professor');
        $assunto = request('assunto');
        $estado = request('estado');
        $uc = request('uc');
        $dataSort = request('dataS');
        $professorSort = request('professorS');
        $estadoSort = request('estadoS');

        $query = Tutoria::join('professor','tutoria.professor_id','=','professor.id')
                        ->join('unidadecurricular','tutoria.unidade_curricular_id','=','unidadecurricular.id')
                        ->where('tutoria.aluno_id','=',$id)
                        ->where('tutoria.isArchivedAluno','=',1);

        if (isset($data_inicial)) {
            $query->where('tutoria.data', '>=',$data_inicial);
        }

        if (isset($data_final)) {
            $query->where('tutoria.data', '<=',$data_final);
        }

        if (isset($hora)) {
            $query->where('tutoria.horaInicio', '=',$hora);
        }

        if (isset($pedido)) {
            $query->where('tutoria.pedido', '=',$pedido);
        }

        if (isset($professor)) {
            $query->where('professor.nome', 'like', '%' . $professor . '%');
        }

        if (isset($uc)) {
            $query->where('unidadecurricular.nome', 'like', '%' . $uc . '%');
        }

        if (isset($assunto)) {
            $query->where('tutoria.assunto', 'like', '%' . $assunto . '%');
        }

        if (isset($estado)) {
            $query->where('tutoria.estado', '=',$estado);
        }

        if (isset($estadoSort)){
            $query->orderBy('tutoria.estado',$estadoSort);
        }

        if (isset($dataSort)){
            $query->orderBy('tutoria.data',$dataSort);
        }

        if (isset($professorSort)){
            $query->orderBy('professor.nome',$professorSort);
        }

        $totalTutorias = $query->get()->count();

        $query->select('tutoria.id','tutoria.pedido','tutoria.data','tutoria.horaInicio','tutoria.assunto','tutoria.descricao','tutoria.estado','tutoria.sala_id','tutoria.professor_id','tutoria.aluno_id','tutoria.unidade_curricular_id','tutoria.created_at','tutoria.updated_at');
        $tutorias = $query->paginate(10);

        $returnData = new \stdClass();
        $returnData->data = TutoriaResource::collection($tutorias);
        $returnData->total = $totalTutorias;
        return response()->json($returnData);
    }
}
