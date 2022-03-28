<?php


namespace App\Http\Resources;

use App\Sala;
use App\Aluno;
use App\Professor;
use App\UnidadeCurricular;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\Resource;

class Tutoria extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $tutoria = [
            'id' => $this->id,
            'pedido' => $this->pedido,
            'data' => Carbon::parse($this->data)->format('d-m-Y'),
            'horaInicio' => $this->horaInicio,
            'assunto' => $this->assunto,
            'descricao' => $this->descricao,
            'estado' => $this->estado,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        if($tutoria['pedido'] == 'a'){
            $tutoria['pedido'] = 'Aluno';
        }else{
            $tutoria['pedido'] = 'Professor';
        }

        $sala = Sala::find($this->sala_id, ['id','nome']);
        $tutoria['sala'] = $sala;

        $professor = Professor::find($this->professor_id, ['id','nome']);
        $tutoria['professor'] = $professor;

        $aluno = Aluno::find($this->aluno_id, ['id','nome']);
        $tutoria['aluno'] = $aluno;

        $unidadeCurricular = UnidadeCurricular::find($this->unidade_curricular_id, ['id','nome']);
        $tutoria['unidade_curricular'] = $unidadeCurricular;

        $hora = explode(':', $this->horaInicio);
        $tutoria['horaInicio'] = $hora[0].':'.$hora[1];

        $isArchivedProfessor = \App\Tutoria::find($this->id);
        $tutoria['isArchivedProfessor'] = $isArchivedProfessor->isArchivedProfessor;

        return $tutoria;
    }

}
