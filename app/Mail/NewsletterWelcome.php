<?php

namespace App\Mail;

use App\Models\NewsletterSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterWelcome extends Mailable
{
    use Queueable, SerializesModels;

    protected $subscriber;

    public function __construct(NewsletterSubscriber $subscriber)
    {
        $this->subscriber = $subscriber;
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Selamat datang di Newsletter ' . config('app.name'));
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.base',  // ← pakai template base kamu
            with: [
                'title' => 'Selamat Datang di ' . config('app.name'),
                'name' => $this->subscriber->user
                    ? $this->subscriber->user->first_name . ' ' . $this->subscriber->user->last_name
                    : $this->subscriber->email,
                'view'  => 'emails.parts.newsletter_welcome', // ← buat partial baru
                'data'  => [
                    'unsubscribe_url' => route('newsletter.unsubscribe', $this->subscriber->token),
                ],
                'footer' => 'Kamu menerima email ini karena mendaftar newsletter kami.',
            ]
        );
    }
}
