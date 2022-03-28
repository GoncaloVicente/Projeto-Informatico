<?php


namespace App\Http\Resources;


use App\Curso;
use Illuminate\Http\Resources\Json\Resource;

class UnidadeCurricular extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $unidadeCurricular = [
            'id' => $this->id,
            'nome' => $this->nome,
            'semestre' => $this->semestre,
            'anoLetivo' => $this->anoLetivo,
            'ano' => $this->ano,
            'estado' => $this->estado,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        $curso = Curso::find($this->curso_id, ['id','nome']);
        $unidadeCurricular['curso'] = $curso;

        return $unidadeCurricular;
    }
}
