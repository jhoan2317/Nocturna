<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\SavedEvent;
use App\Http\Resources\SavedEvent\SavedEventResource;
use App\Http\Requests\SavedEvent\StoreSavedEventRequest;

class SavedEventsController extends Controller
{

    public function index()
    {
        $savedEvents = SavedEvent::with(['user', 'event'])->get();
        return SavedEventResource::collection($savedEvents);
    }

    public function savedEventsUser($id_user)
    {
        try {
            $savedEvents = User::find($id_user)->savedevents()->with('event.brand')->get();
            return response()->json($savedEvents);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function store(StoreSavedEventRequest $request)
    {
        $savedEvent = SavedEvent::create($request->validated());
        $savedEvent->load(['user', 'event']);

        return response()->json([
            'success' => true,
            'message' => 'Evento guardado exitosamente',
            'saved_event' => new SavedEventResource($savedEvent)
        ], 201);
    }

    public function destroy(string $slug)
    {
        $savedEvent = SavedEvent::where('slug', $slug)->firstOrFail();
        $savedEvent->delete();

        return response()->json([
            'success' => true,
            'message' => 'Evento eliminado de guardados exitosamente'
        ]);
    }
}