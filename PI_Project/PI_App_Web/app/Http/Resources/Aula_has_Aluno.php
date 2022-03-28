<?php


namespace App\Http\Resources;

use App\Aula;
use App\Aluno;
use Illuminate\Http\Resources\Json\Resource;

class Aula_has_Aluno extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $aluno = Aluno::find($this->aluno_id,['id','numero','nome']);
        $aulaHasAluno['aluno'] = $aluno;

        $aula = Aula::find($this->aula_id, ['id','codigo']);
        $aulaHasAluno['aula_id'] = $aula;

        return $aulaHasAluno;
    }
}
