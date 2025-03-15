<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\Event\EventResource;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;

class EventsController extends Controller
{

    public function index()
    {
        $events = Event::with(['place.category', 'comments', 'savedEvents'])->get();
        return EventResource::collection($events);
    }

    public function search(Request $request)
    {
        $events = Event::query()
            ->with(['place.category', 'comments', 'savedEvents'])
            ->when($request->has('title'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->title . '%');
            })
            ->when($request->has('description'), function ($query) use ($request) {
                $query->where('description', 'like', '%' . $request->description . '%');
            })
            ->when($request->has('capacity'), function ($query) use ($request) {
                $query->where('capacity', $request->capacity);
            })
            ->when($request->has('min_price'), function ($query) use ($request) {
                $query->where('price', '>=', $request->min_price);
            })
            ->when($request->has('max_price'), function ($query) use ($request) {
                $query->where('price', '<=', $request->max_price);
            })
            ->when($request->has('place_id'), function ($query) use ($request) {
                $query->where('place_id', $request->place_id);
            })
            ->get();

        return response()->json([
            'success' => true,
            'events' => EventResource::collection($events)
        ]);
    }

    public function show(Request $request)
    {
        $event = Event::with(['place.category', 'comments', 'savedEvents'])
            ->findOrFail($request->id);

        return new EventResource($event);
    }

    public function comments(Request $request)
    {
        $event = Event::find($request->event_id);
        $comments = Comment::where('event_id', $event->id)->with('user.profile')->get();

        return $comments;
    }

    public function store(StoreEventRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('imgPath')) {
            $file = $request->file('imgPath');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('events'), $filename);
            $data['imgPath'] = 'events/' . $filename;
        }

        $event = Event::create($data);
        $event->load(['place', 'comments', 'savedEvents']);

        return response()->json([
            'success' => true,
            'message' => 'Evento creado exitosamente',
            'event' => new EventResource($event)
        ], 201);
    }

    public function update(UpdateEventRequest $request, string $id)
    {
        $event = Event::findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('imgPath')) {
            // Eliminar imagen anterior si existe
            if ($event->imgPath && file_exists(public_path($event->imgPath))) {
                unlink(public_path($event->imgPath));
            }

            $file = $request->file('imgPath');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('events'), $filename);
            $data['imgPath'] = 'events/' . $filename;
        }

        $event->update($data);
        $event->load(['place', 'comments', 'savedEvents']);

        return response()->json([
            'success' => true,
            'message' => 'Evento actualizado exitosamente',
            'event' => new EventResource($event)
        ]);
    }

    public function destroy(Event $event)
    {
        if ($event->imgPath && file_exists(public_path($event->imgPath))) {
            unlink(public_path($event->imgPath));
        }
        
        $event->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Evento eliminado exitosamente'
        ]);
    }
}
