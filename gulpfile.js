/*******************************************************************************
1. DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');                             // gulp core
var jshint = require('gulp-jshint');                    // check if js is ok
var stylish = require('jshint-stylish');                // make errors look good in shell

/*******************************************************************************
2. FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/

var target = {
    js_concat_src : [
        'src/main.js'
    ],
    js_dest : 'public/js'
};


/*******************************************************************************
4. JS TASKS
*******************************************************************************/

// lint my custom js
gulp.task('js-lint', function() {
    gulp.src(target.js_concat_src)                        // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});


gulp.task('default', ['js-lint']);
