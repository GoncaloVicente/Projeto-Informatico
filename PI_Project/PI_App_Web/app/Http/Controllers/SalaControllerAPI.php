<?php


namespace App\Http\Controllers;

use App\Http\Requests\SalaStoreUpdateRequest;
use App\Professor;
use App\Sala;
use App\Http\Resources\Sala as SalaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use mysql_xdevapi\Exception;


class SalaControllerAPI extends Controller
{
    public function index()
    {
        if (Auth::user()->tipoUser == 'p') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = request('nome');
        $professor = request('professor');
        $sortNome = request('sortNome');
        $sortProfessor = request('sortProfessor');

        $query = Sala::query();
        $query->leftjoin('professor', 'professor.id', 'sala.gabinete');

        if (isset($nome))
            $query->where('sala.nome', 'like', '%' . $nome . '%');

        if (isset($professor)) {
            $query->where('professor.nome', 'like', '%' . $professor . '%');
        }

        if (isset($sortNome)) {
            $query->orderBy('sala.nome',$sortNome);
        }

        if (isset($sortProfessor)) {
            $query->orderBy('professor.nome',$sortProfessor);
        }

        $totalSalas = $query->get()->count();

        $salas = $query->select('sala.id as id', 'sala.nome as nome', 'professor.id as gabinete')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = SalaResource::collection($salas);
        $returnData->total = $totalSalas;
        return response()->json($returnData);
    }

    public function getSalas($search)
    {
        $sala = Sala::where('nome', 'like', '%' . $search . '%')->take(5)->select('id', 'nome')->get(['id', 'nome']);

        return $sala;
    }

    public function update(SalaStoreUpdateRequest $request, $id)
    {
        $request->validated();

        $sala = $request->all();

        DB::beginTransaction();
        try {
            $sa = Sala::findOrFail($id);
            if ($sala['gabinete'] != null) {
                $gab = $sala['gabinete']['id'];
                $professor = Professor::where('gabinete_id', '=', $sa->id)->get();
                $professor[0]['gabinete_id'] = null;
                $prof = Professor::findOrFail($professor[0]->id);
                $prof->gabinete_id = $professor[0]['gabinete_id'];
                $prof->save();
            }
            $sa->nome = $sala['nome'];
            if ($sala['gabinete'] != null) {
                $sa->gabinete = $gab;
            }
            $sa->save();

            if ($sala['gabinete'] != null) {
                $gab = $sala['gabinete']['id'];
                $g = Professor::findOrFail($gab);
                $g->gabinete_id = $sa->id;
                $g->save();
            }
            DB::commit();
        } catch (Exception $e) {
            Log::error($e);
            DB::rollBack();
        }
    }

    public function store(SalaStoreUpdateRequest $request)
    {
        $request->validated();
        $sala = $request->all();

        DB::beginTransaction();
        try {
            $gab = $sala['gabinete']['id'];
            $sala['gabinete'] = $gab;
            Sala::create($sala);

            if ($sala['isGabinete']) {
                $sal = Sala::where('nome', '=', $sala['nome'])->where('gabinete', '=', $gab)->get();
                $g = Professor::findOrFail($gab);
                $g->gabinete_id = $sal[0]->id;
                $g->save();
            }
            DB::commit();
        } catch (Exception $e) {
            Log::error($e);
            DB::rollBack();
        }
    }
}
