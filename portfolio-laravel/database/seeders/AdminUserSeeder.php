<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');
        
        $this->command->info('Creating admin user...');
        
        Artisan::call('admin:create', [
            'email' => $email,
            'password' => $password
        ]);
        
      
        $this->command->info(Artisan::output());
    }
}