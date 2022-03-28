<?php

use Illuminate\Database\Seeder;

class SalaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info("Sala seeder - Start");

        $salas = [
            'A.S.1.0',
            'A.S.1.1',
            'A.S.1.2',
            'A.S.1.3',
            'A.S.1.4',
            'A.S.1.5',
            'A.S.1.6',
            'A.S.1.7',
            'A.S.1.8',
            'A.S.1.9',
            'A.S.1.10',
            'A.S.1.11',
            'A.S.1.12',
            'A.S.1.13',
            'A.S.1.14',
            'A.S.1.15',
            'A.S.1.16',
            'A.S.1.17',
            'A.S.1.18',
            'A.S.1.19',
            'A.S.1.20',
            'A.S.1.21',
            'A.S.1.22',
            'A.S.1.23',
            'A.S.1.24',
            'A.S.1.25',
            'A.S.1.26',
            'A.S.1.27',
            'A.S.1.28',
            'A.S.1.29',
            'A.S.1.30',
            'A.S.1.31',
            'A.S.1.32',
            'A.S.1.33',
            'A.S.1.34',
            'A.S.1.35',
            'A.S.1.36',
            'A.S.1.37',
            'A.S.1.38',
            'A.S.1.39',
            'A.S.1.40',
            'A.S.1.41',
            'A.S.1.42',
            'A.S.1.43',
            'A.S.1.44',
            'A.S.1.45',
            'A.S.1.46',
            'A.S.1.47',
            'A.S.1.48',
            'A.S.1.49',
            'A.S.1.50',
            'A.S.1.51',
            'A.S.1.52',
            'A.S.1.53',
            'A.S.1.54',
            'A.S.1.55',
            'A.S.1.56'
        ];

        $createdAt = Carbon\Carbon::now()->subDays(30);
        foreach ($salas as $sala) {
            DB::table('sala')->insert([
                'nome' => $sala,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
        $this->command->info("Sala seeder - Finish");
    }
}
