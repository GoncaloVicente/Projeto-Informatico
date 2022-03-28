<?php

use Illuminate\Database\Seeder;

class AlunosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Alunos seeder - Start");
        $nome = DB::table('users')->pluck('name')->toArray();
        $email = DB::table('users')->pluck('email')->toArray();
        $cursos = DB::table('curso')->pluck('id')->toArray();
        $salas = DB::table('sala')->pluck('id')->toArray();
        $faker = Faker\Factory::create('pt_PT');
        for ($i = 0; $i < 800; ++$i) {
            DB::table('aluno')->insert($this->fakeAluno($faker, $faker->unique()->randomElement($nome), $faker->randomElement($cursos)));
        }
        for ($i = 0; $i < 200; ++$i) {
            DB::table('professor')->insert($this->fakeProfessor($faker, $faker->unique()->randomElement($nome), $faker->randomElement($salas), $faker->unique()->randomElement($email)));
        }
        $this->command->info("Alunos seeder - Finish");

    }

    private function fakeProfessor(Faker\Generator $faker, $nome, $sala, $email)
    {
        $createdAt = Carbon\Carbon::now()->subDays(30);
        return [
            'nome' => $nome,
            'numero' => $faker->numberBetween(2100000, 2199999),
            'email' => $email,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }

    private function fakeAluno(Faker\Generator $faker, $nome, $curso_id)
    {
        $createdAt = Carbon\Carbon::now()->subDays(30);
        return [
            'nome' => $nome,
            'numero' => $faker->numberBetween(2100000, 2199999),
            'curso_id' => $curso_id,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }

}
