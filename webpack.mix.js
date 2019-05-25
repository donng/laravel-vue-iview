let mix = require('laravel-mix');

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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

mix.js('resources/assets/js/app.js', 'public/js')
  .extract(['vue', 'vue-router', 'axios', 'iview'])
  .sass('resources/assets/sass/app.scss', 'public/css')
  .webpackConfig({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'resources/assets/js'),
        'styles': path.resolve(__dirname, 'resources/assets/js/styles'),
        'api': path.resolve(__dirname, 'resources/assets/js/api'),
        'components': path.resolve(__dirname, 'resources/assets/js/components'),
        'icons': path.resolve(__dirname, 'resources/assets/js/icons'),
        'resource': path.resolve(__dirname, 'resources/assets/js/resource'),
        'views': path.resolve(__dirname, 'resources/assets/js/views'),
        'utils': path.resolve(__dirname, 'resources/assets/js/utils'),
        'router': path.resolve(__dirname, 'resources/assets/js/router'),
      }
    },
    // plugins: [
    //   new BundleAnalyzerPlugin()
    // ]
  });

if (mix.inProduction()) {
    mix.version();
}
