<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $table = 'section';
    protected $primaryKey = 'id_section';
    public $incrementing = false;

    protected $fillable = [
        'id_section',
        'section1',
        'section2',
        'section3',
        'section4',
        'section5',
    ];

}
