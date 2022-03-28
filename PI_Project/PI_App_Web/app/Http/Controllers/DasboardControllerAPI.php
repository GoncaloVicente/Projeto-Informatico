<?php


namespace App\Http\Controllers;

use App\Conteudo;
use App\Curso;
use App\Curso_Has_Professor;
use App\Http\Resources\CursoHasProfessor;
use App\Http\Resources\UnidadeCurricularHasProfessor;
use App\Professor;
use App\Sala;
use App\Tema;
use App\Tutoria;
use App\UnidadeCurricular;
use App\UnidadeCurricular_Has_Professor;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class DasboardControllerAPI extends Controller
{

    public function userAutenticado()
    {
        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $professor = Professor::where('nome', '=', $nome)->where('email', '=', $email)->first();
        $professor['tipo'] = Auth::user()->tipoUser;
        return response()->json($professor);
    }

    public function perfil()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $tipoUser = Auth::user()->tipoUser;

        if ($tipoUser == "p") {
            $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
            $gabinete = Sala::where('id', '=', $user[0]->gabinete_id)->select('id', 'nome')->get();
        }

        $userAuth = array('idUser' => Auth::user()->id, 'idProf' => $user[0]->id, 'nome' => $user[0]->nome, 'email' => $user[0]->email, 'gabinete' => $gabinete);
        return response()->json($userAuth);
    }

    public function getUCProf()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $ucs = UnidadeCurricular_Has_Professor::where('professor_id', '=', $user[0]->id)->get();
        return UnidadeCurricularHasProfessor::collection($ucs);;
    }

    public function getCursosProf()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $cursos = Curso_Has_Professor::where('professor_id', '=', $user[0]->id)->get();
        return CursoHasProfessor::collection($cursos);;
    }

    public function getAllCursos()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $totalCursos = Curso_Has_Professor::where('professor_id', $user[0]->id)->get()->count();
        return $totalCursos;
    }

    public function getAllUCs()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $totalUCs = UnidadeCurricular_Has_Professor::where('professor_id', $user[0]->id)->get()->count();
        return $totalUCs;
    }

    public function getAllTemas()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $totalTemas = Tema::where('professor_id', $user[0]->id)->get()->count();
        return $totalTemas;
    }

    public function getAllConteudos()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();

        $query = Conteudo::query();
        $query->leftJoin('tema','tema.id','conteudo.tema_id');
        $totalConteudos = $query->where('tema.professor_id', $user[0]->id)->get()->count();
        return $totalConteudos;
    }

    public function getAllTutoriasMarcadas()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $totalTutoriasMarcadas = Tutoria::where('professor_id', $user[0]->id)->where('estado', '=', '1')->get()->count();
        return $totalTutoriasMarcadas;
    }

    public function getAllTutoriasPendentes()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $totalTutoriasPendentes = Tutoria::where('professor_id', $user[0]->id)->where('estado', '=', '0')->get()->count();
        return $totalTutoriasPendentes;
    }

    public function aulasPorMes()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $id = $user[0]->id;

        $query = "SELECT 
        month(data) as mes, count(*) as total
         FROM aula
         where professor_id = $id
         group by month(data)
         order by 1";
        $aulasPorMes = DB::select($query);

        $tamanho = count($aulasPorMes);

        for ($i = 0; $i < $tamanho; $i++) {
            if ($aulasPorMes[$i]->mes == 1) {
                $aulasPorMes[$i]->mes = 'Janeiro';
            }
            if ($aulasPorMes[$i]->mes == 2) {
                $aulasPorMes[$i]->mes = 'Fevereiro';
            }
            if ($aulasPorMes[$i]->mes == 3) {
                $aulasPorMes[$i]->mes = 'Março';
            }
            if ($aulasPorMes[$i]->mes == 4) {
                $aulasPorMes[$i]->mes = 'Abril';
            }
            if ($aulasPorMes[$i]->mes == 5) {
                $aulasPorMes[$i]->mes = 'Maio';
            }
            if ($aulasPorMes[$i]->mes == 6) {
                $aulasPorMes[$i]->mes = 'Junho';
            }
            if ($aulasPorMes[$i]->mes == 7) {
                $aulasPorMes[$i]->mes = 'Julho';
            }
            if ($aulasPorMes[$i]->mes == 8) {
                $aulasPorMes[$i]->mes = 'Agosto';
            }
            if ($aulasPorMes[$i]->mes == 9) {
                $aulasPorMes[$i]->mes = 'Setembro';
            }
            if ($aulasPorMes[$i]->mes == 10) {
                $aulasPorMes[$i]->mes = 'Outubro';
            }
            if ($aulasPorMes[$i]->mes == 11) {
                $aulasPorMes[$i]->mes = 'Novembro';
            }
            if ($aulasPorMes[$i]->mes == 12) {
                $aulasPorMes[$i]->mes = 'Dezembro';
            }
        }

        return $aulasPorMes;
    }

    public function tutoriasPorMes()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $id = $user[0]->id;

        $query = "SELECT 
        month(data) as mes, count(*) as total
         FROM tutoria
         where professor_id = $id
         group by month(data)
         order by 1";
        $tutoriasPorMes = DB::select($query);

        $tamanho = count($tutoriasPorMes);

        for ($i = 0; $i < $tamanho; $i++) {
            if ($tutoriasPorMes[$i]->mes == 1) {
                $tutoriasPorMes[$i]->mes = 'Janeiro';
            }
            if ($tutoriasPorMes[$i]->mes == 2) {
                $tutoriasPorMes[$i]->mes = 'Fevereiro';
            }
            if ($tutoriasPorMes[$i]->mes == 3) {
                $tutoriasPorMes[$i]->mes = 'Março';
            }
            if ($tutoriasPorMes[$i]->mes == 4) {
                $tutoriasPorMes[$i]->mes = 'Abril';
            }
            if ($tutoriasPorMes[$i]->mes == 5) {
                $tutoriasPorMes[$i]->mes = 'Maio';
            }
            if ($tutoriasPorMes[$i]->mes == 6) {
                $tutoriasPorMes[$i]->mes = 'Junho';
            }
            if ($tutoriasPorMes[$i]->mes == 7) {
                $tutoriasPorMes[$i]->mes = 'Julho';
            }
            if ($tutoriasPorMes[$i]->mes == 8) {
                $tutoriasPorMes[$i]->mes = 'Agosto';
            }
            if ($tutoriasPorMes[$i]->mes == 9) {
                $tutoriasPorMes[$i]->mes = 'Setembro';
            }
            if ($tutoriasPorMes[$i]->mes == 10) {
                $tutoriasPorMes[$i]->mes = 'Outubro';
            }
            if ($tutoriasPorMes[$i]->mes == 11) {
                $tutoriasPorMes[$i]->mes = 'Novembro';
            }
            if ($tutoriasPorMes[$i]->mes == 12) {
                $tutoriasPorMes[$i]->mes = 'Dezembro';
            }
        }

        return $tutoriasPorMes;
    }

    public function aulasPorUCMes()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $id = $user[0]->id;

        $mesAnterior = Carbon::now()->subMonth(1);
        $query = "        
            SELECT unidadecurricular.nome as mes, count(*) as total
            FROM aula
            JOIN unidadecurricular on aula.unidade_curricular_id = unidadecurricular.id
            where month(data) = $mesAnterior->month and year(data) = $mesAnterior->year 
            and professor_id = $id
            group by unidadecurricular.nome";

        $aulasPorUCMes = DB::select($query);
        return $aulasPorUCMes;
    }

    public function tutoriasPorUCMes()
    {
        if (Auth::user()->tipoUser == 'o') {
            return response()->json(['Unauthorized'], 401);
        }

        $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $user = Professor::where('nome', '=', $nome)->where('email', '=', $email)->get();
        $id = $user[0]->id;

        $mesAnterior = Carbon::now()->subMonth(1);
        $query = "        
            SELECT unidadecurricular.nome as mes, count(*) as total
            FROM tutoria
            JOIN unidadecurricular on tutoria.unidade_curricular_id = unidadecurricular.id
            where month(data) = $mesAnterior->month and year(data) = $mesAnterior->year 
            and professor_id = $id
            group by unidadecurricular.nome";

        $tutoriasPorUCMes = DB::select($query);
        return $tutoriasPorUCMes;
    }

    public function update(Request $request, $id)
    {
        $user = $request->all();
        if(isset($user['gabinete'][0])){
            $user['gabinete']['id'] = $user['gabinete'][0]['id'];
        }

        if (isset($user['gabinete']['id'])) {
            $sala_id = $user['gabinete']['id'];
            $professor = Professor::findOrFail($id);

            $professor->gabinete_id = $user['gabinete']['id'];
            $professor->save();

            $salaProf = Sala::where('gabinete', '=', $user['idProf'])->get();
            if (count($salaProf)) {
                $gabinete = Sala::findOrFail($salaProf[0]->id);
                $gabinete->gabinete = 0;
                $gabinete->save();
            }
            $sala = Sala::findOrFail($sala_id);
            if ($sala) {
                $sala->gabinete = $user['idProf'];
                $sala->save();
            }
        } else {
            $salaProf = Sala::where('gabinete', '=', $user['idProf'])->get();
            if (count($salaProf)) {
                $gabinete = Sala::findOrFail($salaProf[0]->id);
                $gabinete->gabinete = 0;
                $gabinete->save();
            }

            $professor = Professor::findOrFail($id);
            $professor->gabinete_id = null;
            $professor->save();
        }
    }
}
