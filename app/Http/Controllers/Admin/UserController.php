<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::orderByDesc('id_user')->paginate(15);
        $reload = false;
        return Inertia::render('admin/user', ['users' => $users, 'reload' => $reload, 'userTitle' => 'usuários cadastrados']);
    }

    public function search(Request $request)
    {
        $term = $request->search;
        $reload = true;
        $users = User::where('name', 'like', "%$term%")->paginate(15);
        return Inertia::render('admin/user', ['users' => $users, 'reload' => $reload, 'userTitle' => 'usuários buscados']);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia::render('admin/user/Create', ['userTitle' => 'Cadastrar usuários']);
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
            'confirmed' => 'Redigite a senha, devem ser iguais.',
            'min' => 'O campo :attribute deve ter no mínimo :min caracteres!',
            'email' => 'O ampo :attribute deve ser um endereço de email válido!'
        ];
        $request->validate(
            [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required|confirmed|min:6',
                'password_confirmation' => 'required|min:6'
            ],
            $messages,
            [
                'name' => 'nome',
                'email' => 'email',
                'password' => 'senha',
                'password_confirmation' => 'repita a senha'
            ]
        );

        $data['id_user'] = User::iduser();
        $data['password'] = Hash::make($request->password);
        User::create($data);
        Session::flash('success', 'Usuário criado com sucesso!');
        return Redirect::route('usuario.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return Inertia::render('admin/user/Edit', ['user' => $user, 'userTitle' => 'Editar usuários']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return redirect()->route('usuario.show', ['user' => $user->id_user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $data = $request->all();
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'confirmation' => 'Redigite a senha, devem ser iguais.',
            'min' => 'O campo :attribute deve ter no mínimo :min caracteres!',
            'email' => 'O ampo :attribute deve ser um endereço de email válido!'
        ];
        $request->validate(
            [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'confirmed',
            ],
            $messages,
            [
                'name' => 'nome',
                'email' => 'email',
                'password' => 'senha',
                'password_confirmation' => 'repita a senha'
            ]
        );

        $data['password'] = $request->password ? Hash::make($request->password) : $user->password;
        $user->update($data);
        Session::flash('success', 'Usuário editado com sucesso!');
        return Redirect::route('usuario.show', ['user' => $user->id_user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        Session::flash('success', 'Usuário deletado com sucesso!');
        return Redirect::route('usuario.index');
    }
}
