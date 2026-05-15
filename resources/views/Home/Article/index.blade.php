@extends('Home.Layouts.app')

@section('content')

    <!-- Hero: Start -->
    <section
        style="padding-bottom: 40px; background: linear-gradient(135deg, var(--bs-body-bg) 0%, var(--bs-primary-bg-subtle) 100%);">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <div class="mb-3">
                        <span class="badge bg-label-primary fs-6">
                            @if ($category && ($activeCat = $categories->firstWhere('id', $category)))
                                <i class="{{ $activeCat->icon }} me-1"></i> {{ $activeCat->name }}
                            @else
                                <i class="fa-solid fa-newspaper me-1"></i> Artikel Kebidanan
                            @endif
                        </span>
                    </div>
                    <h1 class="display-5 fw-bold mb-3">
                        @if ($category && ($activeCat = $categories->firstWhere('id', $category)))
                            Artikel <span class="text-primary">{{ $activeCat->name }}</span>
                        @else
                            Temukan <span class="text-primary">Artikel</span> Terpercaya
                        @endif
                    </h1>
                    <p class="lead text-muted mb-4">
                        @if ($category && ($activeCat = $categories->firstWhere('id', $category)))
                            {{ $activeCat->desc }}
                        @else
                            Informasi seputar kehamilan, persalinan, nifas, dan kesehatan ibu & anak
                            yang ditulis oleh tenaga kebidanan profesional.
                        @endif
                    </p>

                    <form action="{{ route('article.index') }}" method="GET" class="d-flex gap-2 flex-wrap">
                        @if (request('category'))
                            <input type="hidden" name="category" value="{{ request('category') }}">
                        @endif
                        <div class="input-group" style="max-width: 480px; z-index:0;">
                            <span class="input-group-text bg-body border-end-0">
                                <i class="bx bx-search text-muted"></i>
                            </span>
                            <input type="text" name="q" class="form-control bg-body border-start-0 ps-0"
                                placeholder="Cari artikel..." value="{{ $q ?? '' }}" />
                            <button class="btn btn-primary" type="submit">Cari</button>
                        </div>
                    </form>
                </div>

                <div class="col-lg-4 d-none d-lg-flex justify-content-end">
                    <div class="text-center">
                        <svg width="200" height="160" viewBox="0 0 200 160" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <!-- Buku / dokumen -->>
                            <rect x="20" y="20" width="120" height="90" rx="8" fill="var(--bs-primary)"
                                opacity="0.1" />
                            <rect x="30" y="30" width="100" height="70" rx="6" fill="var(--bs-card-bg)"
                                stroke="var(--bs-primary)" stroke-width="1.5" />
                            <!-- Judul artikel -->
                            <rect x="40" y="45" width="70" height="6" rx="3" fill="var(--bs-primary)"
                                opacity="0.6" />
                            <!-- Baris teks -->
                            <rect x="40" y="58" width="80" height="4" rx="2"
                                fill="var(--bs-secondary-color)" />
                            <rect x="40" y="68" width="60" height="4" rx="2"
                                fill="var(--bs-secondary-color)" />
                            <rect x="40" y="78" width="75" height="4" rx="2"
                                fill="var(--bs-secondary-color)" />
                            <!-- Lingkaran aksen + simbol ibu hamil -->
                            <circle cx="158" cy="55" r="28" fill="var(--bs-primary)" opacity="0.08" />
                            <circle cx="158" cy="43" r="6" fill="var(--bs-primary)" opacity="0.5" />
                            <path d="M152 52 Q155 48 158 52 Q161 56 163 62 Q160 66 155 65 Q151 63 152 58 Z"
                                fill="var(--bs-primary)" opacity="0.4" />
                            <ellipse cx="158" cy="64" rx="7" ry="4" fill="var(--bs-primary)"
                                opacity="0.25" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Hero: End -->

    <!-- Main Content: Start -->
    <section class="section-py" style="padding-top: 40px;">
        <div class="container">
            <div class="row g-5">

                {{-- Articles Grid: Start --}}
                <div class="col-lg-8">

                    {{-- Active Filters --}}
                    @if ($q || $category)
                        <div class="d-flex align-items-center gap-2 mb-4 flex-wrap">
                            <span class="text-muted small">Filters active:</span>
                            @if ($q)
                                <a href="{{ route('article.index', array_merge(request()->except('q', 'page'), ['category' => $category])) }}"
                                    class="badge bg-label-secondary text-decoration-none">
                                    "{{ $q }}" &times;
                                </a>
                            @endif
                            @if ($category)
                                @php $activeCat = $categories->firstWhere('id', $category); @endphp
                                @if ($activeCat)
                                    <a href="{{ route('article.index', array_merge(request()->except('category', 'page'), ['q' => $q])) }}"
                                        class="badge bg-label-primary text-decoration-none">
                                        {{ $activeCat->name }} &times;
                                    </a>
                                @endif
                            @endif
                            <a href="{{ route('article.index') }}" class="small text-muted text-decoration-none">Clear
                                all</a>
                        </div>
                    @endif

                    {{-- Results count --}}
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <p class="text-muted mb-0 small">
                            Showing <strong>{{ $articles->firstItem() ?? 0 }}–{{ $articles->lastItem() ?? 0 }}</strong>
                            of <strong>{{ $articles->total() }}</strong> articles
                        </p>
                    </div>

                    {{-- Articles --}}
                    @forelse($articles as $article)
                        <article class="card mb-4 border-0 shadow-sm hover-shadow transition-all"
                            style="border-radius: 12px; overflow: hidden;">
                            <div class="row g-0">
                                {{-- Thumbnail --}}
                                <div class="col-md-4">
                                    <a href="{{ route('article.show', $article->slug) }}" class="d-block h-100">
                                        @if ($article->thumbnail)
                                            <img src="{{ asset('storage/' . $article->thumbnail) }}"
                                                alt="{{ $article->title }}"
                                                class="img-fluid w-100 h-100 object-fit-cover"
                                                style="min-height: 200px; object-fit: cover;" />
                                        @else
                                            <div class="d-flex align-items-center justify-content-center h-100 bg-label-primary"
                                                style="min-height: 200px;">
                                                <i class="bx bx-image-alt fs-1 text-primary opacity-50"></i>
                                            </div>
                                        @endif
                                    </a>
                                </div>

                                {{-- Content --}}
                                <div class="col-md-8">
                                    <div class="card-body d-flex flex-column h-100 p-4">
                                        {{-- Categories --}}
                                        <div class="mb-2">
                                            @foreach ($article->categories->take(3) as $cat)
                                                <a href="{{ route('article.index', ['category' => $cat->id]) }}"
                                                    class="badge bg-label-primary text-decoration-none me-1">
                                                    {{ $cat->name }}
                                                </a>
                                            @endforeach
                                        </div>

                                        {{-- Title --}}
                                        <h5 class="card-title mb-2">
                                            <a href="{{ route('article.show', $article->slug) }}"
                                                class="text-heading text-decoration-none stretched-link-title">
                                                {{ $article->title }}
                                            </a>
                                        </h5>

                                        {{-- Excerpt --}}
                                        <p class="card-text text-muted small mb-3 flex-grow-1">
                                            {{ Str::limit($article->excerpt ?? strip_tags($article->content), 120) }}
                                        </p>

                                        {{-- Meta --}}
                                        <div class="d-flex align-items-center gap-3 text-muted small">
                                            <span>
                                                <i class="bx bx-user me-1"></i>
                                                {{ $article->user->first_name . ' ' . $article->user->last_name ?? 'Admin' }}
                                            </span>
                                            <span>
                                                <i class="bx bx-calendar me-1"></i>
                                                {{ $article->created_at->format('d M Y') }}
                                            </span>
                                            <span class="ms-auto">
                                                <i class="bx bx-show me-1"></i>
                                                {{ number_format($article->views ?? 0) }}
                                            </span>

                                        </div>
                                        <button class="btn btn-sm btn-label-warning rounded-pill bookmark-btn mt-4 ms-auto"
                                            data-slug="{{ $article->slug }}" data-title="{{ $article->title }}"
                                            data-url="{{ route('article.show', $article->slug) }}"
                                            data-category="{{ $article->categories->first()?->name ?? '' }}">
                                            <i class="bx bx-bookmark me-1"></i>
                                            <span class="bookmark-label">Simpan</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    @empty
                        <div class="text-center py-5">
                            <div class="mb-4">
                                <i class="bx bx-file-blank display-1 text-muted opacity-25"></i>
                            </div>
                            <h5 class="text-muted">No articles found</h5>
                            <p class="text-muted small">Try adjusting your search or filter.</p>
                            <a href="{{ route('article.index') }}" class="btn btn-outline-primary mt-2">
                                View all articles
                            </a>
                        </div>
                    @endforelse

                    {{-- Pagination --}}
                    <div class="mt-4">
                        {{ $articles->links('pagination::bootstrap-5') }}
                    </div>
                </div>
                {{-- Articles Grid: End --}}

                {{-- Sidebar: Start --}}
                <div class="col-lg-4">

                    {{-- Categories --}}
                    <div class="card border-0 shadow-sm mb-4" style="border-radius: 12px;">
                        <div class="card-body p-4">
                            <h6 class="fw-bold mb-4 d-flex align-items-center gap-2">
                                <span
                                    class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center">
                                    <i class="bx bx-category icon-sm"></i>
                                </span>
                                Categories
                            </h6>
                            <div class="d-flex flex-column gap-2">
                                <a href="{{ route('article.index', array_merge(request()->except('category', 'page'))) }}"
                                    class="d-flex justify-content-between align-items-center text-decoration-none py-2 px-3 rounded {{ !$category ? 'bg-primary text-white' : 'text-body hover-bg' }}"
                                    style="transition: all 0.2s;">
                                    <span>All Articles</span>
                                    <span class="badge {{ !$category ? 'bg-white text-primary' : 'bg-label-secondary' }}">
                                        {{ $categories->sum('articles_count') }}
                                    </span>
                                </a>
                                @foreach ($categories as $cat)
                                    <a href="{{ route('article.index', array_merge(request()->except('category', 'page'), ['category' => $cat->id])) }}"
                                        class="d-flex justify-content-between align-items-center text-decoration-none py-2 px-3 rounded {{ $category == $cat->id ? 'bg-primary text-white' : 'text-body' }}"
                                        style="transition: all 0.2s;">
                                        <span>{{ $cat->name }}</span>
                                        <span
                                            class="badge {{ $category == $cat->id ? 'bg-white text-primary' : 'bg-label-secondary' }}">
                                            {{ $cat->articles_count }}
                                        </span>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    {{-- Popular Articles --}}
                    @if ($featured->count())
                        <div class="card border-0 shadow-sm" style="border-radius: 12px;">
                            <div class="card-body p-4">
                                <h6 class="fw-bold mb-4 d-flex align-items-center gap-2">
                                    <span
                                        class="avatar avatar-sm bg-label-primary rounded d-flex align-items-center justify-content-center">
                                        <i class="bx bx-trending-up icon-sm"></i>
                                    </span>
                                    Most Popular
                                </h6>
                                <div class="d-flex flex-column gap-4">
                                    @foreach ($featured as $i => $pop)
                                        <div class="d-flex gap-3">
                                            <span class="fw-bold text-muted"
                                                style="font-size: 1.5rem; line-height: 1; min-width: 28px;">
                                                {{ str_pad($i + 1, 2, '0', STR_PAD_LEFT) }}
                                            </span>
                                            <div>
                                                <a href="{{ route('article.show', $pop->slug) }}"
                                                    class="d-block fw-medium text-heading text-decoration-none mb-1 lh-sm"
                                                    style="font-size: 0.875rem;">
                                                    {{ Str::limit($pop->title, 60) }}
                                                </a>
                                                <small class="text-muted">
                                                    <i class="bx bx-show me-1"></i>{{ number_format($pop->views ?? 0) }}
                                                    views
                                                </small>
                                            </div>
                                        </div>
                                        @if (!$loop->last)
                                            <hr class="my-0 opacity-25">
                                        @endif
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
                {{-- Sidebar: End --}}

            </div>
        </div>
    </section>
    <!-- Main Content: End -->

    <style>
        .hover-shadow {
            transition: box-shadow 0.2s, transform 0.2s;
        }

        .hover-shadow:hover {
            box-shadow: 0 8px 32px rgba(115, 103, 240, 0.12) !important;
            transform: translateY(-2px);
        }

        .stretched-link-title:hover {
            color: #7367f0 !important;
        }
    </style>

    @push('scripts')
        @viteReactRefresh
        @vite('resources/js/article/bookmark.js')
    @endpush

@endsection
