(function () {
    const KEY = "fcTooltipShown";
    let fcIsOpen = false;
    let fcLoading = false;
    let fcHistory = [];
    let fcRemaining = null;

    const CHATBOT_URL = document.querySelector(
        'meta[name="chatbot-url"]',
    ).content;
    const CSRF_TOKEN =
        document.querySelector('meta[name="csrf-token"]')?.content ?? "";

    /* ─── Toggle panel ─────────────────────────────────────────── */
    window.fcToggle = function () {
        fcIsOpen = !fcIsOpen;
        document.getElementById("fcPanel").classList.toggle("open", fcIsOpen);
        document.getElementById("fcIconClose").style.display = fcIsOpen
            ? "flex"
            : "none";

        const tooltip = document.getElementById("fcTooltip");
        if (tooltip) {
            tooltip.classList.add("hide");
            setTimeout(() => (tooltip.style.display = "none"), 200);
        }

        if (fcIsOpen) {
            setTimeout(() => document.getElementById("fcInput").focus(), 300);
        }
    };

    /* ─── Textarea auto-resize ─────────────────────────────────── */
    window.fcAutoResize = function (el) {
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 80) + "px";
    };

    /* ─── Handle Enter ─────────────────────────────────────────── */
    window.fcHandleKey = function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            fcSendMsg();
        }
    };

    /* ─── Close tooltip ────────────────────────────────────────── */
    window.fcCloseTooltip = function (e) {
        e.stopPropagation();
        const tooltip = document.getElementById("fcTooltip");
        tooltip.classList.add("hide");
        setTimeout(() => (tooltip.style.display = "none"), 200);
    };

    /* ─── Format waktu ─────────────────────────────────────────── */
    function fcTime() {
        return new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    /* ─── Markdown sederhana → HTML ────────────────────────────── */
    function fcParseMarkdown(text) {
        const escaped = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const lines = escaped.split("\n");
        const result = [];
        let inList = false;

        for (const line of lines) {
            const bulletMatch = line.match(/^[\*\-] (.+)/);
            const numberedMatch = line.match(/^\d+\. (.+)/);

            if (bulletMatch || numberedMatch) {
                if (!inList) {
                    result.push("<ul>");
                    inList = true;
                }
                result.push(`<li>${(bulletMatch || numberedMatch)[1]}</li>`);
            } else {
                if (inList) {
                    result.push("</ul>");
                    inList = false;
                }
                result.push(line);
            }
        }

        if (inList) result.push("</ul>");

        return result
            .join("\n")
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/__(.+?)__/g, "<strong>$1</strong>")
            .replace(/\*(.+?)\*/g, "<em>$1</em>")
            .replace(/_(.+?)_/g, "<em>$1</em>")
            .replace(/(?!<\/?(ul|li)>)\n/g, "<br>");
    }

    /* ─── Tambah pesan ke chat ─────────────────────────────────── */
    function fcAppend(text, type) {
        const msgs = document.getElementById("fcMessages");
        const d = document.createElement("div");
        d.className = "fc-msg " + type;

        const content =
            type === "bot"
                ? fcParseMarkdown(text)
                : text
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;");

        d.innerHTML = `<div class="fc-bubble">${content}</div><span class="fc-time">${fcTime()}</span>`;
        msgs.appendChild(d);
        msgs.scrollTop = msgs.scrollHeight;
    }

    /* ─── Animasi typing ───────────────────────────────────────── */
    function fcShowTyping() {
        const msgs = document.getElementById("fcMessages");
        const d = document.createElement("div");
        d.className = "fc-msg bot";
        d.id = "fcTyping";
        d.innerHTML = `
            <div class="fc-bubble">
                <div class="fc-typing-wrap">
                    <div class="fc-dot"></div>
                    <div class="fc-dot"></div>
                    <div class="fc-dot"></div>
                </div>
            </div>`;
        msgs.appendChild(d);
        msgs.scrollTop = msgs.scrollHeight;
    }

    /* ─── Reset state loading ───────────────────────────────────── */
    // FIX: dipusatkan di satu fungsi agar tidak ada yang terlewat
    function fcDoneLoading() {
        fcLoading = false;
        document.getElementById("fcTyping")?.remove();
        const sendBtn = document.getElementById("fcSend");
        if (fcRemaining === null || fcRemaining > 0) {
            sendBtn.disabled = false;
        }
    }

    /* ─── Update tampilan kuota ────────────────────────────────── */
    function fcUpdateQuota(remaining, resetIn = null) {
        fcRemaining = remaining;

        const quotaEl = document.getElementById("fcQuota");
        if (!quotaEl) return;

        quotaEl.style.display = "flex";

        const input = document.getElementById("fcInput");
        const sendBtn = document.getElementById("fcSend");

        let resetText = "";
        if (resetIn !== null) {
            const resetDate = new Date(Date.now() + resetIn * 1000);
            resetText = ` • reset jam ${resetDate.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        }

        if (remaining <= 0) {
            quotaEl.className = "fc-quota fc-quota--empty";
            quotaEl.innerHTML = `<span>⚠️ Kuota habis${resetText}</span>`;
            input.disabled = true;
            sendBtn.disabled = true;
        } else if (remaining <= 2) {
            quotaEl.className = "fc-quota fc-quota--low";
            quotaEl.innerHTML = `<span>⚠️ Sisa ${remaining}${resetText}</span>`;
        } else {
            quotaEl.className = "fc-quota fc-quota--ok";
            quotaEl.innerHTML = `<span>✔️ Sisa ${remaining}${resetText}</span>`;
        }
    }

    /* ─── Kirim pesan ──────────────────────────────────────────── */
    window.fcSendMsg = async function () {
        const input = document.getElementById("fcInput");
        const text = input.value.trim();
        if (!text || fcLoading) return;

        if (fcRemaining !== null && fcRemaining <= 0) {
            fcAppend(
                "Kuota pertanyaan kamu sudah habis hari ini. Kembali lagi besok ya! 😊",
                "bot",
            );
            return;
        }

        fcAppend(text, "user");
        input.value = "";
        input.style.height = "auto";
        fcLoading = true;
        document.getElementById("fcSend").disabled = true;
        fcShowTyping();

        fcHistory.push({ role: "user", parts: [{ text }] });

        try {
            const res = await fetch(CHATBOT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF_TOKEN,
                },
                body: JSON.stringify({
                    message: text,
                    history: fcHistory.slice(0, -1),
                }),
            });

            // FIX: tangani 429
            if (res.status === 429) {
                fcHistory.pop();
                const data = await res.json().catch(() => ({}));
                fcUpdateQuota(0, data.reset_in ?? null);
                fcAppend(
                    "Kuota harian kamu sudah habis. Coba lagi besok ya 😊",
                    "bot",
                );
                // FIX: panggil fcDoneLoading agar fcLoading = false & typing hilang
                fcDoneLoading();
                return;
            }

            if (!res.ok) throw new Error("HTTP error " + res.status);

            const data = await res.json();
            const reply =
                data.reply ??
                "Maaf, aku tidak bisa menjawab saat ini. Silakan coba lagi nanti 😊.";

            if (typeof data.remaining !== "undefined") {
                fcUpdateQuota(data.remaining, data.reset_in ?? null);
            }

            fcHistory.push({ role: "model", parts: [{ text: reply }] });
            if (fcHistory.length > 20) fcHistory = fcHistory.slice(-20);

            fcAppend(reply, "bot");
        } catch (e) {
            // FIX: pop history saat error
            fcHistory.pop();
            fcAppend("Chatbot sedang sibuk, coba lagi nanti yaa 😊.", "bot");
        }

        // FIX: selalu dipanggil di akhir (catch tidak pakai return)
        fcDoneLoading();
    };

    /* ─── Tooltip otomatis (hanya sekali) ──────────────────────── */
    window.addEventListener("load", function () {
        const ONE_DAY = 24 * 60 * 60 * 1000;
        const lastShown = localStorage.getItem(KEY);
        const now = Date.now();

        if (lastShown && now - lastShown < ONE_DAY) return;

        const tooltip = document.getElementById("fcTooltip");
        if (!tooltip) return;

        setTimeout(() => {
            tooltip.style.display = "flex";
            tooltip.classList.remove("hide");
            localStorage.setItem(KEY, now);
        }, 1000);
    });
})();
