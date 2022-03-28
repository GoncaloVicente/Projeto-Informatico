<?php

use Illuminate\Database\Seeder;

class ConteudoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Conteudo seeder - Start");

        $conteudos = [
            'Arduino',
            'Tabelas de verdade',
            'Base de dados relacionais',
            'Html',
            'Laravel',
            'Laragon',
            'VueJs',
            'ASP.NET',
            'Serviço',
            'Websockets',
            'Threads',
            'Sistemas Operativos',
            'TCP/IP',
            'OSI',
            'Curriculum vitae'
        ];


        $faker = Faker\Factory::create('pt_PT');
        $temas = DB::table('tema')->pluck('id')->toArray();
        $createdAt = Carbon\Carbon::now()->subDays(30);
        $l = 0;
        foreach ($conteudos as $conteudo) {
            $l = $l + 1;
            DB::table('conteudo')->insert([
                'nome' => $conteudo,
                'tipo' => $faker->randomElement(["t", "pl", "ext", "expl"]),
                'tema_id' => $faker->randomElement($temas),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
        $this->command->info("Conteudo seeder - Finish");
    }
}
