<?php

namespace App\Http\Resources\Restriction;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestrictionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'type' => $this->type,
            'title' => $this->title,
            'description' => $this->description,
            'is_mandatory' => $this->is_mandatory,
            'event' => [
                'id' => $this->event->id,
                'title' => $this->event->title
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
} 