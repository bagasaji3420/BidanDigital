@extends('Admin.Layouts.app')

@section('content')
    <style>
        .card-body {
            position: relative;
            padding-bottom: 60px;
            /* kasih ruang biar tombol nggak nutup teks */
        }

        .card-action {
            position: absolute;
            bottom: 15px;
            right: 15px;
        }

        /* Jika layar >= 1000px */
        @media (min-width: 765px) {
            .card-img-left {
                max-width: 280px;
                height: 250px;
                object-fit: cover;
                margin: 0;
            }
        }
    </style>
    @include('Admin.Article.menu')

    <div class="row">
        {{-- 🔥 LIST WRAPPER --}}
        <div id="articleList">
            @include('Admin.Article.list', ['articles' => $articles])
        </div>

    </div>

    <script>
        let timeout = null;

        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const statusFilter = document.getElementById('statusFilter');

        function fetchArticles() {
            let q = searchInput.value;
            let category = categoryFilter ? categoryFilter.value : '';
            let status = statusFilter ? statusFilter.value : '';

            fetch(`{{ route('articles.search') }}?q=${encodeURIComponent(q)}&category=${category}&status=${status}`)
                .then(res => res.text())
                .then(html => {
                    document.getElementById('articleList').innerHTML = html;
                });
        }

        // 🔍 debounce search
        searchInput.addEventListener('keyup', function() {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                fetchArticles();
            }, 400);
        });

        // 🎯 filter change
        if (categoryFilter) {
            categoryFilter.addEventListener('change', fetchArticles);
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', fetchArticles);
        }
    </script>

    <script>
        function confirmDelete(id) {
            Swal.fire({
                title: 'Yakin mau hapus?',
                text: "Data tidak bisa dikembalikan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('delete-' + id).submit();
                }
            });
        }
    </script>

    {{-- PAGINATION --}}
    <div class="mt-4">
        {{ $articles->links('pagination::bootstrap-5') }}
    </div>
@endsection
