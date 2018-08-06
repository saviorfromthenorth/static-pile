const mix = require('laravel-mix');

mix.setPublicPath('dist')
  .copy('resources/assets/images/*', 'public/images/', false)
  .copy('node_modules/@fortawesome/fontawesome-free/webfonts/*', 'dist/css/webfonts/')
  .copy('src/sass/fonts/Open_Sans/*', 'dist/css/webfonts/Open_Sans/')
  .options({
		processCssUrls: false,
		fileLoaderDirs: {
			fonts: 'webfonts'
		}
  })
  .sass('./src/sass/app.scss', 'dist/css')
  .js('./src/js/app.js', 'dist/js');