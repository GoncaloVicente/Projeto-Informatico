<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("-----------------------------------------------");
        $this->command->info("START of database seeder");
        $this->command->info("-----------------------------------------------");

        $this->call(UsersTableSeeder::class);
        $this->call(CursoTableSeeder::class);
        $this->call(SalaTableSeeder::class);
        $this->call(AlunosTableSeeder::class);
        $this->call(UnidadeCurricularTableSeeder::class);
        $this->call(UnidadeCurricular_has_ProfessorTableSeeder::class);
        $this->call(Curso_has_professorTableSeeder::class);
        $this->call(Aluno_has_UnidadeCurricularTableSeeder::class);
        $this->call(AulaTableSeeder::class);
        $this->call(TemasTableSeeder::class);
        $this->call(ConteudoTableSeeder::class);
        $this->call(TutoriaTableSeeder::class);
        $this->call(Aula_has_ConteudoTableSeeder::class);
        $this->call(ClassificacaoTableSeeder::class);
        $this->call(Aula_has_AlunoTableSeeder::class);

        $this->command->info("-----------------------------------------------");
        $this->command->info("END of database seeder");
        $this->command->info("-----------------------------------------------");
    }
}
