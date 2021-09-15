<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_gallery';

    public $incrementing = false;

    protected $fillable = [
        'id_gallery',
        'galleryname',
        'slug',
        'cover',
        'description',
        'active',
        'social',
        'slider'
    ];

    public function scopeIdgallery()
    {
        $galleries = Gallery::orderBy('id_gallery', 'DESC')->first();
        if ($galleries) {
            return $galleries->id_gallery + 1;
        } else {
            return 1;
        }
    }

    public function medias() {
        return $this->hasMany(Media::class, 'gallery_id', 'id_gallery');
    }
}
