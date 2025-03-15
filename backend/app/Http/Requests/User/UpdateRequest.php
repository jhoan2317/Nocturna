<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:100',
            'last_name' => 'required|string|min:2|max:100',
            'birthday' => 'nullable|date|before:today',
            'gender' => 'nullable|string|in:Masculino,Femenino,Otro'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es requerido',
            'name.min' => 'El nombre debe tener al menos 2 caracteres',
            'name.max' => 'El nombre no puede tener más de 100 caracteres',

            'last_name.required' => 'El apellido es requerido',
            'last_name.min' => 'El apellido debe tener al menos 2 caracteres',
            'last_name.max' => 'El apellido no puede tener más de 100 caracteres',

            'birthday.date' => 'La fecha de nacimiento debe ser una fecha válida',
            'birthday.before' => 'La fecha de nacimiento debe ser anterior a hoy',

            'gender.in' => 'El género debe ser Masculino, Femenino u Otro'
        ];
    }
} 