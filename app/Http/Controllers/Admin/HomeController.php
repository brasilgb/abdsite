<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Media;
use App\Models\Page;
use App\Models\Post;
use Inertia\Inertia;

use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function index()
    {
        $pages = Page::where('type', 0)->get();
        $categories = Category::get();
        $posts = Post::where('type', 1)->get();
        $galleries = Gallery::get();
        $images = Media::get();
        return Inertia::render('admin/home',
        [
            'pages' => $pages,
            'categories' => $categories,
            'posts' => $posts,
            'galleries' => $galleries,
            'images' => $images,
            'homeTitle' => 'Ito é um título!'
        ]);
    }

    public function sobre()
    {
        return Inertia::render('admin/sobre', ['titulo' => 'Sobre']);
    }
}
