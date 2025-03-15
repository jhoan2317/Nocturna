<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Http\Resources\Rating\RatingResource;
use App\Http\Requests\Rating\StoreRatingRequest;

class RatingsController extends Controller
{
    public function store(StoreRatingRequest $request)
    {
        $rating = Rating::create($request->validated());
        $rating->load(['user', 'place']);

        return response()->json([
            'success' => true,
            'message' => 'Calificación creada exitosamente',
            'rating' => new RatingResource($rating)
        ], 201);
    }
} 