# generate_tools_views.ps1
# Jalanin di root project Laravel: .\generate_tools_views.ps1

$baseDir = "resources\views\Home\Tools"

# Buat folder kalau belum ada
New-Item -ItemType Directory -Force -Path $baseDir | Out-Null

# ─── LIST TOOLS: slug => title ─────────────────────────────────────────────────
$tools = [ordered]@{
    "hpl"                   = "Kalkulator HPL (Hari Perkiraan Lahir)"
    "usia-kehamilan"        = "Kalkulator Usia Kehamilan"
    "bmi"                   = "BMI Ibu Hamil"
    "kenaikan-bb"           = "Kenaikan Berat Badan Ideal Ibu Hamil"
    "kebutuhan-kalori"      = "Kebutuhan Kalori Ibu Hamil"
    "kick-counter"          = "Kick Counter (Hitung Tendangan Bayi)"
    "kontraksi"             = "Tracker Kontraksi"
    "menyusui"              = "Tracker Menyusui"
    "pertumbuhan-bayi"      = "Grafik Pertumbuhan Bayi"
    "skrining-preeklampsia" = "Skrining Preeklampsia"
    "epds"                  = "Skrining Baby Blues (EPDS)"
    "jadwal-imunisasi"      = "Jadwal Imunisasi Bayi"
    "jadwal-anc"            = "Jadwal ANC (Antenatal Care)"
    "checklist-persalinan"  = "Checklist Persalinan"
}

# ─── GENERATE ──────────────────────────────────────────────────────────────────
foreach ($slug in $tools.Keys) {
    $title    = $tools[$slug]
    $filepath = "$baseDir\$slug.blade.php"

    if (Test-Path $filepath) {
        Write-Host "SKIP     $filepath (already exists)" -ForegroundColor Yellow
        continue
    }

    $content = @"
@extends('Home.Layouts.app')

@section('content')

{{-- TODO: isi konten $title --}}

 <section style="min-height: 100vh;">
</section>

@endsection
"@

    Set-Content -Path $filepath -Value $content -Encoding UTF8
    Write-Host "CREATED  $filepath" -ForegroundColor Green
}

$count = (Get-ChildItem "$baseDir\*.blade.php").Count
Write-Host ""
Write-Host "Done! $count blade files ready di $baseDir" -ForegroundColor Cyan