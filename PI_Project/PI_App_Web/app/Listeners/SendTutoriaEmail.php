<?php

namespace App\Listeners;

use App\Aluno;
use App\Events\TutoriaChanged;
use App\Mail\TutoriaEmail;
use App\Professor;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmail
{

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  TutoriaChanged  $event
     * @return void
     */
    public function handle(TutoriaChanged $event)
    {
        //enviar o email
        $aluno = Aluno::find($event->tutoria->aluno_id);
        Mail::to($aluno->numero.'@my.ipleiria.pt')
            //->cc($emails)
            ->send(new TutoriaEmail($event->tutoria));
    }
}
