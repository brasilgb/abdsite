<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\HomeController as HomeAdmin;
use App\Http\Controllers\Admin\PageController as PageAdmin;
use App\Http\Controllers\Admin\CategoryController as CategoryAdmin;
use App\Http\Controllers\Admin\PostController as PostAdmin;
use App\Http\Controllers\Admin\GalleryController as GalleryAdmin;
use App\Http\Controllers\Admin\MediaController as MediaAdmin;
use App\Http\Controllers\Admin\EmailController as EmailAdmin;
use App\Http\Controllers\Admin\GeneralController as GeneralAdmin;
use App\Http\Controllers\Admin\UserController as UserAdmin;
use App\Http\Controllers\Admin\SectionController as SectionAdmin;

// Páginas do site
use App\Http\Controllers\Site\HomeController as HomeSite;
use App\Http\Controllers\Site\CategoryController as CategorySite;
use App\Http\Controllers\Site\PostController as PostSite;
use App\Http\Controllers\Site\PageController as PageSite;
use App\Http\Controllers\Site\GalleryController as GallerySite;
use App\Http\Controllers\Site\MediaController as MediaSite;
use App\Http\Controllers\Site\ContactController as ContactSite;


Route::group(['middleware' => ['auth']], function () {

    Route::get('/admin', [HomeAdmin::class, 'index'])->name('admin');
    // Rotas Admin Páginas
    Route::post('/admin/pagina/search', [PageAdmin::class, 'search'])->name('pagina.search');
    Route::resource('/admin/pagina', PageAdmin::class)->parameters(['pagina' => 'page']);
    // Rotas Admin Categorias
    Route::post('/admin/categoria/search', [CategoryAdmin::class, 'search'])->name('categoria.search');
    Route::resource('/admin/categoria', CategoryAdmin::class)->parameters(['categoria' => 'category']);
    // Rotas Admin Postagens
    Route::post('/admin/postagem/search', [PostAdmin::class, 'search'])->name('postagem.search');
    Route::resource('/admin/postagem', PostAdmin::class)->parameters(['postagem' => 'post']);
    // Rotas Admin Galerias
    Route::post('/admin/galeria/search', [GalleryAdmin::class, 'search'])->name('galeria.search');
    Route::resource('/admin/galeria', GalleryAdmin::class)->parameters(['galeria' => 'gallery']);
    // Rotas Admin Media
    Route::get('/admin/midias/{gallery}', [MediaAdmin::class, 'index'])->name('midia.imagens');
    Route::get('/admin/midias/inserir/{gallery}', [MediaAdmin::class, 'create'])->name('midia.inserir');
    Route::post('/admin/midias/store', [MediaAdmin::class, 'store'])->name('midia.store');
    Route::delete('/admin/midias/{media}', [MediaAdmin::class, 'destroy'])->name('midia.delete');
    Route::put('/admin/midias/{media}', [MediaAdmin::class, 'update'])->name('midia.alterar');
    // Rotas Admin Email
    Route::get('/admin/email', [EmailAdmin::class, 'index'])->name('email.configurar');
    Route::put('/admin/email/{email}', [EmailAdmin::class, 'update'])->name('email.alterar');
    // Rotas Admin Geral
    Route::get('/admin/geral', [GeneralAdmin::class, 'index'])->name('geral.configurar');
    Route::put('/admin/geral/{general}', [GeneralAdmin::class, 'update'])->name('geral.alterar');
    Route::get('/admin/geral/{audio}', [GeneralAdmin::class, 'delaudio'])->name('geral.delaudio');

    // Rotas Admin secção
    Route::get('/admin/seccao', [SectionAdmin::class, 'index'])->name('seccao');
    Route::put('/admin/seccao/{section}', [SectionAdmin::class, 'update'])->name('seccao.alterar');

    // Rotas Admin Usuários
    Route::post('/admin/usuario/search', [UserAdmin::class, 'search'])->name('usuario.search');
    Route::resource('/admin/usuario', UserAdmin::class)->parameters(['usuario' => 'user']);
});

Route::get('/', [HomeSite::class, 'index'])->name('home');
Route::get('/categoria/{category}', [CategorySite::class, 'index'])->name('categoria');
Route::get('/postagem/{post}', [PostSite::class, 'index'])->name('postagem');
Route::get('/pagina/{page}', [PageSite::class, 'index'])->name('pagina');
Route::get('/galerias', [GallerySite::class, 'index'])->name('galerias');
Route::get('/galeria/{gallery}', [GallerySite::class, 'media'])->name('media');
Route::get('/imagem/{image}', [MediaSite::class, 'index'])->name('imagem');
Route::get('/contato', [ContactSite::class, 'index'])->name('contato');
Route::post('/enviar', [ContactSite::class, 'store'])->name('enviar');
