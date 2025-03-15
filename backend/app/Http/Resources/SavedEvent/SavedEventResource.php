<?php

namespace App\Http\Resources\SavedEvent;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SavedEventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'last_name' => $this->user->last_name
            ],
            'event' => [
                'id' => $this->event->id,
                'title' => $this->event->title
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
} 