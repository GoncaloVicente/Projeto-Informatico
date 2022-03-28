<?php

use Illuminate\Database\Seeder;

class Aula_has_ConteudoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Aula_has_Conteudo seeder - Start");
        $aulas = DB::table('aula')->pluck('id')->toArray();
        $conteudos = DB::table('conteudo')->pluck('id')->toArray();

        foreach ($aulas as $aula) {
            $faker = Faker\Factory::create('pt_PT');
            for($i=0;$i<5;$i++){
                DB::table('aula_has_conteudo')->insert([
                    'aula_id' => $aula,
                    'conteudo_id' => $faker->unique()->randomElement($conteudos),
                ]);
            }
        }

        $this->command->info("Aula_has_Conteudo seeder - Finish");
    }
}
