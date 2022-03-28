<?php


namespace App\Http\Resources;


use App\Aluno;
use App\Aula;
use App\Conteudo;
use Illuminate\Http\Resources\Json\Resource;

class Curso extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $curso = [
            'id' => $this->id,
            'nome' => $this->nome,
            'estado' => $this->estado,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        return $curso;
    }

}
