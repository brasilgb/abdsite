<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $primaryKey = 'id_post';

    public $incrementing = false;

    protected $fillable = [
        'id_post',
        'title', //título da postagem ou página
        'slug',
        'summary', //resumo de conteúdo
        'content', //conteúdo da postagem
        'featured', //imagem destaque
        'social', //ativa ícones mídia social. 0=desativar 1=ativar
        'active', //Torna visualizada no frontend. 0=desativar 1=ativar
        'type', //Caso seja página ou post. 0=página 1=postagem
    ];

    public function scopeIdpage()
    {
        $pages = Page::orderBy('id_post', 'DESC')->first();
        if ($pages) {
            return $pages->id_post + 1;
        } else {
            return 1;
        }
    }
}
