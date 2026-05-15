{{-- bookmarks.blade.php --}}
@extends('Home.Layouts.app')
@section('content')
    <h4 class="fw-bold mb-4">
        <i class="bx bxs-bookmark text-warning me-2"></i>Artikel Tersimpan
    </h4>
    <div id="bookmark-list" class="row g-4">
        <p class="text-muted">Loading...</p>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const bookmarks = JSON.parse(localStorage.getItem('bidan_bookmarks') || '[]');
            const container = document.getElementById('bookmark-list');

            if (!bookmarks.length) {
                container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bx bx-bookmark display-1 text-muted opacity-25"></i>
                <h5 class="text-muted mt-3">Belum ada artikel tersimpan</h5>
                <a href="{{ route('article.index') }}" class="btn btn-primary mt-3">Jelajahi Artikel</a>
            </div>`;
                return;
            }

            container.innerHTML = bookmarks.map(b => `
        <div class="col-md-6 col-lg-4">
            <div class="card border-0 shadow-sm h-100" style="border-radius:12px;">
                <div class="card-body p-4">
                    ${b.category ? `<span class="badge bg-label-primary mb-2">${b.category}</span>` : ''}
                    <h6 class="fw-bold mb-3">
                        <a href="${b.url}" class="text-heading text-decoration-none">${b.title}</a>
                    </h6>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <small class="text-muted">
                            <i class="bx bx-time me-1"></i>
                            ${new Date(b.savedAt).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}
                        </small>
                        <button class="btn btn-sm btn-label-danger rounded-pill remove-bookmark" data-slug="${b.slug}">
                            <i class="bx bx-trash me-1"></i>Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

            container.querySelectorAll('.remove-bookmark').forEach(btn => {
                btn.addEventListener('click', function() {
                    let bookmarks = JSON.parse(localStorage.getItem('bidan_bookmarks') || '[]');
                    bookmarks = bookmarks.filter(b => b.slug !== this.dataset.slug);
                    localStorage.setItem('bidan_bookmarks', JSON.stringify(bookmarks));
                    this.closest('.col-md-6').remove();
                    if (!container.querySelector('.col-md-6')) location.reload();
                });
            });
        });
    </script>
@endsection
