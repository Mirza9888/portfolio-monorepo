<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    protected $signature = 'admin:create {email} {password}';
    protected $description = 'Create an admin user';

    public function handle()
    {
        try {
            $user = User::create([
                'name' => 'Mirza',
                'email' => $this->argument('email'),
                'password' => Hash::make($this->argument('password'))
            ]);

            $this->info('Admin user created successfully');
            $this->info("Email: {$user->email}");
        } catch (\Exception $e) {
            $this->error('Error creating admin user: ' . $e->getMessage());
        }
    }
}
