import { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import "leaflet/dist/leaflet.css";
import { createPortal } from "react-dom"; // ← tambah ini

// ─── Konstanta ────────────────────────────────────────────────────────────────

const API_BASE = "/wilayah";

const INDIKATOR_META = {
    aki: {
        label: "AKI",
        desc: "Angka Kematian Ibu",
        color: "#f43f5e",
        icon: "bx-heart",
        satuan: "per 100.000 KH",
    },
    akb: {
        label: "AKB",
        desc: "Angka Kematian Bayi",
        color: "#f97316",
        icon: "bx-child",
        satuan: "per 1.000 KH",
    },
    stunting: {
        label: "Stunting",
        desc: "Prevalensi Stunting Balita",
        color: "#eab308",
        icon: "bx-body",
        satuan: "%",
    },
    imunisasi: {
        label: "Imunisasi",
        desc: "Cakupan Imunisasi Dasar",
        color: "#22c55e",
        icon: "bx-shield-plus",
        satuan: "%",
    },
    hiv: {
        label: "HIV",
        desc: "Kasus HIV Ibu Hamil",
        color: "#a855f7",
        icon: "bx-plus-medical",
        satuan: "kasus",
    },
};

const INDIKATOR_DESC = {
    aki: "Jumlah kematian ibu per 100.000 kelahiran hidup akibat komplikasi kehamilan, persalinan, atau nifas. Semakin kecil nilainya semakin baik.",
    akb: "Jumlah bayi yang meninggal sebelum usia 1 tahun per 1.000 kelahiran hidup. Mencerminkan kualitas layanan kesehatan ibu dan anak.",
    stunting:
        "Persentase balita usia 0–59 bulan dengan tinggi badan tidak sesuai usia (TB/U). Indikasi kekurangan gizi kronis sejak dini.",
    imunisasi:
        "Persentase bayi yang mendapat imunisasi dasar lengkap (IDL). Nilai >100% dapat terjadi karena bayi luar wilayah diimunisasi di sini.",
    hiv: "Jumlah ibu hamil yang terdeteksi positif HIV. Data dari hasil skrining antenatal care di fasilitas kesehatan.",
};

const TILE_LIGHT =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TILE_DARK =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const GEOJSON_URL =
    "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json";

// ─── Hook: deteksi tema Sneat ──────────────────────────────────────────────────

function useSneatTheme() {
    const getTheme = () =>
        document.documentElement.getAttribute("data-bs-theme") || "light";

    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(getTheme()));
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-bs-theme"],
        });
        return () => observer.disconnect();
    }, []);

    return theme;
}

// ─── Helper: normalisasi nama provinsi dari GeoJSON → kode API ────────────────

// Mapping kode GeoJSON → kode BPS kita
const KODE_GEOJSON_MAP = {
    11: "11", // Aceh (DI. ACEH)
    12: "12", // Sumatera Utara
    13: "13", // Sumatera Barat
    14: "14", // Riau
    15: "15", // Jambi
    16: "16", // Sumatera Selatan
    17: "17", // Bengkulu
    18: "18", // Lampung
    19: "19", // Bangka Belitung
    // 21 Kepri tidak ada di GeoJSON ini
    31: "31", // DKI Jakarta
    32: "32", // Jawa Barat
    3329: "33", // Jawa Tengah (kode aneh di GeoJSON)
    34: "34", // DIY
    35: "35", // Jawa Timur
    36: "36", // Banten (PROBANTEN)
    51: "51", // Bali
    52: "52", // NTB
    53: "53", // NTT
    61: "61", // Kalimantan Barat (kode:0 di GeoJSON tapi nama benar)
    62: "62", // Kalimantan Tengah (kode:0 juga)
    63: "63", // Kalimantan Selatan
    64: "64", // Kalimantan Timur
    // 65 Kaltara tidak ada
    71: "71", // Sulawesi Utara
    72: "72", // Sulawesi Tengah
    73: "73", // Sulawesi Selatan
    74: "74", // Sulawesi Tenggara
    75: "75", // Gorontalo
    // 76 Sulbar tidak ada
    81: "82", // MALUKU UTARA (kode GeoJSON 81 = Maluku Utara)
    82: "81", // MALUKU (kode GeoJSON 82 = Maluku)
    83: "91", // Irian Jaya Barat → Papua Barat
    84: "94", // Irian Jaya Tengah → Papua (gabung)
    85: "94", // Irian Jaya Timur → Papua (gabung)
};

