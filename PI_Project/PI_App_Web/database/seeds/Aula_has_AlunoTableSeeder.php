<?php

use Illuminate\Database\Seeder;

class Aula_has_AlunoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Aula_has_Aluno seeder - Start");

        $aulas = DB::table('aula')->pluck('id')->toArray();
        $alunos = DB::table('aluno')->pluck('id')->toArray();

        foreach ($aulas as $aula) {
            $faker = Faker\Factory::create('pt_PT');
            for($i=0;$i<20;$i++){
                DB::table('aula_has_aluno')->insert([
                    'aluno_id' => $faker->unique()->randomElement($alunos),
                    'aula_id' => $aula,
                ]);
            }
        }

        $this->command->info("Aula_has_Aluno seeder - Finish");
    }
}
