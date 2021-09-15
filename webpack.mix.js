const mix = require('laravel-mix');
require('laravel-mix-tailwind');
const path = require('path');

mix.alias({
    ziggy: path.resolve('vendor/tightenco/ziggy/dist'),
});

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ])
    .tailwind();
