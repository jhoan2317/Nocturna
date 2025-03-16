<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use App\Http\Resources\Place\PlaceResource;
use App\Http\Requests\Place\StorePlaceRequest;
use App\Http\Requests\Place\UpdatePlaceRequest;

class PlacesController extends Controller
{
    public function index()
    {
        $places = Place::with(['category', 'events', 'ratings.user'])->get();
        return PlaceResource::collection($places);
    }

    public function search(Request $request)
    {
        $places = Place::query()
            ->with(['category', 'events', 'ratings.user'])
            ->when($request->has('title'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->title . '%');
            })
            ->when($request->has('description'), function ($query) use ($request) {
                $query->where('description', 'like', '%' . $request->description . '%');
            })
            ->get();

        return response()->json([
            'success' => true,
            'events' => PlaceResource::collection($places)
        ]);
    }

    public function placeEvents(Place $place)
    {
        $place->load(['category', 'events', 'ratings.user']);
        return new PlaceResource($place);
    }

    public function show(Place $place)
    {
        $place->load(['category', 'events', 'ratings.user']);
        return new PlaceResource($place);
    }

    public function store(StorePlaceRequest $request)
    {
        $data = $request->validated();
        
        if ($request->hasFile('imgPath')) {
            $file = $request->file('imgPath');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('places'), $filename);
            $data['imgPath'] = 'places/' . $filename;
        }

        $place = Place::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Lugar creado exitosamente',
            'place' => new PlaceResource($place)
        ], 201);
    }

    public function update(UpdatePlaceRequest $request, Place $place)
    {
        $data = $request->validated();

        if ($request->hasFile('imgPath')) {
            // Eliminar imagen anterior si existe
            if ($place->imgPath && file_exists(public_path($place->imgPath))) {
                unlink(public_path($place->imgPath));
            }

            $file = $request->file('imgPath');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('places'), $filename);
            $data['imgPath'] = 'places/' . $filename;
        }

        $place->update($data);
        $place->load(['category', 'events', 'ratings.user']);

        return response()->json([
            'success' => true,
            'message' => 'Lugar actualizado exitosamente',
            'place' => new PlaceResource($place)
        ], 200);
    }

    public function destroy(string $slug)
    {
        $place = Place::where('slug', $slug)->firstOrFail();
        
        // Eliminar imagen si existe
        if ($place->imgPath && file_exists(public_path($place->imgPath))) {
            unlink(public_path($place->imgPath));
        }
        
        $place->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lugar eliminado exitosamente'
        ], 200);
    }

    public function comments(string $slug)
    {
        $place = Place::where('slug', $slug)->firstOrFail();
        $comments = $place->comments()->with('user')->get();
        
        return response()->json([
            'success' => true,
            'comments' => $comments
        ]);
    }
}
