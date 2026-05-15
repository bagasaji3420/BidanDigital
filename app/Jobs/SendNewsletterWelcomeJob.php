<?php

namespace App\Jobs;

use App\Mail\NewsletterWelcome;
use App\Models\NewsletterSubscriber;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendNewsletterWelcomeJob implements ShouldQueue
{
    use Queueable;

    public function __construct(protected NewsletterSubscriber $subscriber) {}

    public function handle(): void
    {
        Mail::to($this->subscriber->email)->send(new NewsletterWelcome($this->subscriber));
    }
}
