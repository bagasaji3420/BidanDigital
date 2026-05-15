@extends('Home.Layouts.app')

@section('content')

    {{-- Breadcrumb: Start --}}
    <div class="bg-body border-bottom">
        <div class="container py-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 small">
                    <li class="breadcrumb-item">
                        <a href="{{ url('/') }}" class="text-decoration-none">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="{{ route('article.index') }}" class="text-decoration-none">Article</a>
                    </li>
                    <li class="breadcrumb-item active text-truncate" style="max-width: 300px;" aria-current="page">
                        {{ $article->title }}
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    {{-- Breadcrumb: End --}}

    <section class="section-py" style="padding-top: 40px;">
        <div class="container">
            <div class="row g-5">

                {{-- Article Body: Start --}}
                <div class="col-lg-8">
                    <article>
                        {{-- Categories --}}
                        <div class="mb-3">
                            @foreach ($article->categories as $cat)
                                <a href="{{ route('article.index', ['category' => $cat->id]) }}"
                                    class="badge bg-label-primary text-decoration-none me-1 py-2 px-3">
                                    {{ $cat->name }}
                                </a>
                            @endforeach
                        </div>

                        {{-- Title --}}
                        <h1 class="display-6 fw-bold mb-4 lh-sm">{{ $article->title }}</h1>

                        {{-- Meta --}}
                        <div class="d-flex flex-wrap align-items-center gap-4 mb-4 text-muted small">
                            <div class="d-flex align-items-center gap-2">
                                @if ($article->user?->avatar)
                                    <img src="{{ asset('storage/' . $article->user->avatar) }}" class="rounded-circle"
                                        width="32" height="32" alt="{{ $article->user->name }}">
                                @else
                                    <div class="avatar avatar-sm">
                                        <span class="avatar-initial rounded-circle bg-label-primary">
                                            {{ strtoupper(substr($article->user?->name ?? 'A', 0, 1)) }}
                                        </span>
                                    </div>
                                @endif
                                <span
                                    class="fw-medium text-body">{{ $article->user->first_name . ' ' . $article->user->last_name ?? 'Admin' }}</span>

                            </div>
                            <span>
                                <i class="bx bx-calendar me-1"></i>
                                {{ $article->created_at->format('d F Y') }}
                            </span>
                            <span>
                                <i class="bx bx-time me-1"></i>
                                {{ ceil(str_word_count(strip_tags($article->content)) / 200) }} min read
                            </span>
                            <span>
                                <i class="bx bx-show me-1"></i>
                                {{ number_format($article->views) }} views
                            </span>
                        </div>

                        {{-- Featured Image --}}
                        @if ($article->thumbnail)
                            <div class="mb-5 rounded-3 overflow-hidden shadow-sm">
                                <img src="{{ asset('storage/' . $article->thumbnail) }}" alt="{{ $article->title }}"
                                    class="img-fluid w-100" style="max-height: 480px; object-fit: cover;" />
                            </div>
                        @endif

                        {{-- Excerpt --}}
                        @if ($article->excerpt)
                            <div class="alert alert-primary border-start border-primary border-4 border-top-0 border-end-0 border-bottom-0 rounded-0 rounded-end mb-5"
                                style="background: rgba(115,103,240,0.06);">
                                <p class="mb-0 fst-italic lead" style="font-size: 1.05rem;">
                                    {{ $article->excerpt }}
                                </p>
                            </div>
                        @endif

                        {{-- Content --}}
                        <div class="article-content prose mb-5">
                            {!! $article->content !!}
                        </div>

                        {{-- Tags / Share: Start --}}
                        <div
                            class="d-flex flex-wrap justify-content-between align-items-center gap-3 py-4 border-top border-bottom mb-5">
                            <div class="d-flex flex-wrap gap-2">
                                @foreach ($article->categories as $cat)
                                    <a href="{{ route('article.index', ['category' => $cat->id]) }}"
                                        class="badge bg-label-secondary text-decoration-none py-2 px-3">
                                        # {{ $cat->name }}
                                    </a>
                                @endforeach
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <span class="text-muted small me-1">Share:</span>
                                <a href="https://twitter.com/intent/tweet?url={{ urlencode(request()->url()) }}&text={{ urlencode($article->title) }}"
                                    class="btn btn-icon btn-sm btn-label-info rounded-circle" target="_blank"
                                    title="Share on Twitter">
                                    <i class="bx bxl-twitter"></i>
                                </a>
                                <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(request()->url()) }}"
                                    class="btn btn-icon btn-sm btn-label-primary rounded-circle" target="_blank"
                                    title="Share on Facebook">
                                    <i class="bx bxl-facebook"></i>
                                </a>
                                <a href="https://wa.me/?text={{ urlencode($article->title . ' ' . request()->url()) }}"
                                    class="btn btn-icon btn-sm btn-label-success rounded-circle" target="_blank"
                                    title="Share on WhatsApp">
                                    <i class="bx bxl-whatsapp"></i>
                                </a>
                                <button class="btn btn-icon btn-sm btn-label-secondary rounded-circle"
                                    onclick="navigator.clipboard.writeText('{{ request()->url() }}'); this.innerHTML='<i class=\'bx bx-check\'></i>'; setTimeout(() => this.innerHTML='<i class=\'bx bx-link\'></i>', 2000)"
                                    title="Copy link">
                                    <i class="bx bx-link"></i>
                                </button>

                                {{-- Bookmark Button --}}
                                <button class="btn btn-icon btn-sm btn-label-warning rounded-circle bookmark-btn"
                                    data-slug="{{ $article->slug }}" data-title="{{ $article->title }}"
                                    data-url="{{ request()->url() }}"
                                    data-category="{{ $article->categories->first()?->name ?? '' }}"
                                    title="Bookmark artikel ini">
                                    <i class="bx bx-bookmark"></i>
                                </button>
                            </div>
                        </div>
                        {{-- Tags / Share: End --}}

                        {{-- Author Card: Start --}}
                        @if ($article->user)
                            <div class="card border-0 bg-label-secondary mb-5" style="border-radius: 12px;">
                                <div class="card-body p-4">
                                    <div class="d-flex gap-4 align-items-start">
                                        @if ($article->user->avatar)
                                            <img src="{{ asset('storage/' . $article->user->avatar) }}"
                                                class="rounded-circle flex-shrink-0" width="64" height="64">
                                        @else
                                            <div class="avatar avatar-lg flex-shrink-0">
                                                <span class="avatar-initial rounded-circle bg-primary fs-4">
                                                    {{ strtoupper(substr($article->user->name, 0, 1)) }}
                                                </span>
                                            </div>
                                        @endif
                                        <div>
                                            <p class="text-muted small mb-1 text-uppercase fw-semibold tracking-wide">
                                                Written by</p>
                                            <h6 class="fw-bold mb-1">
                                                {{ $article->user->first_name . ' ' . $article->user->last_name }}</h6>
                                            <p class="text-muted mb-0">{{ $article->user->profile->bio ?? '' }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                        {{-- Author Card: End --}}

                        {{-- Comments Section --}}
                        @include('Home.Article.comment')

                    </article>
                </div>
                {{-- Article Body: End --}}

                {{-- Sidebar: Start --}}
                <div class="col-lg-4">
                    <div class="sticky-top" style="top: 130px; z-index: -2; ">

                        {{-- Table of Contents (auto-generated via JS) --}}
                        <div class="card border-0 shadow-sm mb-4" style="border-radius: 12px;" id="toc-card">
                            <div class="card-body p-4">
                                <h6 class="fw-bold mb-3 d-flex align-items-center gap-2">
                                    <i class="bx bx-list-ul text-primary"></i>
                                    Table of Contents
                                </h6>
                                <nav id="toc" class="small">
                                    <p class="text-muted small mb-0">Loading...</p>
                                </nav>
                            </div>
                        </div>

                        {{-- Related Articles --}}
                        @if ($related->count())
                            <div class="card border-0 shadow-sm mb-4" style="border-radius: 12px; ">
                                <div class="card-body p-4">
                                    <h6 class="fw-bold mb-4 d-flex align-items-center gap-2">
                                        <i class="bx bx-bookmark-heart text-primary"></i>
                                        Related Articles
                                    </h6>
                                    <div class="d-flex flex-column gap-4">
                                        @foreach ($related as $rel)
                                            <div class="d-flex gap-3">
                                                @if ($rel->thumbnail)
                                                    <img src="{{ asset('storage/' . $rel->thumbnail) }}"
                                                        class="rounded flex-shrink-0" width="72" height="56"
                                                        style="object-fit: cover;" alt="{{ $rel->title }}">
                                                @else
                                                    <div class="flex-shrink-0 rounded bg-label-primary d-flex align-items-center justify-content-center"
                                                        style="width:72px; height:56px;">
                                                        <i class="bx bx-image-alt text-primary opacity-50"></i>
                                                    </div>
                                                @endif
                                                <div>
                                                    <a href="{{ route('article.show', $rel->slug) }}"
                                                        class="d-block fw-medium text-heading text-decoration-none lh-sm mb-1"
                                                        style="font-size: 0.875rem;">
                                                        {{ Str::limit($rel->title, 55) }}
                                                    </a>
                                                    <small class="text-muted">
                                                        {{ $rel->created_at->format('d M Y') }}
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

                        {{-- Back to Articles --}}
                        <a href="{{ route('article.index') }}" class="btn btn-outline-primary w-100"
                            style="border-radius: 8px;">
                            <i class="bx bx-arrow-back me-2"></i>
                            Back to Articles
                        </a>

                    </div>
                </div>
                {{-- Sidebar: End --}}

            </div>
        </div>
    </section>

    {{-- Custom Styles --}}
    <style>
        /* Article Typography */
        .article-content {
            font-size: 1.0625rem;
            line-height: 1.85;
            color: var(--bs-body-color);
        }

        .article-content h2,
        .article-content h3,
        .article-content h4 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .article-content p {
            margin-bottom: 1.25rem;
        }

        .article-content img {
            max-width: 100%;
            border-radius: 8px;
            margin: 1.5rem 0;
        }

        .article-content blockquote {
            border-left: 4px solid #7367f0;
            padding: 1rem 1.5rem;
            margin: 1.5rem 0;
            background: rgba(115, 103, 240, 0.05);
            border-radius: 0 8px 8px 0;
            font-style: italic;
        }

        .article-content pre {
            background: #1e1e2e;
            color: #cdd6f4;
            padding: 1.25rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1.5rem 0;
            font-size: 0.875rem;
        }

        .article-content code {
            background: rgba(115, 103, 240, 0.1);
            color: #7367f0;
            padding: 0.2em 0.4em;
            border-radius: 4px;
            font-size: 0.875em;
        }

        .article-content pre code {
            background: none;
            color: inherit;
            padding: 0;
        }

        .article-content ul,
        .article-content ol {
            padding-left: 1.5rem;
            margin-bottom: 1.25rem;
        }

        .article-content li {
            margin-bottom: 0.5rem;
        }

        /* TOC */
        #toc a {
            color: var(--bs-body-color);
            text-decoration: none;
            display: block;
            padding: 0.2rem 0;
            border-left: 2px solid transparent;
            padding-left: 0.5rem;
            transition: all 0.15s;
            font-size: 0.85rem;
        }

        #toc a:hover,
        #toc a.active {
            color: #7367f0;
            border-left-color: #7367f0;
        }

        #toc .toc-h3 {
            padding-left: 1.25rem;
            font-size: 0.8rem;
        }
    </style>

    @push('scripts')
        @viteReactRefresh
        @vite('resources/js/article/show.js')
        @vite('resources/js/article/bookmark.js')
    @endpush


@endsection
