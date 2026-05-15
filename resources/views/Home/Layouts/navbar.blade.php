<!-- Navbar: Start -->
<nav class="layout-navbar shadow-none py-0 d-none d-lg-block">
    <div class="container">
        <div class="navbar navbar-expand-lg landing-navbar px-3 px-md-8">
            <!-- Menu logo wrapper: Start -->
            <div class="navbar-brand app-brand demo d-flex py-0 me-4 me-xl-8">
                <!-- Mobile menu toggle: Start-->
                <button class="navbar-toggler border-0 px-0 me-4" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i class="icon-base bx bx-menu icon-lg align-middle text-heading fw-medium"></i>
                </button>
                <!-- Mobile menu toggle: End-->
                <a href="{{ route('index') }}" class="app-brand-link">
                    <span class="app-brand-logo demo">
                        <img src="{{ asset('assets/img/favicon/icon.webp') }}" alt="{{ config('app.name') }}"
                            style="height: 32px; width: 32px; object-fit: cover; border-radius: 50%;">
                    </span>

                    <span class="app-brand-text demo menu-text fw-bold ms-2 ps-1 fst-italic fs-6 fs-xl-5"
                        id="app-name">{{ config('app.name') }}</span>
                </a>
            </div>
            <!-- Menu logo wrapper: End -->
            <!-- Menu wrapper: Start -->
            <div class="collapse navbar-collapse landing-nav-menu" id="navbarSupportedContent">
                <button class="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl p-2"
                    type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="icon-base bx bx-x icon-lg"></i>
                </button>
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link fw-medium" aria-current="page" href="/">Beranda</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-medium" href="{{ route('article.index') }}">Artikel</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-medium" href="{{ route('contact') }}">Kontak</a>
                    </li>


                    <li class="nav-item mega-dropdown" >
                        <a href="javascript:void(0);"
                            class="nav-link dropdown-toggle navbar-ex-14-mega-dropdown mega-dropdown fw-medium"
                            aria-expanded="false" data-bs-toggle="mega-dropdown" data-trigger="hover">
                            <span data-i18n="Apps">Apps</span>
                        </a>
                        <div class="dropdown-menu p-4 p-xl-8" >
                            <div class="row gy-4">

                                {{-- Kolom 1: Kalkulator --}}
                                <div class="col-12 col-lg">
                                    
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link" href="{{ route('app') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Apps
                                            </a>
                                        </li>
                                    </ul>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link" href="{{ route('tools.panduan') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Dokumentasi
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="h6 d-flex align-items-center mt-4 mb-3 mb-lg-4">
                                        <div class="avatar shrink-0 me-3">
                                            <span class="avatar-initial rounded bg-label-primary">
                                                <i class="icon-base bx bx-calculator"></i>
                                            </span>
                                        </div>
                                        <span class="ps-1">Kalkulator</span>
                                    </div>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link" href="{{ route('tools.hpl') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Kalkulator HPL
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.kebutuhan-kalori') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Kebutuhan Kalori
                                            </a>
                                        </li>
                                    </ul>



                                    <div class="h6 d-flex align-items-center mt-4 mb-3 mb-lg-4">
                                        <div class="avatar shrink-0 me-3">
                                            <span class="avatar-initial rounded bg-label-warning">
                                                <i class="icon-base bx bx-clipboard"></i>
                                            </span>
                                        </div>
                                        <span class="ps-1">Perkiraan</span>
                                    </div>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link" href="{{ route('tools.goldar') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Golongan Darah Anak
                                            </a>
                                        </li>
                                    </ul>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link" href="{{ route('tools.tinggi') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Tinggi Anak
                                            </a>
                                        </li>
                                    </ul>

                                </div>

                                {{-- Kolom 2: Tracker --}}
                                <div class="col-12 col-lg">
                                    <div class="h6 d-flex align-items-center mb-3 mb-lg-4">
                                        <div class="avatar shrink-0 me-3">
                                            <span class="avatar-initial rounded bg-label-success">
                                                <i class="icon-base bx bx-heart-circle"></i>
                                            </span>
                                        </div>
                                        <span class="ps-1">Tracker</span>
                                    </div>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.kalender-haid') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Kalender Haid
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.kick-counter') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Kick Counter
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.kontraksi') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Tracker Kontraksi
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.menyusui') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Tracker Menyusui
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.berat-badan') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Tracker Berat Badan
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.tekanan-darah') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Tracker Tekanan Darah
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.anemia') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Tracker Anemia
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.pertumbuhan-bayi') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Grafik Pertumbuhan Bayi
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {{-- Kolom 3: Skrining & Jadwal --}}
                                <div class="col-12 col-lg">
                                    <div class="h6 d-flex align-items-center mb-3 mb-lg-4">
                                        <div class="avatar shrink-0 me-3">
                                            <span class="avatar-initial rounded bg-label-warning">
                                                <i class="icon-base bx bx-clipboard"></i>
                                            </span>
                                        </div>
                                        <span class="ps-1">Skrining & Jadwal</span>
                                    </div>
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.skrining-preeklampsia') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Skrining Preeklampsia
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link" href="{{ route('tools.epds') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Skrining Baby Blues (EPDS)
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.jadwal-imunisasi') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Jadwal Imunisasi Bayi
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.jadwal-anc') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Jadwal ANC
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.jadwal-nifas') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Jadwal Nifas
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.checklist-persalinan') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Checklist Persalinan
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link mega-dropdown-link"
                                                href="{{ route('tools.test-kesiapan') }}">
                                                <i class="icon-base bx bx-radio-circle me-1"></i>
                                                Kesiapan Hamil
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {{-- Kolom 4: Gambar --}}
                                <div class="col-lg-4 d-none d-lg-block">
                                    <div class="bg-body nav-img-col p-2">
                                        <img src="{{ asset('assets/img/front-pages/misc/nav-item-col-img.webp') }}"
                                            alt="nav item col image" class="w-100" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="landing-menu-overlay d-lg-none"></div>
            <!-- Menu wrapper: End -->
            <!-- Toolbar: Start -->
            <!-- Toolbar: Start -->
            <ul class="navbar-nav flex-row align-items-center ms-auto">

                <!-- Style Switcher -->
                <li class="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                    <a class="nav-link dropdown-toggle hide-arrow" id="nav-theme" href="javascript:void(0);"
                        data-bs-toggle="dropdown">
                        <i class="icon-base bx bx-sun icon-lg theme-icon-active"></i>
                        <span class="d-none ms-2" id="nav-theme-text">Toggle theme</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="nav-theme-text">
                        <li>
                            <button type="button" class="dropdown-item align-items-center active"
                                data-bs-theme-value="light" aria-pressed="false">
                                <span><i class="icon-base bx bx-sun icon-md me-3" data-icon="sun"></i>Light</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="dropdown-item align-items-center"
                                data-bs-theme-value="dark" aria-pressed="true">
                                <span><i class="icon-base bx bx-moon icon-md me-3" data-icon="moon"></i>Dark</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="dropdown-item align-items-center"
                                data-bs-theme-value="system" aria-pressed="false">
                                <span><i class="icon-base bx bx-desktop icon-md me-3"
                                        data-icon="desktop"></i>System</span>
                            </button>
                        </li>
                    </ul>
                </li>
                <!-- / Style Switcher -->

                {{-- Notification (hanya kalau login) --}}
                @auth
                    @include('Home.Layouts.notification')
                @endauth
                <!-- navbar button: Start -->
                <li>
                    @auth
                        <a href="{{ route('dashboard') }}" class="btn btn-primary">
                            <span class="tf-icons icon-base bx bx-grid-alt scaleX-n1-rtl me-md-1"></span>
                            <span class="d-none d-md-block">Dashboard</span>
                        </a>
                    @else
                        <a href="{{ route('login') }}" class="btn btn-primary">
                            <span class="tf-icons icon-base bx bx-log-in-circle scaleX-n1-rtl me-md-1"></span>
                            <span class="d-none d-md-block">Login</span>
                        </a>
                    @endauth
                </li>
                <!-- navbar button: End -->

            </ul>

        </div>
    </div>
</nav>
<!-- Navbar: End -->


{{-- Mobile Offcanvas Menu --}}
<div class="offcanvas offcanvas-start d-lg-none" tabindex="-1" id="mobileMenu" style="width: 300px;">
    <div class="offcanvas-header border-bottom">
        <a href="{{ route('index') }}" class="d-flex align-items-center text-decoration-none gap-2">
            <img src="{{ asset('assets/img/favicon/icon.webp') }}"
                style="height: 32px; width: 32px; border-radius: 50%; object-fit: cover;">
            <span class="fw-bold fst-italic">{{ config('app.name') }}</span>
        </a>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body p-3">
        <ul class="nav flex-column gap-1">

            <li class="nav-item">
                <a class="nav-link fw-medium" href="/">Beranda</a>
            </li>
            <li class="nav-item">
                <a class="nav-link fw-medium" href="{{ route('article.index') }}">Artikel</a>
            </li>
            


            {{-- Tools Accordion --}}
            <li class="nav-item">
                <a class="nav-link fw-medium d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse" href="#toolsMobile" role="button">
                    Apps <i class="bx bx-chevron-down"></i>
                </a>
                <div class="collapse" id="toolsMobile">
                    <ul class="nav flex-column ps-2 mt-1 gap-1">

                        <li><span class="px-3 small text-muted fw-semibold">Panduan</span></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.panduan') }}">Dokumentasi</a></li>

                        <li class="mt-2"><span class="px-3 small text-muted fw-semibold">Kalkulator</span></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.hpl') }}">Kalkulator HPL</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.kebutuhan-kalori') }}">Kebutuhan
                                Kalori</a></li>

                        <li class="mt-2"><span class="px-3 small text-muted fw-semibold">Perkiraan</span></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.goldar') }}">Golongan Darah Anak</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.tinggi') }}">Tinggi Anak</a></li>

                        <li class="mt-2"><span class="px-3 small text-muted fw-semibold">Tracker</span></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.kalender-haid') }}">Kalender Haid</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.kick-counter') }}">Kick Counter</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.kontraksi') }}">Tracker Kontraksi</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.menyusui') }}">Tracker Menyusui</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.berat-badan') }}">Tracker Berat Badan</a>
                        </li>
                        <li><a class="nav-link py-1" href="{{ route('tools.tekanan-darah') }}">Tracker Tekanan
                                Darah</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.anemia') }}">Tracker Anemia</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.pertumbuhan-bayi') }}">Grafik Pertumbuhan
                                Bayi</a></li>

                        <li class="mt-2"><span class="px-3 small text-muted fw-semibold">Skrining & Jadwal</span>
                        </li>
                        <li><a class="nav-link py-1" href="{{ route('tools.skrining-preeklampsia') }}">Skrining
                                Preeklampsia</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.epds') }}">Skrining Baby Blues</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.jadwal-imunisasi') }}">Jadwal
                                Imunisasi</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.jadwal-anc') }}">Jadwal ANC</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.jadwal-nifas') }}">Jadwal Nifas</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.checklist-persalinan') }}">Checklist
                                Persalinan</a></li>
                        <li><a class="nav-link py-1" href="{{ route('tools.test-kesiapan') }}">Kesiapan Hamil</a>
                        </li>
                    </ul>
                </div>
            </li>

            {{-- Login/Dashboard --}}
            <li class="nav-item mt-3">
                @auth
                    <a href="{{ route('dashboard') }}" class="btn btn-primary w-100">Dashboard</a>
                @else
                    <a href="{{ route('login') }}" class="btn btn-primary w-100">Login</a>
                @endauth
            </li>

        </ul>
    </div>
</div>
