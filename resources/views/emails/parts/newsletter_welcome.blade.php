{{-- resources/views/emails/parts/newsletter_welcome.blade.php --}}
<p>Halo, Bunda! 👋</p>
<p>
    Terima kasih sudah berlangganan newsletter <strong>{{ config('app.name') }}</strong>.
    Kamu akan mendapat info terbaru seputar kehamilan, persalinan, dan tumbuh kembang bayi.
</p>
<p>
    Jika ingin berhenti berlangganan, klik link di bawah:
</p>
<p>
    <a href="{{ $data['unsubscribe_url'] }}">Berhenti Berlangganan</a>
</p>