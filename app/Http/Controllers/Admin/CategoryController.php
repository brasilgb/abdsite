<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $categories = Category::orderByDesc('id_category')->paginate(15);
        $reload = false;
        return Inertia::render('admin/category', ['categories' => $categories, 'reload' => $reload, 'categoryTitle' => 'categorias cadastradas']);
    }

    public function search(Request $request)
    {
        $term = $request->search;
        $reload = true;
        $categories = Category::where('categoryname', 'like', "%$term%")->paginate(200);
        return Inertia::render('admin/category', ['categories' => $categories, 'reload' => $reload, 'categoryTitle' => 'categorias buscadas']);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $parentcategory = Category::orderByDesc('categoryname')->where('parent', 0)->get();
        return inertia::render('admin/category/Create', ['parentcategory' => $parentcategory, 'categoryTitle' => 'Cadastrar categorias']);
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
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'categoryname' => ['required']
            ],
            $messages,
            [
                'categoryname' => 'categoria',
            ]
        );

        $data['id_category'] = Category::idcategory();
        $data['parent'] = $request->parentcategory == null ? 0 : $request->parentcategory;
        $data['slug'] = Str::slug($request->categoryname);
        Category::create($data);
        Session::flash('success', 'Categoria criada com sucesso!');
        return Redirect::route('categoria.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $parentcategory = Category::orderByDesc('categoryname')->where('parent', 0)->get();
        return Inertia::render('admin/category/Edit', ['parentcategory' => $parentcategory, 'category' => $category, 'categoryTitle' => 'Editar categorias']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        return redirect()->route('categoria.show', ['category' => $category->id_category]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->all();
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'categoryname' => ['required']
            ],
            $messages,
            [
                'categoryname' => 'categoria',
            ]
        );
        $data['slug'] = Str::slug($request->categoryname);
        $data['parent'] = $request->parentcategory == null ? 0 : $request->parentcategory;
        $category->update($data);
        Session::flash('success', 'Categoria editada com sucesso!');
        return Redirect::route('categoria.show', ['category' => $category->id_category]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        Session::flash('success', 'Categoria deletada com sucesso!');
        return Redirect::route('categoria.index');
    }
}
