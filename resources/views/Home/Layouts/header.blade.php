<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    {{-- <title>{{ $title }}</title> --}}
    {!! SEO::generate() !!}

    {{-- PWA Meta --}}
    <meta name="theme-color" content="#7C3AED">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="KaBidan">
    <link rel="apple-touch-icon" href="/icon/icon-192x192.png">
    {{-- <link rel="manifest" href="/site.webmanifest"> --}}


    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="chatbot-url" content="{{ route('chatbot.send') }}">

    <meta name="description" content="" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon/favicon.ico') }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet" />

    <link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"> <!-- Core CSS -->

    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/pickr/pickr-themes.css') }}" />

    <link rel="stylesheet" href="{{ asset('assets/vendor/css/core.css') }}" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('assets/vendor/css/pages/front-page.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/pages/front-page-landing.css') }}" />

    <!-- Helpers -->
    <script src="{{ asset('assets/vendor/js/helpers.js') }}"></script>
    <script src="{{ asset('assets/js/front-config.js') }}"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <link rel="stylesheet" href="{{ asset('assets/css/chatbot.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}" />


    @if ($title == 'Kalkulator HPL')
        <link rel="stylesheet" href="{{ asset('assets/css/hpl.css') }}" />
    @elseif ($title == 'Kick Counter')
        <link rel="stylesheet" href="{{ asset('assets/css/kick-tracker.css') }}" />
    @elseif ($title == 'Grafik Pertumbuhan Bayi')
        <link rel="stylesheet" href="{{ asset('assets/css/pertumbuhan-bayi.css') }}" />
    @elseif ($title == 'Skrining Preeklampsia')
        <link rel="stylesheet" href="{{ asset('assets/css/preeklamsia.css') }}" />
    @elseif ($title == 'Tracker Kontraksi')
        <link rel="stylesheet" href="{{ asset('assets/css/kontraksi.css') }}" />
    @elseif ($title == 'Tracker Berat Badan')
        <link rel="stylesheet" href="{{ asset('assets/css/berat-badan.css') }}" />
    @elseif ($title == 'Tracker Tekanan Darah')
        <link rel="stylesheet" href="{{ asset('assets/css/tekanan-darah.css') }}" />
    @elseif ($title == 'Jadwal Imunisasi Bayi')
        <link rel="stylesheet" href="{{ asset('assets/css/imunisasi.css') }}" />
    @elseif ($title == 'Skrining EPDS')
        <link rel="stylesheet" href="{{ asset('assets/css/epds.css') }}" />
    @endif


    @vite('resources/js/chatbot.js')
</head>
