<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Email;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        if(!Email::count()):
            Email::create(['id_email' => 1]);
        endif;
        $email = Email::orderByDesc('id_email')->first();
        return Inertia::render('admin/email', ['email' => $email, 'emailTitle' => 'Ito é um título do E-mail, ok!']);
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
     * @param  \App\Models\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function show(Email $email)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function edit(Email $email)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Email $email)
    {
        $data = $request->all();
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate([
            'host' => 'required',
            'port' => 'required',
            'security' => 'required',
            'user' => 'required',
            'password' => 'required'
        ],
        $messages,
        [
            'host' => 'servidor',
            'port' => 'porta',
            'security' => 'segurança',
            'user' => 'usuário',
            'password' => 'senha'
        ]
    );
        $email->update($data);
        Session::flash('success', 'Dados do email salvos com successo');
        return Redirect::route('email.configurar');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function destroy(Email $email)
    {
        //
    }
}
