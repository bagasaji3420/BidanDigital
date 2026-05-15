@extends('Home.Layouts.app')

@section('content')
    <section>

        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

            .bng * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            .bng {
                --rose: #b5545e;
                --rose-soft: #f7eced;
                --gold: #b8924a;
                --gold-soft: #fdf5e4;
                --sage: #5e8c6a;
                --cream: #fdfaf6;
                --ink: #2a1f1f;
                --muted: #907878;
                --border: #e8dada;
                --white: #ffffff;
                font-family: 'DM Sans', sans-serif;
                /* background: var(--cream); */
                min-height: 100vh;
                padding: 2rem 1rem 5rem;
                color: var(--ink);
            }

            /* ─── Header ─── */
            .bng-header {
                text-align: center;
                margin-bottom: 2.5rem;
            }

            .bng-deco {
                font-size: 1.2rem;
                letter-spacing: .8rem;
                color: var(--gold);
                margin-bottom: .75rem;
            }

            .bng-title {
                font-family: 'Playfair Display', serif;
                font-size: clamp(1.8rem, 5vw, 2.8rem);
                font-weight: 700;
                color: var(--ink);
                line-height: 1.2;
            }

            .bng-title em {
                color: var(--rose);
                font-style: italic;
            }

            .bng-subtitle {
                color: var(--muted);
                font-size: .95rem;
                margin-top: .5rem;
                font-weight: 300;
            }

            /* ─── Card ─── */
            .bng-card {
                background: var(--white);
                border-radius: 20px;
                border: 1px solid var(--border);
                padding: 1.75rem;
                max-width: 560px;
                margin: 0 auto 1.5rem;
                box-shadow: 0 4px 24px rgba(180, 100, 110, .08);
            }

            /* ─── Field ─── */
            .bng-field {
                margin-bottom: 1.4rem;
            }

            .bng-label {
                display: block;
                font-size: .78rem;
                font-weight: 500;
                letter-spacing: .08em;
                text-transform: uppercase;
                color: var(--muted);
                margin-bottom: .65rem;
            }

            /* ─── Gender ─── */
            .bng-gender-row {
                display: flex;
                gap: .75rem;
            }

            .bng-gender-btn {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .5rem;
                padding: .75rem 1rem;
                border-radius: 12px;
                border: 2px solid var(--border);
                background: var(--white);
                font-family: 'DM Sans', sans-serif;
                font-size: .95rem;
                font-weight: 500;
                color: var(--muted);
                cursor: pointer;
                transition: all .2s;
            }

            .bng-gender-btn.active {
                border-color: var(--rose);
                background: var(--rose-soft);
                color: var(--rose);
            }

            .bng-gender-btn .icon {
                font-size: 1.3rem;
            }

            /* ─── Chips ─── */
            .bng-chips {
                display: flex;
                flex-wrap: wrap;
                gap: .5rem;
            }

            .bng-chip {
                padding: .45rem .9rem;
                border-radius: 99px;
                border: 1.5px solid var(--border);
                background: var(--white);
                font-family: 'DM Sans', sans-serif;
                font-size: .85rem;
                color: var(--muted);
                cursor: pointer;
                transition: all .2s;
                user-select: none;
            }

            .bng-chip.active {
                border-color: var(--gold);
                background: var(--gold-soft);
                color: var(--gold);
                font-weight: 500;
            }

            /* ─── Input ─── */
            .bng-input {
                width: 100%;
                padding: .7rem 1rem;
                border-radius: 10px;
                border: 1.5px solid var(--border);
                font-family: 'DM Sans', sans-serif;
                font-size: 1rem;
                color: var(--ink);
                background: var(--white);
                outline: none;
                transition: border-color .2s;
                text-transform: uppercase;
            }

            .bng-input:focus {
                border-color: var(--rose);
            }

            .bng-input::placeholder {
                text-transform: none;
                color: #c0b0b0;
            }

            /* ─── Divider ─── */
            .bng-divider {
                border: none;
                border-top: 1px solid var(--border);
                margin: 1.2rem 0 0;
            }

            /* ─── Button ─── */
            .bng-btn {
                width: 100%;
                margin-top: 1.2rem;
                padding: .9rem;
                border-radius: 12px;
                border: none;
                background: linear-gradient(135deg, var(--rose), #9e3d47);
                color: white;
                font-family: 'Playfair Display', serif;
                font-size: 1.05rem;
                font-weight: 600;
                cursor: pointer;
                transition: all .2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .5rem;
            }

            .bng-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(181, 84, 94, .35);
            }

            .bng-btn:active {
                transform: translateY(0);
            }

            /* ─── Results ─── */
            .bng-results {
                max-width: 560px;
                margin: 0 auto;
            }

            .bng-results-header {
                font-family: 'Playfair Display', serif;
                font-size: 1.05rem;
                font-style: italic;
                color: var(--muted);
                text-align: center;
                margin-bottom: 1rem;
            }

            .bng-name-card {
                background: var(--white);
                border: 1px solid var(--border);
                border-radius: 16px;
                padding: 1.2rem 1.4rem;
                margin-bottom: .75rem;
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                animation: bngSlide .35s ease both;
                box-shadow: 0 2px 12px rgba(0, 0, 0, .04);
                transition: border-color .2s, box-shadow .2s;
            }

            .bng-name-card:hover {
                border-color: var(--rose);
                box-shadow: 0 4px 16px rgba(181, 84, 94, .1);
            }

            .bng-name-card:nth-child(2) {
                animation-delay: .05s;
            }

            .bng-name-card:nth-child(3) {
                animation-delay: .10s;
            }

            .bng-name-card:nth-child(4) {
                animation-delay: .15s;
            }

            .bng-name-card:nth-child(5) {
                animation-delay: .20s;
            }

            .bng-name-card:nth-child(6) {
                animation-delay: .25s;
            }

            @keyframes bngSlide {
                from {
                    opacity: 0;
                    transform: translateY(12px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .bng-name-num {
                font-family: 'Playfair Display', serif;
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--rose-soft);
                -webkit-text-stroke: 1px var(--rose);
                min-width: 2rem;
                line-height: 1;
                padding-top: .2rem;
            }

            .bng-name-body {
                flex: 1;
            }

            .bng-name-text {
                font-family: 'Playfair Display', serif;
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--ink);
                margin-bottom: .25rem;
            }

            .bng-name-arti {
                font-size: .88rem;
                color: var(--muted);
                line-height: 1.5;
                margin-bottom: .4rem;
            }

            .bng-name-tags {
                display: flex;
                gap: .4rem;
                flex-wrap: wrap;
            }

            .bng-tag {
                font-size: .72rem;
                padding: .2rem .6rem;
                border-radius: 99px;
                font-weight: 500;
            }

            .bng-tag-suku {
                background: var(--gold-soft);
                color: var(--gold);
            }

            .bng-tag-kat {
                background: var(--rose-soft);
                color: var(--rose);
            }

            .bng-tag-lang {
                background: #eef4ef;
                color: var(--sage);
            }

            .bng-empty {
                text-align: center;
                padding: 2.5rem 1rem;
                color: var(--muted);
                font-style: italic;
                font-family: 'Playfair Display', serif;
            }
        </style>

        <div class="bng">



            {{-- Form Card --}}
            <div class="bng-card">
                {{-- Header --}}
                <div class="bng-header">
                    <div class="bng-deco">✦ ✦ ✦</div>
                    <h1 class="bng-title">Generator Nama <em>Bayi</em></h1>
                    <p class="bng-subtitle">Nama indah & bermakna dari berbagai suku di Indonesia</p>
                </div>
                {{-- Gender --}}
                <div class="bng-field">
                    <span class="bng-label">Jenis Kelamin</span>
                    <div class="bng-gender-row">
                        <button class="bng-gender-btn active" id="bngBtnL" onclick="bngGender('laki')">
                            <span class="icon">👦</span>
                        </button>
                        <button class="bng-gender-btn" id="bngBtnP" onclick="bngGender('perempuan')">
                            <span class="icon">👧</span>
                        </button>
                    </div>
                </div>

                {{-- Kategori --}}
                <div class="bng-field">
                    <span class="bng-label">Kategori</span>
                    <div class="bng-chips" id="bngKatChips">
                        <button class="bng-chip active" data-kat="Islami">🌙 Islami</button>
                        <button class="bng-chip active" data-kat="Umum">🌿 Umum</button>
                    </div>
                </div>

                {{-- Suku --}}
                <div class="bng-field">
                    <span class="bng-label">Suku / Budaya</span>
                    <div class="bng-chips" id="bngSukuChips">
                        <button class="bng-chip active" data-suku="Semua">🇮🇩 Semua</button>
                        <button class="bng-chip" data-suku="Jawa">🏝 Jawa</button>
                        <button class="bng-chip" data-suku="Sunda">🌺 Sunda</button>
                        <button class="bng-chip" data-suku="Batak">⛰ Batak</button>
                        <button class="bng-chip" data-suku="Minang">🏔 Minang</button>
                        <button class="bng-chip" data-suku="Bugis">⚓ Bugis</button>
                        <button class="bng-chip" data-suku="Betawi">🏙 Betawi</button>
                        <button class="bng-chip" data-suku="Bali">🌸 Bali</button>
                        <button class="bng-chip" data-suku="Dayak">🌿 Dayak</button>
                        <button class="bng-chip" data-suku="Arab">☪️ Arab</button>
                        <button class="bng-chip" data-suku="International">🌍 International</button>
                    </div>
                </div>

                {{-- Awalan --}}
                <div class="bng-field">
                    <span class="bng-label">
                        Awalan Huruf
                        <small style="text-transform:none;font-weight:300;font-size:.9em">(opsional)</small>
                    </span>
                    <input class="bng-input" id="bngAwalan" maxlength="3" placeholder="Contoh: A, Ra, Nu ...">
                </div>

                <hr class="bng-divider">

                <button class="bng-btn" onclick="bngGenerate()">
                    ✨ Generate 5 Nama
                </button>

            </div>

            {{-- Results --}}
            <div class="bng-results" id="bngResults"></div>

        </div>

        <script>
            (function() {

                /* ══ State ══ */
                let bngGenderVal = 'laki';
                let bngSukuVal = 'Semua';
                let bngKatVals = ['Islami', 'Umum'];
                let DB = [];

                /* ══ Load data dari API ══ */
                async function bngLoadDB() {
                    try {
                        const res = await fetch('{{ route('api.nama-bayi') }}');
                        const json = await res.json();
                        DB = json.data ?? [];
                    } catch (e) {
                        console.error('Gagal load data nama bayi', e);
                    }
                }

                /* ══ Gender ══ */
                window.bngGender = function(g) {
                    bngGenderVal = g;
                    document.getElementById('bngBtnL').classList.toggle('active', g === 'laki');
                    document.getElementById('bngBtnP').classList.toggle('active', g === 'perempuan');
                };

                /* ══ Suku — single select ══ */
                document.getElementById('bngSukuChips').addEventListener('click', function(e) {
                    const btn = e.target.closest('.bng-chip');
                    if (!btn) return;
                    document.querySelectorAll('#bngSukuChips .bng-chip').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    bngSukuVal = btn.dataset.suku;
                });

                /* ══ Kategori — multi select ══ */
                document.getElementById('bngKatChips').addEventListener('click', function(e) {
                    const btn = e.target.closest('.bng-chip');
                    if (!btn) return;
                    btn.classList.toggle('active');
                    bngKatVals = [...document.querySelectorAll('#bngKatChips .bng-chip.active')].map(b => b.dataset
                        .kat);
                });

                /* ══ Generate ══ */
                window.bngGenerate = async function() {
                    if (DB.length === 0) await bngLoadDB();

                    const awalan = document.getElementById('bngAwalan').value.trim().toUpperCase();
                    const results = document.getElementById('bngResults');

                    let pool = DB.filter(n => {
                        const genderOk = n.gender === bngGenderVal;
                        const sukuOk = bngSukuVal === 'Semua' || n.suku === bngSukuVal;
                        const katOk = bngKatVals.length === 0 || bngKatVals.includes(n.kategori);
                        const awalanOk = !awalan || n.nama.toUpperCase().startsWith(awalan);
                        return genderOk && sukuOk && katOk && awalanOk;
                    });

                    if (pool.length === 0) {
                        results.innerHTML =
                            `<div class="bng-empty">😔 Tidak ada nama yang cocok.<br>Coba ubah filter atau hapus awalan huruf.</div>`;
                        return;
                    }

                    pool = pool.sort(() => Math.random() - 0.5).slice(0, 5);

                    const label = bngGenderVal === 'laki' ? 'laki-laki' : 'perempuan';
                    results.innerHTML = `<p class="bng-results-header">✦ 5 nama ${label} untuk buah hati ✦</p>` +
                        pool.map((n, i) => `
                <div class="bng-name-card">
                    <div class="bng-name-num">${i + 1}</div>
                    <div class="bng-name-body">
                        <div class="bng-name-text">${n.nama}</div>
                        <div class="bng-name-arti">${n.arti}</div>
                        <div class="bng-name-tags">
                            <span class="bng-tag bng-tag-suku">🏝 ${n.suku}</span>
                            <span class="bng-tag bng-tag-kat">${n.kategori === 'Islami' ? '🌙' : '🌿'} ${n.kategori}</span>
                            <span class="bng-tag bng-tag-lang">📖 ${n.bahasa}</span>
                        </div>
                    </div>
                </div>
            `).join('');
                };

                // preload saat halaman dibuka
                bngLoadDB();

            })();
        </script>

    </section>
@endsection
