<?php

use Illuminate\Database\Seeder;

class Aluno_has_UnidadeCurricularTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Aluno_has_UnidadeCurricular seeder - Start");
        $aluno = DB::table('aluno')->pluck('id')->toArray();
        $uCs = DB::table('unidadecurricular')->pluck('id')->toArray();
        foreach ($uCs as $uC) {
            $faker = Faker\Factory::create('pt_PT');
            for($i=0;$i<20;$i++){
                DB::table('aluno_has_unidade_curricular')->insert([
                    'aluno_id' => $faker->unique()->randomElement($aluno),
                    'uC_id' => $uC,
                ]);
            }
        }
        $this->command->info("Aluno_has_UnidadeCurricular seeder - Finish");
    }
}
