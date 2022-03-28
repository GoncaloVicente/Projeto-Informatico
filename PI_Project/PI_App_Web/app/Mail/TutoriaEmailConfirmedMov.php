<?php

namespace App\Mail;

use App\Aluno;
use App\Professor;
use App\Sala;
use App\UnidadeCurricular;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TutoriaEmailConfirmedMov extends Mailable
{
    use Queueable, SerializesModels;

    public $tutoria;
    public $sala;
    public $professor;
    public $uc;
    public $aluno;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($tut)
    {
        $this->tutoria = $tut;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $this->sala = Sala::find($this->tutoria->sala_id);
        $this->professor = Professor::find($this->tutoria->professor_id);
        $this->aluno = Aluno::find($this->tutoria->aluno_id);
        $this->uc = UnidadeCurricular::find($this->tutoria->unidade_curricular_id);
        $this->tutoria->data = Carbon::parse($this->tutoria->data)->format('d-m-Y');
        $hora = explode(':', $this->tutoria->horaInicio);
        $this->tutoria->horaInicio = $hora[0].':'.$hora[1];

        return $this->subject('Tutoria Confirmada '.$this->tutoria->assunto)
            ->markdown('emails.tutoriaConfirmedMov');
    }
}
