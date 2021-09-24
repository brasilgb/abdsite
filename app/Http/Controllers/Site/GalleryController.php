<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {

        $galleries = Gallery::get();
        return Inertia::render('site/gallery', ['galleries' => $galleries]);

    }

    public function media($gallery)
    {

        $galleries_images = Gallery::with('medias')->where('slug', $gallery)->get();
        return Inertia::render('site/media', ['galleries_images' => $galleries_images]);

    }

}
