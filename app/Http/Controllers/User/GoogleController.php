<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use RealRashid\SweetAlert\Facades\Alert;


class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handle callback dari Google
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {

                if (!$user->google_id) {
                    $user->google_id = $googleUser->getId();
                }

                if (empty($user->avatar)) {
                    $avatarUrl = $googleUser->getAvatar();

                    try {
                        $response = Http::timeout(5)->get($avatarUrl);

                        if (
                            $response->successful() &&
                            str_contains($response->header('Content-Type'), 'image')
                        ) {
                            $path = upload_image_webp($response->body(), 'avatars', 80);

                            $user->avatar = $path;
                            $user->email_verified_at = now();
                            $user->google_id  = $googleUser->getId();
                        }
                    } catch (\Exception $e) {

                    }
                }

                $user->save();
                Auth::login($user, true);
            } else {
                $nameParts = explode(' ', $googleUser->getName());
                $firstName = $nameParts[0];
                $lastName  = $nameParts[1] ?? '';

                $user = User::create([
                    'email'      => $googleUser->getEmail(),
                    'first_name' => $firstName,
                    'last_name'  => $lastName,
                    'username'   => str_replace(' ', '', strtolower($googleUser->getName())) . rand(1000, 9999),
                    'google_id'  => $googleUser->getId(),
                    'avatar'     => $googleUser->getAvatar(),
                    'password'   => Hash::make('admin'),
                    'email_verified_at' => now(),
                ]);

                $user->assignRole('guest');

                Auth::login($user, true);
            }

            return redirect()->intended(route('dashboard'));
        } catch (\Exception $e) {
            // dd($e->getMessage());

            Alert::warning('Login Failed', 'Google authentication failed. Try Again ');

            return redirect('/login');
        }
    }

}
