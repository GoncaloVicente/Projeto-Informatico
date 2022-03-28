<?php


namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class TokenCookie
{
    public function handle($request, Closure $next)
    {
        $res = $next($request);

        if(Auth::user() != null){
            return $res->withCookie(cookie()->forever('api_token', Auth::user()->api_token, null, null, null, false));
        } else {
            return $res;
        }

    }
}
