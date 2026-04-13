<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user() || !in_array($request->user()->role, $roles)) {
            if ($request->user()) {
                // Redirect based on user's actual role
                switch ($request->user()->role) {
                    case 'admin':
                        return redirect()->route('admin.dashboard')->with('error', 'Unauthorized access.');
                    case 'vendor':
                        return redirect()->route('vendor.dashboard')->with('error', 'Unauthorized access.');
                    default:
                        return redirect()->route('dashboard')->with('error', 'Unauthorized access.');
                }
            }
            return redirect()->route('login');
        }

        return $next($request);
    }
}
