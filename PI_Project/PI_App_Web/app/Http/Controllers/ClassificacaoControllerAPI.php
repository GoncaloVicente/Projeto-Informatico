<?php


namespace App\Http\Controllers;

use App\Aula;
use App\Aula_has_Aluno;
use App\Aula_Has_Conteudo;
use App\Classficacao;
use App\Http\Resources\Aula as AulaResource;
use App\Http\Resources\Classificacao as ClassificacaoResource;
use App\Professor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class ClassificacaoControllerAPI extends Controller
{
    public function getAulasClassificadas()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $codigo = request('codigo');
        $dataInicio = request('dataInicio');
        $dataFim = request('dataFim');
        $professor = request('professor');
        $uC = request('uC');
        $estado = request('estado');
        $isData = request('isData');
        $sortCodigo = request('sortCodigo');
        $sortData = request('sortData');
        $sortProfessor = request('sortProfessor');
        $sortUc = request('sortUc');
        $sortEstado = request('sortEstado');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Aula::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->where('aula.professor_id', $user[0]->id);
        }

        $query->leftjoin('professor', 'professor.id', 'aula.professor_id');
        $query->leftjoin('unidadecurricular', 'unidadecurricular.id', 'aula.unidade_curricular_id');
        $data = Carbon::now();
        $query->where('data', '<=', $data);
        $query->where('isArchived', '=', '0');
        $query->orderBy('aula.estado', 'asc');
        if (isset($codigo))
            $query->where('aula.codigo', 'like', '%' . $codigo . '%');


        if (isset($isData)) {
            if (!isset($dataInicio) && isset($dataFim)) {
                $query->where('data', '<=', $dataFim);
            }

            if (isset($dataInicio) && !isset($dataFim)) {
                $query->where('data', '>=', $dataInicio);
            }

            if (isset($dataInicio) && isset($dataFim)) {
                $query->whereBetween('data', [$dataInicio, $dataFim]);
            }
        }

        if (!isset($isData) && isset($dataInicio)) {
            if ($dataInicio != 'null')
                $query->where('data', '=', $dataInicio);
        }

        if (isset($professor))
            $query->where('professor.nome', 'like', '%' . $professor . '%');

        if (isset($estado)) {
            $query->where('aula.estado', 'like', '%' . $estado . '%');
        }

        if (isset($uC)) {
            $query->where('unidadecurricular.nome', 'like', '%' . $uC . '%');
        }

        if (isset($sortCodigo)) {
            $query->orderBy('aula.codigo', $sortCodigo);
        }

        if (isset($sortData)) {
            $query->orderBy('data', $sortData);
        }

        if (isset($sortProfessor)) {
            $query->orderBy('professor.nome', $sortProfessor);
        }

        if (isset($sortUc)) {
            $query->orderBy('unidadecurricular.nome', $sortUc);
        }

        if (isset($sortEstado)) {
            $query->orderBy('aula.estado', $sortEstado);
        }

        $totalAulas = $query->get()->count();

        $aulas = $query->select('aula.id as id', 'aula.codigo as codigo', 'aula.data as data', 'aula.estado as estado', 'professor.id as professor_id', 'unidadecurricular.id as unidade_curricular_id')
            ->orderBy('data', 'desc')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = AulaResource::collection($aulas);
        $returnData->total = $totalAulas;
        return response()->json($returnData);
    }

    public function getAlunosAula()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $numero = request('numero');
        $nome = request('nome');
        $sortNumero = request('sortNumero');
        $sortNome = request('sortNome');

        $id = request('id');
        $query = Aula_has_Aluno::query();
        $query->leftjoin('aluno', 'aluno.id', 'aula_has_aluno.aluno_id');
        $query->leftjoin('aula', 'aula.id', 'aula_has_aluno.aula_id');

        $query->where('aula_has_aluno.aula_id', '=', $id);
        $totalAlunosAula = $query->get()->count();

        if (isset($numero))
            $query->where('aluno.numero', 'like', '%' . $numero . '%');

        if (isset($nome))
            $query->where('aluno.nome', 'like', '%' . $nome . '%');

        if (isset($sortNumero)) {
            $query->orderBy('aluno.numero', $sortNumero);
        }

        if (isset($sortNome)) {
            $query->orderBy('aluno.nome', $sortNome);
        }

        $alunosAula = $query->select('aula_has_aluno.aula_id as aula_id', 'aula_has_aluno.aluno_id as aluno_id')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = \App\Http\Resources\Aula_has_Aluno::collection($alunosAula);
        $returnData->total = $totalAlunosAula;
        return response()->json($returnData);
    }

    public function getAulaAtual()
    {
        $id = request('id');
        $query = "SELECT unidadecurricular.nome as uc, curso.nome as curso, professor.nome as prof, aula.data as data FROM aula 
                join unidadecurricular
                on aula.unidade_curricular_id=unidadecurricular.id
                join professor
                on aula.professor_id = professor.id
                join curso 
                on unidadecurricular.curso_id = curso.id
                where aula.id = $id";
        $info = DB::select($query);

        return $info;
    }

    public function getClassficicacaoPorConteudo()
    {
        $id = request('id');
        $query = "select x.nome,
            sum((case when x.valor = 1 then x.total else 0 end)) as total_1,
            sum((case when x.valor = 2 then x.total else 0 end)) as total_2,
            sum((case when x.valor = 3 then x.total else 0 end)) as total_3,
            sum((case when x.valor = 4 then x.total else 0 end)) as total_4,
            sum((case when x.valor = 5 then x.total else 0 end)) as total_5
            from 
            
            (
                select a.nome, c.valor
                , count(c.valor) as total
                from conteudo a
                 left join classificacao c on a.id=c.conteudo_id
                where c.aula_id = $id
                group by a.nome, c.valor
            ) x
            group by x.nome";

        $aulasPorUCMes = DB::select($query);
        return response()->json($aulasPorUCMes);
    }

    public function getClassficicacaoPorAluno()
    {
        $idAula = request('aula');
        $idAluno = request('aluno');
        $query = "select x.nome,
            sum((case when x.valor = 1 then x.total else 0 end)) as total_1,
            sum((case when x.valor = 2 then x.total else 0 end)) as total_2,
            sum((case when x.valor = 3 then x.total else 0 end)) as total_3,
            sum((case when x.valor = 4 then x.total else 0 end)) as total_4,
            sum((case when x.valor = 5 then x.total else 0 end)) as total_5
            from 
            
            (
                select a.nome, c.valor
                , count(c.valor) as total
                from conteudo a
                 left join classificacao c on a.id=c.conteudo_id
                where c.aula_id = $idAula
                and c.aluno_id = $idAluno
                group by a.nome, c.valor
            ) x
            group by x.nome";

        $aulasPorUCMes = DB::select($query);
        return $aulasPorUCMes;

    }
}
