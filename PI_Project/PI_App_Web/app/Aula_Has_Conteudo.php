<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aula_Has_Conteudo extends Model
{
    public $timestamps = false;
    protected $table = 'aula_has_conteudo';

    protected $fillable = [
        'aula_id', 'conteudo_id'
    ];
}
