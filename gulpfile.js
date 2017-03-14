const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename     = require('gulp-rename');
const es = require('event-stream');
const glob = require('glob');

const stylus = require('gulp-stylus');
const prefix = require('gulp-autoprefixer');
const cssMin = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const srcMaps = require('gulp-sourcemaps');

const paths = {
    js : {
        src : './public-src/js/index.js',
        dist : './'
    },
    css : {
        src : './public-src/css/**/*.styl',
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
                .pipe(source(entry))
                .pipe(rename(function (path) {
                    path.dirname = path.dirname.replace('public-src', 'public');
                    path.extname = ".bundle.js"
                }))
                .pipe(buffer())
                // .pipe(uglify())
                .pipe(gulp.dest(paths.js.dist));
        });
        es.merge(tasks).on('end', done);
    });
});


gulp.task('css', function () {
    return gulp.src(paths.css.src) //Р’С‹Р±РµСЂРµРј РЅР°С€ РѕСЃРЅРѕРІРЅРѕР№ С„Р°Р№Р» СЃС‚РёР»РµР№
        .pipe(srcMaps.init()) //РёРЅРёС†РёР°Р»РёР·РёСЂСѓРµРј soucemap
        .pipe(stylus({
            compress: false,
            'include css': true
        })) //РЎРєРѕРјРїРёР»РёСЂСѓРµРј stylus
        .pipe(prefix(
            // {
            //     browsers: ['last 3 version', "> 1%"]
            // }
        )) //Р”РѕР±Р°РІРёРј РІРµРЅРґРѕСЂРЅС‹Рµ РїСЂРµС„РёРєСЃС‹
        // .pipe(cssMin()) //РЎРѕР¶РјРµРј
        .pipe(srcMaps.write()) //РїСЂРѕРїРёС€РµРј sourcemap
        .pipe(rename({suffix: '.min'})) //РґРѕР±Р°РІРёРј СЃСѓС„С„РёРєСЃ .min Рє РёРјРµРЅРё РІС‹С…РѕРґРЅРѕРіРѕ С„Р°Р№Р»Р°
        .pipe(gulp.dest(paths.css.dist));
});


gulp.task('watch', function(){
    gulp.watch('./public-src/js/**/*.js', ['js']);
    gulp.watch('./public-src/css/**/*.styl', ['css']);
    // Object.keys(paths).forEach(function (key) {
    //     gulp.watch(paths[key].src, [key])
    // })
});


gulp.task('default', Object.keys(paths).concat(['watch']));
gulp.task('build', Object.keys(paths));