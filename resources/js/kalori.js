document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("pregnancyData"));
    if (!data) return;

    document.getElementById("bb").value = data.bbNow || "";
    document.getElementById("tb").value = data.tb || "";

    if (data.weeks) {
        let trimester = 1;
        if (data.weeks > 13 && data.weeks <= 26) trimester = 2;
        if (data.weeks > 26) trimester = 3;
        document.getElementById("trimester").value = trimester;
    }

    renderSummary(data);

    if (data.bbNow && data.tb) {
        hitungKalori();
    }
});

function renderSummary(data) {
    const box = document.getElementById("summaryBox");
    const list = document.getElementById("summaryList");

    const trimesterLabel = !data.weeks
        ? "-"
        : data.weeks <= 13
          ? "Trimester 1"
          : data.weeks <= 26
            ? "Trimester 2"
            : "Trimester 3";

    list.innerHTML = `
                <li><strong>Usia Kehamilan:</strong> ${data.weeks || "-"} minggu</li>
                <li><strong>HPHT:</strong> ${data.hpht || "-"}</li>
                <li><strong>Berat Sekarang:</strong> ${data.bbNow || "-"} kg</li>
                <li><strong>Tinggi Badan:</strong> ${data.tb || "-"} cm</li>
                <li><strong>Trimester:</strong> ${trimesterLabel}</li>
            `;

    box.classList.remove("d-none");
}

function hitungKalori() {
    const bb = parseFloat(document.getElementById("bb").value);
    const tb = parseFloat(document.getElementById("tb").value);
    const umur = parseFloat(document.getElementById("umur").value);
    const aktivitas = parseFloat(document.getElementById("aktivitas").value);
    const trimester = parseInt(document.getElementById("trimester").value);

    if (!bb || !tb || !umur) {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            text: "Lengkapi semua lalu hitung",
            showConfirmButton: false,
            timer: 2500,
        });
        return;
    }

    // BMR Mifflin-St Jeor (wanita)
    const bmr = 10 * bb + 6.25 * tb - 5 * umur - 161;

    // TDEE
    const tdee = bmr * aktivitas;

    // Tambahan kalori AKG 2019 Kemenkes RI
    const tambahanMap = {
        1: 180,
        2: 300,
        3: 300,
    };
    const tambahan = tambahanMap[trimester];

    const total = Math.round(tdee + tambahan);

    // Tampilkan hasil
    document.getElementById("hasilKalori").innerText =
        total.toLocaleString("id-ID") + " kcal / hari";
    document.getElementById("detailKalori").innerText =
        `BMR: ${Math.round(bmr)} kcal · ×${aktivitas} aktivitas · +${tambahan} kcal (AKG 2019 Trimester ${trimester})`;

    const bmiNow = bb / (tb / 100) ** 2;

    renderSaranMakanan(total, trimester, bmiNow);

    document.getElementById("hasilBox").style.display = "block";
    document.getElementById("placeholderBox").style.display = "none";
}

