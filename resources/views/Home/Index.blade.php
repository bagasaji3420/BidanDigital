@extends('Home.Layouts.app')
@section('content')


@php
    $hero = $articles->where('is_breaking', true)->first() ?? $articles->first();

    $heroSide = $articles->except($hero?->id)->take(5);

    $beritaArticles = $articles
        ->filter(fn($a) => $a->categories->pluck('slug')->contains('berita-kebidanan'))
        ->take(4);

    $edukasiArticles = $articles
        ->filter(fn($a) => $a->categories->pluck('slug')->contains('edukasi-pasien'))
        ->take(4);

    $tutorialArticles = $articles
        ->filter(fn($a) => $a->categories->pluck('slug')->contains('tutorial-prosedur'))
        ->take(4);

    $latest = $articles->except($hero?->id)->skip(3);

    $allCategories = $articles->flatMap->categories->unique('id');
    $beritaCat     = $allCategories->firstWhere('slug', 'berita-kebidanan');
    $edukasiCat    = $allCategories->firstWhere('slug', 'edukasi-pasien');
    $tutorialCat   = $allCategories->firstWhere('slug', 'tutorial-prosedur');
@endphp


{{-- ── HERO ── --}}
<section style="padding-bottom:48px; ">
    <div class="container">

        {{-- <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-warning text-dark fw-bold text-uppercase px-3 py-2"
                  style="font-size:.68rem; letter-spacing:.06em; border-radius:50px;">
                <i class="bx bx-broadcast me-1"></i> Breaking
            </span>
            <hr class="flex-grow-1 m-0 opacity-25">
        </div> --}}

        <div class="row g-4 align-items-stretch">

            {{-- Hero Utama --}}
            <div class="col-lg-7">
                @if ($hero)
                    <div class="rounded-3 overflow-hidden shadow-sm position-relative hero-thumb-wrap h-100">
                        <a href="{{ route('article.show', $hero->slug) }}" class="d-block">
                            <img src="{{ $hero->featured_image ? Storage::url($hero->featured_image) : 'https://picsum.photos/900/440?random=' . $hero->id }}"
                                 alt="{{ $hero->title }}" class="hero-thumb">
                        </a>
                        <div class="hero-overlay">
                            <div class="d-flex flex-wrap gap-2 mb-2">
                                @foreach ($hero->categories->take(2) as $cat)
                                    <span class="badge bg-warning text-dark">{{ $cat->name }}</span>
                                @endforeach
                            </div>
                            <h2 class="fw-bold text-white lh-sm mb-3" style="font-size:1.55rem;">
                                <a href="{{ route('article.show', $hero->slug) }}"
                                   class="text-white text-decoration-none">{{ $hero->title }}</a>
                            </h2>
                            <p class="text-white mb-3 opacity-75" style="font-size:.88rem; line-height:1.6;">
                                {{ Str::limit($hero->excerpt ?? strip_tags($hero->content), 140) }}
                            </p>
                            <div class="d-flex align-items-center gap-2 text-white opacity-75" style="font-size:.78rem;">
                                <span class="fw-semibold opacity-100">
                                    {{ trim(($hero->user->first_name ?? '') . ' ' . ($hero->user->last_name ?? '')) ?: 'Admin' }}
                                </span>
                                <span>·</span>
                                <span>{{ $hero->created_at->format('d M Y') }}</span>
                                <span class="ms-auto">
                                    <i class="bx bx-show me-1"></i>{{ number_format($hero->views ?? 0) }}
                                </span>
                            </div>
                        </div>
                    </div>
                @endif
            </div>

            {{-- 3 Side Cards --}}
            <div class="col-lg-5 d-flex flex-column gap-3">
                @foreach ($heroSide as $side)
                    <a href="{{ route('article.show', $side->slug) }}"
                       class="card border shadow-none text-decoration-none flex-row overflow-hidden">
                        <img src="{{ $side->featured_image ? Storage::url($side->featured_image) : 'https://picsum.photos/100/82?random=' . $side->id }}"
                             alt="{{ $side->title }}"
                             style="width:100px; height:82px; object-fit:cover; flex-shrink:0;">
                        <div class="card-body p-3 d-flex flex-column justify-content-between">
                            <div>
                                @foreach ($side->categories->take(1) as $cat)
                                    <span class="badge bg-label-primary mb-1">{{ $cat->name }}</span>
                                @endforeach
                                <p class="fw-semibold mb-0 lh-sm small text-body">
                                    {{ Str::limit($side->title, 75) }}
                                </p>
                            </div>
                            <div class="d-flex gap-2 text-muted" style="font-size:.75rem;">
                                <span>{{ $side->created_at->format('d M Y') }}</span>
                                <span class="ms-auto">
                                    <i class="bx bx-show me-1"></i>{{ number_format($side->views ?? 0) }}
                                </span>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>

        </div>
    </div>
