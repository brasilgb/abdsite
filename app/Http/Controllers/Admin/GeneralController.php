<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\General;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

class GeneralController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        if (!General::count()) :
            General::create(['id_general' => 1]);
        endif;
        $general = General::orderByDesc('id_general')->first();
        return Inertia::render('admin/general', ['general' => $general, 'generalTitle' => 'Ito é um título da configuração geral']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\General  $general
     * @return \Illuminate\Http\Response
     */
    public function show(General $general)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\General  $general
     * @return \Illuminate\Http\Response
     */
    public function edit(General $general)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\General  $general
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, General $general)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',

        ];

        $request->validate(
            [
                'title' => 'required',
                'description' => 'required',
                'address' => 'required',
                'phone' => 'required',
                'whatsapp' => 'required',
                'email' => 'required',
                'maps' => 'required',
                'logo' => 'nullable|mimes:jpeg,jpg,png|max:5000',
                'audio' => 'nullable|mimes:mp3|max:5000'
            ],
            $messages,
            [
                'title' => 'título',
                'description' => 'descrição',
                'address' => 'endereço',
                'contacts' => 'contatos',
                'maps' => 'mapas',
                'logo' => 'logo',
                'audio' => 'audio'
            ]
        );

        if ($request->hasfile('logo')) {
            
            $image = $request->file('logo');
            $fileName =  time() . sha1($image) . '.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(200, null,function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('storage/images/' . $fileName));
            if ($general->logo && file_exists(public_path('storage/images/' . $general->logo))) {
                unlink(public_path('storage/images/' . $general->logo));
            }
        }

        if ($request->hasfile('audio')) {
            $audio = $request->file('audio');
            $faudio = $audio->getClientOriginalName();
            $audioName =  time() . sha1($faudio) . '.' . $audio->getClientOriginalExtension();
            $audio->move(public_path('storage/audio/'), $audioName);
            if ($general->audio && file_exists(public_path('storage/audio/' . $general->audio))) {
                unlink(public_path('storage/audio/' . $general->audio));
            }
        }

        $data['logo'] =  $request->file('logo') ? $fileName : $general->logo;
        $data['audio'] =  $request->file('audio') ? $audioName : $general->audio;
        $general->update($data);
        Session::flash('success', 'Dados do site salvos com successo');
        return Redirect::route('geral.configurar');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\General  $general
     * @return \Illuminate\Http\Response
     */
    public function destroy(General $general)
    {
        //
    }

    public function delaudio(Request $request, General $audio)
    {
        //dd($audio->audio);

        if ($audio->audio && file_exists(public_path('storage/audio/' . $audio->audio))) {
            unlink(public_path('storage/audio/' . $audio->audio));
        }
        $data['audio'] =  null;
        $audio->update($data);
        Session::flash('success', 'Áudio removido com successo');
        return Redirect::route('geral.configurar');
    }
}
