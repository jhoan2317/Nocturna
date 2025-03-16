<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class UsersController extends Controller
{
    //
    public function index()
    {
        return User::where('role', 'user')->with('profile')->get();
    }
    public function login(Request $request)
    {
        $data = $request->only('email', 'password');
        
        if (Auth::attempt($data)) {
            $user = Auth::user();
            if ($user->active) {
                $u = User::with('profile')->find($user->id);
                $savedEvents = $u->savedevents()->with('event.brand')->get();
                
                // Check if user has admin role
                $isAdmin = $user->role === 'admin';
                
                if ($isAdmin) {
                    Auth::guard('web')->login($user);
                    session()->regenerate();
                    
                    return response()->json([
                        'success' => true,
                        'redirect' => 'http://localhost:8000/admin'
                    ], 200);
                }
                
                return response()->json([
                    'success' => true,
                    'user' => $u,
                    'savedEvents' => $savedEvents,
                    'isAdmin' => $isAdmin
                ], 200);
            } else {
                return response()->json(['success' => false]);
            }
        }
        return response()->json(['message' => 'Credenciales invalidas'], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        // Si la petición viene de Filament o del admin panel
        if ($request->is('admin/logout') || str_contains($request->header('Referer') ?? '', '/admin')) {
            return redirect('http://localhost:3000/users/login');
        }

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $data = $request->only('name', 'last_name', 'birthday', 'email', 'password'); 
        $user = User::where('email', $data['email'])->first();
        if($user){
            return response()->json(['exists' => true]);
        }else{
            //sin profile
            $data['birthday'] = Date($data['birthday']);
            $data['password'] = bcrypt($data['password']);
            $data['role'] = 'user';
            $data['active'] = 1;
            User::create($data);
            return response()->json(['exists' => false], 200);
        }
    }

    public function block(User $user) {
        $user->update([
            'active' => !$user->active // Alterna entre 0 y 1
        ]);
    
        $users = User::where('role', 'user')->with('profile')->get();
    
        return response()->json(['success' => true, 'users' => $users], 200);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, Request $request)
    {
        $user->update([
            'name' => $request->name
        ]);
        $u = User::find($user->id)->with('profile')->first();
        return response()->json(['success'=>true, 'user'=>$u], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