</section>


{{-- ── KANAL PILIHAN ── --}}
<section class="py-5" style="background:var(--bs-body-bg);">
    <div class="container">

        <div class="d-flex align-items-center gap-3 mb-4">
            <span class="fw-bold text-uppercase text-muted" style="font-size:.7rem; letter-spacing:.1em; white-space:nowrap;">
                Kanal Pilihan
            </span>
            <hr class="flex-grow-1 m-0 opacity-25">
        </div>

        <div class="row g-4">

            {{-- Berita Kebidanan --}}
            <div class="col-lg-4">
                <div class="card h-100 border shadow-none rounded-3 overflow-hidden">
                    <div class="card-header d-flex align-items-center justify-content-between border-bottom py-3">
                        <span class="fw-bold text-primary d-flex align-items-center gap-2" style="font-size:.9rem;">
                            <span class="badge bg-danger p-1 rounded-circle">&nbsp;</span>
                            Berita Kebidanan
                        </span>
                        <i class="bx bx-news text-danger"></i>
                    </div>
                    <div class="list-group list-group-flush flex-grow-1">
                        @forelse ($beritaArticles as $art)
                            <a href="{{ route('article.show', $art->slug) }}"
                               class="list-group-item list-group-item-action d-flex gap-3 align-items-start py-3 px-4 border-0 border-bottom">
                                <img src="{{ $art->featured_image ? Storage::url($art->featured_image) : 'https://picsum.photos/68/52?random=' . $art->id }}"
                                     alt="{{ $art->title }}"
                                     class="rounded-2 flex-shrink-0"
                                     style="width:68px; height:52px; object-fit:cover;">
                                <div class="overflow-hidden">
                                    <p class="fw-semibold mb-1 lh-sm small text-body">
                                        {{ Str::limit($art->title, 70) }}
                                    </p>
                                    <span class="text-muted" style="font-size:.74rem;">
                                        {{ $art->created_at->format('d M Y') }}
                                    </span>
                                </div>
                            </a>
                        @empty
                            <div class="p-4 text-center text-muted small">Belum ada artikel.</div>
                        @endforelse
                    </div>
                    <div class="card-footer text-center border-top py-3">
                        <a href="{{ route('article.index', ['category' => $beritaCat?->id]) }}"
                           class="btn btn-sm btn-outline-primary rounded-pill px-4">
                            Selengkapnya <i class="bx bx-right-arrow-alt"></i>
                        </a>
                    </div>
                </div>
            </div>

            {{-- Edukasi Pasien --}}
            <div class="col-lg-4">
                <div class="card h-100 border shadow-none rounded-3 overflow-hidden">
                    <div class="card-header d-flex align-items-center justify-content-between border-bottom py-3">
                        <span class="fw-bold text-primary d-flex align-items-center gap-2" style="font-size:.9rem;">
                            <span class="badge bg-warning p-1 rounded-circle">&nbsp;</span>
                            Edukasi Pasien
                        </span>
                        <i class="bx bx-heart text-warning"></i>
                    </div>
                    <div class="list-group list-group-flush flex-grow-1">
                        @forelse ($edukasiArticles as $art)
                            <a href="{{ route('article.show', $art->slug) }}"
                               class="list-group-item list-group-item-action d-flex gap-3 align-items-start py-3 px-4 border-0 border-bottom">
                                <img src="{{ $art->featured_image ? Storage::url($art->featured_image) : 'https://picsum.photos/68/52?random=' . $art->id }}"
                                     alt="{{ $art->title }}"
                                     class="rounded-2 flex-shrink-0"
                                     style="width:68px; height:52px; object-fit:cover;">
                                <div class="overflow-hidden">
                                    <p class="fw-semibold mb-1 lh-sm small text-body">
                                        {{ Str::limit($art->title, 70) }}
                                    </p>
                                    <span class="text-muted" style="font-size:.74rem;">
                                        {{ $art->created_at->format('d M Y') }}
                                    </span>
                                </div>
                            </a>
                        @empty
                            <div class="p-4 text-center text-muted small">Belum ada artikel.</div>
                        @endforelse
                    </div>
                    <div class="card-footer text-center border-top py-3">
                        <a href="{{ route('article.index', ['category' => $edukasiCat?->id]) }}"
                           class="btn btn-sm btn-outline-primary rounded-pill px-4">
                            Selengkapnya <i class="bx bx-right-arrow-alt"></i>
                        </a>
                    </div>
                </div>
            </div>

            {{-- Tutorial & Prosedur --}}
            <div class="col-lg-4">
                <div class="card h-100 border shadow-none rounded-3 overflow-hidden">
                    <div class="card-header d-flex align-items-center justify-content-between border-bottom py-3">
                        <span class="fw-bold text-primary d-flex align-items-center gap-2" style="font-size:.9rem;">
                            <span class="badge bg-primary p-1 rounded-circle">&nbsp;</span>
                            Tutorial & Prosedur
                        </span>
                        <i class="bx bx-book-open text-primary"></i>
                    </div>
                    <div class="list-group list-group-flush flex-grow-1">
                        @forelse ($tutorialArticles as $art)
                            <a href="{{ route('article.show', $art->slug) }}"
                               class="list-group-item list-group-item-action d-flex gap-3 align-items-start py-3 px-4 border-0 border-bottom">
                                <img src="{{ $art->featured_image ? Storage::url($art->featured_image) : 'https://picsum.photos/68/52?random=' . $art->id }}"
                                     alt="{{ $art->title }}"
                                     class="rounded-2 flex-shrink-0"
                                     style="width:68px; height:52px; object-fit:cover;">
                                <div class="overflow-hidden">
                                    <p class="fw-semibold mb-1 lh-sm small text-body">
                                        {{ Str::limit($art->title, 70) }}
                                    </p>
                                    <span class="text-muted" style="font-size:.74rem;">
                                        {{ $art->created_at->format('d M Y') }}
                                    </span>
                                </div>
                            </a>
                        @empty
                            <div class="p-4 text-center text-muted small">Belum ada artikel.</div>
                        @endforelse
                    </div>
                    <div class="card-footer text-center border-top py-3">
                        <a href="{{ route('article.index', ['category' => $tutorialCat?->id]) }}"
                           class="btn btn-sm btn-outline-primary rounded-pill px-4">
                            Selengkapnya <i class="bx bx-right-arrow-alt"></i>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>


