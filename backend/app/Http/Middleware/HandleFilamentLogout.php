<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HandleFilamentLogout
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Si es una petición de logout y viene de Filament
        if ($request->is('admin/logout') || str_contains($request->header('Referer') ?? '', '/admin')) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('http://localhost:3000/users/login');
        }

        return $response;
    }
} 