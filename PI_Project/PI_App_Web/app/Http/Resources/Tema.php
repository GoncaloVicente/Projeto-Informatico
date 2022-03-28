<?php


namespace App\Http\Resources;


use App\UnidadeCurricular;
use Illuminate\Http\Resources\Json\Resource;
use App\Professor;
class Tema extends Resource
{
    public function toArray($request)
    {
        $tema = [
            'id' => $this->id,
            'nome' => $this->nome,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        $professor = Professor::find($this->professor_id, ['id','nome']);
        $tema['professor'] = $professor;

        $uc = UnidadeCurricular::find($this->uC_id, ['id','nome']);
        $tema['uC'] = $uc;

        return $tema;
    }
}
