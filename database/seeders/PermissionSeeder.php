<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'admin']);

        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@admin',
            'password' => bcrypt('admin'),
            'phone' => '0343742152'
        ]);

        $user->assignRole($admin);
    }
}
