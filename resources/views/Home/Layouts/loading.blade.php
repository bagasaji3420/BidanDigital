    {{-- Loader ditaruh di ATAS semua konten --}}
    <div id="kb-loader">
        <div class="kb-icon">
            <img src="{{ asset('assets/img/favicon/icon.webp') }}"
                style="width:64px;height:64px;object-fit:contain;border-radius:12px;">
        </div>
        <div class="kb-logo">{{ config('app.name') }}</div>
        <div class="kb-tagline">Kesehatan Ibu &amp; Bidan</div>
        <div class="kb-track">
            <div class="kb-bar" id="kb-bar"></div>
        </div>
        <div class="kb-pct" id="kb-pct">0%</div>
        <div class="kb-hint" id="kb-hint">Menyiapkan halaman...</div>
    </div>
