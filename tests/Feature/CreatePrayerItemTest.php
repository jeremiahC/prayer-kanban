<?php

namespace Tests\Feature;

use App\PrayerItem;
use App\PrayerStatus;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreatePrayerItemTest extends TestCase
{
	use DatabaseMigrations;

	/** @test */
	public function create_new_prayer_item()
	{
		#prayer needs a subject and details
		#needs date created
		$prayerItem = new PrayerItem();
		$prayerStatus = factory(PrayerStatus::class)->create([
			'status_name' => 'prayer',
		]);

		$response = $this->post('prayer', [
			'title' => 'Healing',
			'about' => 'Healing To Remove Cough',
			'status_id' => $prayerStatus->id,
		]);

		$response->assertStatus(201);
		// dd($prayerItem->all());

		
		#check if it will successfuly save data
	}
}
