<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($gallery)
    {
        $media = Media::where('gallery_id', $gallery)->paginate(15);
        $galleryname = Gallery::where('id_gallery', $gallery)->first()->galleryname;
        return Inertia::render('admin/media', ['galleryname' => $galleryname, 'galleryid' => $gallery, 'media' => $media, 'mediaTitle' => 'Isto é um titulo de media']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($gallery)
    {
        return Inertia::render('admin/media/Create', ['galleryid' => $gallery]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
        ];
        $request->validate([
            'media' => 'required',
        ],$messages,
            [
                'media' => 'imagem'
            ]
        );

        $resultExtension = [];
        $resultSize = [];
        foreach ($request->file('media') as $media) {
            if (in_array($media->getClientOriginalExtension(), array('png', 'jpg', 'jpeg'))) {
                array_push($resultExtension, true);
            } else {
                array_push($resultExtension, false);
            }
            if (round($media->getSize() / 1024) > 2048) {
                array_push($resultSize,  true);
            } else {
                array_push($resultSize, false);
            }
        }

        if (in_array(false, $resultExtension)) {
            Session::flash('error', 'Iserir somente arquivos de imagem (jpeg,jpg e png)!');
            return Redirect::route('midia.inserir', ['gallery' => $request->gallery]);
        } else if (in_array(true, $resultSize)) {
            Session::flash('error', 'Inserir somente arquivos com tamanho até 2MB!');
            return Redirect::route('midia.inserir', ['gallery' => $request->gallery]);
        } else {

            if ($request->hasfile('media')) {
                foreach ($request->file('media') as $media) {
                    $extension = $media->getClientOriginalExtension();
                    $imageName = $media->getClientOriginalName();
                    $fileName =  'G' . $request->gallery . '_' . time() . sha1($imageName) . '.' . $extension;
                    Image::make($media)->resize(null, 600,function ($constraint) {
                        $constraint->aspectRatio();
                    })->save(public_path('storage/gallery/' . $fileName));

                    $data['id_media'] = Media::idmedia();
                    $data['gallery_id'] = $request->gallery;
                    $data['media'] = $fileName;
                    $data['title'] = "";
                    $data['description'] = "";
                    $data['social'] = '0';
                    $data['type'] = $media->extension();
                    Media::create($data);
                }
            }
        }

        Session::flash('success', 'Imagens inseridas com sucesso!');
        return Redirect::route('midia.imagens', ['gallery' => $request->gallery]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function show(Gallery $gallery)
    {
        return Inertia::render('admin/media/Edit', ['gallery' => $gallery, 'galleryTitle' => 'Editar galerias']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Gallery  $gallery
     * @return \Illuminate\Http\Response
     */
    public function edit(Gallery $gallery)
    {
        return redirect()->route('media.show', ['gallery' => $gallery->id_gallery]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Media $media)
    {
        $media->where('id_media', $media->id_media)->update(
            [
                'title' => $request->title ? $request->title : "",
                'description' => $request->description ? $request->description : ""
            ]);
        return Redirect::route('midia.imagens', ['gallery' => $request->gallery]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function destroy(Media $media)
    {
        if ($media->featured != null && file_exists(public_path('storage/gallery/' . $media->featured))) {
            unlink(public_path('storage/gallery/' . $media->featured));
        }
        $media->delete();
        Session::flash('success', 'Imagem deletada com sucesso!');
        return Redirect::route('midia.imagens', ['gallery' => $media->gallery_id]);
    }
}
