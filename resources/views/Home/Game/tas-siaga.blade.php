@extends('Home.Layouts.app')

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
        <div class="col-12">
            <div class="card border-0 shadow-sm p-0 overflow-hidden" style="min-height: 80vh;">
                <div id="tas-siaga-root"></div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
    @viteReactRefresh
    @vite('resources/js/react/TasSiaga/tas-siaga.jsx')
@endpush
