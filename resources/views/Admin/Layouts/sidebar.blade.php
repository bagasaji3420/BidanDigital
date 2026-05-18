<!-- Menu -->

<aside id="layout-menu" class="layout-menu menu-vertical menu">
    <div class="app-brand demo">
        <a href="#" class="app-brand-link">
            <span class="app-brand-logo demo">
                <span class="text-primary">

                </span>
            </span>
            <span class="app-brand-text demo menu-text fw-bold ms-2">{{ config('app.name') }}</span>
        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
            <i class="icon-base bx bx-chevron-left"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
        <!-- Dashboards -->
        @hasrole(['developer', 'owner'])
            <li class="menu-item">
                <a href="{{ route('dashboard') }}" class="menu-link">
                    <i class="menu-icon icon-base bx bx-home-smile"></i>
                    <div data-i18n="Dashboards">Dashboards</div>
                </a>
            </li>
        @endhasrole

        <li class="menu-item">
            <a href="{{ route('articles.index') }}" class="menu-link">
                <i class="menu-icon icon-base bx bx-news"></i>
                <div data-i18n="Article">Article</div>
            </a>
        </li>
        @canany(['users.read', 'roles.read', 'permissions.read', 'logs.read'])
            <!-- Apps & Pages -->
            <li class="menu-header small">
                <span class="menu-header-text" data-i18n="System">System</span>
            </li>
        @endcan

        @canany(['users.read', 'users.create', 'users.update', 'users.delete'])
            <li class="menu-item">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon icon-base bx bx-user"></i>
                    <div data-i18n="Users">Users</div>
                </a>

                <ul class="menu-sub">
                    @can('users.read')
                        <li class="menu-item">
                            <a href="{{ route('users.index') }}" class="menu-link">
                                <div data-i18n="List">List</div>
                            </a>
                        </li>
                    @endcan
                </ul>
            </li>
        @endcanany

        @canany(['roles.read', 'permissions.read', 'roles.read'])
            <li class="menu-item">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon icon-base bx bx-check-shield"></i>
                    <div>Roles</div>
                </a>

                <ul class="menu-sub">

                    @can('roles.read')
                        <li class="menu-item">
                            <a href="{{ route('roles.index') }}" class="menu-link">
                                <div>Roles</div>
                            </a>
                        </li>
                    @endcan

                    @can('permissions.read')
                        <li class="menu-item">
                            <a href="{{ route('permissions.index') }}" class="menu-link">
                                <div>Permission</div>
                            </a>
                        </li>
                    @endcan

                </ul>
            </li>
        @endcanany


        @canany(['logs.read'])

            <li class="menu-item">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                    <i class="menu-icon icon-base bx bx-box"></i>
                    <div>Logs</div>
                </a>

                <ul class="menu-sub">

                    @can('logs.read')
                        <li class="menu-item">
                            <a href="{{ route('activity-logs') }}" class="menu-link">
                                <div>Activity</div>
                            </a>
                        </li>
                    @endcan

                    @hasrole('developer')
                        <li class="menu-item">
                            <a href="/log-viewer" target="_blank" class="menu-link">
                                <div>App</div>
                            </a>
                        </li>
                    @endhasrole

                </ul>
            </li>
        @endcanany


        {{-- @if (Auth::user()->hasAnyRole(['owner', 'developer']))
            <!-- Dashboards -->
            <li class="menu-item">
                <a href="{{ route('app.setting') }}" class="menu-link">
                    <i class="menu-icon icon-base bx bx-cog"></i>
                    <div data-i18n="Settings">Settings</div>
                </a>
            </li>
        @endif --}}


    </ul>
</aside>

<div class="menu-mobile-toggler d-xl-none rounded-1">
    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1">
        <i class="bx bx-menu icon-base"></i>
        <i class="bx bx-chevron-right icon-base"></i>
    </a>
</div>
<!-- / Menu -->
