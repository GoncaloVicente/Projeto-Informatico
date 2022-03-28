<?php


namespace App\Http\Resources;

use App\Curso;
use App\Professor;
use Illuminate\Http\Resources\Json\Resource;

class CursoHasProfessor extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $cursoHasProfessor = [
            'curso_id' => $this->curso_id,
            'professor_id' => $this->professor_id,
        ];

        $curso = Curso::find($cursoHasProfessor['curso_id']);
        $cursoHasProfessor['curso_id'] = $curso['nome'];

        $professor = Professor::find($cursoHasProfessor['professor_id']);
        $cursoHasProfessor['professor_id'] = $professor['nome'];

        return $cursoHasProfessor;
    }
}
