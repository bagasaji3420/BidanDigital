<script>
    // inject data kick tracker

    const histori = {};
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const tercapai = Math.random() > 0.2;
        const kicks = tercapai ? 10 : Math.floor(Math.random() * 9) + 1;
        const durasi = tercapai ? Math.floor(Math.random() * 180) + 20 : null;

        // Jam mulai antara 07.00 - 09.00
        const jamMulaiH = Math.floor(Math.random() * 2) + 7;
        const jamMulaiM = Math.floor(Math.random() * 60);
        const jamMulai = `${String(jamMulaiH).padStart(2,'0')}.${String(jamMulaiM).padStart(2,'0')}`;

        // Jam selesai = jam mulai + durasi menit
        let jamSelesai = null;
        if (tercapai && durasi) {
            const totalMenit = jamMulaiH * 60 + jamMulaiM + durasi;
            const sh = Math.floor(totalMenit / 60);
            const sm = totalMenit % 60;
            jamSelesai = `${String(sh).padStart(2,'0')}.${String(sm).padStart(2,'0')}`;
        }

        // Minggu kehamilan (mundur dari minggu sekarang)
        const minggu = 30 - Math.floor(i / 7); // simulasi mundur per minggu
        const days = 6 - (i % 7);

        histori[key] = {
            tanggal: key,
            kicks,
            tercapai,
            durasi,
            jamMulai,
            jamSelesai,
            minggu,
            days // ← tambahan buat format 28+3
        };
    }
    localStorage.setItem('kickHistori', JSON.stringify(histori));
    console.log('✅ Seed data 30 hari berhasil!');
    location.reload();

    // inject data kick menyusui
    const histori = {};
    const sesiPerHari = {};
    const today = new Date();
    const payudaraOptions = ['kiri', 'kanan', 'dua'];

    for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);

        const totalSesi = Math.floor(Math.random() * 7) + 6; // 6–12
        const tercapai = totalSesi >= 8;
        const sesiList = [];

        let jamMulaiMs = new Date(d).setHours(6, Math.floor(Math.random() * 30), 0, 0);

        for (let j = 0; j < totalSesi; j++) {
            const durasi = Math.floor(Math.random() * 20) + 10; // 10–30 mnt
            const jamMulai = new Date(jamMulaiMs).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const jamSelesai = new Date(jamMulaiMs + durasi * 60000).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const payudara = payudaraOptions[j % 3];

            sesiList.push({
                jamMulai,
                jamSelesai,
                durasi,
                payudara,
                ts: jamMulaiMs
            });
            jamMulaiMs += durasi * 60000 + (90 + Math.floor(Math.random() * 60)) * 60000; // jeda 90–150 mnt
        }

        // Simpan detail sesi
        localStorage.setItem('menyusuiSesi_' + key, JSON.stringify(sesiList));

        // Ringkasan histori
        const totalDurasi = sesiList.reduce((s, x) => s + x.durasi, 0);
        const payudaraCount = {
            kiri: 0,
            kanan: 0,
            dua: 0
        };
        sesiList.forEach(s => payudaraCount[s.payudara]++);
        const dominan = Object.entries(payudaraCount).sort((a, b) => b[1] - a[1])[0][0];

        histori[key] = {
            tanggal: key,
            totalSesi,
            rataRata: Math.round(totalDurasi / totalSesi),
            dominan,
            tercapai,
            jamMulai: sesiList[0].jamMulai,
            jamTerakhir: sesiList[sesiList.length - 1].jamSelesai
        };
    }

    localStorage.setItem('menyusuiHistori', JSON.stringify(histori));
    console.log('✅ Seed 14 hari menyusui berhasil!');
    location.reload();


    // Inject profil bayi
localStorage.setItem('babyProfile', JSON.stringify({
    nama: "Budi Santoso",
    tglLahir: "2024-05-10",
    jk: "L"
}));

// Inject riwayat pengukuran
localStorage.setItem('growthData', JSON.stringify([
    { tgl: "2024-05-15", usiaBulan: 0, bb: 3.4, pb: 50.2, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2024-06-12", usiaBulan: 1, bb: 4.5, pb: 54.5, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2024-07-10", usiaBulan: 2, bb: 5.7, pb: 58.1, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2024-08-08", usiaBulan: 3, bb: 6.5, pb: 61.3, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2024-09-11", usiaBulan: 4, bb: 7.1, pb: 63.8, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2024-10-09", usiaBulan: 5, bb: 7.6, pb: 65.9, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2024-11-07", usiaBulan: 6, bb: 7.3, pb: 67.2, statusBBU: "kurang", statusPBU: "normal" },
    { tgl: "2024-12-05", usiaBulan: 7, bb: 8.0, pb: 68.9, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2025-01-09", usiaBulan: 8, bb: 8.4, pb: 70.5, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2025-02-06", usiaBulan: 9, bb: 8.9, pb: 72.1, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2025-03-06", usiaBulan: 10, bb: 9.3, pb: 73.6, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2025-04-03", usiaBulan: 11, bb: 9.6, pb: 74.9, statusBBU: "normal", statusPBU: "normal" },
    { tgl: "2025-05-01", usiaBulan: 12, bb: 9.8, pb: 76.2, statusBBU: "normal", statusPBU: "normal" }
]));

// Reload halaman
location.reload();
</script>
