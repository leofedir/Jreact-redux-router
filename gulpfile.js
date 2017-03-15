const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename     = require('gulp-rename');
const es = require('event-stream');
const glob = require('glob');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cssMin = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    js : {
        src : './public-src/js/index.js',
        dist : './public/'
    },
    scss : {
        src : './public-src/scss/index.scss',
        dist : './public/css'
    }
};

gulp.task('js', function(done) {
    glob(paths.js.src, function(err, files) {
        if(err) done(err);
        const tasks = files.map(function (entry) {
            return browserify({entries: [entry]})
                .transform('babelify', {presets: ["es2015" , "react"]})
                .bundle()
                .on('error' , (e) => { console.log("error  >> " , e)})
                .pipe(source(entry))
                .pipe(rename(function (path) {
                    // console.log(path);
                    path.dirname = path.dirname.replace('public-src', '');
                    path.extname = ".bundle.js"
                }))
                .pipe(buffer())
                // .pipe(uglify())
                .pipe(gulp.dest(paths.js.dist));
        });
        es.merge(tasks).on('end', done);
    });
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
    gulp.watch('./public-src/js/**/*.js', ['js']);
    gulp.watch('./public-src/**/*.scss', ['scss']);
});

gulp.task('imagemin', function() {
    return gulp.src('./public-src/img/**/*')
        .pipe(gulp.dest('public/img'));
});

gulp.task('html', function() {
    return gulp.src('./public-src/index.html')
        .pipe(gulp.dest('public/'));
});


gulp.task('default', ['js', 'scss', 'html', 'watch']);
// gulp.task('default', Object.keys(paths).concat(['watch']));
gulp.task('build', ['js', 'scss', 'html', 'imagemin']);