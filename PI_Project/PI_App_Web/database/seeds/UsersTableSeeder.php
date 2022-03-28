<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Users seeder - Start");
        $faker = Faker\Factory::create('pt_PT');
        $createdAt = Carbon\Carbon::now()->subDays(30);

        DB::table('users')->insert([
            [
                'name' => 'Gabriel Frazão',
                'email' => '2171159@my.ipleiria.pt',
                'tipoUser' => 'e',
                'password' => bcrypt('SmartFeedback'),
                'objectguid' => 1,
                'api_token' => \Illuminate\Support\Str::random(60),
                'remember_token' => $faker->asciify('**********'),
                'created_at' => $createdAt,
                'updated_at' => $createdAt
            ],
            [
                'name' => 'Gonçalo Vicente',
                'email' => '2172131@my.ipleiria.pt',
                'tipoUser' => 'e',
                'password' => bcrypt('SmartFeedback'),
                'objectguid' => 1,
                'api_token' => \Illuminate\Support\Str::random(60),
                'remember_token' => $faker->asciify('**********'),
                'created_at' => $createdAt,
                'updated_at' => $createdAt
            ],
            [
                'name' => 'Professor 1',
                'email' => 'professorSF1@gmail.com',
                'tipoUser' => 'p',
                'password' => bcrypt('SmartFeedback'),
                'objectguid' => 1,
                'api_token' => \Illuminate\Support\Str::random(60),
                'remember_token' => $faker->asciify('**********'),
                'created_at' => $createdAt,
                'updated_at' => $createdAt
            ],
            [
                'name' => 'Professor 2',
                'email' => 'professorsmart2@gmail.com',
                'tipoUser' => 'p',
                'password' => bcrypt('SmartFeedback'),
                'objectguid' => 1,
                'api_token' => \Illuminate\Support\Str::random(60),
                'remember_token' => $faker->asciify('**********'),
                'created_at' => $createdAt,
                'updated_at' => $createdAt
            ],
            [
                'name' => 'Administrador',
                'email' => 'admin@ipleiria.pt',
                'tipoUser' => 'o',
                'password' => bcrypt('SmartFeedback'),
                'objectguid' => 1,
                'api_token' => \Illuminate\Support\Str::random(60),
                'remember_token' => $faker->asciify('**********'),
                'created_at' => $createdAt,
                'updated_at' => $createdAt
            ]
        ]);

        $this->command->info("Users seeder - Finish");
    }
}
