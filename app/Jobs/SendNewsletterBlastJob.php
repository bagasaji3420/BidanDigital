<?php

namespace App\Jobs;

use App\Mail\NewsletterBlast;
use App\Models\NewsletterSubscriber;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendNewsletterBlastJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        protected NewsletterSubscriber $subscriber,
        protected string $mailSubject,
        protected string $mailContent,
    ) {}

    public function handle(): void
    {
        Mail::to($this->subscriber->email)
            ->send(new NewsletterBlast($this->subscriber, $this->mailSubject, $this->mailContent));
    }
}