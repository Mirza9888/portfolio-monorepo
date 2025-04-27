<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $email = 'redzacs@gmail.com';
        $password = 'test1234';
        
        $this->command->info('Creating admin user directly from seeder...');
        
        try {
            // Provera da li korisnik već postoji
            $existingUser = User::where('email', $email)->first();
            
            if ($existingUser) {
                $this->command->info('Admin user already exists.');
                return;
            }
            
            // Direktno kreiranje korisnika iz seedera
            $user = User::create([
                'name' => 'Mirza',
                'email' => $email,
                'password' => Hash::make($password)
            ]);

            $this->command->info('Admin user created successfully');
            $this->command->info("Email: {$user->email}");
        } catch (\Exception $e) {
            $this->command->error('Error creating admin user: ' . $e->getMessage());
        }
    }
}