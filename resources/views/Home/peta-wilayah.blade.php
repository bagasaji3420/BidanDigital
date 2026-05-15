@extends('Home.Layouts.app')

@section('content')
    <style>
        /* Turunkan semua Leaflet panes ke z-index rendah */
        #peta-wilayah-root .leaflet-pane {
            z-index: 4 !important;
        }

        #peta-wilayah-root .leaflet-tile-pane {
            z-index: 2 !important;
        }

        #peta-wilayah-root .leaflet-overlay-pane {
            z-index: 3 !important;
        }

        #peta-wilayah-root .leaflet-shadow-pane {
            z-index: 4 !important;
        }

        #peta-wilayah-root .leaflet-marker-pane {
            z-index: 5 !important;
        }

        #peta-wilayah-root .leaflet-tooltip-pane {
            z-index: 6 !important;
        }

        #peta-wilayah-root .leaflet-popup-pane {
            z-index: 7 !important;
        }

        #peta-wilayah-root .leaflet-control {
            z-index: 8 !important;
        }

        #peta-wilayah-root .leaflet-map-pane canvas {
            z-index: 1 !important;
        }

        #peta-wilayah-root .leaflet-map-pane svg {
            z-index: 2 !important;
        }

        /* Isolasi stacking context peta dari navbar */
        #peta-wilayah-root {
            isolation: isolate;
            position: relative;
            z-index: 0;
        }
    </style>

    {{-- HAPUS overflow-hidden dari card, ganti dengan clip manual --}}
    <div class="card border-0 shadow-sm" style="height: 80vh; overflow: visible;">
        <div style="height: 100%; border-radius: inherit; overflow: hidden; position: relative; z-index: 0;">
            <div id="peta-wilayah-root" style="height: 100%;"></div>
        </div>
    </div>

    <span>
        <a target="_blank"
            href="https://layanandata.kemkes.go.id/katalog-data/profil-kesehatan/ketersediaan-data/profil-kesehatan-2023">
            Sumber: Profil Kesehatan Indonesia 2023, Kemenkes RI
        </a>
    </span>
@endsection

@push('scripts')
    @viteReactRefresh
    @vite('resources/js/react/Wilayah/index.jsx')
@endpush
