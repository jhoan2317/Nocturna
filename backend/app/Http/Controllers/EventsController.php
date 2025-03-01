<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Comment;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Event::with('category', 'brand')->get();
        // return response()->json(['success' => true, 'title' => 'events', 'data' => $events]);
    }

    public function search(Request $request){
        $events = Event::where('title', 'like', '%'.$request->text.'%')
                ->orWhere('description', 'like', '%'.$request->text.'%')
                ->with('category', 'brand') 
                ->get();
                
        return $events;
    }

    public function show(Request $request){
        return Event::with('brand', 'category')->find($request->id);
    }

    public function comments(Request $request){
        $event = Event::find($request->event_id);
        $comments = Comment::where('event_id', $event->id)->with('user.profile')->get();

        return $comments;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Valida los datos entrantes
    $validatedData = $request->validate([
        'title'       => 'required|string|max:255',
        'description' => 'required|string',
        'location'    => 'required|string',
        'price'       => 'required|numeric',
        'rating'      => 'required|numeric',
        'imgPath'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validar que sea una imagen
        'category_id' => 'required|exists:categories,id',
        'brand_id'    => 'required|exists:brands,id',
    ]);

    // Manejar la carga de la imagen
    if ($request->hasFile('imgPath')) {
        $file = $request->file('imgPath');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('events_img'), $filename); // Mover la imagen a la carpeta events_img
        $validatedData['imgPath'] = $filename; // Almacenar el nombre del archivo
    }

    // Crear el evento
    $event = Event::create($validatedData);

    return response()->json([
        'success' => true,
        'event'   => $event,
    ], 201);
}
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event = Event::findOrFail($id);

        $validatedData = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'location'    => 'sometimes|required|string',
            'price'       => 'sometimes|required|numeric',
            'rating'      => 'sometimes|required|numeric',
            'imgPath'     => 'nullable|string',
            'category_id' => 'sometimes|required|exists:categories,id',
            'brand_id'    => 'sometimes|required|exists:brands,id',
        ]);

        // Puedes decidir si actualizar el slug cuando cambie el título, 
        // pero con el hook de creación no se vuelve a generar automáticamente en update.
        // Por lo general, se deja sin cambios o se actualiza manualmente si es necesario.

        $event->update($validatedData);

        return response()->json([
            'success' => true,
            'event'   => $event,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        $events = Event::with('category', 'brand')->get();

        return response()->json(['success' => true, 'events' => $events]);
    }
}
