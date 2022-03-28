<?php

namespace App\Http\Resources;

use App\Curso;
use Illuminate\Http\Resources\Json\Resource;

class Aluno extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $aluno = [
            'id' => $this->id,
            'numero' => $this->numero,
            'nome' => $this->nome,
        ];

        $curso = Curso::find($this->curso_id, ['id','nome']);
        if($curso){
            $aluno['curso'] = $curso;
        }

        return $aluno;
    }
}
