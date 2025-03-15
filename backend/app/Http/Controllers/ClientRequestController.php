<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientRequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string|min:10',
        ]);

        // Verificar si el usuario ya tiene una solicitud pendiente
        $existingRequest = ClientRequest::where('user_id', $request->user_id)
            ->where('status', 'pending')
            ->first();

        if ($existingRequest) {
            return response()->json([
                'success' => false,
                'message' => 'Ya tienes una solicitud pendiente de revisión.'
            ], 400);
        }

        $clientRequest = ClientRequest::create([
            'user_id' => $request->user_id,
            'message' => $request->message,
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Solicitud enviada con éxito.',
            'data' => $clientRequest
        ], 201);
    }

    public function approve(ClientRequest $request)
    {
        DB::beginTransaction();
        try {
            $request->update(['status' => 'approved']);
            
            // Actualizar el rol del usuario a 'client'
            $request->user->update(['role' => 'client']);
            
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Solicitud aprobada con éxito.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al aprobar la solicitud.'
            ], 500);
        }
    }

    public function reject(ClientRequest $request)
    {
        $request->update(['status' => 'rejected']);
        
        return response()->json([
            'success' => true,
            'message' => 'Solicitud rechazada.'
        ]);
    }

    public function index()
    {
        $requests = ClientRequest::with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $requests
        ]);
    }
} 