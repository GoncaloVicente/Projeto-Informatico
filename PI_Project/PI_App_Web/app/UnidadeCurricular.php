<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UnidadeCurricular extends Model
{
    public $timestamps = true;
    protected $table = 'unidadecurricular';

    protected $fillable = [
        'id', 'nome', 'curso_id', 'semestre','ano', 'estado', 'created_at', 'updated_at', 'anoLetivo'
    ];
}
