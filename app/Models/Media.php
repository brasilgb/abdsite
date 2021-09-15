<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_media';

    public $incrementing = false;

    protected $fillable = [
        'id_media',
        'gallery_id',
        'title',
        'description',
        'media',
        'social',
        'type'
    ];
    public function scopeIdmedia()
    {
        $medias = Media::orderByDesc('id_media')->first();
        if ($medias) {
            return $medias->id_media + 1;
        } else {
            return 1;
        }
    }

    public function gallery()
    {
        return $this->belongsTo(Gallery::class, 'gallery_id', 'id_gallery');
    }
}
