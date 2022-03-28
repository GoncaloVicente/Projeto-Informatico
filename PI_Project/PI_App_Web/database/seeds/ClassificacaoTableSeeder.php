<?php

use Illuminate\Database\Seeder;

class ClassificacaoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Classificação seeder - Start");

        $faker = Faker\Factory::create('pt_PT');
        $conteudo = DB::table('conteudo')->pluck('id')->toArray();
        $aula = DB::table('aula')->pluck('id')->toArray();
        $aluno = DB::table('aluno')->pluck('id')->toArray();

        for ($i = 0; $i < 1000; ++$i) {
            DB::table('classificacao')->insert($this->fakeClassificacao($faker,$faker->randomElement($conteudo),$faker->randomElement($aula),$faker->randomElement($aluno)));
        }
        $this->command->info("Classificação seeder - Finish");
    }

    private function fakeClassificacao(Faker\Generator $faker,$conteudo, $aula, $aluno)
    {
        $createdAt = Carbon\Carbon::now()->subDays(30);
        return [
            'valor' => $faker->randomElement(["1","2","3","4","5"]),
            'conteudo_id' => $conteudo,
            'aula_id' => $aula,
            'aluno_id' => $aluno,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
