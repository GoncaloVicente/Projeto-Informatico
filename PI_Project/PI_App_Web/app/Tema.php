<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tema extends Model
{
    use SoftDeletes;
    public $timestamps = true;
    protected $table = 'tema';

    protected $fillable = [
        'id', 'nome', 'professor_id', 'uC_id', 'created_at', 'updated_at'
    ];

    public function conteudos()
    {
        return $this->hasMany(Conteudo::class);
    }
}
