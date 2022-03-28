<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlunoStoreRequest extends FormRequest
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
            'numero' => 'required|digits:7|unique:aluno,numero|numeric',
            'nome' => 'required|max:255|regex:/^[A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ ]+$/',
            'curso_id' => 'required'
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'numero.required' => 'O campo número de estudante não pode estar vazio.',
            'numero.digits' => 'O campo número de estudante tem de ter 7 digítos.',
            'numero.unique' => 'O campo número de estudante já existe.',
            'numero.numeric' => 'O campo número de estudante tem de ser do tipo numérico.',
            'nome.max' => 'O campo nome não pode ter mais que 255 carateres.',
            'nome.required' => 'O campo nome não pode estar vazio.',
            'nome.regex' => 'O campo nome apenas pode conter letras e espaços.',
            'curso_id.required' => 'O campo curso não pode estar vazio.',
        ];
    }
}
