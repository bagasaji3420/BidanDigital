<ul class="nav nav-pills flex-column flex-md-row mb-6 gap-md-0 gap-2">
    <li class="nav-item">
        <a class="nav-link {{ $title == 'Article' ? 'active' : '' }}" href="{{ route('articles.index') }}">
            <i class="bx bx-news icon-sm me-1_5"></i>
            Article
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link {{ $title == 'Article Create' ? 'active' : '' }}
       {{ auth()->user()->can('articles.create') ? '' : 'disabled text-muted' }}"
            href="{{ auth()->user()->can('articles.create') ? route('articles.create') : '#' }}"
            style="{{ auth()->user()->can('articles.create') ? '' : 'pointer-events:none; cursor:not-allowed;' }}">

            <i class="bx bx-plus icon-sm me-1_5"></i>
            Create
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link {{ $title == 'Category' ? 'active' : '' }}
       {{ auth()->user()->hasRole('admin') ? '' : 'disabled text-muted' }}"
            href="{{ auth()->user()->hasRole('admin') ? route('categories.index') : '#' }}"
            style="{{ auth()->user()->hasRole('admin') ? '' : 'pointer-events:none; cursor:not-allowed;' }}">

            <i class="bx bx-tag icon-sm me-1_5"></i>
            Category
        </a>
    </li>

    @if ($title == 'Article')
        <li class="nav-item w-100">
            <div class="row g-2 mb-3">

                {{-- SEARCH --}}
                <div class="col-md-6">
                    <input type="text" id="searchInput" class="form-control" placeholder="Search articles...">
                </div>

                {{-- CATEGORY --}}
                <div class="col-md-3">
                    <select id="categoryFilter" class="form-select">
                        <option value="">All Categories</option>
                        @foreach ($categories ?? [] as $category)
                            <option value="{{ $category->id }}">
                                {{ $category->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                {{-- STATUS --}}
                <div class="col-md-3">
                    <select id="statusFilter" class="form-select">
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

            </div>
        </li>
    @endif

</ul>