function renderSaranMakanan(total, trimester, bmi) {
    const profil = bmi < 18.5 ? "kurus" : bmi < 25 ? "normal" : "lebih";

    // Konteks nutrisi per trimester
    const konteksNutrisi = {
        1: {
            catatan:
                "Fokus folat & vitamin B6 untuk perkembangan saraf janin dan mengurangi mual.",
            prioritas: [
                "Folat (bayam, brokoli, kacang-kacangan)",
                "Vitamin B6 (pisang, kentang, ayam)",
                "Zinc (daging, biji labu)",
            ],
        },
        2: {
            catatan:
                "Kebutuhan zat besi & kalsium meningkat untuk pertumbuhan tulang dan darah janin.",
            prioritas: [
                "Zat besi (daging merah, hati ayam, bayam)",
                "Kalsium (susu, keju, tahu)",
                "Protein (ikan, telur, tempe)",
            ],
        },
        3: {
            catatan:
                "Fokus omega-3 & serat untuk perkembangan otak janin dan persiapan persalinan.",
            prioritas: [
                "Omega-3 (ikan salmon, sarden, kenari)",
                "Serat (sayur hijau, oat, buah)",
                "DHA (ikan laut, telur omega-3)",
            ],
        },
    };

    // Contoh makanan per waktu makan, per trimester, per profil BMI
    const menu = {
        sarapan: {
            1: {
                kurus: "Nasi + telur dadar + sayur tumis + susu ibu hamil + pisang",
                normal: "Nasi/roti gandum + telur + sayur + susu ibu hamil",
                lebih: "Oatmeal + telur rebus + sayur rebus + susu rendah lemak",
            },
            2: {
                kurus: "Nasi + ayam/ikan + sayur hijau + susu + buah",
                normal: "Nasi + lauk protein + sayur + susu ibu hamil",
                lebih: "Roti gandum + putih telur + sayur + susu rendah lemak",
            },
            3: {
                kurus: "Nasi + ikan/daging + sayur + susu + alpukat",
                normal: "Nasi/kentang + ikan laut + sayur + susu ibu hamil",
                lebih: "Oatmeal + ikan/tahu + sayur rebus + susu rendah lemak",
            },
        },
        snackPagi: {
            1: {
                kurus: "Pisang + susu atau roti dengan selai kacang",
                normal: "Buah segar atau biskuit gandum",
                lebih: "Buah potong atau yogurt rendah lemak tanpa gula",
            },
            2: {
                kurus: "Kurma + kacang almond atau yogurt + granola",
                normal: "Buah + kacang-kacangan atau yogurt",
                lebih: "Buah segar atau yogurt plain rendah lemak",
            },
            3: {
                kurus: "Alpukat + roti gandum atau smoothie buah + susu",
                normal: "Buah + kacang kenari atau yogurt",
                lebih: "Buah rendah gula (apel, pir) atau yogurt plain",
            },
        },
        siangMakan: {
            1: {
                kurus: "Nasi + ayam/ikan + bayam/brokoli tumis + tahu + buah",
                normal: "Nasi + lauk protein + sayur hijau + buah",
                lebih: "Nasi merah + ikan kukus + sayur rebus + buah",
            },
            2: {
                kurus: "Nasi + hati ayam/daging + sayur hijau + tempe + buah",
                normal: "Nasi + daging/ikan + sayur + tahu/tempe + buah",
                lebih: "Nasi merah porsi sedang + ikan + banyak sayur + buah",
            },
            3: {
                kurus: "Nasi + ikan laut (salmon/sarden) + sayur + kacang + buah",
                normal: "Nasi + ikan laut + sayur hijau + buah",
                lebih: "Nasi merah sedikit + ikan laut + banyak sayur + buah",
            },
        },
        snackSore: {
            1: {
                kurus: "Susu ibu hamil + biskuit atau roti + keju",
                normal: "Susu atau yogurt + buah",
                lebih: "Yogurt rendah lemak atau buah potong",
            },
            2: {
                kurus: "Susu + kurma atau keju + crackers gandum",
                normal: "Susu ibu hamil atau yogurt + buah",
                lebih: "Yogurt plain + buah atau air kelapa",
            },
            3: {
                kurus: "Susu + roti gandum + selai kacang atau alpukat",
                normal: "Susu ibu hamil atau smoothie buah",
                lebih: "Susu rendah lemak atau buah segar",
            },
        },
        malamMakan: {
            1: {
                kurus: "Nasi + ikan/ayam + sayur + tempe + kuah bening",
                normal: "Nasi + lauk ringan + sayur + sup",
                lebih: "Nasi merah sedikit + ikan/ayam kukus + banyak sayur",
            },
            2: {
                kurus: "Nasi + ikan/daging + sayur hijau + tahu + sup",
                normal: "Nasi + ikan/ayam + sayur hijau + sup",
                lebih: "Nasi merah sedikit + ikan + sayur banyak + sup bening",
            },
            3: {
                kurus: "Nasi + ikan laut + sayur + kacang-kacangan + sup",
                normal: "Nasi/kentang + ikan laut + sayur hijau + sup",
                lebih: "Kentang/nasi merah sedikit + ikan + banyak sayur + sup",
            },
        },
    };

    const jadwal = [
        {
            waktu: "06.00–08.00",
            label: "Sarapan",
            persen: 25,
            icon: "🌅",
            key: "sarapan",
        },
        {
            waktu: "10.00",
            label: "Snack Pagi",
            persen: 10,
            icon: "🍌",
            key: "snackPagi",
        },
        {
            waktu: "12.00–13.00",
            label: "Makan Siang",
            persen: 30,
            icon: "🍱",
            key: "siangMakan",
        },
        {
            waktu: "15.00–16.00",
            label: "Snack Sore",
            persen: 10,
            icon: "🥛",
            key: "snackSore",
        },
        {
            waktu: "18.00–19.00",
            label: "Makan Malam",
            persen: 25,
            icon: "🌙",
            key: "malamMakan",
        },
    ];

    const ctx = konteksNutrisi[trimester];

    const infoHtml = `
                <div class="alert alert-soft-primary mb-3 p-2" style="font-size:0.82rem;">
                    <strong>Fokus Trimester ${trimester}:</strong> ${ctx.catatan}
                    <ul class="mb-0 mt-1 ps-3">
                        ${ctx.prioritas.map((p) => `<li>${p}</li>`).join("")}
                    </ul>
                </div>
            `;

    const menuHtml = jadwal
        .map((j) => {
            const kcal = Math.round((total * j.persen) / 100);
            const contoh = menu[j.key][trimester][profil];
            return `
            <div class="d-flex align-items-start gap-3 mb-3">
                <div style="font-size:1.4rem; line-height:1;">${j.icon}</div>
                <div style="flex:1;">
                    <div class="d-flex justify-content-between align-items-center">
                        <strong style="font-size:0.9rem;">${j.label}</strong>
                        <span class="badge bg-label-primary">${kcal} kcal</span>
                    </div>
                    <div class="text-muted" style="font-size:0.78rem;">${j.waktu} · ${j.persen}% dari total</div>
                    <div style="font-size:0.8rem; margin-top:2px; color:#555;">${contoh}</div>
                </div>
            </div>
        `;
        })
        .join("");

    document.getElementById("saranMakanan").innerHTML = infoHtml + menuHtml;
}

function clearPregnancyData() {
    Swal.fire({
        title: "Yakin hapus data?",
        text: "Data kehamilan akan dihapus permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#696cff",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("pregnancyData");

            document.getElementById("summaryBox").classList.add("d-none");
            document.getElementById("summaryList").innerHTML = "";
            document.getElementById("bb").value = "";
            document.getElementById("tb").value = "";
            document.getElementById("umur").value = "";
            document.getElementById("trimester").value = 1;
            document.getElementById("hasilBox").style.display = "none";
            document.getElementById("placeholderBox").style.display = "block";

            Swal.fire({
                icon: "success",
                title: "Berhasil dihapus",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    });
}

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    hitungKalori,
    clearPregnancyData,
});
