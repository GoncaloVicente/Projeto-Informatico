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


// mix.options({
//     terser: {
//         terserOptions: {
//             ecma: 2015,
//             compress: false,
//             mangle : false,
//             keep_classnames: true,
//             keep_fnames : true,
//         }
//     }
// });

mix.js('resources/js/vue.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
