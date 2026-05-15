<div>
    <div class="container py-3">
        <nav aria-label="breadcrumb">
            <div class="d-flex align-items-center justify-content-between flex-wrap">
                <ol class="breadcrumb mb-0 small">
                    <li class="breadcrumb-item">
                        <a href="{{ url('/app') }}" class="text-decoration-none">Tools</a>
                    </li>
                    <li class="breadcrumb-item">
                        <a class="text-decoration-none">{{ $title }}</a>
                    </li>
                </ol>

                <div class="d-flex gap-2">
                    <a href="{{ route('tools.panduan') }}"
                        class="text-decoration-none fs-6 d-flex align-items-center gap-1 text-muted">
                        <i class='bx bxs-book'></i>
                        <span>Panduan</span>
                    </a>

                    <a href="{{ route('tools.data') }}"
                        class="text-decoration-none fs-6 d-flex align-items-center gap-1 text-muted">
                        <i class='bx bxs-data'></i>
                        <span>Data</span>
                    </a>
                </div>
            </div>
        </nav>
    </div>
</div>
