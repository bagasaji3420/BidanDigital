<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class RateLimitServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        RateLimiter::for('chatbot-daily', function (Request $request) {
            return Limit::perDay(5)
                ->by($request->ip())
                ->response(function () {
                    return response()->json([
                        'success'   => false,
                        'reply'     => 'Kuota harian kamu sudah habis (maksimal 5 pertanyaan). Silakan kembali lagi besok ya 😊',
                        'remaining' => 0,
                        'reset_in'  => now()->endOfDay()->diffInSeconds(),
                    ], 429);
                });
        });
    }
}
