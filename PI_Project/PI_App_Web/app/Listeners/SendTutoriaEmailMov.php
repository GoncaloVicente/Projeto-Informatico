<?php

namespace App\Listeners;

use App\Events\TutoriaChangedMov;
use App\Mail\TutoriaEmailMov;
use App\Professor;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmailMov
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
     * @param  TutoriaChangedMov  $event
     * @return void
     */
    public function handle(TutoriaChangedMov $event)
    {
        //enviar o email
        $professor = Professor::find($event->tutoria->professor_id);
        Mail::to($professor->email)
            ->send(new TutoriaEmailMov($event->tutoria));
    }
}
