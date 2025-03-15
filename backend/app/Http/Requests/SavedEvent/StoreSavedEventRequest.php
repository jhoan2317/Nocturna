<?php

namespace App\Http\Requests\SavedEvent;

use Illuminate\Foundation\Http\FormRequest;

class StoreSavedEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id'
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'El usuario es obligatorio',
            'user_id.exists' => 'El usuario no existe',
            
            'event_id.required' => 'El evento es obligatorio',
            'event_id.exists' => 'El evento no existe'
        ];
    }
} 