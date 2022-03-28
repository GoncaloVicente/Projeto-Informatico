<?php


namespace App\Http\Resources;

use App\Professor;
use App\UnidadeCurricular;
use Illuminate\Http\Resources\Json\Resource;

class UnidadeCurricularHasProfessor extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $unidadeCurricularHasProfessor = [
            'uC_id' => $this->uC_id,
            'professor_id' => $this->professor_id,
        ];

        $unidadeCurricular = UnidadeCurricular::find($unidadeCurricularHasProfessor['uC_id']);
        $unidadeCurricularHasProfessor['uC_id'] = $unidadeCurricular['nome'];

        $professor = Professor::find($unidadeCurricularHasProfessor['professor_id']);
        $unidadeCurricularHasProfessor['professor_id'] = $professor['nome'];

        return $unidadeCurricularHasProfessor;
    }

}
