

@if ($breakingNews->count())

    <div id="breaking-bar" style="position: fixed; z-index: 1; left: 0; right: 0; background: transparent;">
        <div class="container">
            <div class="px-3 px-md-8">
                <div class="d-flex align-items-center border-bottom" style="height: 36px;">

                    {{-- Label --}}
                    <div class="d-flex align-items-center pe-3 flex-shrink-0"
                        style="border-right: 2px solid rgba(0,0,0,0.08);">
                        <span class="badge bg-secondary d-flex align-items-center gap-1 py-1 px-2">
                            <i class="bx bx-broadcast" style="font-size: 0.85rem;"></i>
                            <span class="fw-bold text-uppercase"
                                style="font-size: 0.7rem; letter-spacing: 0.08em;">Breaking</span>
                        </span>
                    </div>

                    {{-- Running text --}}
                    <div
                        style="overflow: hidden; flex: 1; height: 100%; display: flex; align-items: center; padding-left: 12px;">
                        <div class="breaking-ticker"
                            style="display: flex; align-items: center; gap: 40px; white-space: nowrap;">
                            @foreach ($breakingNews as $news)
                                <a href="{{ route('article.show', $news->slug) }}"
                                    class="text-body text-decoration-none" style="font-size: 0.8rem; flex-shrink: 0;">
                                    <i class="bx bx-radio-circle-marked me-1 text-danger opacity-75"></i>
                                    {{ $news->title }}
                                </a>
                            @endforeach
                            @foreach ($breakingNews as $news)
                                <a href="{{ route('article.show', $news->slug) }}"
                                    class="text-body text-decoration-none" style="font-size: 0.8rem; flex-shrink: 0;">
                                    <i class="bx bx-radio-circle-marked me-1 text-danger opacity-75"></i>
                                    {{ $news->title }}
                                </a>
                            @endforeach
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <style>
        
        .breaking-ticker {
            animation: ticker-scroll 50s linear infinite alternate;
        }

        .breaking-ticker:hover {
            animation-play-state: paused;
        }

        @keyframes ticker-scroll {
            0% {
                transform: translateX(0);
            }

            100% {
                transform: translateX(-50%);
            }
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const navbar = document.querySelector('.layout-navbar');
            const bar = document.getElementById('breaking-bar');
            const section = document.getElementById('main-content');

            const navH = navbar ? navbar.offsetHeight : 0;
            const barH = bar ? bar.offsetHeight : 0;

            // Tempatkan breaking bar tepat di bawah navbar
            if (bar) bar.style.top = navH + 'px';

            // Dorong konten utama agar tidak tertutup
            if (section) section.style.paddingTop = (navH + barH + 16) + 'px';

            // Background saat scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 10) {
                    bar.style.background = 'var(--bs-body-bg)';
                    bar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.08)';
                } else {
                    bar.style.background = 'transparent';
                    bar.style.boxShadow = 'none';
                }
            });
        });
    </script>

@endif
