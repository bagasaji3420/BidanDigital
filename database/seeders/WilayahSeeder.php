<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WilayahSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $data = [
            ['kode' => '11', 'nama' => 'Aceh',                        'lat' =>  4.6951,  'lng' => 96.7494],
            ['kode' => '12', 'nama' => 'Sumatera Utara',              'lat' =>  2.1154,  'lng' => 99.5451],
            ['kode' => '13', 'nama' => 'Sumatera Barat',              'lat' =>  0.7399,  'lng' => 100.8000],
            ['kode' => '14', 'nama' => 'Riau',                        'lat' =>  0.2933,  'lng' => 101.7068],
            ['kode' => '15', 'nama' => 'Jambi',                       'lat' => -1.6101,  'lng' => 103.6131],
            ['kode' => '16', 'nama' => 'Sumatera Selatan',            'lat' => -3.3194,  'lng' => 103.9144],
            ['kode' => '17', 'nama' => 'Bengkulu',                    'lat' => -3.7928,  'lng' => 102.2608],
            ['kode' => '18', 'nama' => 'Lampung',                     'lat' => -4.5586,  'lng' => 105.4068],
            ['kode' => '19', 'nama' => 'Kepulauan Bangka Belitung',   'lat' => -2.7411,  'lng' => 106.4406],
            ['kode' => '21', 'nama' => 'Kepulauan Riau',              'lat' =>  3.9457,  'lng' => 108.1429],
            ['kode' => '31', 'nama' => 'DKI Jakarta',                 'lat' => -6.2088,  'lng' => 106.8456],
            ['kode' => '32', 'nama' => 'Jawa Barat',                  'lat' => -6.9147,  'lng' => 107.6098],
            ['kode' => '33', 'nama' => 'Jawa Tengah',                 'lat' => -7.1500,  'lng' => 110.1403],
            ['kode' => '34', 'nama' => 'DI Yogyakarta',               'lat' => -7.8753,  'lng' => 110.4262],
            ['kode' => '35', 'nama' => 'Jawa Timur',                  'lat' => -7.5360,  'lng' => 112.2384],
            ['kode' => '36', 'nama' => 'Banten',                      'lat' => -6.4058,  'lng' => 106.0640],
            ['kode' => '51', 'nama' => 'Bali',                        'lat' => -8.3405,  'lng' => 115.0920],
            ['kode' => '52', 'nama' => 'Nusa Tenggara Barat',         'lat' => -8.6529,  'lng' => 117.3616],
            ['kode' => '53', 'nama' => 'Nusa Tenggara Timur',         'lat' => -8.6574,  'lng' => 121.0794],
            ['kode' => '61', 'nama' => 'Kalimantan Barat',            'lat' =>  0.2787,  'lng' => 111.4753],
            ['kode' => '62', 'nama' => 'Kalimantan Tengah',           'lat' => -1.6815,  'lng' => 113.3824],
            ['kode' => '63', 'nama' => 'Kalimantan Selatan',          'lat' => -3.0926,  'lng' => 115.2838],
            ['kode' => '64', 'nama' => 'Kalimantan Timur',            'lat' =>  0.5387,  'lng' => 116.4194],
            ['kode' => '65', 'nama' => 'Kalimantan Utara',            'lat' =>  3.0731,  'lng' => 116.0413],
            ['kode' => '71', 'nama' => 'Sulawesi Utara',              'lat' =>  0.6246,  'lng' => 123.9750],
            ['kode' => '72', 'nama' => 'Sulawesi Tengah',             'lat' => -1.4300,  'lng' => 121.4456],
            ['kode' => '73', 'nama' => 'Sulawesi Selatan',            'lat' => -3.6687,  'lng' => 119.9740],
            ['kode' => '74', 'nama' => 'Sulawesi Tenggara',           'lat' => -4.1449,  'lng' => 122.1746],
            ['kode' => '75', 'nama' => 'Gorontalo',                   'lat' =>  0.5435,  'lng' => 123.0568],
            ['kode' => '76', 'nama' => 'Sulawesi Barat',              'lat' => -2.8441,  'lng' => 119.2321],
            ['kode' => '81', 'nama' => 'Maluku',                      'lat' => -3.2385,  'lng' => 130.1453],
            ['kode' => '82', 'nama' => 'Maluku Utara',                'lat' =>  1.5709,  'lng' => 127.8087],
            ['kode' => '91', 'nama' => 'Papua Barat',                 'lat' => -1.3361,  'lng' => 133.1747],
            ['kode' => '94', 'nama' => 'Papua',                       'lat' => -4.2699,  'lng' => 138.0804],
        ];

        foreach ($data as &$row) {
            $row['created_at'] = $now;
            $row['updated_at'] = $now;
        }

        DB::table('wilayah')->upsert(
            $data,
            ['kode'],
            ['nama', 'lat', 'lng', 'updated_at']
        );
    }
}
