@extends('Home.Layouts.app')

@section('content')
    <section>
        <div id="isi-piringku-root"></div>
    </section>
@endsection

@push('scripts')
    @viteReactRefresh
    @vite('resources/js/react/Piring/isi-piringku.jsx')
@endpush
