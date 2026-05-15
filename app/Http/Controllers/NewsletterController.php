<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use App\Mail\NewsletterWelcome;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Jobs\SendNewsletterWelcomeJob;
use RealRashid\SweetAlert\Facades\Alert;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $existing = NewsletterSubscriber::where('email', $request->email)->first();

        if ($existing) {
            if ($existing->is_active) {
                Alert::error('Success', 'Email ini sudah terdaftar');

                return back()->with('newsletter_error', '');
            }
            // Aktifkan kembali kalau sebelumnya unsubscribe
            $existing->update(['is_active' => true]);
            Alert::success('Success', 'Kamu sudah berlangganan kembali!');

            return back();
        }

        $subscriber = NewsletterSubscriber::create([
            'email'    => $request->email,
            'token'    => Str::random(32),
            'is_active' => true,
        ]);

        // Kirim email konfirmasi (opsional)
        dispatch(new SendNewsletterWelcomeJob($subscriber));

        Alert::success('Success', 'Terimakasih sudah berlangganan!');

        return back();
    }

    public function unsubscribe(string $token)
    {
        $subscriber = NewsletterSubscriber::where('token', $token)->firstOrFail();
        $subscriber->update(['is_active' => false]);


        Alert::success('Success', 'Berhenti berlangganan!');

        return redirect()->route('index');
    }
}
