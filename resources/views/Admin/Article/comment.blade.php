<div class="card p-4 mt-4">
    <h5 class="mb-3">Comments</h5>

    {{-- FORM --}}
    @auth
        <div id="mainFormWrapper">
            <form id="mainCommentForm" action="{{ route('articles.comments.store', $article->slug) }}" method="POST"
                class="mb-4 d-flex gap-2">

                @csrf
                <input type="hidden" name="parent_id" id="parent_id">
                <input type="hidden" value="{{ encrypt($article->id) }}" name="slug">

                {{-- AVATAR --}}
                <img src="{{ auth()->user()->avatar
                    ? Storage::url(auth()->user()->avatar)
                    : 'https://ui-avatars.com/api/?name=' . urlencode(auth()->user()->username) }}"
                    class="rounded-circle" width="40" height="40" style="object-fit:cover;">

                <div class="w-100">
                    <textarea id="comment_input" name="content" class="form-control mb-2" placeholder="Write a comment..." required></textarea>

                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm">Post</button>
                        <button type="button" onclick="cancelReply()" class="btn btn-secondary btn-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    @endauth

    {{-- COMMENTS LIST --}}
    @forelse ($comments->whereNull('parent_id') as $comment)
        <div class="mb-3 border-bottom pb-3" id="comment-{{ $comment->id }}" data-root="{{ $comment->id }}">

            <div class="d-flex gap-2">

                {{-- AVATAR --}}
                <img src="{{ $comment->user->avatar
                    ? Storage::url($comment->user->avatar)
                    : 'https://ui-avatars.com/api/?name=' . urlencode($comment->user->username) }}"
                    class="rounded-circle" width="35" height="35" style="object-fit:cover;">

                <div class="w-100">

                    {{-- HEADER (USERNAME + MENU) --}}
                    <div class="d-flex justify-content-between align-items-start">

                        <strong style="cursor:pointer"
                            onclick="replyTo({{ $comment->id }}, '{{ $comment->user->username }}', this)">
                            {{ ($comment->user->first_name ?? '') . ' ' . ($comment->user->last_name ?? '') ?: 'Guest' }}
                        </strong>

                        {{-- ⋮ MENU --}}
                        @auth
                            @if (auth()->id() === $comment->user_id)
                                <div class="dropdown">
                                    <button class="btn btn-sm p-0" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>

                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a class="dropdown-item text-danger" href="javascript:void(0)"
                                                onclick="deleteComment({{ $comment->id }})">
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            @endif
                        @endauth

                    </div>

                    {{-- CONTENT --}}
                    <p class="mb-1">{!! nl2br(e($comment->content)) !!}</p>

                    {{-- ACTION --}}
                    @auth
                        <a href="javascript:void(0)"
                            onclick="replyTo({{ $comment->id }}, '{{ $comment->user->username }}', this)"
                            class="text-primary small">
                            Reply
                        </a>
                    @endauth

                    {{-- SLOT FORM --}}
                    <div id="reply-form-{{ $comment->id }}"></div>

                    {{-- REPLIES --}}
                    @foreach ($comment->replies as $reply)
                        <div class="d-flex gap-2 mt-3 ms-4" data-root="{{ $comment->id }}">

                            <img src="{{ $reply->user->avatar
                                ? Storage::url($reply->user->avatar)
                                : 'https://ui-avatars.com/api/?name=' . urlencode($reply->user->username) }}"
                                class="rounded-circle" width="30" height="30" style="object-fit:cover;">

                            <div class="w-100">

                                {{-- HEADER --}}
                                <div class="d-flex justify-content-between">

                                    <strong style="cursor:pointer"
                                        onclick="replyTo({{ $reply->id }}, '{{ $reply->user->username }}', this)">
                                        {{ $reply->user->first_name . ' ' . $reply->user->last_name ?? 'Guest' }}
                                    </strong>

                                    {{-- ⋮ MENU --}}
                                    @auth
                                        @if (auth()->id() === $reply->user_id)
                                            <div class="dropdown">
                                                <button class="btn btn-sm p-0" data-bs-toggle="dropdown">
                                                    <i class="bx bx-dots-vertical-rounded"></i>
                                                </button>

                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <a class="dropdown-item text-danger" href="javascript:void(0)"
                                                            onclick="deleteComment({{ $reply->id }})">
                                                            Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        @endif
                                    @endauth

                                </div>

                                <p class="mb-1">{!! nl2br(e($reply->content)) !!}</p>

                                @auth
                                    <a href="javascript:void(0)"
                                        onclick="replyTo({{ $reply->id }}, '{{ $reply->user->username }}', this)"
                                        class="text-primary small">
                                        Reply
                                    </a>
                                @endauth

                            </div>
                        </div>
                    @endforeach

                </div>
            </div>
        </div>
    @empty
        <p class="text-muted">No comments yet</p>
    @endforelse
</div>

<form id="deleteCommentForm" method="POST" style="display:none;">
    @csrf
    @method('DELETE')
</form>

<script src="{{ asset('assets/custom-js/article/comment.js') }}"></script>

