@extends('Admin.Layouts.app')

@section('content')
    @include('Admin.Article.menu')

    <div class="card p-4">

        <form action="{{ route('articles.update', $article->slug) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            {{-- TITLE --}}
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" name="title" class="form-control" value="{{ old('title', $article->title) }}" required>
            </div>

            <div class="row">

                {{-- FEATURED IMAGE --}}
                <div class="col-12 col-md-6">
                    <label class="form-label">Featured Image</label>

                    <div class="dropzone" id="featured-dropzone"></div>

                    <input type="file" name="featured_image" id="real_image" hidden>

                    @if ($article->featured_image)
                        <div class="mt-3">
                            <img src="{{ Storage::url($article->featured_image) }}" class="img-fluid rounded"
                                style="max-height:200px;">
                        </div>
                    @endif
                </div>

                {{-- CATEGORY --}}
                <div class="col-12 col-md-6">
                    <label class="form-label">Category</label>

                    <div class="d-flex flex-wrap gap-2">
                        @foreach ($categories ?? [] as $category)
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="categories[]"
                                    value="{{ $category->id }}" id="cat{{ $category->id }}"
                                    {{ $article->categories->pluck('id')->contains($category->id) ? 'checked' : '' }}>

                                <label class="form-check-label" for="cat{{ $category->id }}">
                                    {{ $category->name }}
                                </label>
                            </div>
                        @endforeach
                    </div>
                </div>

            </div>

            {{-- TAGS --}}
            <div class="mb-3">
                <label class="form-label">Tags (pisahkan dengan koma)</label>
                <input type="text" name="tags_input" class="form-control"
                    value="{{ $article->tags->pluck('name')->implode(', ') }}">
            </div>

            {{-- CONTENT --}}
            <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea id="editor" name="content">{{ old('content', $article->content) }}</textarea>
            </div>


            <div class="row mb-3">

                {{-- STATUS --}}
                <div class="col-md-3 col-6">
                    <label class="form-label">Status</label>

                    <select name="status" class="form-select">
                        <option value="draft" {{ $article->status == 'draft' ? 'selected' : '' }}>
                            Draft
                        </option>

                        <option value="published" {{ $article->status == 'published' ? 'selected' : '' }}>
                            Published
                        </option>

                        <option value="archived" {{ $article->status == 'archived' ? 'selected' : '' }}>
                            Archived
                        </option>
                    </select>
                </div>

                {{-- PUBLISH DATE --}}
                <div class="col-md-3 col-6">
                    <label class="form-label">Publish Date</label>

                    <input type="datetime-local" name="published_at" class="form-control"
                        value="{{ $article->published_at ? $article->published_at->format('Y-m-d\TH:i') : '' }}">
                </div>

                {{-- BREAKING TOGGLE --}}
                <div class="col-md-3 col-6 d-flex align-items-end">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="is_breaking" name="is_breaking"
                            {{ $article->is_breaking ? 'checked' : '' }}>

                        <label class="form-check-label fw-bold" for="is_breaking">
                            🔴 Breaking News
                        </label>
                    </div>
                </div>

                {{-- BLAST NEWSLETTER --}}
                @if ($article->status === 'published')
                    <div class="col-md-3 col-6 d-flex align-items-end">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="blast_newsletter" name="blast_newsletter">
                            <label class="form-check-label fw-bold" for="blast_newsletter">
                                📢 Blast Newsletter
                            </label>
                        </div>
                    </div>
                @endif


            </div>

            {{-- BREAKING UNTIL --}}
            <div class="mb-3" id="breaking_until_wrapper" style="display: none;">
                <label class="form-label">Breaking Until</label>

                <input type="datetime-local" name="breaking_until" class="form-control"
                    value="{{ $article->breaking_until ? $article->breaking_until->format('Y-m-d\TH:i') : '' }}">
            </div>

            <button type="submit" class="btn btn-primary">
                Update Article
            </button>

        </form>

    </div>



    <script src="{{ asset('assets/custom-js/article/editArticle.js') }}"></script>
@endsection
