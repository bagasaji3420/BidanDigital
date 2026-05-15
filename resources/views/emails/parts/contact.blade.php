{{-- resources/views/emails/parts/contact.blade.php --}}
<p><strong>Dari:</strong> {{ $data['name'] }}</p>
<p><strong>Email:</strong> <a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a></p>
<p><strong>Subject:</strong> {{ $data['subject'] }}</p>

<hr style="border:none; border-top:1px solid #eee; margin:16px 0;">

<p style="white-space:pre-line;">{{ $data['message'] }}</p>
