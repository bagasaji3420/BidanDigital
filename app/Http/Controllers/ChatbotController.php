<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class ChatbotController extends Controller
{
    private const DAILY_LIMIT = 5;

    private string $systemPrompt = <<<PROMPT
Kamu adalah asisten AI yang HANYA menjawab pertanyaan seputar:
1. Kebidanan (persalinan, proses melahirkan, pasca persalinan, bidan)
2. Kesehatan ibu hamil (kehamilan, nutrisi ibu hamil, pemeriksaan ANC, komplikasi kehamilan)
3. Kesehatan remaja putri (menstruasi, kesehatan reproduksi remaja wanita, gizi remaja putri, pubertas perempuan)

ATURAN PENTING:
- Jika ditanya "siapa kamu?", jawab: "Saya Kaka Haf, Asisten AI yang siap membantu masalah seputar kebidanan, kesehatan ibu hamil, dan remaja putri 😊."
- Jika pertanyaan di LUAR topik di atas, TOLAK dengan sopan dan ingatkan bahwa kamu hanya bisa membantu topik kebidanan, ibu hamil, dan kesehatan remaja putri.
- Jawab dalam Bahasa Indonesia yang hangat, ramah, dan mudah dipahami.
- Selalu sarankan untuk berkonsultasi langsung ke bidan atau dokter untuk kondisi yang memerlukan penanganan medis.
- Jangan memberikan diagnosis penyakit secara pasti.
- Gunakan bahasa yang sesuai untuk semua usia (termasuk remaja).
- Ingat konteks percakapan sebelumnya dan berikan jawaban yang berkesinambungan.
PROMPT;

    /* ─────────────────────────────────────────────────────────────
     |  Buat cache key unik per sesi user
     ──────────────────────────────────────────────────────────── */
    private function getCacheKey(Request $request): string
    {
        // Pakai session ID — konsisten per browser, tidak bergantung IP
        return 'chatbot-daily:' . session()->getId();
    }

    /* ─────────────────────────────────────────────────────────────
     |  SEND — endpoint utama chatbot
     ──────────────────────────────────────────────────────────── */
    public function send(Request $request)
    {
        // 1. VALIDASI INPUT
        $request->validate([
            'message' => 'required|string|max:1000',
            'history' => 'nullable|array',
        ]);

        // 2. CEK KUOTA — pakai Cache langsung, bypass RateLimiter
        $cacheKey     = $this->getCacheKey($request);
        $decaySeconds = now('Asia/Jakarta')->endOfDay()->timestamp - now()->timestamp;
        $attempts     = (int) Cache::get($cacheKey, 0);

        if ($attempts >= self::DAILY_LIMIT) {
            return response()->json([
                'success'   => false,
                'reply'     => 'Kuota harian kamu sudah habis. Coba lagi besok ya 😊',
                'remaining' => 0,
                'reset_in'  => $decaySeconds,
            ], 429);
        }

        // 3. KONFIGURASI API KEYS
        $apiKeys = array_values(array_filter([
            config('services.gemini.key'),
            config('services.gemini.key_1'),
            config('services.gemini.key_2'),
            config('services.gemini.key_3'),
        ]));

        if (empty($apiKeys)) {
            Log::error('Chatbot: API Key Gemini belum di-set di .env');
            return response()->json([
                'success' => false,
                'reply'   => 'Maaf, sistem sedang dalam pemeliharaan.',
            ], 500);
        }

        shuffle($apiKeys);

        // 4. SUSUN HISTORY + PESAN BARU
        $contents = array_merge(
            $this->sanitizeHistory($request->history ?? []),
            [['role' => 'user', 'parts' => [['text' => $request->message]]]]
        );

        // 5. PROSES REQUEST DENGAN ROTASI KEY
        foreach ($apiKeys as $key) {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$key}";

            try {
                $response = Http::timeout(25)->post($url, [
                    'system_instruction' => [
                        'parts' => [['text' => $this->systemPrompt]],
                    ],
                    'contents'         => $contents,
                    'generationConfig' => [
                        'temperature'     => 0.7,
                        'maxOutputTokens' => 800,
                    ],
                ]);

                if ($response->successful()) {
                    $data  = $response->json();
                    $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

                    if ($reply) {
                        // Increment attempts SETELAH dapat reply sukses
                        $newAttempts = $attempts + 1;
                        Cache::put($cacheKey, $newAttempts, $decaySeconds);

                        $remaining = max(0, self::DAILY_LIMIT - $newAttempts);

                        return response()->json([
                            'success'   => true,
                            'reply'     => $reply,
                            'remaining' => $remaining,
                            'reset_in'  => $decaySeconds,
                        ]);
                    }
                }

                Log::warning('Chatbot: Gemini key gagal — ' . substr($key, 0, 8) . '... Status: ' . $response->status());
            } catch (\Exception $e) {
                Log::error('Chatbot: Gemini exception — ' . $e->getMessage());
            }
        }

        // 6. SEMUA KEY GAGAL
        return response()->json([
            'success' => false,
            'reply'   => 'Waduh, server sedang sangat sibuk. Coba kirim pesan lagi dalam beberapa saat ya! 🛠️',
        ], 500);
    }

    /* ─────────────────────────────────────────────────────────────
     |  QUOTA — endpoint cek sisa kuota (untuk inisialisasi FE)
     ──────────────────────────────────────────────────────────── */
    public function quota(Request $request)
    {
        $cacheKey     = $this->getCacheKey($request);
        $attempts     = (int) Cache::get($cacheKey, 0);
        $remaining    = max(0, self::DAILY_LIMIT - $attempts);
        $decaySeconds = now('Asia/Jakarta')->endOfDay()->timestamp - now()->timestamp;

        return response()->json([
            'success'   => true,
            'remaining' => $remaining,
            'reset_in'  => $decaySeconds,
        ]);
    }

    /* ─────────────────────────────────────────────────────────────
     |  HELPER — bersihkan history agar sesuai format Gemini
     ──────────────────────────────────────────────────────────── */
    private function sanitizeHistory(array $history): array
    {
        return array_values(array_filter($history, function ($item) {
            return isset($item['role'], $item['parts'])
                && in_array($item['role'], ['user', 'model'])
                && is_array($item['parts'])
                && count($item['parts']) > 0;
        }));
    }
}
