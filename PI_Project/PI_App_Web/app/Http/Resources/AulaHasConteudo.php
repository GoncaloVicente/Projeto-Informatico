<?php


namespace App\Http\Resources;


use App\Aula;
use App\Conteudo;
use Illuminate\Http\Resources\Json\Resource;

class AulaHasConteudo extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $aulaHasConteudo = [
            'aula_id' => $this->aula_id,
            'nome' => $this->conteudo_id,
        ];

        $aula = Aula::find($aulaHasConteudo['aula_id']);
        $aula['aula_id'] = $aula['codigo'];

        $conteudo = Conteudo::find($aulaHasConteudo['nome']);
        $aulaHasConteudo['nome'] = $conteudo['nome'];

        return $aulaHasConteudo;
    }
}
