<?php


namespace App\Http\Controllers;

use App\Curso;
use App\Http\Requests\UnidadeCurricularStoreRequest;
use App\Http\Requests\UnidadeCurricularUpdateRequest;
use App\Http\Resources\UnidadeCurricular as UnidadeCurricularResource;
use App\Http\Resources\UnidadeCurricularHasProfessor as UnidadeCurricularHasProfessorResource;
use App\Professor;
use App\UnidadeCurricular;
use App\UnidadeCurricular_Has_Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class UnidadeCurricularControllerAPI extends Controller
{
    public function index()
    {
        $nome = request('nome');
        $semestre = request('semestre');
        $ano = request('ano');
        $anoLetivo = request('anoLetivo');
        $curso = request('curso');
        $estado = request('estado');
        $sortNome = request('sortNome');
        $sortSemestre = request('sortSemestre');
        $sortAno = request('sortAno');
        $sortAnoLetivo = request('sortAnoLetivo');
        $sortCurso = request('sortCurso');
        $sortEstado = request('sortEstado');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();


        $query = UnidadeCurricular::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->leftJoin('unidade_curricular_has_professor','unidade_curricular_has_professor.uC_id','unidadecurricular.id');
            $query->where('unidade_curricular_has_professor.professor_id', $user[0]->id);
        }
        $query->leftjoin('curso', 'curso.id', 'unidadecurricular.curso_id');

        if (isset($nome))
            $query->where('unidadecurricular.nome', 'like', '%' . $nome . '%');

        if (isset($semestre))
            $query->where('unidadecurricular.semestre', '=', $semestre);

        if (isset($ano))
            $query->where('unidadecurricular.ano', 'like', '%' . $ano . '%');

        if (isset($anoLetivo))
            $query->where('unidadecurricular.anoLetivo', '=', $anoLetivo);

        if (isset($curso)) {
            $query->where('curso.nome', 'like', '%' . $curso . '%');
        }

        if (isset($estado))
            $query->where('unidadecurricular.estado', '=', $estado);

        if (isset($sortNome)) {
            $query->orderBy('unidadecurricular.nome',$sortNome);
        }

        if (isset($sortSemestre)) {
            $query->orderBy('unidadecurricular.semestre',$sortSemestre);
        }

        if (isset($sortAno)) {
            $query->orderBy('unidadecurricular.ano',$sortAno);
        }

        if (isset($sortAnoLetivo)) {
            $query->orderBy('unidadecurricular.anoLetivo',$sortAnoLetivo);
        }

        if (isset($sortCurso)) {
            $query->orderBy('curso.nome',$sortCurso);
        }

        if (isset($sortEstado)) {
            $query->orderBy('unidadecurricular.estado',$sortEstado);
        }

        $totalUnidadesCurriculares = $query->get()->count();

        $unidadesCurriculares = $query->select('unidadecurricular.id as id', 'unidadecurricular.nome as nome', 'unidadecurricular.semestre as semestre',
            'unidadecurricular.ano as ano', 'unidadecurricular.anoLetivo', 'curso.id as curso_id', 'unidadecurricular.estado as estado')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = UnidadeCurricularResource::collection($unidadesCurriculares);
        $returnData->total = $totalUnidadesCurriculares;
        return response()->json($returnData);
    }

    public function getUnidadesCurriculares($search)
    {
        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = UnidadeCurricular::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->leftJoin('unidade_curricular_has_professor','unidade_curricular_has_professor.uC_id','unidadecurricular.id');
            $query->where('unidade_curricular_has_professor.professor_id', $user[0]->id);
        }

        $unidadeCurricular = $query->where('nome', 'like', '%' . $search . '%')->take(5)->select('id', 'nome')->get(['id', 'nome']);

        return $unidadeCurricular;
    }

    public function getUnidadesCurricularesByCursos($search)
    {
        $ids = explode(',', request('ids'));

        $unidadeCurricular = UnidadeCurricular::where('nome', 'like', '%' . $search . '%')
            ->whereIn('curso_id', $ids)
            ->take(5)->select('id', 'nome')->get(['id', 'nome']);

        return $unidadeCurricular;
    }

    public function ativarUC($id)
    {
        $uc = UnidadeCurricular::find($id);
        if ($uc->estado == 0) {
            $uc->estado = 1;
        }
        $uc->save();
    }

    public function desativarUC($id)
    {
        $uc = UnidadeCurricular::find($id);
        if ($uc->estado == 1) {
            $uc->estado = 0;
        }
        $uc->save();
    }

    public function update(UnidadeCurricularUpdateRequest $request, $id)
    {
        $request->validated();
        $unidadeCurricular = $request->all();
        $uc = UnidadeCurricular::findOrFail($id);

        $curso_id = $unidadeCurricular['curso']['id'];

        $uc->nome = $unidadeCurricular['nome'];
        $uc->semestre = $unidadeCurricular['semestre'];
        $uc->ano = $unidadeCurricular['ano'];
        $uc->anoLetivo = $unidadeCurricular['anoLetivo'];
        $uc->curso_id = $curso_id;

        $uc->save();
    }

    public function store(UnidadeCurricularStoreRequest $request)
    {
        $request->validated();
        $unidadeCurricular = $request->all();
        $curso_id = $unidadeCurricular['curso_id']['id'];

        $unidadeCurricular['curso_id'] = $curso_id;
        UnidadeCurricular::create($unidadeCurricular);
    }

    public function getCursoProfessor()
    {
        $id = request('uC');

        $query = UnidadeCurricular_Has_Professor::query();
        $unidadeCurricular = $query->where('uC_id', '=', $id)->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = UnidadeCurricularHasProfessorResource::collection($unidadeCurricular);

        return response()->json($returnData);
    }

}
