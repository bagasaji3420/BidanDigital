const STORAGE_KEY = "checklist_persalinan";

// Load dari localStorage saat halaman dibuka
function loadChecklist() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    document.querySelectorAll(".checklist-item").forEach((cb) => {
        const id = cb.dataset.id;
        if (saved[id]) {
            cb.checked = true;
            styleLabel(cb, true);
        }
    });
    updateProgress();
}

// Simpan status item
function saveItem(id, checked) {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    saved[id] = checked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

    const cb = document.getElementById(id);
    styleLabel(cb, checked);
    updateProgress();
}

// Coret label kalau dicentang
function styleLabel(cb, checked) {
    const label = document.querySelector(`label[for="${cb.id}"]`);
    if (label) {
        label.style.textDecoration = checked ? "line-through" : "none";
        label.style.color = checked ? "#a0a0a0" : "";
    }
}

// Update progress bar & badge
function updateProgress() {
    const all = document.querySelectorAll(".checklist-item");
    const checked = document.querySelectorAll(".checklist-item:checked");
    const total = all.length;
    const done = checked.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    document.getElementById("progressBar").style.width = pct + "%";
    document.getElementById("progressBadge").textContent =
        `${done} / ${total} selesai`;

    // Warna badge sesuai progress
    const badge = document.getElementById("progressBadge");
    badge.className = "badge fs-6 px-3 py-2";
    if (pct === 100) badge.classList.add("bg-success");
    else if (pct >= 50) badge.classList.add("bg-label-warning");
    else badge.classList.add("bg-label-primary");
}

// Clear semua
function clearChecklist() {
    if (!confirm("Yakin mau reset semua checklist?")) return;
    localStorage.removeItem(STORAGE_KEY);
    document.querySelectorAll(".checklist-item").forEach((cb) => {
        cb.checked = false;
        styleLabel(cb, false);
    });
    updateProgress();
}

// Init
document.addEventListener("DOMContentLoaded", loadChecklist);

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    saveItem,
    clearChecklist,
});
