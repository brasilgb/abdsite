<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post as Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;


class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = Page::orderByDesc('id_post')->where('type', 0)->paginate(15);
        $reload = false;
        return Inertia::render('admin/page', ['pages' => $pages, 'reload' => $reload, 'pageTitle' => 'páginas cadastradas']);
    }

    public function search(Request $request)
    {
        $term = $request->search;
        $reload = true;
        $pages = Page::where('type', 0)->where('title', 'like', "%$term%")->paginate(15);
        return Inertia::render('admin/page', ['pages' => $pages, 'reload' => $reload, 'pageTitle' => 'páginas buscadas']);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia::render('admin/page/Create', ['pageTitle' => 'Cadastrar página']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $seExtensionImage = $request->file('featured') ? ' Sua imagem é do tipo: ' . $request->featured->extension() : '';
        $setSizeImage = $request->file('featured') ? ' Sua imagem têm: ' . round($request->featured->getSize() / 1024) . 'KB' : '';
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'mimes' => 'O campo :attribute aceita somente arquivos (jpeg,jpg e png). ' . $seExtensionImage,
            'max' => 'A :attribute deve ter até 150 KB.' . $setSizeImage
        ];
        $request->validate(
            [
                'title' => ['required'],
                'summary' => ['required'],
                'content' => ['required'],
                'featured' => ['mimes:jpeg,jpg,png', 'max:5000']

            ],
            $messages,
            [
                'title' => 'título',
                'summary' => 'resumo',
                'content' => 'conteúdo',
                'featured' => 'imagem destaque'
            ]
        );
        if ($request->hasfile('featured')) {
            $image = $request->file('featured');
            $imageName = $image->getClientOriginalName();
            $fileName =  time() . sha1($imageName).'.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(null, 600,function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('storage/page/' . $fileName));
        }

        $data = [
            'id_post' => Page::idpost(),
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'summary' => $request->summary,
            'content' => $request->content,
            'featured' => $request->file('featured') ? $fileName : '',
            'social' => $request->social == true ? 1 : 0,
            'active' => $request->active == true ? 1 : 0,
            'type' => 0
        ];
        Page::create($data);
        Session::flash('success', 'Página criada com sucesso!');
        return Redirect::route('pagina.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        return Inertia::render('admin/page/Edit', ['page' => $page, 'pageTitle' => 'Editar página']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function edit(Page $page)
    {
        return redirect()->route('pagina.show', ['page' => $page->id_post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {

        $seExtensionImage = $request->file('featured') ? ' Sua imagem é do tipo: ' . $request->featured->extension() : '';
        $setSizeImage = $request->file('featured') ? ' Sua imagem têm: ' . round($request->featured->getSize() / 1024) . 'KB' : '';
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'mimes' => 'O campo :attribute aceita somente arquivos (jpeg,jpg e png). ' . $seExtensionImage,
            'max' => 'A :attribute deve ter até 150 KB.' . $setSizeImage
        ];
        $request->validate(
            [
                'title' => ['required'],
                'summary' => ['required'],
                'content' => ['required'],
                'featured' => ['mimes:jpeg,jpg,png', 'max:5000']
            ],
            $messages,
            [
                'title' => 'título',
                'summary' => 'resumo',
                'content' => 'conteúdo',
                'featured' => 'imagem destaque'
            ]
        );
        if ($request->hasfile('featured')) {
            $image = $request->file('featured');
            $imageName = $image->getClientOriginalName();
            $fileName =  time() . sha1($imageName).'.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(null, 600,function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('storage/page/' . $fileName));
            if ($page->featured && file_exists(public_path('storage/page/' . $page->featured))) {
                unlink(public_path('storage/page/' . $page->featured));
            }
        }

        $data = [
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'summary' => $request->summary,
            'content' => $request->content,
            'featured' => $request->file('featured') ? $fileName : $page->featured,
            'social' => $request->social == true ? 1 : 0,
            'active' => $request->active == true ? 1 : 0
        ];

        $page->update($data);
        Session::flash('success', 'Página editada com sucesso!');
        return Redirect::route('pagina.show', ['page' => $page->id_post]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        if ($page->featured != null && file_exists(public_path('storage/page/' . $page->featured))) {
            unlink(public_path('storage/page/' . $page->featured));
        }
        $page->delete();
        Session::flash('success', 'Página deletada com sucesso!');
        return Redirect::route('pagina.index');
    }
}
