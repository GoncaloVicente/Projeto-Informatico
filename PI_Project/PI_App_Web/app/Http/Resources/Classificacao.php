<?php


namespace App\Http\Resources;

use App\Aula;
use App\Aluno;
use App\Conteudo;
use Illuminate\Http\Resources\Json\Resource;

class Classificacao extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $classificacao = [
            'id' => $this->id,
            'valor' => $this->valor,
            'conteudo_id' => $this->conteudo_id,
            'aluno_id' => $this->aluno_id,
            'aula_id' => $this->aula_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        $conteudo = Conteudo::find($classificacao['conteudo_id']);
        $classificacao['conteudo_id'] = $conteudo['nome'];


        $aluno = Aluno::find($classificacao['aluno_id']);
        $classificacao['aluno_id'] = $aluno['nome'];

        $aula = Aula::find($classificacao['aula_id']);
        $classificacao['aula_id'] = $aula['codigo'];

        return $classificacao;
    }
}
