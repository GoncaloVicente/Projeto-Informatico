<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aluno_Has_UnidadeCurricular extends Model
{
    public $timestamps = false;
    protected $table = 'aluno_has_unidade_curricular';

    protected $fillable = [
        'aluno_id', 'uC_id'
    ];
}
