<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Role::create([
            'name' => 'owner',
            'icon' => '👑',
            'is_protected' => true,
            'is_assignable' => false,
            'is_editable' => false,
        ]);

        Role::create([
            'name' => 'developer',
            'icon' => '👨‍💻',
            'is_protected' => true,
            'is_assignable' => true,
            'is_editable' => false,
        ]);

        Role::create([
            'name' => 'auditor',
            'icon' => '🗂️',
            'is_protected' => true,
            'is_assignable' => true,
            'is_editable' => false,
        ]);

        Role::create([
            'name' => 'admin',
            'icon' => '🛡️', // superuser / full control
            'is_protected' => true,
            'is_assignable' => true,
            'is_editable' => false,
        ]);

        Role::create([
            'name' => 'writer',
            'icon' => '✍️', // nulis konten
            'is_protected' => true,
            'is_assignable' => true,
            'is_editable' => false,
        ]);

        Role::create([
            'name' => 'editor',
            'icon' => '📝', // edit & review
            'is_protected' => true,
            'is_assignable' => true,
            'is_editable' => false,
        ]);

        Role::create([
            'name' => 'guest',
            'icon' => '👤',
            'is_protected' => false,
            'is_assignable' => true,
            'is_editable' => true,
        ]);

        $modules = [
            'users',
            'roles',
            'permissions',
            'articles',
            'logs'
        ];

        $actions = [
            'read',
            'create',
            'update',
            'delete'
        ];

        foreach ($modules as $module) {
            foreach ($actions as $action) {
                Permission::firstOrCreate([
                    'name' => $module . '.' . $action,
                    'guard_name' => 'web'
                ]);
            }
        }




        // ambil role
        $owner = Role::where('name', 'owner')->first();
        $developer = Role::where('name', 'developer')->first();

        // ambil semua permission
        $allPermissions = Permission::all();

        // ========================
        // 🔥 DEVELOPER = ALL
        // ========================
        $developer->syncPermissions($allPermissions);

        // ========================
        // 👑 OWNER = SELECTED
        // ========================

        // users + roles full
        $ownerPermissions = Permission::whereIn('name', [
            'users.read',
            'users.create',
            'users.update',
            'users.delete',

            'roles.read',
            'roles.create',
            'roles.update',
            'roles.delete',

            'permissions.read', // read only
            'logs.read',        // optional tapi recommended
        ])->get();

        $owner->syncPermissions($ownerPermissions);

        $user = User::updateOrCreate(
            ['email' => 'bagas.aji3420@gmail.com'],
            [
                'username' => 'Baito3420',
                'first_name' => 'Bagas',
                'last_name' => 'Aji',
                'password' => Hash::make('password123'),
                'status' => 'active',
            ]
        );

        $user->assignRole('developer');
    }
}
