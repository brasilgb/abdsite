<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $galleries = Gallery::orderByDesc('id_gallery')->with('medias')->paginate(15);
        $reload = false;
        return Inertia::render('admin/gallery', ['galleries' => $galleries, 'reload' => $reload, 'galleryTitle' => 'galerias cadastradas']);
    }

    public function search(Request $request)
    {
        $term = $request->search;
        $reload = true;
        $galleries = Gallery::with('medias')->where('galleryname', 'like', "%$term%")->paginate(15);
        return Inertia::render('admin/gallery', ['galleries' => $galleries, 'reload' => $reload, 'galleryTitle' => 'galerias buscadas']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia::render('admin/gallery/Create', ['galleryTitle' => 'Cadastrar galerias']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'mimes' => 'O campo :attribute aceita somente arquivos (jpeg,jpg e png).',
            'max' => 'A :attribute deve ter até 1500 KB.'
        ];
        $request->validate([
            'galleryname' => ['required'],
            'cover' => ['mimes:jpeg,jpg,png', 'max:5000'],
            'description' => ['required']
        ],$messages,
        [
            'galleryname' => 'galeria',
            'description' => 'descrição',
            'cover' => 'imagem de capa'
        ]);

        if ($request->hasfile('cover')) {
            $image = $request->file('cover');
            $imageName = $image->getClientOriginalName();
            $fileName =  'Cover_G' . Gallery::idgallery() . '_' . time() . sha1($imageName) . '.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(null, 600,function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('storage/gallery/' . $fileName));
        }

        $data['id_gallery'] = Gallery::idgallery();
        $data['slug'] = Str::slug($request->galleryname);
        $data['cover'] = $request->file('cover') ? $fileName : '';

        Gallery::create($data);
        Session::flash('success', 'Galeria criada com sucesso!');
        return Redirect::route('galeria.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $gallery
     * @return \Illuminate\Http\Response
     */
    public function show(Gallery $gallery)
    {
        return Inertia::render('admin/gallery/Edit', ['gallery' => $gallery, 'galleryTitle' => 'Editar galerias']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Gallery  $gallery
     * @return \Illuminate\Http\Response
     */
    public function edit(Gallery $gallery)
    {
        return redirect()->route('galeria.show', ['gallery' => $gallery->id_gallery]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $gallery
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gallery $gallery)
    {
        $data = $request->all();
        //dd($data);
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'mimes' => 'O campo :attribute aceita somente arquivos (jpeg,jpg e png).',
            'max' => 'A :attribute deve ter até 1500 KB.'
        ];
        $request->validate([
            'galleryname' => ['required'],
            'description' => ['required'],
            'cover' => ['mimes:jpeg,jpg,png', 'max:5000']
        ],$messages,
        [
            'galleryname' => 'galeria',
            'description' => 'descrição',
            'cover' => 'imagem de capa'
        ]);
        if ($request->hasfile('cover')) {
            $image = $request->file('cover');
            $imageName = $image->getClientOriginalName();
            $fileName =  'Cover_G' . $gallery->id_gallery . '_' . time() . sha1($imageName) . '.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(null, 600, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('storage/gallery/' . $fileName));
            if ($gallery->cover && file_exists(public_path('storage/gallery/' . $gallery->cover))) {
                unlink(public_path('storage/gallery/' . $gallery->cover));
            }
        }

        $data['cover'] = $request->file('cover') ? $fileName : $gallery->cover;
        $data['slug'] = Str::slug($request->galleryname);
        $gallery->update($data);
        Session::flash('success', 'Galeria editada com sucesso!');
        return Redirect::route('galeria.show', ['gallery' => $gallery->id_gallery]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $gallery
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gallery $gallery)
    {
        $gallery->delete();
        Session::flash('success', 'Galeria deletada com sucesso!');
        return Redirect::route('galeria.index');
    }
}
