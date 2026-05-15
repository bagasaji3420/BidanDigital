{{-- resources/views/emails/newsletter/welcome.blade.php --}}
<x-mail::message>
    # Halo, Bunda! 👋

    Terima kasih sudah berlangganan newsletter **{{ config('app.name') }}**.

    Kamu akan mendapat info terbaru seputar kehamilan, persalinan, dan tumbuh kembang bayi.

    Jika ingin berhenti berlangganan, klik tombol di bawah ini:

    <x-mail::button :url="route('newsletter.unsubscribe', $subscriber->token)" color="red">
        Berhenti Berlangganan
    </x-mail::button>

    Salam hangat,
    **Tim {{ config('app.name') }}**
</x-mail::message>
