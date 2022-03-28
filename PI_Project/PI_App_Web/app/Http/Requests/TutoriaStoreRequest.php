<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TutoriaStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'data' => 'required|date',
            'horaInicio' => 'required',
            'assunto' => 'required',
            'sala_id' => 'required',
            'aluno_id' => 'required',
            'unidade_curricular_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'data.required' => 'O campo data não pode estar vazio.',
            'data.date' => 'O formato da data não é válido.',
            'horaInicio.required' => 'O campo hora de início não pode estar vazio.',
            'assunto.required' => 'O campo assunto não pode estar vazio.',
            'sala_id.required' => 'O campo sala não pode estar vazio.',
            'aluno_id.required' => 'O campo aluno não pode estar vazio.',
            'unidade_curricular_id.required' => 'O campo unidade curricular não pode estar vazio.',
        ];
    }
}
