const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const imageResize = require('gulp-image-resize')
const ghPages = require('gulp-gh-pages')
const webpack = require('webpack-stream')
const merge = require('merge-stream')

const deployOptions = {
  branch: 'master'
}

gulp.task('html', () => {
  return gulp
    .src('index.html')
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('css', () => {
  return gulp
    .src('static/styles/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/static/styles'))
})

gulp.task('js', () => {
  return gulp
    .src('static/scripts/*.js')
    .pipe(babel({
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-transform-runtime',
      ]
    }))
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'main.js'
      }
    }))
    .pipe(gulp.dest('./dist/static/scripts'))
})

gulp.task('img', () => {
  const cfg = {
    png: [ '.', 'coorganizers', 'courses', 'sponsors' ],
    svg: [ 'courses' ]
  }

  const images = Object.entries(cfg).map(([ext, path]) => {
    return path.map((name) => {
      return gulp
        .src(`static/images/${name}/*.${ext}`)
        .pipe(imagemin([
          imagemin.optipng(),
          imagemin.svgo(),
          imagemin.mozjpeg({
            quality: 85
          })
        ]), {
          silent: true
        })
        .pipe(gulp.dest(`dist/static/images/${name}`))
    })
  })

  const jpg = gulp
    .src('static/images/clubs/*.jpg')
    .pipe(imageResize({
      width: 64,
      height: 64
    }))
    .pipe(imagemin([
      imagemin.mozjpeg({
        quality: 85
      })
    ]), {
      silent: true
    })
    .pipe(gulp.dest('dist/static/images'))

  return merge(images, jpg)
})

gulp.task('misc', () => {
  const favicons = gulp
    .src('static/favicon/**')
    .pipe(gulp.dest('dist/static/favicon'))

  return merge(favicons)
})

gulp.task('deploy', () => {
  return gulp
    .src('./dist/**/*')
    .pipe(ghPages(deployOptions))
})

gulp.task('default', gulp.parallel('html', 'css', 'js', 'img', 'misc'))
