<?php

namespace App\Http\Requests\Restriction;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestrictionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'event_id' => 'required|exists:events,id',
            'type' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'is_mandatory' => 'boolean'
        ];
    }

    public function messages(): array
    {
        return [
            'event_id.required' => 'El evento es obligatorio',
            'event_id.exists' => 'El evento no existe',

            'type.required' => 'El tipo es obligatorio',
            'type.string' => 'El tipo debe ser texto',
            'type.max' => 'El tipo no puede tener más de 255 caracteres',

            'title.required' => 'El título es obligatorio',
            'title.string' => 'El título debe ser texto',
            'title.max' => 'El título no puede tener más de 255 caracteres',

            'description.required' => 'La descripción es obligatoria',
            'description.string' => 'La descripción debe ser texto',
            
            'is_mandatory.boolean' => 'El campo obligatorio debe ser verdadero o falso'
        ];
    }
} 