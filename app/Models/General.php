<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class General extends Model
{
    use HasFactory;

    protected $table = 'general';

    protected $primaryKey = 'id_general';

    public $incrementing = false;

    protected $fillable = [
        'id_general',
        'title',
        'description',
        'logo',
        'audio',
        'address',
        'contacts',
        'maps'
    ];
}
