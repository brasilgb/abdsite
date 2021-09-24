<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index($gallery)
    {

        $galleries_images = Gallery::with('medias')->where('slug', $gallery)->get();
        return Inertia::render('site/gallery', ['galleries_images' => $galleries_images]);

    }
}
