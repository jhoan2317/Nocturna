<?php

namespace App\Http\Controllers;

use App\Models\Restriction;
use App\Http\Resources\Restriction\RestrictionResource;
use App\Http\Requests\Restriction\StoreRestrictionRequest;

class RestrictionsController extends Controller
{
    public function index()
    {
        $restrictions = Restriction::with('event')->get();
        return RestrictionResource::collection($restrictions);
    }

    public function store(StoreRestrictionRequest $request)
    {
        $restriction = Restriction::create($request->validated());
        $restriction->load('event');

        return response()->json([
            'success' => true,
            'message' => 'Restricción creada exitosamente',
            'restriction' => new RestrictionResource($restriction)
        ], 201);
    }

    public function show(string $slug)
    {
        $restriction = Restriction::with('event')
            ->where('slug', $slug)
            ->firstOrFail();

        return new RestrictionResource($restriction);
    }

    public function update(StoreRestrictionRequest $request, string $slug)
    {
        $restriction = Restriction::where('slug', $slug)->firstOrFail();
        $restriction->update($request->validated());
        $restriction->load('event');

        return response()->json([
            'success' => true,
            'message' => 'Restricción actualizada exitosamente',
            'restriction' => new RestrictionResource($restriction)
        ]);
    }

    public function destroy(string $slug)
    {
        $restriction = Restriction::where('slug', $slug)->firstOrFail();
        $restriction->delete();

        return response()->json([
            'success' => true,
            'message' => 'Restricción eliminada exitosamente'
        ]);
    }
} 