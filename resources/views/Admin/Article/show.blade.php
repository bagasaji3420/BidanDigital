@extends('Admin.Layouts.app')

@section('content')


    <div class="card p-4">

        {{-- 📰 TITLE --}}
        <h3 class="mb-3">{{ $article->title }}</h3>

        {{-- 👤 AUTHOR --}}
        <div class="d-flex align-items-center mb-3">

            <img src="{{ $article->user->avatar
                ? Storage::url($article->user->avatar)
                : 'https://ui-avatars.com/api/?name=' . urlencode($article->user->name) }}"
                class="rounded-circle me-2" width="45" height="45" style="object-fit: cover;">

            <div>
                <div class="fw-bold">{{ $article->user->username }}</div>
                <small class="text-muted">
                    {{ $article->created_at->format('d M Y') }} •
                    {{ $article->views }} views
                </small>
            </div>
        </div>

        {{-- 🖼️ FEATURED IMAGE --}}
        @if ($article->featured_image)
            <img src="{{ Storage::url($article->featured_image) }}" class="img-fluid rounded mb-4">
        @endif

        

        {{-- 📄 CONTENT --}}
        <div class="mb-4">
            {!! $article->content !!}
        </div>

        <h5>Category
        </h5>

        {{-- 🏷️ CATEGORY --}}
        <div class="mb-3">
            @foreach ($article->categories as $category)
                <span class="badge bg-primary">{{ $category->name }}</span>
            @endforeach
        </div>

    </div>

    @if (UserStatus() == 'active')
        @include('Admin.Article.comment')
    @endif


@endsection
