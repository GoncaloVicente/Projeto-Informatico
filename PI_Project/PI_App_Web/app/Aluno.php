<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    public $timestamps = true;
    protected $table = 'aluno';

    protected $fillable = [
        'id', 'numero', 'nome', 'curso_id', 'created_at', 'updated_at'
    ];
}
