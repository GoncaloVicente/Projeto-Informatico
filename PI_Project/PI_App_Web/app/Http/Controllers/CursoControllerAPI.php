<?php


namespace App\Http\Controllers;
use App\Curso;
use App\Http\Requests\CursoStoreRequest;
use App\Http\Resources\Curso as CursoResource;
use App\Http\Resources\UnidadeCurricular as UnidadeCurricularResource;
use App\Professor;
use App\UnidadeCurricular;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CursoControllerAPI extends Controller
{
    public function index()
    {
        if (Auth::user()->tipoUser == 'p') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = request('nome');
        $sortNome = request('sortNome');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Curso::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->leftJoin('curso_has_professor','curso_has_professor.curso_id','curso.id');
            $query->where('curso_has_professor.professor_id', $user[0]->id);
        }

        if (isset($nome))
            $query->where('curso.nome', 'like', '%' . $nome . '%');

        if (isset($sortNome)) {
            $query->orderBy('curso.nome',$sortNome);
        }
        $totalCursos = $query->get()->count();

        $cursos = $query->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = CursoResource::collection($cursos);
        $returnData->total = $totalCursos;
        return response()->json($returnData);
    }

    public function getCursos($search)
    {
        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Curso::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->leftJoin('curso_has_professor','curso_has_professor.curso_id','curso.id');
            $query->where('curso_has_professor.professor_id', $user[0]->id);
        }

        $cursos = $query->where('nome', 'like', '%' . $search . '%')->where('estado','0')->take(5)->select('id','nome')->get(['id','nome']);

        return $cursos;
    }

    public function ativarCurso($id)
    {
        $curso = Curso::find($id);
        if ($curso->estado == 0) {
            $curso->estado = 1;
        }
        $curso->save();
    }

    public function desativarCurso($id)
    {
        $curso = Curso::find($id);
        if ($curso->estado == 1) {
            $curso->estado = 0;
        }
        $curso->save();
    }

    public function store(CursoStoreRequest $request)
    {
        $request->validated();

        $curso = $request->all();
        Curso::create($curso);
    }

    public function getCursoUc()
    {
        $id = request('curso');

        $query = UnidadeCurricular::query();
        $curso = $query->where('curso_id','=',$id)->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = UnidadeCurricularResource::collection($curso);

        return response()->json($returnData);
    }
}
