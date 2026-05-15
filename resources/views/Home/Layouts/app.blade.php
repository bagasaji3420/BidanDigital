<!DOCTYPE html>
<html lang="en" class="layout-navbar-fixed layout-menu-fixed layout-compact" dir="ltr" data-skin="default"
    data-assets-path="../../assets/" data-template="vertical-menu-template" data-bs-theme="light">

@include('Home.Layouts.header')
@php
    $breakingNews = \App\Models\Article\Article::where('is_breaking', true)
        ->where('status', 'published')
        ->where('breaking_until', '>', now())
        ->latest()
        ->take(8)
        ->get();

    $number = $breakingNews->count() ? '120' : '80';
@endphp

<style>
    .main-content {
        margin-top: {{ $number }}px;
    }
</style>


<script>
    var KB_ICON_URL = "{{ asset('assets/img/favicon/icon.webp') }}";
</script>


<body style="background:var(--bs-body-bg);">

    @include('Home.Layouts.loading')
    @vite('resources/js/loading.js')


    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="../../assets/vendor/js/dropdown-hover.js"></script>
    <script src="../../assets/vendor/js/mega-dropdown.js"></script>

    @include('Home.Layouts.navbar')
    @include('Home.Layouts.breaking')

    <div class="main-content">
        <div class="container py-5">

            @yield('content')

            @unless (request()->is('*game*') || request()->is('*game'))
                @vite('resources/js/chatbot.js')
                @include('Home.Layouts.chatbot')
            @endunless

            @if (request()->is('tools*'))
                @include('Home.Layouts.info')
            @endif

            @if (request()->is('articles*'))
                <a href="{{ route('article.bookmark') }}" title="Artikel Tersimpan" class="fb-float-btn">
                    <i class="bx bx-bookmark" style="font-size: 24px; color: #696cff;"></i>
                </a>
            @endif

        </div>
    </div>

    <div class="layout-overlay layout-menu-toggle"></div>
    <div class="drag-target"></div>

    @include('Home.Layouts.bottom-navbar')
    
    @include('Home.Layouts.footer')

    @include('sweetalert::alert')

    @stack('scripts')

    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js', {
                        scope: '/'
                    })
                    .then(function(r) {
                        console.log('SW aktif:', r.scope);
                    })
                    .catch(function(e) {
                        console.error('SW gagal:', e);
                    });
            });
        }
    </script>



</body>

</html>
