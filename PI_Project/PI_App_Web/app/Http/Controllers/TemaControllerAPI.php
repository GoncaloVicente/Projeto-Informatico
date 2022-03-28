<?php

namespace App\Http\Controllers;

use App\Http\Requests\TemaStoreRequest;
use App\Http\Requests\TemaUpdateRequest;
use App\Professor;
use App\Tema;
use App\Http\Resources\Tema as TemaResource;
use App\UnidadeCurricular;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class TemaControllerAPI extends Controller
{
    public function index()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = request('nome');
        $professor = request('professor');
        $uC = request('uC');
        $sortNome = request('sortNome');
        $sortProfessor = request('sortProfessor');
        $sortUc = request('sortUc');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Tema::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->where('tema.professor_id', $user[0]->id);
        }

        $query->leftjoin('professor', 'professor.id', 'tema.professor_id');
        $query->leftjoin('unidadecurricular', 'unidadecurricular.id', 'tema.uC_id');
        if (isset($nome))
            $query->where('tema.nome', 'like', '%' . $nome . '%');

        if (isset($professor)) {
            $query->where('professor.nome', 'like', '%' . $professor . '%');
        }

        if (isset($uC)) {
            $query->where('unidadecurricular.nome', 'like', '%' . $uC . '%');
        }

        if (isset($sortNome)) {
            $query->orderBy('tema.nome',$sortNome);
        }

        if (isset($sortProfessor)) {
            $query->orderBy('professor.nome',$sortProfessor);
        }

        if (isset($sortUc)) {
            $query->orderBy('unidadecurricular.ano',$sortUc);
        }

        $totalTemas = $query->get()->count();

        $temas = $query->select('tema.id as id', 'tema.nome as nome', 'professor.id as professor_id', 'unidadecurricular.id as uC_id')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = TemaResource::collection($temas);
        $returnData->total = $totalTemas;
        return response()->json($returnData);
    }

    public function delete($id)
    {
        $tema = Tema::find($id);
        $tema->delete();
    }

    public function getTemas()
    {
        $id = request('aula');
        $query = Tema::query();
        $temas = $query->get();

        $returnData = new \stdClass();
        $returnData->data = TemaResource::collection($temas);

        return response()->json($returnData);
    }

    public function update(TemaUpdateRequest $request, $id)
    {
        $request->validated();

        $tema = $request->all();
        $t = Tema::findOrFail($id);
        $t->nome = $tema['nome'];
        $uC_id = $tema['uC']['id'];
        $t->uC_id = $uC_id;
        $t->save();
    }

    public function getTema($search)
    {
        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Tema::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->where('tema.professor_id', $user[0]->id);
        }

        $tema = $query->where('nome', 'like', '%' . $search . '%')->take(5)->select('id', 'nome')->get(['id', 'nome']);

        return $tema;
    }

    public function store(TemaStoreRequest $request)
    {
        $request->validated();

        $tema = $request->all();
        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $professor = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $uC_id = $tema['uC_id']['id'];
        $tema['uC_id'] = $uC_id;
        $tema['professor_id'] = $professor[0]->id;
        Tema::create($tema);
    }

    public function getTemaConteudo()
    {
        $id = request('tema');

        $tema = DB::table('conteudo')->where('tema_id', '=', $id)->get();
        $returnData = new \stdClass();
        $returnData->data = $tema;
        return response()->json($returnData);
    }

}
