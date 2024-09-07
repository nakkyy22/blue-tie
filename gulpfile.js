/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable linebreak-style */


/* eslint-disable linebreak-style */
// const { src, dest, series, watch } = require('gulp');
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import { optimize } from 'svgo';
import fs from 'fs';
import path from 'path';

// Настройка компилятора для gulp-sass
const sass = gulpSass(dartSass);

// Функция для компиляции SCSS в CSS
function styles(done) {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
  done();
}

// Функция для минификации HTML
function html(done) {
  gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
  done();
}

// Функция для оптимизации SVG
async function optimizeSvg(filePath) {
  const svgString = fs.readFileSync(filePath, 'utf8');
  const result = optimize(svgString, {
    path: filePath,
    multipass: true,
  });
  fs.writeFileSync(filePath, result.data);
}

// Функция для обработки SVG
function processSvg(done) {
  const svgDir = 'src/images';
  fs.readdir(svgDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const filePath = path.join(svgDir, file);
      if (path.extname(file).toLowerCase() === '.svg') {
        optimizeSvg(filePath);
      }
    });
    done();
  });
}

// Функция для обработки Lang
function processLang(done) {
  const svgDir = 'src/js/lang';
  gulp.src('src/js/lang/*.json')
    .pipe(gulp.dest('dist/js/lang'));
  done();
}

// Функция для запуска локального сервера и отслеживания изменений
function serve(done) {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/*.html', html);
  gulp.watch('src/images/**/*.svg', processSvg);
  gulp.watch('src/js/lang/*.json', processLang);
  done();
}

// Экспорт задач
export default gulp.series(styles, html, processSvg, processLang, serve);


