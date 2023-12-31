const gulp        = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const { watch, series } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const paths = {
  scripts: {
    src: './',
    dest: './build/'
  }
};

// Reload Server
async function reload() {
  server.reload();
}

// Sass compiler
async function compileSass() {
  gulp.src('./sass/**/*.scss', './src/sass/**/_*.scss',)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}

// Copy assets after build
async function copyAssets() {
  gulp.src(['images/**/*'])
    .pipe(gulp.dest(paths.scripts.dest));
  gulp.src(['css/**/*'])
    .pipe(gulp.dest(paths.scripts.dest));
}

function compileJs () {
  gulp.src([
    '*.js',
    './js/*.js'
  ])
  .pipe(gulp.dest(paths.scripts.dest));
}

// Build files html and reload server
async function buildAndReload() {
  await includeHTML();
  await copyAssets();
  await compileJs();
  reload();
}

async function includeHTML(){
  return gulp.src([
    '*.html'
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}
exports.includeHTML = includeHTML;

exports.default = async function() {
  // Init serve files from the build folder
  server.init({
    server: {
      baseDir: paths.scripts.dest
    }
  });
  // Build and reload at the first time
  buildAndReload();
  // Watch Sass task
  watch('./sass/**/_*.scss',  series(compileSass));
  // Watch task
  watch(["*.html","css/**/*"], series(buildAndReload));
};