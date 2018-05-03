<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrayerItem extends Model
{
	protected $table= 'prayer_item';
    protected $fillable = ['title', 'about'];

    public function store($request)
    {
    	$this->fill($request);
    	$this->category = 1;

        return $this->save();
    }
}
