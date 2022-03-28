<?php

namespace App\Listeners;

use App\Professor;
use App\Events\TutoriaCreatedMov;
use App\Mail\TutoriaEmailCreatedMov;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmailCreatedMov
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
     * @param  TutoriaCreatedMov  $event
     * @return void
     */
    public function handle(TutoriaCreatedMov $event)
    {
        //enviar o email
        $professor = Professor::find($event->tutoria->professor_id);
        Mail::to($professor->email)
            ->send(new TutoriaEmailCreatedMov($event->tutoria));
    }
}