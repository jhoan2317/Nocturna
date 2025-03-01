<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\SavedEvent;
use Illuminate\Http\Request;

class SavedEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return SavedEvents::all();
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('user_id', 'event_id');
        SavedEvent::create($data);

        $savedEvents = User::find($request->user_id)->savedevents()->with('event.brand')->get();
        return response()->json(['success' => true, 'savedEvents' => $savedEvents], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($event_id, $user_id)
    {
        $savedEvent = SavedEvent::where(['event_id' => $event_id, 'user_id' => $user_id])->first();
        if ($savedEvent) {
            $savedEvent->delete();
        }

        $savedEvents = User::find($user_id)->savedevents()->with('event.brand')->get();
        return response()->json(['success' => true, 'savedEvents' => $savedEvents]);
    }
}