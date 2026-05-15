{{-- ═══ FLOAT CHAT WIDGET — Kebidanan & Kesehatan Ibu ═══ --}}
<div id="fc-widget">

    {{-- Panel Chat --}}
    <div class="fc-panel" id="fcPanel">
        <div class="fc-header">
            <div class="fc-avatar">
                <img src="{{ asset('assets/img/favicon/chatbot.webp') }}" alt="Asisten AI" class="fc-avatar-img"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <span class="fc-avatar-fallback" style="display:none;">🤖</span>
            </div>
            <div class="fc-header-text">
                <p class="fc-header-name">Haf</p>
                <p class="fc-header-sub">Kesehatan Ibu & Remaja Putri</p>
            </div>
            <span class="fc-online-dot"></span>
        </div>

        <div class="fc-messages" id="fcMessages">
            <div class="fc-msg bot">
                <div class="fc-bubble">
                    Halo! Aku siap membantu pertanyaan seputar kebidanan, kesehatan ibu hamil, dan kesehatan remaja
                    putri. 👋
                </div>
                <span class="fc-time">Sekarang</span>
            </div>
        </div>

        <div class="fc-quota" id="fcQuota" style="display:none;"></div>
        <div class="fc-footer">
            <textarea class="fc-input" id="fcInput" placeholder="Tanyakan seputar kebidanan..." rows="1"
                oninput="fcAutoResize(this)" onkeydown="fcHandleKey(event)"></textarea>
            <button class="fc-send" id="fcSend" onclick="fcSendMsg()">
                <i class="bx bx-send"></i>
            </button>
        </div>

        <div class="fc-powered">
            Asisten Kebidanan AI — selalu periksa informasi penting
        </div>
    </div>

    {{-- Tombol Bubble --}}
    <button class="fc-btn" id="fcBtn" onclick="fcToggle()" title="Chat dengan Asisten Kebidanan">
        <img src="{{ asset('assets/img/favicon/chatbot.webp') }}" alt="Chatbot" class="fc-btn-img"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <span class="fc-btn-fallback"
            style="display:none;align-items:center;justify-content:center;width:100%;height:100%;font-size:24px;background:#696cff;border-radius:50%;color:#fff;">
            🤖
        </span>
        <i class="bx bx-x" id="fcIconClose" style="display:none;"></i>
    </button>

    {{-- Tooltip otomatis --}}
    <div class="fc-tooltip" id="fcTooltip">
        Ada pertanyaan seputar kebidanan <br> yang bisa Kaka Haf bantu?
        <button class="fc-tooltip-close" onclick="fcCloseTooltip(event)">✕</button>
    </div>

</div>
