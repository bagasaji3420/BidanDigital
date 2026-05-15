<?php

return [
    'inertia' => env('SEO_TOOLS_INERTIA', false),

    'meta' => [
        'defaults' => [
            'title'        => false,
            'titleBefore'  => false,
            'description'  => false,
            'separator'    => ' | ',
            'keywords'     => [],
            'canonical'    => 'current',
            'robots'       => 'index,follow',
        ],
        'webmaster_tags' => [
            'google'    => null,
            'bing'      => null,
            'alexa'     => null,
            'pinterest' => null,
            'yandex'    => null,
            'norton'    => null,
        ],
        'add_notranslate_class' => false,
    ],

    'opengraph' => [
        'defaults' => [
            'title'       => false,
            'description' => false,
            'url'         => 'current',
            'type'        => 'website',
            'site_name'   => env('APP_NAME', 'BundaMuda'),
            'images'      => [],
        ],
    ],

    'twitter' => [
        'defaults' => [
            'card' => 'summary',
        ],
    ],

    'json-ld' => [
        'defaults' => [
            'title'       => false,
            'description' => false,
            'url'         => 'current',
            'type'        => 'WebPage',
            'images'      => [],
        ],
    ],
];