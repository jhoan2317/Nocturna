<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class Brandscontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Brand::all();
    }

    public function brandEvents(Request $request)
    {
        return Brand::where('title', $request->title)->first()->events;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $brand = Brand::findOrFail($id);
        $oldTitle = $brand->title;
        $newTitle = $request->input('title');

        // Rename the image file if it exists
        $oldImagePath = public_path("bg/{$oldTitle}.jpg");
        $newImagePath = public_path("bg/{$newTitle}.jpg");
        if (file_exists($oldImagePath)) {
            rename($oldImagePath, $newImagePath);
        }

        $brand->title = $newTitle;
        $brand->save();

        return response()->json(['success' => true, 'brand' => $brand], 200);
    }
}
