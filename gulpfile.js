const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
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
    png: [ '.', 'clubs', 'coorganizers', 'courses', 'sponsors' ],
    jpg: [ 'clubs' ]
  }

  const tasks = Object.entries(cfg).map(([ext, path]) => {
    return path.map((name) => {
      return gulp
        .src(`static/images/${name}/*.${ext}`)
        .pipe(imagemin())
        .pipe(gulp.dest(`dist/static/images/${name}`))
    })
  })

  return merge(tasks)
})

gulp.task('misc', () => {
  // .svg
  const path = [ 'courses' ]

  const svg = path.map((name) => {
    return path.map((name) => {
      return gulp
        .src(`static/images/${name}/*.svg`)
        .pipe(gulp.dest(`dist/static/images/${name}`))
    })
  })

  const favicons = gulp
    .src('static/favicon/**')
    .pipe(gulp.dest('dist/static/favicon'))

  return merge(svg, favicons)
})

gulp.task('deploy', () => {
  return gulp
    .src('./dist/**/*')
    .pipe(ghPages(deployOptions))
})

gulp.task('default', gulp.parallel('html', 'css', 'js', 'img', 'misc'))
