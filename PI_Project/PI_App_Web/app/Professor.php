<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    public $timestamps = true;
    protected $table = 'professor';

    protected $fillable = [
        'id','numero' , 'nome', 'email', 'gabinete_id', 'created_at', 'updated_at'
    ];

    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_has_professor','professor_id','curso_id');
    }

    public function ucs()
    {
        return $this->belongsToMany(UnidadeCurricular::class, 'unidade_curricular_has_professor','professor_id','uC_id');
    }
}
