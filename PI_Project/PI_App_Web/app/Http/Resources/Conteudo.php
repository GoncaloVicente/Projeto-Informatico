<?php


namespace App\Http\Resources;
use App\Tema;
use App\UnidadeCurricular;
use Illuminate\Http\Resources\Json\Resource;

class Conteudo extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $conteudo = [
            'id' => $this->id,
            'nome' => $this->nome,
            'tipo' => $this->tipo,
            'descricao' => $this->descricao,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        $tema = Tema::find($this->tema_id, ['id','nome']);
        $conteudo['tema'] = $tema;

        switch($conteudo['tipo']){
            case 'expl':
                $conteudo['tipo'] = 'Exercício Prático-Laboratorial';
                break;
            case 'ext':
                $conteudo['tipo'] = 'Exercício Teórico';
                break;
            case 't':
                $conteudo['tipo'] = 'Teórico';
                break;
            case 'pl':
                $conteudo['tipo'] = 'Prático-Laboratorial';
                break;
        }

        return $conteudo;
    }

}
