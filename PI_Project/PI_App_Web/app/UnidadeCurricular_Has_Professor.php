<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UnidadeCurricular_Has_Professor extends Model
{
    public $timestamps = false;
    protected $table = 'unidade_curricular_has_professor';

    protected $fillable = [
        'uC_id', 'professor_id'
    ];
}
