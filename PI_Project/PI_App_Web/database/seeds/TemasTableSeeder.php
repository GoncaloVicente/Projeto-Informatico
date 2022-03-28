<?php

use Illuminate\Database\Seeder;

class TemasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Tema seeder - Start");

        $temas = [
            'Internet das coisas',
            'Programação em C',
            'Programação em Java',
            'Programação em C#',
            'Programação em Android Studio',
            'Aplicações móveis',
            'Sistemas Operativos',
            'IPv4',
            'IPv6',
            'Capacidades de SysAdmin',
            'Manipulação da DOM',
        ];
        $faker = Faker\Factory::create('pt_PT');
        $professor = DB::table('professor')->pluck('id')->toArray();
        $unidadeCurricular = DB::table('unidadecurricular')->pluck('id')->toArray();
        $createdAt = Carbon\Carbon::now()->subDays(30);
        $l = 0;
        foreach ($temas as $tema) {
            $l = $l + 1;
            DB::table('tema')->insert([
                'nome' => $tema,
                'professor_id' => $faker->randomElement($professor),
                'uC_id' => $faker->randomElement($unidadeCurricular),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
            if ($l % 5 == 0) {
                $this->command->info("Inseridos $l temas");
                $this->command->info("");
            }
        }
        $this->command->info("Tema seeder - Finish");
    }
}