function getNamaFromFeature(feature) {
    const raw = (
        feature.properties?.Propinsi ||
        feature.properties?.NAME_1 ||
        feature.properties?.name ||
        feature.properties?.PROVINSI ||
        ""
    ).trim();

    // Normalisasi: uppercase → title case
    return raw
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace("Di Yogyakarta", "DI Yogyakarta")
        .replace("Dki Jakarta", "DKI Jakarta");
}

function getKodeFromFeature(feature) {
    const kodeGeo = feature.properties?.kode;
    if (kodeGeo && KODE_GEOJSON_MAP[kodeGeo]) {
        return KODE_GEOJSON_MAP[kodeGeo];
    }

    // Fallback untuk kode:0 (Kalimantan Barat & Tengah) pakai nama
    const nama = getNamaFromFeature(feature);
    const FALLBACK = {
        "Kalimantan Barat": "61",
        "Kalimantan Tengah": "62",
    };
    return FALLBACK[nama] ?? null;
}
// ─── Komponen: TileLayer yang bisa ganti tema ─────────────────────────────────

function ThemedTileLayer({ theme }) {
    const map = useMap();
    const layerRef = useRef(null);

    useEffect(() => {
        const L = window.L || require("leaflet");
        if (layerRef.current) {
            map.removeLayer(layerRef.current);
        }
        const url = theme === "dark" ? TILE_DARK : TILE_LIGHT;
        layerRef.current = L.tileLayer(url, { maxZoom: 18 }).addTo(map);
        return () => {
            if (layerRef.current) map.removeLayer(layerRef.current);
        };
    }, [theme, map]);

    return null;
}

// ─── Komponen: Kartu indikator di modal ───────────────────────────────────────

