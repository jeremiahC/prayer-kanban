<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrayerStatus extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('prayer_status')->insert([
            'status_name' => 'Prayer',
            'description' => 'This section is where all prayer items is not yet started to pray'
        ]);

        DB::table('prayer_status')->insert([
            'status_name' => 'Praying',
            'description' => 'This section is where all prayer items is prayed'
        ]);

		DB::table('prayer_status')->insert([
            'status_name' => 'Answered',
            'description' => 'This section is where all prayer items is answered'
        ]);
    }
}
