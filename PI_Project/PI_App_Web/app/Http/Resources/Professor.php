<?php


namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\Resource;
use \App\Sala;
class Professor extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $professor = [
            'id' => $this->id,
            'nome' => $this->nome,
            'email' => $this->email,
            'gabinete_id' => $this->gabinete_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        $gabinete = Sala::find($professor['gabinete_id']);
        $professor['gabinete_id'] = $gabinete['nome'];

        $prof = \App\Professor::where('id',$this->id)->with('cursos','ucs')->first();

        $cursos = $prof->cursos->map(function ($item, $key) {
            $aux = new \stdClass();
            $aux->id = $item->id;
            $aux->nome = $item->nome;
            return $aux;
        })->sortBy('nome')->values();
        $professor['cursos'] = $cursos;

        $ucs = $prof->ucs->map(function ($item, $key) {
            $aux = new \stdClass();
            $aux->id = $item->id;
            $aux->nome = $item->nome;
            return $aux;
        })->sortBy('nome')->values();
        $professor['ucs'] = $ucs;

        return $professor;
    }

}
