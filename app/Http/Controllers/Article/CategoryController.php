<?php

namespace App\Http\Controllers\Article;
use App\Http\Controllers\Controller;

use App\Models\Article\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $title = 'Category';
        return view('Admin.Article.category', compact('categories','title'));
    }

    public function store(Request $request)
    {
        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return back();
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return back();
    }
}
