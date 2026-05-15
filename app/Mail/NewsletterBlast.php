<?php

namespace App\Mail;

use App\Models\NewsletterSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterBlast extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        protected NewsletterSubscriber $subscriber,
        protected string $mailSubject,  // ← ganti dari $subject
        protected string $mailContent,  // ← ganti dari $content
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: $this->mailSubject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.base',
            with: [
                'title'  => $this->mailSubject,
                'name' => $this->subscriber->user
                    ? $this->subscriber->user->first_name . ' ' . $this->subscriber->user->last_name
                    : $this->subscriber->email,
                'view'   => 'emails.parts.newsletter_blast',
                'data'   => [
                    'content'         => $this->mailContent,
                    'unsubscribe_url' => route('newsletter.unsubscribe', $this->subscriber->token),
                ],
                'footer' => 'Kamu menerima email ini karena berlangganan newsletter kami.',
            ]
        );
    }
}
