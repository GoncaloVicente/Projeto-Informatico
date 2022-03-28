<?php


namespace App\Http\Resources;

use \App\Professor;
use \App\UnidadeCurricular;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\Resource;

class Aula extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $aula = [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'data' => Carbon::parse($this->data)->format('d-m-Y'),
            'estado' => $this->estado,
            'isArchived' => $this->isArchived,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        $professor = Professor::find($this->professor_id, ['id','nome']);
        $aula['professor'] = $professor;

        $unidadeCurricular = UnidadeCurricular::find($this->unidade_curricular_id, ['id','nome']);
        $aula['unidade_curricular'] = $unidadeCurricular;

        $isArchived = \App\Aula::find($this->id);
        $aula['isArchived'] = $isArchived->isArchived;
        return $aula;
    }
}
