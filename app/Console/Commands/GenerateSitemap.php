<?php

namespace App\Console\Commands;

use App\Models\Article\Article;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

#[Signature('sitemap:generate')]
#[Description('Generate sitemap.xml untuk semua halaman')]
class GenerateSitemap extends Command
{
    public function handle()
    {
        $sitemap = Sitemap::create();

        // ─── Halaman Statis ────────────────────────────────────────────────
        $sitemap->add(Url::create('/')->setPriority(1.0)->setChangeFrequency('daily'));
        $sitemap->add(Url::create('/articles')->setPriority(0.9)->setChangeFrequency('daily'));

        // ─── Tools ────────────────────────────────────────────────────────
        $tools = [
            '/tools/hpl',
            '/tools/kebutuhan-kalori',
            '/tools/kick-counter',
            '/tools/kontraksi',
            '/tools/menyusui',
            '/tools/berat-badan',
            '/tools/tekanan-darah',
            '/tools/pertumbuhan-bayi',
            '/tools/anemia',
            '/tools/skrining-preeklampsia',
            '/tools/epds',
            '/tools/jadwal-imunisasi',
            '/tools/jadwal-anc',
            '/tools/jadwal-nifas',
            '/tools/checklist-persalinan',
        ];

        foreach ($tools as $tool) {
            $sitemap->add(
                Url::create($tool)
                    ->setPriority(0.8)
                    ->setChangeFrequency('monthly')
            );
        }

        // ─── Articles ─────────────────────────────────────────────────────
        Article::where('status', 'published')
            ->latest()
            ->each(function (Article $article) use ($sitemap) {
                $sitemap->add(
                    Url::create(route('article.show', $article))
                        ->setLastModificationDate($article->updated_at)
                        ->setPriority(0.7)
                        ->setChangeFrequency('weekly')
                );
            });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('✅ Sitemap berhasil di-generate → public/sitemap.xml');
    }
}
