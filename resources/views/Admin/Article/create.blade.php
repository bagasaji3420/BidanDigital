@extends('Admin.Layouts.app')

@section('content')
    @include('Admin.Article.menu')

    <div class="card p-4">

        <form action="{{ route('articles.store') }}" method="POST">
            @csrf

            {{-- TITLE --}}
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" name="title" class="form-control" required>
            </div>

            <div class="row">
                <div class="col-12 col-sm-6 mb-3">

                    <label class="form-label">Hero Image</label>

                    <div class="dropzone" id="featured-dropzone"></div>

                    {{-- ini nanti diisi file --}}
                    <input type="file" name="featured_image" id="real_image" hidden>
                </div>
                <div class="col-12 col-sm-6 mb-3">
                    {{-- CATEGORY --}}
                    <div class="mb-3">
                        <label class="form-label">Category</label>

                        <div class="d-flex flex-wrap gap-2">
                            @foreach ($categories ?? [] as $category)
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="categories[]"
                                        value="{{ $category->id }}" id="cat{{ $category->id }}">

                                    <label class="form-check-label" for="cat{{ $category->id }}">
                                        {{ $category->name }}
                                    </label>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>

            {{-- TAGS --}}
            <div class="mb-3">
                <label class="form-label">Tags (pisahkan dengan koma)</label>
                <input type="text" name="tags_input" class="form-control" placeholder="laravel, docker, php">
            </div>

            {{-- CONTENT --}}
            <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea id="editor" name="content"></textarea>
            </div>

            {{-- SUBMIT --}}
            <button type="submit" class="btn btn-primary">
                Save Article
            </button>

        </form>

    </div>




    <script>
        tinymce.init({
            selector: '#editor',
            height: 500,

            plugins: 'image code',

            toolbar: 'undo redo | image code',

            images_upload_url: "{{ route('articles.editor.upload') }}",

            automatic_uploads: true,

            images_upload_handler: function(blobInfo, success, failure) {

                let formData = new FormData();
                formData.append('file', blobInfo.blob());
                formData.append('_token', '{{ csrf_token() }}');

                fetch("{{ route('articles.editor.upload') }}", {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(res => {
                        success(res.location);
                    })
                    .catch(() => {
                        failure('Upload gagal');
                    });
            }
        });
    </script>

    <script>
        Dropzone.autoDiscover = false;

        const dropzone = new Dropzone("#featured-dropzone", {
            url: "#", // ❌ tidak dipakai
            autoProcessQueue: false, // 🔥 penting
            maxFiles: 1,
            acceptedFiles: "image/*",
            addRemoveLinks: true,

            init: function() {
                this.on("addedfile", function(file) {

                    // simpan file ke input asli
                    let dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);

                    document.getElementById('real_image').files = dataTransfer.files;
                });

                this.on("removedfile", function() {
                    document.getElementById('real_image').value = '';
                });
            }
        });
    </script>
@endsection
