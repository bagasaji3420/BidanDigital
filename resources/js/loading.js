        (function() {
            var bar = document.getElementById('kb-bar');
            var pctEl = document.getElementById('kb-pct');
            var hintEl = document.getElementById('kb-hint');
            var loader = document.getElementById('kb-loader');

            // ── Flag: apakah loader halaman ini sudah selesai ────
            var pageLoaded = false;

            var hints = ['Menyiapkan halaman...', 'Memuat aset CSS...', 'Memuat skrip...', 'Hampir selesai...'];
            var hintIdx = 0;
            var current = 0;

            function setProgress(val) {
                current = Math.min(100, Math.max(current, val));
                if (bar) bar.style.width = current + '%';
                if (pctEl) pctEl.textContent = Math.round(current) + '%';
            }

            // Hint rotator
            var hintTimer = setInterval(function() {
                if (current < 95 && hintEl) {
                    hintEl.textContent = hints[hintIdx % hints.length];
                    hintIdx++;
                }
            }, 1400);

            // Fake smooth progress
            setProgress(5);
            var fakeTimer = setInterval(function() {
                if (current < 82) {
                    setProgress(current + (Math.random() * 4 + 1));
                } else {
                    clearInterval(fakeTimer);
                }
            }, 250);

            // ── Sembunyikan loader halaman ini ───────────────────
            function finishPageLoad() {
                if (pageLoaded) return; // jangan jalan 2x
                pageLoaded = true;
                clearInterval(fakeTimer);
                clearInterval(hintTimer);
                setProgress(100);
                if (hintEl) hintEl.textContent = 'Selesai! ✓';
                setTimeout(function() {
                    if (!loader) return;
                    loader.style.opacity = '0';
                    setTimeout(function() {
                        loader && loader.remove();
                    }, 450);
                }, 300);
            }

            window.addEventListener('load', function() {
                setTimeout(finishPageLoad, 300);
            });

            // Safety timeout 8 detik
            setTimeout(finishPageLoad, 8000);

            // ── Loader navigasi antar halaman ─────────────────────
            function buildLoader() {
                var d = document.createElement('div');
                d.id = 'kb-loader';
                d.innerHTML =
                     '<div class="kb-icon"><img src="' + KB_ICON_URL + '" style="width:64px;height:64px;object-fit:contain;border-radius:12px;"></div>' +
                    '<div class="kb-logo">BidanDigital</div>' +
                    '<div class="kb-tagline">Kesehatan Ibu &amp; Bidan</div>' +
                    '<div class="kb-track"><div class="kb-bar" id="kb-bar"></div></div>' +
                    '<div class="kb-pct" id="kb-pct">0%</div>' +
                    '<div class="kb-hint" id="kb-hint">Menyiapkan halaman...</div>';
                document.body.appendChild(d);

                // Jalankan progress fake untuk navigasi
                var p = 0;
                var iv = setInterval(function() {
                    if (p < 88) {
                        p += Math.random() * 8 + 2;
                        var b = document.getElementById('kb-bar');
                        var pe = document.getElementById('kb-pct');
                        if (b) b.style.width = Math.min(p, 88) + '%';
                        if (pe) pe.textContent = Math.round(Math.min(p, 88)) + '%';
                    } else {
                        clearInterval(iv);
                    }
                }, 180);
            }

            function showNavLoader() {
                // ── KUNCI: jangan munculkan kalau halaman ini belum selesai load ──
                if (!pageLoaded) return;
                if (document.getElementById('kb-loader')) return;
                buildLoader();
            }

            // Intercept klik link
            document.addEventListener('click', function(e) {
                var a = e.target.closest('a');
                if (!a) return;
                var href = a.getAttribute('href');
                if (!href) return;
                if (
                    href.startsWith('#') ||
                    href.startsWith('javascript') ||
                    href.startsWith('mailto') ||
                    href.startsWith('tel') ||
                    a.target === '_blank' ||
                    e.ctrlKey || e.metaKey
                ) return;
                showNavLoader();
            });

            // Intercept form submit
            document.addEventListener('submit', function(e) {
                var form = e.target;
                if (form.method && form.method.toLowerCase() === 'get') return;
                showNavLoader();
            });

            // Handle tombol back/forward (bfcache)
            window.addEventListener('pageshow', function(e) {
                if (e.persisted) {
                    var l = document.getElementById('kb-loader');
                    if (l) l.remove();
                }
            });
        })();
