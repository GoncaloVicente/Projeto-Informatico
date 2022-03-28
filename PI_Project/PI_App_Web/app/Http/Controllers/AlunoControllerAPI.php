<?php


namespace App\Http\Controllers;

use App\Aluno;
use App\Aluno_Has_UnidadeCurricular;
use App\Aula_has_Aluno;
use App\Curso;
use App\Http\Requests\AlunoStoreRequest;
use App\Http\Requests\AlunoUpdateRequest;
use \App\Http\Resources\Aula_has_Aluno as Aula_has_AlunoResource;
use App\Http\Resources\AlunoHasUnidadeCurricular as AlunoHasUnidadeCurricularResource;
use App\Professor;
use App\UnidadeCurricular;
use Illuminate\Http\Request;
use App\Http\Resources\Aluno as AlunoResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Validator;
use mysql_xdevapi\Exception;

class AlunoControllerAPI extends Controller
{
    public function index()
    {
        $numero = request('numero');
        $nome = request('nome');
        $curso = request('curso');
        $sortNumero = request('sortNumero');
        $sortNome = request('sortNome');
        $sortCurso = request('sortCurso');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Aluno::query();
        $query->leftjoin('curso', 'curso.id', 'aluno.curso_id');

        if( Auth::user()->tipoUser == 'p') {
            $query->leftJoin('curso_has_professor','curso_has_professor.curso_id','aluno.curso_id');
            $query->where('curso_has_professor.professor_id', $user[0]->id);
        }

        if (isset($numero))
            $query->where('aluno.numero', 'like', '%' . $numero . '%');

        if (isset($nome))
            $query->where('aluno.nome', 'like', '%' . $nome . '%');

        if (isset($curso)) {
            $query->where('curso.nome', 'like', '%' . $curso . '%');
        }

        if (isset($sortNumero)) {
            $query->orderBy('aluno.numero', $sortNumero);
        }

        if (isset($sortNome)) {
            $query->orderBy('aluno.nome', $sortNome);
        }

        if (isset($sortCurso)) {
            $query->orderBy('curso.nome', $sortCurso);
        }

        $totalAlunos = $query->get()->count();

        $alunos = $query->select('aluno.id as id', 'aluno.numero as numero', 'aluno.nome as nome', 'curso.id as curso_id')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = AlunoResource::collection($alunos);
        $returnData->total = $totalAlunos;
        return response()->json($returnData);
    }

    public function getAlunos($search)
    {
        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Aluno::query();
        if( Auth::user()->tipoUser == 'p') {
            $query->leftJoin('curso_has_professor', 'curso_has_professor.curso_id', 'aluno.curso_id');
            $query->where('curso_has_professor.professor_id', $user[0]->id);
        }

        $aluno = $query->where('nome', 'like', '%' . $search . '%')->take(5)->select('id', 'nome')->get(['id', 'nome']);

        return $aluno;
    }

    public function getAlunoUnidadeCurricular()
    {
        $id = request('aluno');

        $query = Aluno_Has_UnidadeCurricular::query();
        $alunos = $query->where('aluno_id', '=', $id)->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = AlunoHasUnidadeCurricularResource::collection($alunos);

        return response()->json($returnData);
    }

    public function store(AlunoStoreRequest $request)
    {
        $request->validated();

        $aluno = $request->all();
        $curso_id = $aluno['curso_id']['id'];

        $aluno['curso_id'] = $curso_id;
        Aluno::create($aluno);
    }

    public function update(AlunoUpdateRequest $request, $id)
    {
        $request->validated();

        $aluno = $request->all();
        $al = Aluno::findOrFail($id);
        $curso_id = $aluno['curso']['id'];
        DB::beginTransaction();
        try {
            if ($al->curso_id != $curso_id) {
                $aulasInseridas = Aluno_Has_UnidadeCurricular::where('aluno_id', $id)->get();
                foreach ($aulasInseridas as $aula) {
                    DB::table('aluno_has_unidade_curricular')->where('uC_id', '=', $aula['uC_id'])->where('aluno_id', '=', $aula['aluno_id'])->delete();
                }
            }
            $al->nome = $aluno['nome'];
            $al->numero = $aluno['numero'];
            $al->curso_id = $curso_id;

            $al->save();
            DB::commit();
        } catch (Exception $e) {
            Log::error($e);
            DB::rollBack();
        }
    }

    public function excel()
    {
        $obj_return = new \stdClass();
        $obj_return->valid = true;
        $obj_return->errors = collect();

        $dados = request('dados');
        $curso_id = request('curso_id');
        $ucs = collect($dados[2]);
        $ucs->forget(0);
        $ucs->forget(1);

        collect($ucs)->each(function ($item, $key) use ($obj_return) {

            $check = UnidadeCurricular::where('nome', trim(str_replace('\r\n', ' ', $item)))->first();
            if ($check == null) {
                $obj_return->valid = false;
                $obj_return->errors->push('Unidade Curricular ' . $item . ' não existe em Base Dados.');
            }
        });

        $ucsBD = UnidadeCurricular::whereIn('nome', $ucs->toArray())->get();

        if ($obj_return->valid) {
            try {
                DB::beginTransaction();

                for ($i = 3; $i < count($dados); $i++) {

                    $aluno_id = $dados[$i][0];
                    $aluno = Aluno::where('numero', $aluno_id)->first();

                    if ($aluno == null) {
                        //inserir aluno
                        $aluno = new Aluno();
                        $aluno->numero = $aluno_id;
                        $aluno->nome = $dados[$i][1];
                        $aluno->curso_id = $curso_id['id'];
                        $aluno->save();
                    }
                    //definir UCs para aluno

                    for ($j = 2; $j < count($dados[$i]); $j++) {

                        $aux = $ucs[$j];
                        $current_uc = $ucsBD->filter(function ($uc, $key) use ($aux) {
                            return $uc->nome == $aux;
                        })->first();

                        if ($dados[$i][$j] == 1) {

                            if ($current_uc != null) {

                                $test = Aluno_Has_UnidadeCurricular::where('aluno_id', $aluno->id)->where('uC_id', $current_uc->id)->first();
                                if ($test == null) {
                                    $a_inserir = new Aluno_Has_UnidadeCurricular();
                                    $a_inserir->aluno_id = $aluno->id;
                                    $a_inserir->uC_id = $current_uc->id;
                                    $a_inserir->save();
                                }
                            }
                        } else {

                            if ($current_uc != null) {
                                Aluno_Has_UnidadeCurricular::where('aluno_id', $aluno->id)->where('uC_id', $current_uc->id)->delete();
                            }
                        }
                    }
                }
                DB::commit();

            } catch (\Exception $e) {
                Log::error($e);
                DB::rollBack();
            }
        }

        return response()->json($obj_return);

    }
}
