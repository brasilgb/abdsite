<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    use HasFactory;
    protected $table = 'email';

    protected $primaryKey = 'id_email';

    public $incrementing = false;

    protected $fillable = [
        'id_email',
        'host',
        'port',
        'security',
        'user',
        'password'
    ];
}
