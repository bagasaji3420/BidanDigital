@extends('Home.Layouts.app')

@section('content')
    <section id="landingContact" class="py-5">
        <div class="container" style="max-width:600px;">

            <div class="text-center mb-5">
                <h2 class="fw-bold">Hubungi Kami</h2>
                <p class="text-muted">
                    Ada pertanyaan, saran, atau masukan? Kirimkan pesan dan kami akan
                    membalas secepatnya melalui email.
                </p>
            </div>

            @if (session('success'))
                <div class="alert alert-success d-flex gap-2 align-items-center" style="border-radius:10px;">
                    <i class="bx bx-check-circle fs-5"></i>
                    {{ session('success') }}
                </div>
            @endif

            <div class="card shadow-sm" style="border-radius:16px;">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('contact.send') }}" method="POST">
                        @csrf

                        <div class="mb-3">
                            <label class="form-label">Nama</label>
                            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
                                value="{{ old('name') }}" placeholder="Nama kamu" required>
                            @error('name')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"
                                value="{{ old('email') }}" placeholder="email@kamu.com" required>
                            @error('email')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Subject</label>
                            <input type="text" name="subject" class="form-control @error('subject') is-invalid @enderror"
                                value="{{ old('subject') }}" placeholder="Topik pesan" required>
                            @error('subject')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="form-label">Pesan</label>
                            <textarea name="message" rows="5" class="form-control @error('message') is-invalid @enderror"
                                placeholder="Tuliskan pesanmu di sini..." required>{{ old('message') }}</textarea>
                            @error('message')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <button type="submit" class="btn btn-primary w-100">
                            <i class="bx bx-send me-1"></i> Kirim Pesan
                        </button>

                    </form>
                </div>
            </div>

        </div>
    </section>
@endsection
