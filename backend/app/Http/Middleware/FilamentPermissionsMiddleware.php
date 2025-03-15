<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FilamentPermissionsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! auth()->check()) {
            return redirect()->route('filament.auth.login');
        }

        if (! auth()->user()->can('access admin panel')) {
            abort(403);
        }

        return $next($request);
    }
} 