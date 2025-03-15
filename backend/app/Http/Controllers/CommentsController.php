<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Resources\Comment\CommentResource;
use App\Http\Requests\Comment\StoreCommentRequest;

class CommentsController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['user', 'place'])->get();
        return CommentResource::collection($comments);
    }

    public function store(StoreCommentRequest $request)
    {
        $comment = Comment::create($request->validated());
        $comment->load(['user', 'place']);

        return response()->json([
            'success' => true,
            'message' => 'Comentario creado exitosamente',
            'comment' => new CommentResource($comment)
        ], 201);
    }

    public function destroy(string $slug)
    {
        $comment = Comment::where('slug', $slug)->firstOrFail();
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comentario eliminado exitosamente'
        ]);
    }
}
