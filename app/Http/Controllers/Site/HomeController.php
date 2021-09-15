<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Post;
use App\Models\Section;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $category_section = Section::first();
        if ($category_section) {
            $section1 = Category::with('posts')->where('id_category', $category_section->section1)->get();

            $section2 = Category::with('posts')->where('id_category', $category_section->section2)->get();

            $section3 = Gallery::with('medias')->where('id_gallery', $category_section->section3)->get();

            $section4 = Category::with('posts')->where('id_category', $category_section->section4)->get();

            $section5 = Category::with('posts')->where('id_category', $category_section->section5)->get();

            return Inertia::render('site/home', [
                'section1' => $section1,
                'section2' => $section2,
                'section3' => $section3,
                'section4' => $section4,
                'section5' => $section5
            ]);
        } else {
            return Inertia::render('site/home');
        }
    }
}
