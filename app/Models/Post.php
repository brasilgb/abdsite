<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_post';

    public $incrementing = null;

    protected $fillable = [
        'id_post',
        'category_id',
        'title', //título da postagem ou página
        'slug',
        'summary', //resumo de conteúdo
        'content', //conteúdo da postagem
        'featured', //imagem destaque
        'social', //ativa ícones mídia social. 0=desativar 1=ativar
        'active', //Torna visualizada no frontend. 0=desativar 1=ativar
        'type', //Caso seja página ou post. 0=página 1=postagem
        'link' //Adiciona link caso seja postagem. 0=remove 1=adiciona
    ];

    public function scopeIdpost()
    {
        $posts = Post::orderBy('id_post', 'DESC')->first();
        if ($posts) {
            return $posts->id_post + 1;
        } else {
            return 1;
        }
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
