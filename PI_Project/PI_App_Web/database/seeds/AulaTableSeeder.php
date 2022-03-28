<?php

use Illuminate\Database\Seeder;

class AulaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Aula seeder - Start");

        $faker = Faker\Factory::create('pt_PT');
        $professor = DB::table('professor')->pluck('id')->toArray();
        $unidadeCurricular = DB::table('unidadecurricular')->pluck('id')->toArray();

        for ($i = 0; $i < 1000; ++$i) {
            DB::table('aula')->insert($this->fakeAula($faker,$faker->randomElement($professor),$faker->randomElement($unidadeCurricular)));
        }
        $this->command->info("Aula seeder - Finish");
    }

    private function fakeAula(Faker\Generator $faker,$professor,$unidadeCurricular)
    {
        $createdAt = Carbon\Carbon::now()->subDays(30);
        return [
            'codigo' => $faker->numberBetween(10000000,999999999),
            'data'=>$faker->date(),
            'estado' => $faker->randomElement(["0","1"]),
            'professor_id' =>$professor,
            'unidade_curricular_id' => $unidadeCurricular,
            'isArchived' => $faker->randomElement(["0","1"]),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
