<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Page;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Section::count()) :
            Section::create(['id_section' => 1]);
        endif;
        $section = Section::orderByDesc('id_section')->first();
        $categories_section = Category::where('parent', 0)->get();
        $galleries_section = Gallery::orderBy('id_gallery')->get();
        return Inertia::render('admin/section', [
            'section' => $section,
            'categories_section' => $categories_section,
            'galleries_section' => $galleries_section,
            'sectionTitle' => 'Define secções'
        ]);
    }

        /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Section $section)
    {
        $data = $request->all();
        $section->update($data);
        Session::flash('success', 'Dados da secção salvos com successo');
        return Redirect::route('seccao');
    }
}
