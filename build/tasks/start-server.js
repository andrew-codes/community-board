'use strict';

import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import path from 'path';

gulp.task('start-server', [], function () {
    return nodemon({
            script: path.join(__dirname, './../../src/index.js'),
            ext: 'js',
            execMap: {
                js: 'node --harmony'
            }
        }
    );
});