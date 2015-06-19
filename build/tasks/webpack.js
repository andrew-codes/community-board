'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackConfigFactory from './../utils/webpackConfigFactory';
let webpackConfig = webpackConfigFactory(process.env.NODE_ENV === 'production', 8888);

gulp.task('webpack', [], function (done) {
    webpack(webpackConfig, function (fatalError, stats) {
        let jsonStats = stats.toJson();
        let buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];
        if (buildError) {
            throw new gutil.PluginError('webpack', buildError);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }));
        done();
    })
});