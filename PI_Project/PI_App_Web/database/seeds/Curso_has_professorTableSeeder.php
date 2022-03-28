<?php

use Illuminate\Database\Seeder;

class Curso_has_professorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create('pt_PT');
        $curso = DB::table('curso')->pluck('id')->toArray();
        $professor = DB::table('professor')->pluck('id')->toArray();

        for ($i = 0; $i < 46; ++$i) {
            DB::table('curso_has_professor')->insert($this->fakeCursohasProfessor($faker,$faker->unique()->randomElement($curso),$faker->randomElement($professor)));
        }

    }

    private function fakeCursohasProfessor(Faker\Generator $faker,$curso, $professor)
    {
        return [
            'curso_id' => $curso,
            'professor_id' => $professor,
        ];
    }
}
