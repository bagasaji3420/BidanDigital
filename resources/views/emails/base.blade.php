<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Notifikasi dari ' . config('app.name') }}</title>
</head>

<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px 10px; margin:0;">

    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden;">

        {{-- HEADER --}}
        <div style="background:#ffe062; padding:20px; text-align:center;">
            <span style="font-size:20px; font-weight:bold; color:#C8A2C8;">
                {{ config('app.name') }}
            </span>
        </div>

        {{-- BODY --}}
        <div style="padding:30px; text-align:center;">

            <h2 style="margin-top:0; margin-bottom:10px; color:#333;">
                Hello, {{ $name ?? 'User' }}
            </h2>

            {{-- CONTENT --}}
            <div style="color:#555; margin:20px 0; text-align:{{ $align ?? 'center' }};">
                @include($view, $data ?? [])
            </div>

            {{-- BUTTON --}}
            @isset($buttonUrl)
                <a href="{{ $buttonUrl }}"
                    style="background:{{ $buttonColor ?? '#696cff' }}; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; display:inline-block; margin-top:10px;">
                    {{ $buttonText ?? 'Click Here' }}
                </a>
            @endisset

            {{-- FOOTER NOTE --}}
            @isset($footer)
                <p style="color:#999; font-size:13px; margin-top:24px; margin-bottom:0;">
                    {{ $footer }}
                </p>
            @endisset

        </div>

    </div>

    {{-- COPYRIGHT --}}
    <div style="margin-top:20px; text-align:center; font-size:12px; color:#aaa;">
        © {{ date('Y') }} <strong>{{ config('app.name') }}</strong>. All rights reserved.
    </div>

</body>

</html>
