<?php

use Illuminate\Database\Seeder;

class CursoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Curso seeder - Start");

        $cursos = [
            'TeSP em Alimentação Saudável',
            'TeSP em Ambiente, Património e Turismo Sustentável',
            'TeSP em Análises Laboratoriais',
            'TeSP em Animação em Turismo de Natureza e Aventura',
            'TeSP em Apoio à Gestão',
            'TeSP em Aquacultura e Recursos Marinhos',
            'TeSP em Audiovisual e Multimédia',
            'TeSP em Automação, Robótica e Manutenção Industrial',
            'TeSP em Comunicação Digital',
            'TeSP em Condução de Obra e Reabilitação',
            'TeSP em Construção Civil',
            'TeSP em Cozinha e Produção Alimentar',
            'TeSP em Desenvolvimento Web e Multimédia',
            'TeSP em Design para Media Digitais',
            'TeSP em Eletrónica e Redes de Telecomunicações',
            'TeSP em Energias Renováveis e Eficiência Energética',
            'TeSP em Estética, Cosmética e Bem-Estar',
            'TeSP em Fabricação Automática',
            'TeSP em Gerontologia',
            'TeSP em Gestão da Qualidade',
            'TeSP em Gestão dos Negócios Internacionais',
            'TeSP em Gestão e Tecnologias Avançadas em Recursos Minerais',
            'TeSP em Gestão Energética e Ambiental',
            'TeSP em Gestão Hoteleira e Alojamento',
            'TeSP em Ilustração e Produção Gráfica',
            'TeSP em Inovação e Tecnologia Alimentar',
            'TeSP em Intervenção em Espaços Educativos',
            'TeSP em Intervenção Social e Comunitária',
            'TeSP em Intervenção Sociocultural e Desportiva',
            'TeSP em Marketing Digital no Turismo',
            'TeSP em Práticas Administrativas e Comunicação Empresarial',
            'TeSP em Processo Industrial',
            'TeSP em Processos de Transformação de Plásticos',
            'TeSP em Produção Industrial e Desenvolvimento de Produto – Cerâmica e Vidro',
            'TeSP em Produtos de Apoio em Saúde',
            'TeSP em Programação de Sistemas de Informação',
            'TeSP em Projeto de Moldes',
            'TeSP em Prototipagem Digital e Desenho 3D',
            'TeSP em Redes e Sistemas Informáticos',
            'TeSP em Serviços Jurídicos',
            'TeSP em Sistemas de Informação e Modelação do Espaço Urbano',
            'TeSP em Sistemas Eletromecânicos',
            'TeSP em Tecnologia Automóvel',
            'TeSP em Tecnologias Informáticas',
            'TeSP em Veículos Elétricos e Híbridos',
            'TeSP em Venda e Negociação Comercial',
        ];

        $faker = Faker\Factory::create('pt_PT');
        $createdAt = Carbon\Carbon::now()->subDays(30);
        foreach ($cursos as $curso) {
            DB::table('curso')->insert([
                'nome' => $curso,
                'estado' => $faker->randomElement(["0", "1"]),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
        $this->command->info("Curso seeder - Finish");
    }
}
