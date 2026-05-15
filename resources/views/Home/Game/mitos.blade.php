@extends('Home.Layouts.app')

@section('content')
    <section>
        <div id="mitos-fakta-root"></div>
    </section>
@endsection

@push('scripts')
    @viteReactRefresh
    @vite('resources/js/react/Mitos/mitos-fakta.jsx')
@endpush
