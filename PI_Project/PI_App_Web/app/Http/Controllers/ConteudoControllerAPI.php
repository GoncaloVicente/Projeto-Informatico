<?php


namespace App\Http\Controllers;

use App\Conteudo;
use App\Http\Requests\ConteudoStoreRequest;
use App\Http\Requests\ConteudoUpdateRequest;
use App\Http\Resources\Conteudo as ConteudoResource;
use App\Professor;
use App\Tema;
use App\UnidadeCurricular;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class ConteudoControllerAPI extends Controller
{
    public function index()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = request('nome');
        $tipo = request('tipo');
        $tema = request('tema');
        $descricao = request('descricao');
        $sortNome = request('sortNome');
        $sortTipo = request('sortTipo');
        $sortTema = request('sortTema');
        $sortDescricao = request('sortDescricao');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Conteudo::query();
        $query->leftjoin('tema', 'tema.id', 'conteudo.tema_id');

        if( Auth::user()->tipoUser == 'p') {
            $query->where('tema.professor_id', $user[0]->id);
        }

        if (isset($nome))
            $query->where('conteudo.nome', 'like', '%' . $nome . '%');

        if (isset($tipo)) {
            if ($tipo == 't')
                $query->where('tipo', '=', 't');
            if ($tipo == 'pl')
                $query->where('tipo', '=', 'pl');
            if ($tipo == 'ext')
                $query->where('tipo', '=', 'ext');
            if ($tipo == 'expl')
                $query->where('tipo', '=', 'expl');
        }

        if (isset($tema)) {
            $query->where('tema.nome', 'like', '%' . $tema . '%');
        }

        if (isset($descricao)) {
            $query->where('conteudo.descricao', 'like', '%' . $descricao . '%');
        }

        if (isset($sortNome)) {
            $query->orderBy('conteudo.nome',$sortNome);
        }

        if (isset($sortTipo)) {
            $query->orderBy('tipo',$sortTipo);
        }

        if (isset($sortTema)) {
            $query->orderBy('tema.nome',$sortTema);
        }

        if (isset($sortDescricao)) {
            $query->orderBy('conteudo.descricao',$sortDescricao);
        }


        $totalConteudos = $query->get()->count();

        $conteudos = $query->select('conteudo.id as id','conteudo.nome as nome', 'conteudo.tipo as tipo','conteudo.descricao as descricao', 'tema.id as tema_id', 'conteudo.descricao as descricao')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = ConteudoResource::collection($conteudos);
        $returnData->total = $totalConteudos;
        return response()->json($returnData);
    }

    public function delete($id)
    {
        $conteudo = Conteudo::find($id);
        $conteudo->delete();
    }

    public function getConteudos()
    {
        $id = request('aula');
        $query = Conteudo::query();
        $conteudos = $query->get();

        $returnData = new \stdClass();
        $returnData->data = ConteudoResource::collection($conteudos);

        return response()->json($returnData);
    }

    public function getConteudosNome()
    {
        $conteudos = Conteudo::all('nome');
        return $conteudos;
    }

    public function update(ConteudoUpdateRequest $request, $id)
    {
        $request->validated();

        $conteudo = $request->all();
        $con = Conteudo::findOrFail($id);

        $tema_id = $conteudo['tema']['id'];

        $con->nome = $conteudo['nome'];
        $con->tipo = $conteudo['tipo'];
        $con->descricao = $conteudo['descricao'];
        $con->tema_id = $tema_id;

        $con->save();
    }

    public function store(ConteudoStoreRequest $request)
    {
        $request->validated();

        $conteudo = $request->all();
        $tema_id = $conteudo['tema_id']['id'];
        $conteudo['tema_id'] = $tema_id;

        Conteudo::create($conteudo);
    }

}
