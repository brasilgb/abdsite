<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_category';

    public $incrementing = false;

    protected $fillable = [
        'id_category',
        'categoryname',
        'slug',
        'seccao',
        'categorytitle',
        'descricao',
        'active',
        'parent'
    ];

    public function scopeIdcategory()
    {
        $categories = Category::orderBy('id_category', 'DESC')->first();
        if ($categories) {
            return $categories->id_category + 1;
        } else {
            return 1;
        }
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'category_id');
    }

    public function subCategories()
    {
        return $this->hasMany(Category::class, 'parent', 'id_category');
    }
}
