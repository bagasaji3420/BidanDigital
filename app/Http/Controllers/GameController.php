<?php

namespace App\Http\Controllers;

use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Http\Request;

class GameController extends Controller
{
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

    public function nama()
    {
        $this->setSeo(
            'Generator Nama Bayi Modern, Islami, Unik & Artinya',
            'Temukan inspirasi nama bayi laki-laki dan perempuan lengkap dengan arti nama. Generator nama bayi modern, islami, aesthetic, unik, dan keren untuk calon buah hati.',
            'generator nama bayi, nama bayi islami, nama bayi modern, nama bayi perempuan, nama bayi laki laki, arti nama bayi, inspirasi nama bayi, nama aesthetic'
        );

        return view('Home.Game.name', [
            'title' => 'Generator Nama Bayi',
        ]);
    }

    public function mitos()
    {
        $this->setSeo(
            'Mitos vs Fakta Kehamilan — Uji Pengetahuanmu!',
            'Game edukasi interaktif seputar mitos dan fakta kehamilan. Geser kartu, uji pengetahuanmu, dan pelajari fakta medis dari bidan.',
            'mitos fakta kehamilan, edukasi kehamilan, game kehamilan, pengetahuan ibu hamil, fakta medis kehamilan'
        );

        return view('Home.Game.mitos', [
            'title' => 'Mitos vs Fakta Kehamilan',
        ]);
    }

    public function piringku()
    {
        $this->setSeo(
            'Isi Piringku — Simulasi Gizi Seimbang Ibu Hamil & MPASI',
            'Game edukasi interaktif menyusun gizi seimbang untuk ibu hamil dan MPASI bayi. Drag & drop makanan ke zona yang tepat dan lihat skor gizimu!',
            'isi piringku, gizi seimbang, edukasi gizi ibu hamil, mpasi bayi, simulasi nutrisi, game gizi'
        );

        return view('Home.Game.piringku', [
            'title' => 'Isi Piringku',
        ]);
    }

    public function tasSiaga()
    {
        $this->setSeo(
            'Tas Siaga Persalinan — Game Edukasi Persiapan Melahirkan',
            'Game edukasi interaktif membantu calon ibu menyiapkan perlengkapan wajib tas persalinan. Temukan dan kemas semua barang penting sebelum hari H!',
            'tas siaga persalinan, perlengkapan melahirkan, persiapan persalinan, game edukasi ibu hamil, buku KIA, bidan'
        );

        return view('Home.Game.tas-siaga', [
            'title' => 'Tas Siaga Persalinan',
        ]);
    }
}
