<!-- Bottom Navbar Mobile: Start -->
<nav class="d-lg-none fixed-bottom bg-body shadow-lg border-top" style="z-index: 1050;">
    <div class="d-flex justify-content-around align-items-center px-2" style="height: 60px;">

        <button type="button"
            class="btn d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent p-0"
            style="width: 64px;" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
            <i class="bx bx-menu fs-4 text-muted"></i>
            <span style="font-size: 0.65rem;" class="text-muted">Menu</span>
        </button>

        {{-- Tombol Theme --}}
        <button type="button"
            class="btn d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent p-0"
            style="width: 64px;" id="bottomThemeToggle">
            <i class="bx bx-sun fs-4 text-muted theme-icon-active"></i>
            <span style="font-size: 0.65rem;" class="text-muted">Tema</span>
        </button>

        {{-- Tombol 2: Home (floating) --}}
        <a href="/app" class="btn btn-primary d-flex flex-column align-items-center justify-content-center shadow"
            style="width: 56px; height: 56px; border-radius: 50%; margin-bottom: 24px;">
            <i class="bx bx-home-alt-2 fs-4"></i>
        </a>

        {{-- Tombol 3: Notifikasi --}}
        @auth
            <a href="{{ route('notifications.index') }}"
                class="btn d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent p-0 position-relative"
                style="width: 64px;">
                <i class="bx bx-bell fs-4 text-muted"></i>
                {{-- Badge kalau ada notif belum dibaca --}}
                @php $unread = auth()->user()->unreadNotifications->count(); @endphp
                @if ($unread > 0)
                    <span class="badge bg-danger position-absolute" style="font-size: 0.55rem; top: 0; right: 8px;">
                        {{ $unread > 9 ? '9+' : $unread }}
                    </span>
                @endif
                <span style="font-size: 0.65rem;" class="text-muted">Notifikasi</span>
            </a>
        @else
            <a href="{{ route('login') }}"
                class="btn d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent p-0"
                style="width: 64px;">
                <i class="bx bx-bell fs-4 text-muted"></i>
                <span style="font-size: 0.65rem;" class="text-muted">Notifikasi</span>
            </a>
        @endauth

        {{-- Tombol 4: Artikel --}}
        <a href="{{ route('article.index') }}"
            class="btn d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent p-0"
            style="width: 64px;">
            <i class="bx bx-news fs-4 text-muted"></i>
            <span style="font-size: 0.65rem;" class="text-muted">Artikel</span>
        </a>

    </div>
</nav>
<!-- Bottom Navbar Mobile: End -->
<div class="d-lg-none" style="height: 60px;"></div>

<script>
    (function() {
        const KEY = 'theme';
        const saved = localStorage.getItem(KEY) || 'light';

        document.documentElement.setAttribute('data-bs-theme', saved);

        document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('bottomThemeToggle');
            if (!btn) return;

            const icon = btn.querySelector('i');

            // set icon awal
            icon.classList.toggle('bx-sun', saved === 'light');
            icon.classList.toggle('bx-moon', saved === 'dark');

            btn.addEventListener('click', function() {
                const current = document.documentElement.getAttribute('data-bs-theme');
                const next = current === 'dark' ? 'light' : 'dark';

                document.documentElement.setAttribute('data-bs-theme', next);
                localStorage.setItem(KEY, next);

                icon.classList.toggle('bx-sun', next === 'light');
                icon.classList.toggle('bx-moon', next === 'dark');

                document.querySelectorAll('[data-bs-theme-value]').forEach(el => {
                    el.classList.toggle('active', el.dataset.bsThemeValue === next);
                });
            });
        });
    })();
</script>