{{-- ── ARTIKEL TERBARU ── --}}
@if ($latest->count())
<section class="py-5" style="background:var(--bs-tertiary-bg, #f8f8f8);">
    <div class="container">

        <div class="d-flex align-items-center gap-3 mb-4">
            <span class="fw-bold text-uppercase text-muted" style="font-size:.7rem; letter-spacing:.1em; white-space:nowrap;">
                Artikel Terbaru
            </span>
            <hr class="flex-grow-1 m-0 opacity-25">
            <a href="{{ route('article.index') }}"
               class="btn btn-sm btn-outline-primary rounded-pill text-nowrap">
                Lihat Semua <i class="bx bx-right-arrow-alt"></i>
            </a>
        </div>

        <div class="row g-4">
            @foreach ($latest->take(8) as $article)
                <div class="col-sm-6 col-lg-3">
                    <article class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
                        <a href="{{ route('article.show', $article->slug) }}" class="d-block">
                            <img src="{{ $article->featured_image ? Storage::url($article->featured_image) : 'https://picsum.photos/300/180?random=' . $article->id }}"
                                 alt="{{ $article->title }}" class="card-img-top"
                                 style="height:180px; object-fit:cover;">
                        </a>
                        <div class="card-body p-3 d-flex flex-column">
                            <div class="mb-2">
                                @foreach ($article->categories->take(1) as $cat)
                                    <a href="{{ route('article.index', ['category' => $cat->id]) }}"
                                       class="badge bg-label-primary text-decoration-none">{{ $cat->name }}</a>
                                @endforeach
                            </div>
                            <h6 class="fw-semibold lh-sm mb-0 flex-grow-1" style="font-size:.88rem;">
                                <a href="{{ route('article.show', $article->slug) }}"
                                   class="text-heading text-decoration-none">
                                    {{ Str::limit($article->title, 80) }}
                                </a>
                            </h6>
                            <div class="d-flex align-items-center gap-2 text-muted mt-3 pt-2 border-top"
                                 style="font-size:.75rem;">
                                <span>{{ $article->created_at->format('d M Y') }}</span>
                                <span class="ms-auto">
                                    <i class="bx bx-show me-1"></i>{{ number_format($article->views ?? 0) }}
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            @endforeach
        </div>

        <div class="text-center mt-5">
            <a href="{{ route('article.index') }}" class="btn btn-primary rounded-pill px-5">
                <i class="bx bx-book-open me-2"></i> Jelajahi Semua Artikel
            </a>
        </div>

    </div>
</section>
@endif

@endsection