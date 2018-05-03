<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\PrayerItem;

class PrayerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testEditPrayerItem()
    {
        $prayer = new PrayerItem();

        $prayer->setPrayer("New Prayer", "About My Prayer");

        $prayer->editPrayer("Newest Prayer", "About My Prayer");

        $this->assertEquals($prayer->getTitle(), "Newest Prayer");
        $this->assertEquals($prayer->getContent(), "About My Prayer");
    }

    public function test_if_only_set_title_should_have_error()
    {
        $prayer = new PrayerItem();

        $prayer->setPrayer("New Prayer", " ");


    }
}
