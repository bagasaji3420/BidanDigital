<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\TwitterCard;

class HomeController extends Controller
{
    private function setSeo(string $title, string $description, string $keywords = '')
    {
        SEOMeta::setTitle($title . ' | ' . config('app.name'));
        SEOMeta::setDescription($description);
        SEOMeta::setCanonical(url()->current());
        if ($keywords) {
            SEOMeta::addKeyword(explode(',', $keywords));
        }

        OpenGraph::setTitle($title . ' | ' . config('app.name'));
        OpenGraph::setDescription($description);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setType('website');

        TwitterCard::setTitle($title . ' | ' . config('app.name'));
        TwitterCard::setDescription($description);
        TwitterCard::setType('summary');
    }

    public function privacyPolicy()
    {
        $this->setSeo(
            'Kebijakan Privasi',
            'Pelajari bagaimana ' . config('app.name') . ' mengelola dan melindungi data pribadimu.',
        );

        return view('privacy-policy', [
            'title' => 'Kebijakan Privasi',
        ]);
    }

    public function contact()
    {
        $this->setSeo(
            'Hubungi Kami',
            'Ada pertanyaan atau saran? Hubungi tim ' . config('app.name') . ' melalui form kontak kami.',
        );

        return view('contact', [
            'title' => 'Hubungi Kami',
        ]);
    }

    public function sendContact(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        Mail::send('emails.base', [
            'title' => 'Pesan Kontak Baru: ' . $request->subject,
            'name'  => 'Admin',
            'view'  => 'emails.parts.contact',
            'align'      => 'left', // ← tambah ini
            'data'  => [
                'name'    => $request->name,
                'email'   => $request->email,
                'subject' => $request->subject,
                'message' => $request->message,
            ],
            'footer' => 'Pesan ini dikirim dari halaman kontak ' . config('app.name'),
        ], function ($mail) use ($request) {
            $mail->to(config('mail.from.address'))
                ->replyTo($request->email, $request->name)
                ->subject('Kontak: ' . $request->subject);
        });

        return back()->with('success', 'Pesan kamu sudah terkirim! Kami akan membalas secepatnya.');
    }
}
