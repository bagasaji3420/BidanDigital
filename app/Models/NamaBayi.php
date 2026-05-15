<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NamaBayi extends Model
{

    protected $fillable = [
        'nama',
        'arti',
        'suku',
        'kategori',
        'bahasa',
        'gender',
    ];
}
