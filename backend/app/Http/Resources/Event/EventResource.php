<?php

namespace App\Http\Resources\Event;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'capacity' => $this->capacity,
            'price' => $this->price,
            'imgPath' => $this->imgPath ? asset($this->imgPath) : null,
            'place' => [
                'id' => $this->place->id,
                'title' => $this->place->title,
                'location' => $this->place->location,
                'category' => [
                    'id' => $this->place->category->id,
                    'title' => $this->place->category->title,
                    'slug' => $this->place->category->slug
                ]
            ],
            'comments' => [
                'id' => $this->comments->first()?->id,
                'text' => $this->comments->first()?->text,
                'user' => [
                    'id' => $this->comments->first()?->user->id,
                    'name' => $this->comments->first()?->user->name,
                    'last_name' => $this->comments->first()?->user->last_name
                ]
            ],
            'comments_count' => $this->comments->count(),
            'saved_events_count' => $this->savedEvents->count(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
} 