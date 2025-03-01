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

    public function savedEventUser(Request $request){
        return User::find($request->id_user)->savedevents()->with('event.brand')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $savedEvent = SavedEvent::where(['event_id' => $request->event_id])->first();
        $savedEvent->delete();

        $savedEvents = User::find($request->user_id)->savedevents()->with('event.brand')->get();
        return response()->json(['success' => true , 'savedEvents' => $savedEvents]);
    }
}
