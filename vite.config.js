import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/js/article/show.js",
                "resources/js/article/bookmark.js",
                "resources/js/data.js",
                "resources/js/chatbot.js",
                "resources/js/test-kesiapan.js",
                "resources/js/anemia.js",
                "resources/js/berat-badan.js",
                "resources/js/bootstrap.js",
                "resources/js/checklist-persalinan.js",
                "resources/js/echo.js",
                "resources/js/epds.js",
                "resources/js/goldar.js",
                "resources/js/hpl.js",
                "resources/js/imunisasi.js",
                "resources/js/jadwal-anc.js",
                "resources/js/jadwal-nifas.js",
                "resources/js/kalender-haid.js",
                "resources/js/kalori.js",
                "resources/js/kick-tracker.js",
                "resources/js/kontraksi.js",
                "resources/js/menyusui.js",
                "resources/js/pertumbuhan-bayi.js",
                "resources/js/preeklamsia.js",
                "resources/js/tekanan-darah.js",
                "resources/js/react/Mitos/mitos-fakta.jsx",
                "resources/js/react/Piring/isi-piringku.jsx",
                "resources/js/react/Wilayah/index.jsx",
            ],
            refresh: true,
        }),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
            strategies: "generateSW",
            outDir: "public", // output sw.js ke public/ langsung
            buildBase: "/build/", // asset tetap di /build/
            manifestFilename: "manifest.webmanifest",
            workbox: {
                additionalManifestEntries: [
                    // Cara 1: list manual file-file besar yang penting
                    {
                        url: "/assets/vendor/fonts/iconify-icons.css",
                        revision: null,
                    },
                    { url: "/assets/vendor/css/core.css", revision: null },
                    {
                        url: "/assets/vendor/css/front-page.css",
                        revision: null,
                    },
                    {
                        url: "/assets/vendor/css/pages/front-page-landing.css",
                        revision: null,
                    },
                    { url: "/assets/vendor/js/helpers.js", revision: null },
                    { url: "/assets/vendor/js/bootstrap.js", revision: null },
                    {
                        url: "/assets/vendor/libs/swiper/swiper.js",
                        revision: null,
                    },
                    {
                        url: "/assets/vendor/libs/swiper/swiper.css",
                        revision: null,
                    },
                    {
                        url: "/assets/vendor/libs/nouislider/nouislider.js",
                        revision: null,
                    },
                    {
                        url: "/assets/vendor/libs/nouislider/nouislider.css",
                        revision: null,
                    },
                    { url: "/assets/css/app.css", revision: null },
                    { url: "/assets/css/chatbot.css", revision: null },
                ],
                importScripts: ["/build/workbox-705b1e53.js"],
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // naikin limit ke 5MB
                globIgnores: [
                    "**/datatables-bootstrap5.js", // skip datatables dari precache
                ],
                globPatterns: ["**/*.{js,css,ico,png,svg,webp,woff,woff2}"],
                navigateFallback: null,
                runtimeCaching: [
                    // ── Pages ──────────────────────────────────────
                    {
                        urlPattern: /^https?:\/\/.*\/tools\/.*/i,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "kabidan-pages",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24,
                            },
                            networkTimeoutSeconds: 5,
                        },
                    },
                    {
                        urlPattern: /^https?:\/\/.*\/articles.*/i,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "kabidan-articles",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 6,
                            },
                            networkTimeoutSeconds: 5,
                        },
                    },

                    // ── Local Images & Fonts ───────────────────────
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-images",
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 * 30,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:woff|woff2|ttf|eot)$/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-fonts",
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                        },
                    },

                    // ── Local Vendor Assets (Sneat) ────────────────
                    // CSS vendor (core, demo, front-page, nouislider, swiper, pickr)
                    {
                        urlPattern: /\/assets\/vendor\/css\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-vendor-css",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 30,
                            },
                        },
                    },
                    {
                        urlPattern: /\/assets\/vendor\/libs\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-vendor-libs",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30,
                            },
                        },
                    },
                    {
                        urlPattern: /\/assets\/vendor\/fonts\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-vendor-fonts",
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                        },
                    },
                    // JS vendor (helpers, bootstrap, popper, front-main)
                    {
                        urlPattern: /\/assets\/vendor\/js\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-vendor-js",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 30,
                            },
                        },
                    },
                    // Local app CSS & JS (demo.css, chatbot.css, front-config.js, dll)
                    {
                        urlPattern: /\/assets\/css\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-app-css",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 30,
                            },
                        },
                    },
                    {
                        urlPattern: /\/assets\/js\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-app-js",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 30,
                            },
                        },
                    },

                    // ── External CDN ───────────────────────────────
                    // Google Fonts
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "kabidan-gfonts-css",
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-gfonts-files",
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                        },
                    },
                    // jsdelivr (boxicons, sweetalert2)
                    {
                        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-jsdelivr",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 60,
                            },
                        },
                    },
                    // cloudflare CDN (fontawesome)
                    {
                        urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "kabidan-cdnjs",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 60,
                            },
                        },
                    },
                ],
                navigateFallbackDenylist: [
                    /^\/admin/,
                    /^\/chatbot/,
                    /^\/login/,
                    /^\/logout/,
                ],
            },
            manifest: {
                name: "KaBidan - Kesehatan Ibu & Bidan",
                short_name: "KaBidan",
                description:
                    "Platform kesehatan ibu hamil, kebidanan, dan remaja putri",
                theme_color: "#7C3AED",
                background_color: "#ffffff",
                display: "standalone",
                orientation: "portrait",
                scope: "/",
                start_url: "/",
                icons: [
                    {
                        src: "/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "/icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
            devOptions: { enabled: false, type: "module" },
        }),
        visualizer({
            open: true, // otomatis buka browser setelah build
            gzipSize: true, // tampilkan ukuran gzip
            brotliSize: true,
        }),
    ],
    server: {
        host: "0.0.0.0",
        port: 5173,
        hmr: { host: "10.215.52.43" },
        watch: { ignored: ["**/storage/framework/views/**"] },
    },
});
