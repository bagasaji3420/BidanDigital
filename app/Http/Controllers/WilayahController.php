<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\TwitterCard;

class WilayahController extends Controller
{
    /**
     * GET /api/wilayah
     * List semua provinsi + ringkasan indikator terbaru
     */

    private function setSeo(string $title, string $description, string $keywords = '')
    {
        SEOMeta::setTitle($title . ' | BundaMuda');
        SEOMeta::setDescription($description);
        SEOMeta::setCanonical(url()->current());
        if ($keywords) {
            SEOMeta::addKeyword(explode(',', $keywords));
        }

        OpenGraph::setTitle($title . ' | BundaMuda');
        OpenGraph::setDescription($description);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setType('website');

        TwitterCard::setTitle($title . ' | BundaMuda');
        TwitterCard::setDescription($description);
        TwitterCard::setType('summary');
    }



    public function index()
    {
        $wilayah = DB::table('wilayah')
            ->orderBy('nama')
            ->get();

        return response()->json([
            'status' => 'ok',
            'data'   => $wilayah,
        ]);
    }

    /**
     * GET /api/wilayah/{kode}
     * Detail 1 provinsi + semua indikator per tahun
     */
    public function show(string $kode)
    {
        $wilayah = DB::table('wilayah')
            ->where('kode', $kode)
            ->first();

        if (! $wilayah) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Wilayah tidak ditemukan',
            ], 404);
        }

        // Semua indikator wilayah ini, dikelompokkan per indikator → per tahun
        $rawIndikator = DB::table('indikator_kesehatan')
            ->where('kode_wilayah', $kode)
            ->orderBy('indikator')
            ->orderBy('tahun')
            ->get();

        // Format: { aki: [{tahun, nilai, satuan}, ...], akb: [...], ... }
        $indikator = [];
        foreach ($rawIndikator as $row) {
            $indikator[$row->indikator][] = [
                'tahun'   => $row->tahun,
                'nilai'   => (float) $row->nilai,
                'satuan'  => $row->satuan,
                'sumber'  => $row->sumber,
                'catatan' => $row->catatan,
            ];
        }

        return response()->json([
            'status' => 'ok',
            'data'   => [
                'wilayah'   => $wilayah,
                'indikator' => $indikator,
            ],
        ]);
    }

    public function petaWilayah()
    {
        $this->setSeo(
            'Peta Kesehatan Indonesia — Data Indikator Kesehatan per Provinsi',
            'Visualisasi interaktif data kesehatan Indonesia per provinsi meliputi AKI, AKB, stunting, imunisasi, dan HIV. Sumber: Profil Kesehatan Indonesia 2023, Kemenkes RI.',
            'peta kesehatan indonesia, angka kematian ibu, angka kematian bayi, stunting, imunisasi, HIV, data kesehatan provinsi, profil kesehatan 2023'
        );

        return view('Home.peta-wilayah', [
            'title' => 'Peta Kesehatan Indonesia',
        ]);
    }
}
