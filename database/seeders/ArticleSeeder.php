<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article\Article;
use App\Models\Article\Category;
use App\Models\User;
use Illuminate\Support\Str;
use Mews\Purifier\Facades\Purifier;
use Faker\Factory as Faker;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        try {
            $user = User::first();

            if (!$user) {
                return;
            }

            $categories = Category::all();

            for ($i = 1; $i <= 20; $i++) {

                $title = "Sample Article $i";

                $content = "
                    <h2>{$faker->sentence(3)}</h2>
                    <p>{$faker->paragraph}</p>
                    <h3>{$faker->sentence(4)}</h3>
                    <p>{$faker->paragraph}</p>
                    <ul>
                        <li>{$faker->sentence(6)}</li>
                        <li>{$faker->sentence(6)}</li>
                        <li>{$faker->sentence(6)}</li>
                    </ul>
                    <p>{$faker->paragraph(2)}</p>
                ";
                $isBreaking = $faker->boolean(20);

                $article = Article::create([
                    'user_id' => $user->id,
                    'title' => $title,
                    'slug' => Str::slug($title . '-' . $i),
                    'content' => Purifier::clean($content),
                    'excerpt' => Str::limit(strip_tags($content), 180),

                    'meta_title' => $title,
                    'meta_description' => Str::limit(strip_tags($content), 160),
                    'meta_keywords' => 'laravel, tutorial, testing',

                    'status' => 'published',
                    'published_at' => now(),
                    'is_breaking'    => $isBreaking,
                    'breaking_until' => $isBreaking ? now()->addHours(rand(1, 48)) : null,
                ]);

                // random category (1-3)
                $article->categories()->sync(
                    $categories->random(rand(1, 3))->pluck('id')->toArray()
                );

                // tags
                $article->syncTags([
                    'laravel',
                    'php',
                    'dev'
                ]);

                $article->searchable();
            }
        } catch (\Throwable $e) {
            dump("Error di loop ke-$i: " . $e->getMessage());
        }
    }
}
