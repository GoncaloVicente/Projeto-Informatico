<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    public $timestamps = true;
    protected $table = 'aula';

    protected $fillable = [
        'id', 'codigo', 'data', 'estado','professor_id','unidade_curricular_id', 'created_at', 'updated_at'
    ];
}
