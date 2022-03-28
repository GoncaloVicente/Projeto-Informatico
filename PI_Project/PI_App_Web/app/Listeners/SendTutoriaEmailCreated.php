<?php

namespace App\Listeners;

use App\Aluno;
use App\Events\TutoriaCreated;
use App\Mail\TutoriaEmailCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmailCreated
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  TutoriaCreated  $event
     * @return void
     */
    public function handle(TutoriaCreated $event)
    {
        //enviar o email
        $aluno = Aluno::find($event->tutoria->aluno_id);
        Mail::to($aluno->numero.'@my.ipleiria.pt')
            ->send(new TutoriaEmailCreated($event->tutoria));
    }
}
