<?php


namespace App\Http\Controllers;

use App\Curso_Has_Professor;
use App\Http\Requests\ProfessorStoreRequest;
use App\Http\Resources\CursoHasProfessor as CursoHasProfessorResource;
use App\Http\Resources\Professor as ProfessorResource;
use App\Http\Resources\UnidadeCurricularHasProfessor as UnidadeCurricularHasProfessorResource;
use App\Professor;
use App\Sala;
use http\Client\Response;
use Illuminate\Http\Request;
use App\UnidadeCurricular_Has_Professor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use mysql_xdevapi\Exception;

class ProfessorControllerAPI extends Controller
{
    public function index()
    {
        if (Auth::user()->tipoUser == 'p') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = request('nome');
        $email = request('email');
        $gabinete = request('gabinete');
        $sortNome = request('sortNome');
        $sortEmail = request('sortEmail');
        $sortGabinete = request('sortGabinete');

        $query = Professor::query();
        $query->leftjoin('sala', 'sala.id', 'professor.gabinete_id');

        if (isset($nome))
            $query->where('professor.nome', 'like', '%' . $nome . '%');

        if (isset($email))
            $query->where('professor.email', 'like', '%' . $email . '%');

        if (isset($gabinete)) {
            $query->where('sala.nome', 'like', '%' . $gabinete . '%');
        }

        if (isset($sortNome)) {
            $query->orderBy('professor.nome', $sortNome);
        }

        if (isset($sortEmail)) {
            $query->orderBy('professor.email', $sortEmail);
        }

        if (isset($sortGabinete)) {
            $query->orderBy('sala.nome', $sortGabinete);
        }

        $totalProfessores = $query->get()->count();

        $professores = $query->select('professor.id as id', 'professor.nome as nome', 'professor.email as email', 'sala.id as gabinete_id')->paginate(15);
        $returnData = new \stdClass();
        $returnData->data = ProfessorResource::collection($professores);
        $returnData->total = $totalProfessores;
        return response()->json($returnData);
    }

    public function update(Request $request, $id)
    {
        $professor = $request->all();

        DB::beginTransaction();
        try {
            $prof = Professor::findOrFail($id);
            $prof->nome = $professor['nome'];
            $prof->email = $professor['email'];
            $cursos = $professor['cursos'];
            Curso_Has_Professor::where('professor_id', $prof->id)->delete();
            collect($cursos)->each(function ($item, $key) use ($prof) {
                $aux = new Curso_Has_Professor();
                $aux->professor_id = $prof->id;
                $aux->curso_id = $item['id'];
                $aux->save();
            });

            $ucs = $professor['ucs'];
            UnidadeCurricular_Has_Professor::where('professor_id', $prof->id)->delete();
            collect($ucs)->each(function ($item, $key) use ($prof) {
                $aux = new UnidadeCurricular_Has_Professor();
                $aux->professor_id = $prof->id;
                $aux->uC_id = $item['id'];
                $aux->save();
            });

            $prof->save();
            DB::commit();
        } catch (Exception $e) {
            Log::error($e);
            DB::rollBack();
        }
    }

    public function getProfessores($search)
    {
        $professor = Professor::where('nome', 'like', '%' . $search . '%')->take(5)->select('id', 'nome')->get(['id', 'nome']);

        return $professor;
    }

    public function getProfessorCurso()
    {
        $id = request('professor');

        $query = Curso_Has_Professor::query();
        $professor = $query->where('professor_id', '=', $id)->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = CursoHasProfessorResource::collection($professor);

        return response()->json($returnData);
    }

    public function getProfessorUc()
    {
        $id = request('professor');

        $query = UnidadeCurricular_Has_Professor::query();
        $professor = $query->where('professor_id', '=', $id)->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = UnidadeCurricularHasProfessorResource::collection($professor);

        return response()->json($returnData);
    }

    public function store(ProfessorStoreRequest $request)
    {
        $request->validated();

        $professor = $request->all();
        Professor::create($professor);
    }
}
