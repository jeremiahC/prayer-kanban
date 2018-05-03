<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrayerItem extends Model
{
    protected $table= 'prayer_item';
    protected $fillable = ['title', 'about', 'category'];

    protected $title;
    protected $content;

    public function store($request)
    {
        $this->fill($request);
        $this->category = 1;

        return $this->save();
    }

    public function updateItem($attribute)
    {
        $this->fill($attribute);

        return $this->save();
    }

    public function setPrayer($title, $content)
    {
        $this->title = $title;
        $this->$content = $content;
    }

    public function editPrayer($title, $content)
    {
        $this->title = $title;
        $this->content = $content;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getContent()
    {
        return $this->content;
    }
}
