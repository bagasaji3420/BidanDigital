(function () {
    const KEY = 'bidan_bookmarks';

    function getBookmarks() {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
    }

    function saveBookmarks(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    function isBookmarked(slug) {
        return getBookmarks().some(b => b.slug === slug);
    }

    function toggleBookmark(slug, title, url, category) {
        let bookmarks = getBookmarks();
        const exists = bookmarks.findIndex(b => b.slug === slug);

        if (exists > -1) {
            bookmarks.splice(exists, 1);
            saveBookmarks(bookmarks);
            return false;
        } else {
            bookmarks.unshift({ slug, title, url, category, savedAt: Date.now() });
            saveBookmarks(bookmarks);
            return true;
        }
    }

    function updateBtn(btn, bookmarked) {
        const icon = btn.querySelector('i');
        const label = btn.querySelector('.bookmark-label');

        if (bookmarked) {
            icon.className = 'bx bxs-bookmark me-1';
            btn.classList.add('btn-warning');
            btn.classList.remove('btn-label-warning');
            if (label) label.textContent = 'Tersimpan';
            btn.title = 'Hapus bookmark';
        } else {
            icon.className = 'bx bx-bookmark me-1';
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-label-warning');
            if (label) label.textContent = 'Simpan';
            btn.title = 'Bookmark artikel ini';
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            const slug = btn.dataset.slug;

            // Set state awal
            updateBtn(btn, isBookmarked(slug));

            btn.addEventListener('click', function () {
                const { slug, title, url, category } = this.dataset;
                const bookmarked = toggleBookmark(slug, title, url, category);
                updateBtn(this, bookmarked);
            });
        });
    });
})();