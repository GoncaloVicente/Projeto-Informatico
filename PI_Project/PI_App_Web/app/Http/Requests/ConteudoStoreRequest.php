<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConteudoStoreRequest extends FormRequest
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
            'tipo' => 'required',
            'nome' => 'required|max:255',
            'tema_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'tipo.required' => 'O campo tipo não pode estar vazio.',
            'nome.required' => 'O campo nome não pode estar vazio.',
            'nome.max' => 'O campo nome não pode ter mais que 255 carateres.',
            'tema_id.required' => 'O campo tema não pode estar vazio.',
        ];
    }
}
