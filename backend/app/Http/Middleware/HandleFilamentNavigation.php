<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HandleFilamentNavigation
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Si es una petición de Filament y el usuario no está autenticado
        if ($request->is('admin*') && !Auth::check()) {
            return redirect('http://localhost:8000/admin/login');
        }

        // Si es una petición de logout
        if ($request->is('admin/logout')) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('http://localhost:8000/admin/login');
        }

        return $response;
    }
} 