@extends('Admin.Layouts.app')

@section('content')
    @include('Admin.Article.menu')

    <div class="row">

        {{-- FORM CREATE --}}
        <div class="col-md-4">
            <div class="card p-4">
                <h5 class="mb-3">Add Category</h5>

                <form action="{{ route('categories.store') }}" method="POST">
                    @csrf

                    <div class="mb-3">
                        <label class="form-label">Category Name</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>

                    <button type="submit" class="btn btn-primary w-100">
                        Save
                    </button>
                </form>
            </div>
        </div>


        {{-- LIST CATEGORY --}}
        <div class="col-md-8">
            <div class="card p-4">
                <h5 class="mb-3">Category List</h5>

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th width="120">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($categories as $index => $category)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>{{ $category->name }}</td>
                                <td>{{ $category->slug }}</td>
                                <td>
                                    <form id="delete-form-{{ $category->id }}"
                                        action="{{ route('categories.destroy', $category->id) }}" method="POST">
                                        @csrf
                                        @method('DELETE')

                                        <button type="button" class="btn btn-sm btn-danger"
                                            onclick="confirmDelete({{ $category->id }})">
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="text-center">No categories yet</td>
                            </tr>
                        @endforelse
                    </tbody>

                </table>
            </div>
        </div>

    </div>

    <script>
        function confirmDelete(id) {
            Swal.fire({
                title: 'Sure?',
                text: "Data cant be restored",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#696cff',
                cancelButtonColor: '#ff3e1d',
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('delete-form-' + id).submit();
                }
            });
        }
    </script>
@endsection
