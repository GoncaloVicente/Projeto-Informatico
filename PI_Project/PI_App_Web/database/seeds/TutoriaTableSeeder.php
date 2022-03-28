<?php

use Illuminate\Database\Seeder;

class TutoriaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Tutoria seeder - Start");
        $faker = Faker\Factory::create('pt_PT');
        $professor = DB::table('professor')->pluck('id')->toArray();
        $unidadeCurricular = DB::table('unidadecurricular')->pluck('id')->toArray();
        $conteudo = DB::table('conteudo')->pluck('nome')->toArray();
        $sala = DB::table('sala')->pluck('id')->toArray();
        $aluno = DB::table('aluno')->pluck('id')->toArray();

        for ($i = 0; $i < 100; ++$i) {
            DB::table('tutoria')->insert($this->fakePedido($faker,$faker->randomElement($conteudo),$faker->randomElement($sala),$faker->randomElement($professor),$faker->randomElement($aluno),$faker->randomElement($unidadeCurricular)));
        }
        $this->command->info("Tutoria seeder - Finish");
    }

    private function fakePedido(Faker\Generator $faker,$conteudo, $sala, $professor, $aluno, $unidadeCurricular)
    {
        $createdAt = Carbon\Carbon::now()->subDays(30);
        return [
            'pedido' => $faker->randomElement(['a','p']),
            'data'=>$faker->date(),
            'horaInicio' => $faker->time('H:i'),
            'assunto' =>$conteudo,
            'descricao' =>null,
            'estado' => $faker->randomElement(["0","1"]),
            'sala_id' => $sala,
            'professor_id' => $professor,
            'aluno_id' => $aluno,
            'unidade_curricular_id' => $unidadeCurricular,
            'isArchivedProfessor' => $faker->randomElement(["0","1"]),
            'isArchivedAluno' => $faker->randomElement(["0","1"]),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
