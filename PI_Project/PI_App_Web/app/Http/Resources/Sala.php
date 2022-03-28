<?php


namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\Resource;
use App\Professor;

class Sala extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $sala = [
            'id' => $this->id,
            'nome' => $this->nome,
            'gabinete' => $this->gabinete,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];


        if ($sala['gabinete'] != 0) {
            $professor = Professor::where('gabinete_id', '=', $sala['id'])->get();
            if (count($professor) > 0) {
                $prof = Professor::find($professor[0]->id, ['id','nome']);
                $sala['gabinete'] = $prof;
            }
        }
        return $sala;
    }
}
