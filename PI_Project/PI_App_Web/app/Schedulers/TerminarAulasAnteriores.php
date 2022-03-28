<?php


namespace App\Schedulers;


use App\Aula;
use Carbon\Carbon;

class TerminarAulasAnteriores
{
    public function __invoke(){

        $aulasafechar = Aula::where('data', '<', Carbon::now()->toDateString())
            ->where('estado','0')->get('id')->map(function ($item, $key) {
                return $item->id;
            });

        if(count($aulasafechar) > 0){
            Aula::whereIn('id',$aulasafechar)->update(['estado' => 1]);
        }
    }
}
