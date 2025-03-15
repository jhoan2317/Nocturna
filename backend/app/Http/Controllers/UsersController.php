<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\LoginRequest;
use App\Http\Resources\User\UserResource;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\UpdateRequest;

class UsersController extends Controller
{
    public function index()
    {
        return User::where('role', 'user')
            ->with(['savedEvents.event', 'comments', 'ratings'])
            ->get();
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        $user = Auth::user();

        if (!$user->status) {
            return response()->json([
                'success' => false,
                'message' => 'Tu cuenta está desactivada. Por favor contacta al administrador.'
            ], 403);
        }

        $user->load(['savedEvents.event', 'comments', 'ratings']);

        // Verificar roles usando el campo role directamente
        $isAdmin = $user->role === 'admin';
        $isClient = $user->role === 'client';

        if ($isAdmin || $isClient) {
            Auth::guard('web')->login($user);
            session()->regenerate();

            return response()->json([
                'success' => true,
                'redirect' => 'http://localhost:8000/admin'
            ], 200);
        }

        return response()->json([
            'success' => true,
            'user' => $user,
            'savedEvents' => $user->savedEvents,
            'isAdmin' => $isAdmin,
            'isClient' => $isClient
        ], 200);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->is('admin/logout') || str_contains($request->header('Referer') ?? '', '/admin')) {
            return redirect('http://localhost:3000/users/login');
        }

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente'
        ]);
    }


    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['role'] = 'user';
        $data['status'] = true;

        $user = User::create($data);
        $user->assignRole('user');

        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'user' => new UserResource($user)
        ], 201);
    }

    public function block(User $user)
    {
        $user->update([
            'status' => !$user->status
        ]);

        $message = $user->status ? 'Usuario desbloqueado exitosamente' : 'Usuario bloqueado exitosamente';

        $users = User::where('role', 'user')
            ->with(['savedEvents.event', 'comments', 'ratings'])
            ->get();

        return response()->json([
            'success' => true,
            'message' => $message,
            'users' => $users
        ], 200);
    }


    public function update(UpdateRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);

        $user->load(['savedEvents.event', 'comments', 'ratings']);

        return response()->json([
            'success' => true,
            'message' => 'Usuario actualizado exitosamente',
            'user' => new UserResource($user)
        ], 200);
    }


    public function destroy(string $slug)
    {
        $user = User::where('slug', $slug)->firstOrFail();
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado exitosamente'
        ], 200);
    }
}
