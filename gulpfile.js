const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imageMin = require('gulp-imagemin'); 
const pngQuant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');

gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
})

gulp.task('concat', function(){
    gulp.src('src/js/assets/*.js')
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('babelANDuglify', function(){
    gulp.src('src/js/main.min.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})


// gulp.task('scripts', function(){
//     gulp.src('src/js/assets/*.js')
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('src/js')) 

// })

gulp.task('sass', function(){
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

// gulp.task('cleanCss', function(){
//     gulp.src('src/css/*.css')
//         .pipe(cleanCss())
//             .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// })

// gulp.task('autoprefixer', function(){
//     gulp.src('src/css/*.css')
//         .pipe(autoprefixer({
//             browsers: ['last 4 versions'],
//             cascade: false       
//         }))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// })

gulp.task('cleanCssANDautoprefixer', function(){
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false       
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
})

// gulp.task('imagemin', function(){
//     gulp.src("src/img/*")
//         .pipe(imageMin([
//             pngQuant({quality: [0.3, 0.4], speed: 5})
//         ]))
//         .pipe(gulp.dest("dist/img"))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// })

gulp.task('imageminANDcache', function(){
    gulp.src("src/img/*")
        .pipe(cache(imageMin([
            pngQuant({quality: [0.3, 0.4], speed: 5})
        ])))
        .pipe(gulp.dest("dist/img"))
})

gulp.task('htmlmin', function(){
    return gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'))
})


gulp.task('watch', ['browserSync', 'concat', 'sass'], function(){
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/assets/*.js', ['concat']);
    // gulp.watch('src/*.js', browserSync.reload);
    // gulp.watch('src/img/*', ['imageminANDcache']);
    // gulp.watch('src/*.html', ['htmlmin']);
    // gulp.watch('src/js/**/*.js', ['scripts']);
    // gulp.watch('src/js/*.js', ['babel']);
    // gulp.watch('src/css/assets/*.css', ['cleanCssANDautoprefixer']);
})

gulp.task('build', ['htmlmin', 'babelANDuglify', 'cleanCssANDautoprefixer', 'imageminANDcache']);
gulp.task('default', ['imageminANDcache']);

// ************architection example****************
// 
//  gulp.task('name-task', function(){
//     gulp.src(sours-file)
//     .pipe(gulpPlagin)
//     .pipe(gulp.dest('destination-directory'));
// })