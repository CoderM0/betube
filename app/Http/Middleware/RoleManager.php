<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (!Auth::check()) {
            return redirect(route('login'));
        }
        $usrRole = Auth::user()->role;
        if ($role == "admin") {
            if ($usrRole == 0) {
                return $next($request);
            }
        } else if ($role == "user") {
            if ($usrRole == 1) {
                return $next($request);
            }
        }
        switch ($usrRole) {
            case 0:
                return redirect()->intended(route('admin.dashboard', absolute: false));
                break;
            case 1:
                return redirect()->intended(route('dashboard', absolute: false));
                break;
        }
        return redirect(route('login'));
    }
}
