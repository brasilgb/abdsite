<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index($page)
    {
        $page_content = Page::where('slug', $page)->first();
        return Inertia::render('site/page', ['page_content' => $page_content]);
    }
}
