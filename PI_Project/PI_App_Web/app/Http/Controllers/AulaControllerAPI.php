<?php


namespace App\Http\Controllers;

use App\Aula;
use App\Aula_Has_Conteudo;
use App\Conteudo;
use App\Http\Requests\AulaStoreRequest;
use App\Http\Requests\AulaUpdateRequest;
use App\Http\Resources\Aula as AulaResource;
use App\Http\Resources\AulaHasConteudo as AulaHasconteudoResource;
use App\Professor;
use App\Tema;
use App\UnidadeCurricular;
use App\User;
use Carbon\Carbon;
use Cassandra\Date;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use mysql_xdevapi\Exception;

class AulaControllerAPI extends Controller
{
    public function index()
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
        $query->where('isArchived', '=', '0');
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

    public function indexArquivadas()
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
        $query->where('isArchived', '=', '1');
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

    public function arquivar($id)
    {
        $aula = Aula::find($id);
        $aula->isArchived = 1;
        $aula->save();
    }

    public function desarquivar($id)
    {
        $aula = Aula::find($id);
        $aula->isArchived = 0;
        $aula->save();
    }

    public function terminarAula($id)
    {
        $aula = Aula::find($id);
        if ($aula->estado == 0) {
            $aula->estado = 1;
        }
        $aula->save();
    }

    public function iniciarAula(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $aula = Aula::where('id', '=', $id)->get();
            $aula[0]->codigo = 1;
            $aula[0]->estado = 0;
            $new['codigo'] = $aula[0]->codigo;
            $new['data'] = Carbon::parse()->format('Y-m-d');
            $new['estado'] = $aula[0]->estado;
            $new['professor_id'] = $aula[0]->professor_id;
            $new['unidade_curricular_id'] = $aula[0]->unidade_curricular_id;
            $new['isArchived'] = $aula[0]->isArchived;


            $aulaCriada = Aula::create($new);
            $codigo = $aulaCriada->id.rand(1000,9999);
            $aulaCriada->codigo = $codigo;
            $aulaCriada->save();

            $conteudos = Aula_Has_Conteudo::where('aula_id', '=', $aula[0]->id)->get();

            foreach ($conteudos as $conteudo) {
                $aC['aula_id'] = $aulaCriada->id;
                $aC['conteudo_id'] = $conteudo->conteudo_id;
                Aula_Has_Conteudo::create($aC);
            }
            DB::commit();
        } catch (Exception $e) {
            Log::error($e);
            DB::rollBack();
        }
        return response()->json($codigo);
    }

    public function getCodigo(Request $request, $id)
    {
        $codigo = $request->getContent();
        $aula = Aula::find($id);
        $aula->codigo = $codigo;
        $aula->save();
    }

    public function store(AulaStoreRequest $request)
    {
        $request->validated();

        $aula = $request->all();
        $aula['data'] = Carbon::parse($aula['data'])->format('Y-m-d');
        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $professor = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $aula['professor_id'] = $professor[0]->id;
        $unidade_curricular_id = $aula['unidade_curricular_id']['id'];
        $aula['unidade_curricular_id'] = $unidade_curricular_id;
        DB::beginTransaction();
        try {
            $newAula = Aula::create($aula);

            $aul = Aula::findOrFail($newAula['id']);
            $codigo = $aul->id . $aul->codigo;
            $aul->codigo = $codigo;
            $aul->save();
            DB::commit();
        } catch (Exception $e) {
            Log::error($e);
            DB::rollBack();
        }

        return response()->json($aul);
    }

    public function update(AulaUpdateRequest $request, $id)
    {
        $request->validated();

        $aula = $request->all();
        $aula['data'] = Carbon::parse($aula['data'], new \DateTimeZone('Europe/London'))->format('Y-m-d');

        $aul = Aula::findOrFail($id);

        $unidade_curricular_id = $aula['unidade_curricular']['id'];

        $aul->data = $aula['data'];
        $aul->unidade_curricular_id = $unidade_curricular_id;
        $aul->save();
    }

    public function adicionarAulaConteudo(Request $request)
    {
        $aulaConteudos = $request->all();
        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $professor = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $aula = Aula::where('professor_id', '=', $professor[0]->id)->orderBy('id', 'desc')->get();
        foreach ($aulaConteudos as $aulaConteudo) {
            $idConteudo = $aulaConteudo['id'];
            $aC['aula_id'] = $aula[0]->id;
            $aC['conteudo_id'] = $idConteudo;
            Aula_Has_Conteudo::create($aC);
        }
    }

    public function adicionarAulaConteudos(Request $request, $id)
    {
        $aulaConteudos = $request->all();
        $aulas = Aula_Has_Conteudo::where('aula_id', '=', $id)->get();

        if (count($aulas) > 0) {
            foreach ($aulas as $au) {
                $aula_id = $au->aula_id;
                $conteudo_id = $au->conteudo_id;
                DB::table('aula_has_conteudo')->where('aula_id', '=', $aula_id)->where('conteudo_id', '=', $conteudo_id)->delete();
            }
        }

        if (count($aulaConteudos) > 0) {
            foreach ($aulaConteudos as $aulaConteudo) {
                $conteudo_id = Conteudo::where('nome', '=', $aulaConteudo['nome'])->get();
                $aC['aula_id'] = $id;
                $aC['conteudo_id'] = $conteudo_id[0]->id;
                Aula_Has_Conteudo::create($aC);
            }
        }
    }

    public function getAulaConteudo()
    {
        $id = request('aula');
        $query = Aula_Has_Conteudo::query();

        $aula = $query->where('aula_id', '=', $id)->get();
        $returnData = new \stdClass();
        $returnData->data = AulaHasconteudoResource::collection($aula);
        return response()->json($returnData);
    }

    public function getTemaConteudo()
    {
        $id = request('aula');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();
        $query = Tema::query();
        $query->with('conteudos');

        $temas = $query->where('professor_id','=',$user[0]->id)->get();
        $conteudos = Aula_Has_Conteudo::where('aula_id', $id)->get()->map(function ($item, $key) {
            return $item->conteudo_id;
        });

        foreach ($temas as $tema) {
            foreach ($tema->conteudos as $conteudo) {
                if ($conteudos->contains($conteudo->id)) {
                    $conteudo->selected = true;
                }
            }
        }
        return response()->json($temas);
    }
}