function IndikatorCard({ kode, data, isDark }) {
    const meta = INDIKATOR_META[kode];
    if (!meta || !data?.length) return null;

    const latest = data[data.length - 1];
    const prev = data.length > 1 ? data[data.length - 2] : null;
    const delta = prev ? latest.nilai - prev.nilai : null;
    const turun = delta !== null && delta < 0;
    const naik = delta !== null && delta > 0;

    // untuk indikator ini, turun = baik (kecuali imunisasi)
    const baikJikaturun = kode !== "imunisasi";
    const isGood = baikJikaturun ? turun : naik;

    return (
        <div
            className="rounded-3 p-3 mb-3"
            style={{
                background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
            }}
        >
            <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2">
                    <span
                        className="rounded-2 d-flex align-items-center justify-content-center"
                        style={{
                            width: 32,
                            height: 32,
                            background: meta.color + "22",
                            color: meta.color,
                            fontSize: 16,
                        }}
                    >
                        <i className={`bx ${meta.icon}`}></i>
                    </span>
                    <div>
                        <div className="fw-semibold" style={{ fontSize: 13 }}>
                            {meta.desc}
                        </div>
                        <div className="text-muted" style={{ fontSize: 11 }}>
                            {meta.satuan}
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <div
                        className="fw-bold"
                        style={{
                            fontSize: 20,
                            color: meta.color,
                            lineHeight: 1,
                        }}
                    >
                        {latest.nilai.toLocaleString("id-ID", {
                            maximumFractionDigits: 1,
                        })}
                    </div>
                    {delta !== null && (
                        <div
                            style={{
                                fontSize: 11,
                                color: isGood ? "#22c55e" : "#f43f5e",
                            }}
                        >
                            <i
                                className={`bx bx-trending-${turun ? "down" : "up"} me-1`}
                            ></i>
                            {Math.abs(delta).toFixed(1)} vs {prev.tahun}
                        </div>
                    )}
                </div>
            </div>

            <p
                style={{
                    fontSize: 11,
                    color: isDark ? "#94a3b8" : "#64748b",
                    margin: "0 0 8px 0",
                    lineHeight: 1.5,
                    paddingLeft: 40,
                }}
            >
                {INDIKATOR_DESC[kode]}
            </p>

            {/* Mini chart */}
            {data.length > 1 && (
                <ResponsiveContainer width="100%" height={60}>
                    <LineChart
                        data={data}
                        margin={{ top: 4, right: 4, left: -30, bottom: 0 }}
                    >
                        <YAxis
                            domain={["auto", "auto"]}
                            tick={false}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: isDark ? "#1e1e2e" : "#fff",
                                border: "none",
                                borderRadius: 8,
                                fontSize: 11,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            }}
                            formatter={(v) => [
                                v.toLocaleString("id-ID", {
                                    maximumFractionDigits: 1,
                                }),
                                meta.label,
                            ]}
                        />
                        <Line
                            type="monotone"
                            dataKey="nilai"
                            stroke={meta.color}
                            strokeWidth={2}
                            dot={{ fill: meta.color, r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

// ─── Komponen: Modal detail provinsi ──────────────────────────────────────────

function ProvinsiModal({ wilayah, indikator, onClose, isDark }) {
    const [activeTab, setActiveTab] = useState("ringkasan");

    if (!wilayah) return null;

    const bg = isDark ? "#1e1e2e" : "#ffffff";
    const bgCard = isDark ? "#2a2a3e" : "#f8f9fa";
    const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const text = isDark ? "#e2e8f0" : "#1e293b";
    const muted = isDark ? "#94a3b8" : "#64748b";

    // data untuk bar chart perbandingan semua indikator
    const barData = Object.entries(INDIKATOR_META).map(([kode, meta]) => {
        const d = indikator?.[kode];
        const latest = d?.[d.length - 1];
        return {
            name: meta.label,
            nilai: latest?.nilai || 0,
            color: meta.color,
        };
    });

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    zIndex: 1050,
                    animation: "fadeIn 0.2s ease",
                }}
            />

            {/* Modal */}
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(680px, 95vw)",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    background: bg,
                    borderRadius: 16,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                    zIndex: 1051,
                    color: text,
                    animation:
                        "slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
            >
                {/* Header */}
                <div
                    className="d-flex align-items-center justify-content-between p-4"
                    style={{
                        borderBottom: `1px solid ${border}`,
                        position: "sticky",
                        top: 0,
                        background: bg,
                        zIndex: 1,
                    }}
                >
                    <div>
                        <h5 className="mb-0 fw-bold">{wilayah.nama}</h5>
                        <small style={{ color: muted }}>
                            Kode BPS: {wilayah.kode} · Data Kemenkes 2022
                        </small>
                    </div>
                    <button
                        onClick={onClose}
                        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: 32,
                            height: 32,
                            padding: 0,
                            background: isDark
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.07)",
                            border: "none",
                            color: text,
                        }}
                    >
                        <i className="bx bx-x" style={{ fontSize: 18 }}></i>
                    </button>
                </div>

                {/* Tabs */}
                <div
                    className="px-4 pt-3"
                    style={{ borderBottom: `1px solid ${border}` }}
                >
                    <div className="d-flex gap-3">
                        {["ringkasan", "grafik"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="btn btn-sm pb-2 px-0 fw-semibold"
                                style={{
                                    background: "none",
                                    border: "none",
                                    borderBottom:
                                        activeTab === tab
                                            ? "2px solid #7c3aed"
                                            : "2px solid transparent",
                                    color:
                                        activeTab === tab ? "#7c3aed" : muted,
                                    borderRadius: 0,
                                    textTransform: "capitalize",
                                    transition: "all 0.2s",
                                }}
                            >
                                {tab === "ringkasan"
                                    ? "Ringkasan"
                                    : "Grafik Trend"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="p-4">
                    {activeTab === "ringkasan" && (
                        <>
                            {Object.keys(INDIKATOR_META).map((kode) => (
                                <IndikatorCard
                                    key={kode}
                                    kode={kode}
                                    data={indikator?.[kode]}
                                    isDark={isDark}
                                />
                            ))}
                        </>
                    )}

                    {activeTab === "grafik" && (
                        <div>
                            <p className="text-muted small mb-3">
                                Perbandingan nilai terbaru antar indikator
                                (dinormalisasi per satuan masing-masing)
                            </p>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart
                                    data={barData}
                                    margin={{
                                        top: 8,
                                        right: 8,
                                        left: -20,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke={
                                            isDark
                                                ? "rgba(255,255,255,0.08)"
                                                : "rgba(0,0,0,0.08)"
                                        }
                                    />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: muted, fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: muted, fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: isDark
                                                ? "#1e1e2e"
                                                : "#fff",
                                            border: "none",
                                            borderRadius: 8,
                                            fontSize: 12,
                                            boxShadow:
                                                "0 4px 12px rgba(0,0,0,0.15)",
                                        }}
                                    />
                                    <Bar dataKey="nilai" radius={[6, 6, 0, 0]}>
                                        {barData.map((entry, i) => (
                                            <rect key={i} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Line chart AKI trend */}
                            {indikator?.aki?.length > 1 && (
                                <div className="mt-4">
                                    <p
                                        className="fw-semibold mb-2"
                                        style={{ fontSize: 13 }}
                                    >
                                        Trend AKI (per 100.000 KH)
                                    </p>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={150}
                                    >
                                        <LineChart
                                            data={indikator.aki}
                                            margin={{
                                                top: 4,
                                                right: 8,
                                                left: -20,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke={
                                                    isDark
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "rgba(0,0,0,0.08)"
                                                }
                                            />
                                            <XAxis
                                                dataKey="tahun"
                                                tick={{
                                                    fill: muted,
                                                    fontSize: 11,
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                tick={{
                                                    fill: muted,
                                                    fontSize: 10,
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    background: isDark
                                                        ? "#1e1e2e"
                                                        : "#fff",
                                                    border: "none",
                                                    borderRadius: 8,
                                                    fontSize: 12,
                                                    boxShadow:
                                                        "0 4px 12px rgba(0,0,0,0.15)",
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="nilai"
                                                stroke="#f43f5e"
                                                strokeWidth={2.5}
                                                dot={{ fill: "#f43f5e", r: 4 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="px-4 py-3 d-flex align-items-center gap-2"
                    style={{
                        borderTop: `1px solid ${border}`,
                        color: muted,
                        fontSize: 11,
                    }}
                >
                    <i className="bx bx-info-circle"></i>
                    <span>
                        <a
                            target="_blank"
                            href="https://layanandata.kemkes.go.id/katalog-data/profil-kesehatan/ketersediaan-data/profil-kesehatan-2023"
                        >
                            Sumber: Profil Kesehatan Indonesia 2023, Kemenkes RI
                        </a>
                    </span>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp {
                    from { opacity: 0; transform: translate(-50%, -46%) }
                    to   { opacity: 1; transform: translate(-50%, -50%) }
                }
            `}</style>
        </>,
        document.body,
    );
}

// ─── Komponen: Legend peta ────────────────────────────────────────────────────

function MapLegend({ isDark }) {
    const bg = isDark ? "rgba(30,30,46,0.95)" : "rgba(255,255,255,0.95)";
    const text = isDark ? "#e2e8f0" : "#1e293b";

    return (
        <div
            style={{
                position: "absolute",
                bottom: 32,
                left: 16,
                zIndex: 1000,
                background: bg,
                borderRadius: 12,
                padding: "10px 14px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                backdropFilter: "blur(8px)",
                color: text,
                fontSize: 12,
            }}
        >
            <div
                className="fw-semibold mb-2"
                style={{ fontSize: 11, letterSpacing: "0.05em" }}
            >
                KLIK PROVINSI
            </div>
            <div className="d-flex align-items-center gap-2 mb-1">
                <div
                    style={{
                        width: 14,
                        height: 14,
                        borderRadius: 3,
                        background: "#7c3aed",
                        opacity: 0.6,
                    }}
                ></div>
                <span>Area provinsi</span>
            </div>
            <div className="d-flex align-items-center gap-2">
                <div
                    style={{
                        width: 14,
                        height: 14,
                        borderRadius: 3,
                        background: "#7c3aed",
                    }}
                ></div>
                <span>Hover / aktif</span>
            </div>
        </div>
    );
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────

export default function PetaWilayah() {
    const theme = useSneatTheme();
    const isDark = theme === "dark";

    const [geoData, setGeoData] = useState(null);
    const [selected, setSelected] = useState(null); // { wilayah, indikator }
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [hoveredKode, setHoveredKode] = useState(null);
    const geoJsonRef = useRef(null);

    // Load GeoJSON sekali
    useEffect(() => {
        fetch(GEOJSON_URL)
            .then((r) => r.json())
            .then(setGeoData)
            .catch(console.error);
    }, []);

    // Fetch detail provinsi
    const handleProvinsiClick = useCallback(async (feature) => {
        const kode = getKodeFromFeature(feature);
        if (!kode) return;

        setLoadingDetail(true);
        try {
            const res = await fetch(`${API_BASE}/${kode}`);
            const json = await res.json();
            if (json.status === "ok") {
                setSelected(json.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingDetail(false);
        }
    }, []);

    // Style tiap feature GeoJSON
    const featureStyle = useCallback(
        (feature) => {
            const kode = getKodeFromFeature(feature);
            const isHover = kode === hoveredKode;
            return {
                fillColor: "#7c3aed",
                fillOpacity: isHover ? 0.7 : 0.35,
                color: isDark ? "#a78bfa" : "#5b21b6",
                weight: isHover ? 2 : 1,
                opacity: 0.8,
                transition: "all 0.2s",
            };
        },
        [hoveredKode, isDark],
    );

    // Event per feature
    const onEachFeature = useCallback(
        (feature, layer) => {
            const nama = getNamaFromFeature(feature);
            const kode = getKodeFromFeature(feature);

            layer.bindTooltip(nama, {
                permanent: false,
                sticky: true,
                className: `leaflet-tooltip-${isDark ? "dark" : "light"}`,
            });

            layer.on({
                mouseover: () => setHoveredKode(kode),
                mouseout: () => setHoveredKode(null),
                click: () => handleProvinsiClick(feature),
            });
        },
        [isDark, handleProvinsiClick],
    );

    // Re-render GeoJSON waktu tema berubah
    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.setStyle(featureStyle);
        }
    }, [isDark, hoveredKode, featureStyle]);

    const bg = isDark ? "#1e1e2e" : "#f1f5f9";
    const text = isDark ? "#e2e8f0" : "#1e293b";

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: bg,
                borderRadius: 12,
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <div
                className="d-flex flex-wrap align-items-center justify-content-between px-4 py-3"
                style={{
                    background: isDark
                        ? "rgba(30,30,46,0.98)"
                        : "rgba(255,255,255,0.98)",
                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                    color: text,
                }}
            >
                <div>
                    <h6 className="mb-0 fw-bold" style={{ fontSize: 15 }}>
                        <i
                            className="bx bx-map-alt me-2"
                            style={{ color: "#7c3aed" }}
                        ></i>
                        Peta Kesehatan Indonesia
                    </h6>
                    <small style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                        Klik provinsi untuk melihat data indikator kesehatan
                    </small>
                </div>

                {/* Badge indikator */}
                <div className=" gap-2 flex-wrap justify-content-end">
                    {Object.entries(INDIKATOR_META).map(([kode, meta]) => (
                        <span
                            key={kode}
                            className="badge rounded-pill px-2 py-1"
                            style={{
                                background: meta.color + "22",
                                color: meta.color,
                                fontSize: 11,
                                fontWeight: 600,
                            }}
                        >
                            {meta.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Map */}
            <div style={{ height: "calc(100% - 75px)", position: "relative" }}>
                <MapContainer
                    center={[-2.5, 118]}
                    zoom={5}
                    minZoom={5} // ← naikin dari 4 ke 5
                    maxZoom={10}
                    maxBounds={[
                        [-15, 90],
                        [10, 145],
                    ]}
                    maxBoundsViscosity={1.0}
                    style={{
                        height: "100%",
                        width: "100%",
                        background: "transparent",
                    }}
                    zoomControl={true}
                    attributionControl={false}
                >
                    <ThemedTileLayer theme={theme} />

                    {geoData && (
                        <GeoJSON
                            key={`${theme}-${hoveredKode}`}
                            ref={geoJsonRef}
                            data={geoData}
                            style={featureStyle}
                            onEachFeature={onEachFeature}
                        />
                    )}
                </MapContainer>

                <MapLegend isDark={isDark} />

                {/* Loading overlay */}
                {loadingDetail && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 1000,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0,0,0,0.3)",
                            backdropFilter: "blur(2px)",
                        }}
                    >
                        <div
                            className="spinner-border"
                            style={{ color: "#7c3aed", width: 40, height: 40 }}
                            role="status"
                        />
                    </div>
                )}
            </div>

            {/* Modal */}
            {selected && (
                <ProvinsiModal
                    wilayah={selected.wilayah}
                    indikator={selected.indikator}
                    onClose={() => setSelected(null)}
                    isDark={isDark}
                />
            )}

            {/* Tooltip CSS */}
            <style>{`
                .leaflet-tooltip-dark {
                    background: #1e1e2e !important;
                    border: 1px solid rgba(255,255,255,0.15) !important;
                    color: #e2e8f0 !important;
                    border-radius: 8px !important;
                    font-size: 12px !important;
                    font-weight: 600 !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
                }
                .leaflet-tooltip-light {
                    background: #ffffff !important;
                    border: 1px solid rgba(0,0,0,0.1) !important;
                    color: #1e293b !important;
                    border-radius: 8px !important;
                    font-size: 12px !important;
                    font-weight: 600 !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
                }
                .leaflet-tooltip-dark::before,
                .leaflet-tooltip-light::before { display: none !important; }
                .leaflet-control-zoom a {
                    background: ${isDark ? "#2a2a3e" : "#fff"} !important;
                    color: ${isDark ? "#e2e8f0" : "#1e293b"} !important;
                    border-color: ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"} !important;
                }
            `}</style>
        </div>
    );
}
