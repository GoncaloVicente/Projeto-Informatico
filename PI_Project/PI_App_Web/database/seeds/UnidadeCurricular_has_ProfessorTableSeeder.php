<?php

use Illuminate\Database\Seeder;

class UnidadeCurricular_has_ProfessorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $professores = DB::table('professor')->pluck('id')->toArray();
        $uCs = DB::table('unidadecurricular')->pluck('id')->toArray();

        foreach ($professores as $professor) {
            $faker = Faker\Factory::create('pt_PT');
            for($i=0;$i<3;$i++){
                DB::table('unidade_curricular_has_professor')->insert([
                    'uC_id' => $faker->unique()->randomElement($uCs),
                    'professor_id' => $professor,
                ]);
            }
        }
    }
}
