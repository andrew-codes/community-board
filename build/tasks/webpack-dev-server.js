'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpackConfigFactory from './../utils/webpackConfigFactory';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import config from './../config';

let webpackConfig = webpackConfigFactory(config);

gulp.task('webpack-dev-server', [], function (done) {
    new webpackDevServer(webpack(webpackConfig), {
        contentBase: config.webpackDevUrl,
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        quiet: false,
        noInfo: true,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    })
        .listen(config.webpackDevPort, 'localhost', function (error) {
            if (error) {
                throw new gutil.PluginError('webpack-dev-server', error);
            }
            gutil.log('[webpack-dev-server]', `${config.webpackDevUrl}/assets/bundle.js`);
            done()
        });
});