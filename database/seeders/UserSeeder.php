<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'User1',
            'email' => 'user1@example.com',
            'password' => Hash::make('password'),
            'balance' => '1000.00',
        ]);

        User::create([
            'name' => 'User2',
            'email' => 'User2@example.com',
            'password' => Hash::make('password'),
            'balance' => '500.00',
        ]);
    }
}
