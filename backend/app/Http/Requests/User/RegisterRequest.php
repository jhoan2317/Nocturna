<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'birthday' => 'required|date|before:today',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/',
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

            'birthday.required' => 'La fecha de nacimiento es requerida',
            'birthday.date' => 'La fecha de nacimiento debe ser una fecha válida',
            'birthday.before' => 'La fecha de nacimiento debe ser anterior a hoy',

            'email.required' => 'El correo electrónico es requerido',
            'email.email' => 'El correo electrónico debe ser válido',
            'email.unique' => 'Este correo electrónico ya está registrado',

            'password.required' => 'La contraseña es requerida',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'password.regex' => 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*#?&)',
            'gender.in' => 'El género debe ser Masculino, Femenino u Otro'
        ];
    }
} 