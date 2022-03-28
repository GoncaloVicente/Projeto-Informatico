<?php


namespace App\Http\Controllers;

use App\Aluno;
use App\Events\TutoriaChanged;
use App\Events\TutoriaConfirmed;
use App\Events\TutoriaCreated;
use App\Events\TutoriaWithdrawConfirmation;
use App\Http\Requests\TutoriaStoreRequest;
use App\Http\Requests\TutoriaUpdateRequest;
use App\Listeners\SendTutoriaEmail;
use App\Mail\TutoriaEmailConfirmed;
use App\Professor;
use App\Sala;
use App\Tutoria;
use App\UnidadeCurricular;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\Tutoria as TutoriaResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class TutoriaControllerAPI extends Controller
{
    public function index()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $pedido = request('pedido');
        $dataInicio = request('dataInicio');
        $dataFim = request('dataFim');
        $hora = request('hora');
        $assunto = request('assunto');
        $estado = request('estado');
        $sala = request('sala');
        $aluno = request('aluno');
        $uC = request('uC');
        $isData = request('isData');
        $sortPedido = request('sortPedido');
        $sortData = request('sortData');
        $sortHora = request('sortHora');
        $sortAssunto = request('sortAssunto');
        $sortEstado = request('sortEstado');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Tutoria::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->where('tutoria.professor_id', $user[0]->id);
        }

        $query->leftjoin('sala', 'sala.id', 'tutoria.sala_id');
        $query->leftjoin('aluno', 'aluno.id', 'tutoria.aluno_id');
        $query->leftjoin('unidadecurricular', 'unidadecurricular.id', 'tutoria.unidade_curricular_id');
        $query->where('isArchivedProfessor', '=', '0');
        if (isset($pedido))
            $query->where('tutoria.pedido', 'like', '%' . $pedido . '%');


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

        if (isset($hora))
            $query->where('tutoria.horaInicio', 'like', '%' . $hora . '%');

        if (isset($assunto)) {
            $query->where('tutoria.assunto', 'like', '%' . $assunto . '%');
        }

        if (isset($estado)) {
            $query->where('tutoria.estado', 'like', '%' . $estado . '%');
        }

        if (isset($sala)) {
            $query->where('sala.nome', 'like', '%' . $sala . '%');
        }

        if (isset($aluno)) {
            $query->where('aluno.nome', 'like', '%' . $aluno . '%');
        }

        if (isset($uC)) {
            $query->where('unidadecurricular.nome', 'like', '%' . $uC . '%');
        }

        if (isset($sortPedido)) {
            $query->orderBy('tutoria.pedido',$sortPedido);
        }

        if (isset($sortData)) {
            $query->orderBy('data',$sortData);
        }

        if (isset($sortHora)) {
            $query->orderBy('tutoria.horaInicio',$sortHora);
        }

        if (isset($sortAssunto)) {
            $query->orderBy('tutoria.assunto',$sortAssunto);
        }

        if (isset($sortEstado)) {
            $query->orderBy('tutoria.estado',$sortEstado);
        }

        $totalTutorias = $query->get()->count();

        $tutorias = $query->select('tutoria.id as id', 'tutoria.pedido as pedido', 'tutoria.data as data', 'tutoria.horaInicio as horaInicio', 'tutoria.assunto as assunto',
            'tutoria.descricao as descricao', 'tutoria.estado as estado', 'sala.id as sala_id', 'aluno.id as aluno_id', 'tutoria.professor_id as professor_id', 'unidadecurricular.id as unidade_curricular_id')
            ->orderBy('tutoria.estado', 'asc')->orderBy('tutoria.data', 'desc')->paginate(15);


        $returnData = new \stdClass();
        $returnData->data = TutoriaResource::collection($tutorias);
        $returnData->total = $totalTutorias;
        return response()->json($returnData);
    }

    public function indexArquivadas()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $pedido = request('pedido');
        $dataInicio = request('dataInicio');
        $dataFim = request('dataFim');
        $hora = request('hora');
        $assunto = request('assunto');
        $estado = request('estado');
        $sala = request('sala');
        $aluno = request('aluno');
        $uC = request('uC');
        $isData = request('isData');
        $sortPedido = request('sortPedido');
        $sortData = request('sortData');
        $sortHora = request('sortHora');
        $sortAssunto = request('sortAssunto');
        $sortEstado = request('sortEstado');

        $name = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $name)->where('email', '=', $email)->get();

        $query = Tutoria::query();

        if( Auth::user()->tipoUser == 'p') {
            $query->where('tutoria.professor_id', $user[0]->id);
        }

        $query->leftjoin('sala', 'sala.id', 'tutoria.sala_id');
        $query->leftjoin('aluno', 'aluno.id', 'tutoria.aluno_id');
        $query->leftjoin('unidadecurricular', 'unidadecurricular.id', 'tutoria.unidade_curricular_id');
        $query->where('isArchivedProfessor', '=', '1');
        if (isset($pedido))
            $query->where('tutoria.pedido', 'like', '%' . $pedido . '%');


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

        if (isset($hora))
            $query->where('tutoria.horaInicio', 'like', '%' . $hora . '%');

        if (isset($assunto)) {
            $query->where('tutoria.assunto', 'like', '%' . $assunto . '%');
        }

        if (isset($estado)) {
            $query->where('tutoria.estado', 'like', '%' . $estado . '%');
        }

        if (isset($sala)) {
            $query->where('sala.nome', 'like', '%' . $sala . '%');
        }

        if (isset($aluno)) {
            $query->where('aluno.nome', 'like', '%' . $aluno . '%');
        }

        if (isset($uC)) {
            $query->where('unidadecurricular.nome', 'like', '%' . $uC . '%');
        }

        if (isset($sortPedido)) {
            $query->orderBy('tutoria.pedido',$sortPedido);
        }

        if (isset($sortData)) {
            $query->orderBy('data',$sortData);
        }

        if (isset($sortHora)) {
            $query->orderBy('tutoria.horaInicio',$sortHora);
        }

        if (isset($sortAssunto)) {
            $query->orderBy('tutoria.assunto',$sortAssunto);
        }

        if (isset($sortEstado)) {
            $query->orderBy('tutoria.estado',$sortEstado);
        }

        $totalTutorias = $query->get()->count();

        $tutorias = $query->select('tutoria.id as id', 'tutoria.pedido as pedido', 'tutoria.data as data', 'tutoria.horaInicio as horaInicio', 'tutoria.assunto as assunto',
            'tutoria.descricao as descricao', 'tutoria.estado as estado', 'sala.id as sala_id', 'aluno.id as aluno_id', 'tutoria.professor_id as professor_id', 'unidadecurricular.id as unidade_curricular_id')
            ->orderBy('tutoria.estado', 'asc')->orderBy('tutoria.data', 'desc')->paginate(15);

        $returnData = new \stdClass();
        $returnData->data = TutoriaResource::collection($tutorias);
        $returnData->total = $totalTutorias;
        return response()->json($returnData);
    }

    public function confirmarTutoria($id)
    {
        $tutoria = Tutoria::find($id);
        if ($tutoria->estado == 0) {
            $tutoria->estado = 1;
        }
        $tutoria->save();
        event(new TutoriaConfirmed($tutoria));
    }

    public function retirarConfirmacaoTutoria($id)
    {
        $tutoria = Tutoria::find($id);
        if ($tutoria->estado == 1) {
            $tutoria->estado = 0;
        }
        $tutoria->save();
        event(new TutoriaWithdrawConfirmation($tutoria));
    }

    public function arquivar($id)
    {
        $tutoria = Tutoria::find($id);
        $tutoria->isArchivedProfessor = 1;
        $tutoria->save();
    }

    public function desarquivar($id)
    {
        $tutoria = Tutoria::find($id);
        $tutoria->isArchivedProfessor = 0;
        $tutoria->save();
    }

    public function update(TutoriaUpdateRequest $request, $id)
    {
        $request->validated();

        $tutoria = $request->all();

        $tutoria['data'] = Carbon::parse($tutoria['data'], new \DateTimeZone('Europe/London'))->format('Y-m-d');

        $tut = Tutoria::findOrFail($id);

        $sala_id = $tutoria['sala']['id'];
        $aluno_id = $tutoria['aluno']['id'];

        $tut->data = $tutoria['data'];
        $tut->horaInicio = $tutoria['horaInicio'];
        $tut->assunto = $tutoria['assunto'];
        $tut->descricao = $tutoria['descricao'];
        $tut->sala_id = $sala_id;
        $tut->aluno_id = $aluno_id;
        $tut->pedido = 'p';
        $tut->save();
        event(new TutoriaChanged($tut));
    }

    public function store(TutoriaStoreRequest $request)
    {
        $request->validated();

        $tutoria = $request->all();
        $tutoria['pedido'] = 'p';
        $tutoria['data'] = Carbon::parse($tutoria['data'])->format('Y-m-d');

        $sala_id = $tutoria['sala_id']['id'];

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $professor = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $aluno_id = $tutoria['aluno_id']['id'];
        $unidade_curricular_id = $tutoria['unidade_curricular_id']['id'];

        $tutoria['sala_id'] = $sala_id;
        $tutoria['professor_id'] = $professor[0]->id;
        $tutoria['aluno_id'] = $aluno_id;
        $tutoria['unidade_curricular_id'] = $unidade_curricular_id;
        $tut = Tutoria::create($tutoria);
        event(new TutoriaCreated($tut));
    }
}
