<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Curso_Has_Professor extends Model
{
    public $timestamps = false;
    protected $table = 'curso_has_professor';

    protected $fillable = [
        'curso_id', 'professor_id'
    ];

    public function curso()
    {
        return $this->hasOne(Curso::class);
    }

    public function professor()
    {
        return $this->hasOne(Professor::class);
    }


}
