const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename     = require('gulp-rename');
const es = require('event-stream');
const glob = require('glob');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

const paths = {
    js : {
        src : './public-src/js/index.js',
        dist : './public/'
    },
    scss : {
        src : './public-src/scss/index.scss',
        dist : './public/css'
    },
    outputReact : "./public/js"
};

gulp.task('js', function() {
    browserify({ entries: './public-src/js/index.js', debug: true })
        .transform('babelify', {presets: ["react", "es2015", "stage-0"]})
        .bundle()
        .on('error' , (e) => { console.log("error  >> " , e)})
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('scss', function () {
    return gulp.src(paths.scss.src) //Выберем наш основной файл стилей
        .pipe(sourcemaps.init()) //инициализируем soucemap
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'})) //добавим суффикс .min к имени выходного файла
        .pipe(gulp.dest(paths.scss.dist));
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('./public-src/js/**/*.js', ['js']);
    gulp.watch('./public-src/**/*.scss', ['scss']);
});

gulp.task('imagemin', function() {
    return gulp.src('./public-src/img/**/*')
        .pipe(gulp.dest('public/img'));
});

gulp.task('font', function() {
    return gulp.src('./public-src/lib/font-awesome/fonts/**/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('html', function() {
    return gulp.src('./public-src/index.html')
        .pipe(gulp.dest('public/'));
});

gulp.task('build', ['js', 'scss', 'html', 'imagemin', 'font']);

gulp.task('default', ['js', 'scss', 'html', 'watch']);
