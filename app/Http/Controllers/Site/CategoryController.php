<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index($category)
    {

        $categories_posts = Category::with('posts')->where('slug', $category)->get();
        return Inertia::render('site/category', ['categories_posts' => $categories_posts]);

    }
}
