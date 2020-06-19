const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .extract(['vue', 'vue-router', 'axios', 'view-design'])
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
                'styles': path.resolve(__dirname, 'resources/js/styles'),
                'api': path.resolve(__dirname, 'resources/js/api'),
                'components': path.resolve(__dirname, 'resources/js/components'),
                'icons': path.resolve(__dirname, 'resources/js/icons'),
                'resource': path.resolve(__dirname, 'resources/js/resource'),
                'views': path.resolve(__dirname, 'resources/js/views'),
                'utils': path.resolve(__dirname, 'resources/js/utils'),
                'router': path.resolve(__dirname, 'resources/js/router'),
            }
        },
    });
