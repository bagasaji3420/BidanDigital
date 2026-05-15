<div class="row">
    @forelse ($articles as $article)
    @php
        $name = $article->user->first_name .' ' . $article->user->last_name
    @endphp
        <div class="col-md-6 mb-4">
            <div class="card h-100">

                <div class="d-flex flex-md-row flex-column">

                    {{-- IMAGE --}}
                    <div>
                        <img src="{{ $article->featured_image
                            ? Storage::url($article->featured_image)
                            : 'https://picsum.photos/300/200?random=' . $article->id }}"
                            class="card-img card-img-left" alt="Article Image">
                    </div>

                    {{-- CONTENT --}}
                    <div class="w-100">
                        <div class="card-body">

                            <div class="d-flex justify-content-between align-items-center mb-2">

                                {{-- USER --}}
                                <div class="d-flex align-items-center gap-2">

                                    <img src="{{ $article->user->avatar
                                        ? Storage::url($article->user->avatar)
                                        : 'https://ui-avatars.com/api/?name=' . urlencode($name) }}"
                                        class="rounded-circle" width="30" height="30" style="object-fit:cover;">

                                    <small class="fw-semibold">
                                        {{ $name }}
                                    </small>
                                </div>

                                {{-- STATUS --}}
                                <div>
                                    @if ($article->status === 'published')
                                        <span class="badge bg-success d-flex align-items-center gap-1">
                                            <i class="bx bx-check-circle"></i>
                                        </span>
                                    @elseif($article->status === 'draft')
                                        <span class="badge bg-secondary d-flex align-items-center gap-1">
                                            <i class="bx bx-time-five"></i>
                                        </span>
                                    @elseif($article->status === 'archived')
                                        <span class="badge bg-dark d-flex align-items-center gap-1">
                                            <i class="bx bx-archive"></i>
                                        </span>
                                    @endif
                                </div>

                            </div>

                            <h5 class="card-title">
                                {{ \Illuminate\Support\Str::limit($article->title, 16) }}
                            </h5>

                            <p class="card-text">
                                {{ \Illuminate\Support\Str::limit($article->excerpt, 30) }}
                            </p>

                            <p class="card-text">
                                <small class="text-body-secondary">
                                    {{ $article->created_at->diffForHumans() }}
                                </small>
                            </p>

                            {{-- CATEGORY --}}
                            <div class="mb-2">
                                @foreach ($article->categories as $category)
                                    <span class="badge bg-label-primary">
                                        {{ $category->name }}
                                    </span>
                                @endforeach
                            </div>

                            {{-- ACTION --}}
                            <div class="card-action d-flex gap-3 align-items-center">

                                {{-- VIEW --}}
                                <a href="{{ route('articles.show', $article->slug) }}" class="text-primary fs-5"
                                    title="View">
                                    <i class="bx bx-show"></i>
                                </a>

                                @php
                                    $user = auth()->user();
                                    $canEdit = $user->can('articles.update') && $user->status === 'active';
                                @endphp

                                @if ($canEdit)
                                    <a href="{{ route('articles.edit', $article->slug) }}" class="text-warning fs-5"
                                        title="Edit">
                                        <i class="bx bx-edit"></i>
                                    </a>
                                @endif



                                {{-- DELETE --}}
                                @if (auth()->id() === $article->user_id)
                                    <form id="delete-{{ $article->id }}"
                                        action="{{ route('articles.destroy', $article->slug) }}" method="POST">

                                        @csrf
                                        @method('DELETE')

                                        <a href="#"
                                            onclick="event.preventDefault(); confirmDelete({{ $article->id }})"
                                            class="text-danger fs-5" title="Delete">
                                            <i class="bx bx-trash"></i>
                                        </a>
                                    </form>
                                @endif

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    @empty
        <div class="col-12">
            <div class="alert alert-info">
                No articles found
            </div>
        </div>
    @endforelse
</div>
