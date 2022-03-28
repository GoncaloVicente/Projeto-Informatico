<?php


namespace App\Http\Resources;

use App\Aluno;
use App\UnidadeCurricular;
use Illuminate\Http\Resources\Json\Resource;

class AlunoHasUnidadeCurricular extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $alunoHasUnidadeCurricular = [
            'aluno_id' => $this->aluno_id,
            'uC_id' => $this->uC_id,
        ];

        $aluno = Aluno::find($alunoHasUnidadeCurricular['aluno_id']);
        $alunoHasUnidadeCurricular['aluno_id'] = $aluno['nome'];

        $unidadeCurricular = UnidadeCurricular::find($alunoHasUnidadeCurricular['uC_id']);
        $alunoHasUnidadeCurricular['uC_id'] = $unidadeCurricular['nome'];

        return $alunoHasUnidadeCurricular;
    }
}
