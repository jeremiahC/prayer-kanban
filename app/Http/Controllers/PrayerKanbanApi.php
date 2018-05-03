<?php

namespace App\Http\Controllers;

use App\Models\PrayerItem;
use Illuminate\Http\Request;

class PrayerKanbanApi extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prayerItem = PrayerItem::all();

        if ($prayerItem) {
            foreach ($prayerItem as $item) {
                $category = config('prayer_category')[$item->category];
                $item->category = $category;
            }
            return response()->json($prayerItem, 201);
        }

        return response()->json('error', 500);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $prayerItem = new PrayerItem();

        if ($prayerItem->store($request->all())) {
            $item = $prayerItem->find($prayerItem->id);
            $category = config('prayer_category')[$item->category];
            $item->category = $category;

            return response()->json($item, 200);
        }

        return response()->json('error', 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PrayerItem $prayer)
    {
        $attributes = $request->all()['item'];
        foreach (config('prayer_category') as $key => $category) {
            if ($attributes['category'] === $category) {
                $attributes['category'] = $key;
            }
        }

        $prayer->updateItem($attributes);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
