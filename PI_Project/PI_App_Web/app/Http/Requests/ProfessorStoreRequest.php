<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfessorStoreRequest extends FormRequest
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
        $rules = [
            'nome' => 'required|max:255|regex:/^[A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ ]+$/',
            'email' => 'required|email|unique:professor,email'
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'numero.numeric' => 'O campo número de professor tem de ser do tipo numérico.',
            'nome.required' => 'O campo nome não pode estar vazio.',
            'nome.regex' => 'O campo nome apenas pode conter letras e espaços.',
            'nome.max' => 'O campo nome não pode ter mais que 255 carateres.',
            'email.required' => 'O campo email não pode estar vazio.',
            'email.email' => 'O campo email não está na forma correta.',
            'email.unique' => 'O campo email já existe.',
        ];
    }
}
