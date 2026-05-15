{{-- ============================================================
     Home Comment Section
     Usage: @include('Home.Article.comment')
     Requires: $article, $comments (loaded with replies)
     ============================================================ --}}

<div id="comments-section" class="mt-5">

    {{-- ── Section Header ── --}}
    <div class="d-flex align-items-center gap-3 mb-4">
        <h5 class="fw-bold mb-0">Comments</h5>
        <span class="badge bg-label-primary rounded-pill px-3">
            {{ $comments->count() }}
        </span>
        <div class="flex-grow-1 border-bottom"></div>
    </div>

    {{-- ── Form Komentar Utama ── --}}
    @auth
        <div id="mainFormWrapper" class="mb-5">
            <form id="mainCommentForm" action="{{ route('articles.comments.store', $article->slug) }}" method="POST">
                @csrf
                <input type="hidden" name="parent_id" id="parent_id">
                <input type="hidden" name="slug" value="{{ encrypt($article->id) }}">

                <div class="d-flex gap-3 align-items-start">

                    {{-- Avatar --}}
                    <img src="{{ auth()->user()->avatar
                        ? Storage::url(auth()->user()->avatar)
                        : 'https://ui-avatars.com/api/?name=' . urlencode(auth()->user()->username) }}"
                        class="rounded-circle flex-shrink-0" width="40" height="40" style="object-fit: cover;">

                    <div class="w-100">
                        <div class="position-relative">
                            <textarea id="comment_input" name="content" class="form-control" rows="3" placeholder="Share your thoughts..."
                                required style="border-radius: 12px; resize: none; padding-right: 110px;"></textarea>

                            <button type="submit" class="btn btn-primary btn-sm position-absolute"
                                style="bottom: 10px; right: 10px; border-radius: 8px;">
                                <i class="bx bx-send me-1"></i> Post
                            </button>
                        </div>

                        {{-- Cancel Reply Button (hidden by default) --}}
                        <div id="reply-indicator" class="d-none mt-2">
                            <button type="button" onclick="cancelReply()" class="btn btn-sm btn-link text-muted p-0"
                                style="font-size: 0.8rem;">
                                <i class="bx bx-x me-1"></i> Cancel reply
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    @else
        {{-- Guest CTA --}}
        <div class="alert border-0 bg-label-primary rounded-3 d-flex align-items-center gap-3 mb-5">
            <i class="bx bx-log-in-circle fs-3 text-primary"></i>
            <div>
                <span class="fw-medium">Want to join the discussion?</span>
                <a href="{{ route('login') }}" class="ms-1 text-primary fw-bold text-decoration-none">Login</a>
                or
                <a href="{{ route('registration') }}" class="text-primary fw-bold text-decoration-none">Register</a>
                to post a comment.
            </div>
        </div>
    @endauth

    {{-- ── Comments List ── --}}
    @forelse ($comments->whereNull('parent_id') as $comment)
        <div class="comment-thread mb-4" id="comment-{{ $comment->id }}" data-root="{{ $comment->id }}">

            {{-- Root Comment --}}
            <div class="d-flex gap-3">

                <img src="{{ $comment->user->avatar
                    ? Storage::url($comment->user->avatar)
                    : 'https://ui-avatars.com/api/?name=' . urlencode($comment->user->username) }}"
                    class="rounded-circle flex-shrink-0" width="38" height="38" style="object-fit: cover;">

                <div class="w-100">
                    <div class="comment-bubble p-3 mb-1"
                        style="background: var(--bs-body-bg); border: 1px solid var(--bs-border-color); border-radius: 0 12px 12px 12px;">

                        {{-- Header --}}
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <div>
                                <span class="fw-semibold small">
                                    {{ trim(($comment->user->first_name ?? '') . ' ' . ($comment->user->last_name ?? '')) ?: 'Guest' }}
                                </span>
                                <span class="text-muted ms-2" style="font-size: 0.75rem;">
                                    {{ $comment->created_at->diffForHumans() }}
                                </span>
                            </div>

                            @auth
                                @if (auth()->id() === $comment->user_id)
                                    <div class="dropdown">
                                        <button class="btn btn-sm p-0 text-muted" data-bs-toggle="dropdown">
                                            <i class="bx bx-dots-horizontal-rounded"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0"
                                            style="border-radius: 10px; min-width: 130px;">
                                            <li>
                                                <a class="dropdown-item text-danger small" href="javascript:void(0)"
                                                    onclick="deleteComment({{ $comment->id }})">
                                                    <i class="bx bx-trash me-2"></i> Delete
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                @endif
                            @endauth
                        </div>

                        {{-- Content --}}
                        <p class="mb-0 small" style="line-height: 1.6;">
                            {!! nl2br(e($comment->content)) !!}
                        </p>
                    </div>

                    {{-- Reply Button --}}
                    @auth
                        <button type="button"
                            onclick="replyTo({{ $comment->id }}, '{{ $comment->user->username }}', this)"
                            class="btn btn-link btn-sm text-muted p-0 ms-1"
                            style="font-size: 0.78rem; text-decoration: none;">
                            <i class="bx bx-reply me-1"></i> Reply
                        </button>
                    @endauth

                    {{-- Slot: Form Reply --}}
                    <div id="reply-form-{{ $comment->id }}" class="mt-2"></div>

                    {{-- ── Replies ── --}}
                    @if ($comment->replies->count())
                        <div class="replies mt-3 ms-2 border-start border-2 ps-3"
                            style="border-color: var(--bs-primary) !important; opacity: 0.8;">

                            @foreach ($comment->replies as $reply)
                                <div class="d-flex gap-2 mb-3" data-root="{{ $comment->id }}">

                                    <img src="{{ $reply->user->avatar
                                        ? Storage::url($reply->user->avatar)
                                        : 'https://ui-avatars.com/api/?name=' . urlencode($reply->user->username) }}"
                                        class="rounded-circle flex-shrink-0" width="30" height="30"
                                        style="object-fit: cover;">

                                    <div class="w-100">
                                        <div class="comment-bubble p-2 px-3"
                                            style="background: var(--bs-body-bg); border: 1px solid var(--bs-border-color); border-radius: 0 10px 10px 10px;">

                                            {{-- Header --}}
                                            <div class="d-flex justify-content-between align-items-center mb-1">
                                                <div>
                                                    <span class="fw-semibold" style="font-size: 0.82rem;">
                                                        {{ trim(($reply->user->first_name ?? '') . ' ' . ($reply->user->last_name ?? '')) ?: 'Guest' }}
                                                    </span>
                                                    <span class="text-muted ms-2" style="font-size: 0.72rem;">
                                                        {{ $reply->created_at->diffForHumans() }}
                                                    </span>
                                                </div>

                                                @auth
                                                    @if (auth()->id() === $reply->user_id)
                                                        <div class="dropdown">
                                                            <button class="btn btn-sm p-0 text-muted"
                                                                data-bs-toggle="dropdown">
                                                                <i class="bx bx-dots-horizontal-rounded"
                                                                    style="font-size: 0.9rem;"></i>
                                                            </button>
                                                            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0"
                                                                style="border-radius: 10px; min-width: 130px;">
                                                                <li>
                                                                    <a class="dropdown-item text-danger small"
                                                                        href="javascript:void(0)"
                                                                        onclick="deleteComment({{ $reply->id }})">
                                                                        <i class="bx bx-trash me-2"></i> Delete
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    @endif
                                                @endauth
                                            </div>

                                            {{-- Content (@mention sudah tersimpan di dalam $reply->content via textarea) --}}
                                            <p class="mb-0" style="font-size: 0.84rem; line-height: 1.6;">
                                                {!! nl2br(e($reply->content)) !!}
                                            </p>
                                        </div>

                                        {{-- Reply Button --}}
                                        @auth
                                            <button type="button"
                                                onclick="replyTo({{ $comment->id }}, '{{ $reply->user->username }}', this)"
                                                class="btn btn-link btn-sm text-muted p-0 ms-1"
                                                style="font-size: 0.75rem; text-decoration: none;">
                                                <i class="bx bx-reply me-1"></i> Reply
                                            </button>
                                        @endauth
                                    </div>
                                </div>
                            @endforeach

                        </div>
                    @endif

                </div>
            </div>
        </div>

        @if (!$loop->last)
            <hr class="opacity-25 my-4">
        @endif

    @empty
        <div class="text-center py-5 text-muted">
            <i class="bx bx-comment-dots d-block mb-3" style="font-size: 3rem; opacity: 0.2;"></i>
            <p class="mb-0 small">No comments yet. Be the first to share your thoughts!</p>
        </div>
    @endforelse

</div>

{{-- Hidden Delete Form --}}
<form id="deleteCommentForm" method="POST" style="display: none;">
    @csrf
    @method('DELETE')
</form>

{{-- Styles --}}
<style>
    .comment-bubble {
        transition: background 0.2s;
    }

    .comment-thread:hover .comment-bubble {
        background: var(--bs-body-bg) !important;
    }

    #comment_input:focus {
        box-shadow: 0 0 0 3px rgba(115, 103, 240, .15);
        border-color: #7367f0;
    }
</style>

{{-- JS --}}
<script src="{{ asset('assets/custom-js/article/home-comment.js') }}"></script>
