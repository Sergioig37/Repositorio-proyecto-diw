const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
const purgecss = require('gulp-purgecss');
const htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');


var desarrollo = false;

gulp.task("pepe", () => {
  console.log("Pepe");
});

gulp.task("sass", () => {
  return gulp
    .src("./dev/scss/**/*.scss")
    .pipe(
      sass({ outputStyle: desarrollo ? "compressed" : "expanded" }).on(
        "error",
        sass.logError
      )
    )
    .pipe(gulp.dest("./public/css"));
});

gulp.task('html', () => {
    return gulp.src(['./dev/**/*.html'])
    .pipe(htmlmin({ collapseWhitespace: desarrollo? true : false}))
    .pipe(gulp.dest('./public'))
})


gulp.task("watch", () => {
  gulp.watch("./dev/scss/**/*.scss", gulp.series["sass", "html"]);
});

gulp.task('purgecss', () => {
  return gulp.src('public/css/*.css')
      .pipe(purgecss({
          content: ['public/**/*.html'] 
      }))
      .pipe(gulp.dest('public/css')); 
});


gulp.task('clean-html', () => {
    return gulp.src('public/**/*.html') 
        .pipe(htmlclean({
            protect: /<!--[\s\S]*?-->/g 
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('minify-images', () => {
  return gulp.src('dev/img/*') 
      .pipe(imagemin())
      .pipe(gulp.dest('public/img')); 
});

gulp.task('prefix-css', () => {
  return gulp.src('dev/css/*.css')
      .pipe(autoprefixer({
          cascade: false 
      }))
      .pipe(gulp.dest('public/css')); 
})

gulp.task('transpile-js', () => {
  return gulp.src('dev/js/**/*.js') 
      .pipe(babel({
          presets: ['@babel/preset-env']
      }))
      .pipe(gulp.dest('public/js')); 
});


gulp.task('uglify-js', () => {
  return gulp.src('dev/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('public/js')); 
});

gulp.task('concat-js', () => {
  return gulp.src('dev/js/**/*.js') 
      .pipe(concat('bundle.js')) 
      .pipe(gulp.dest('public/js'));
});

gulp.task("build", gulp.series("purgecss", "clean-html", "minify-images", "prefix-css", "transpile-js", "uglify-js", "concat-js", "watch"));