'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpackConfigFactory from './../utils/webpackConfigFactory';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

var port = 8888;
let webpackConfig = webpackConfigFactory(process.env.NODE_ENV === 'production', port);

gulp.task('webpack-dev-server', [], function (done) {
    new webpackDevServer(webpack(webpackConfig), {
        contentBase: `http://localhost:${port}`,
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
        .listen(port, 'localhost', function (error) {
            if (error) {
                throw new gutil.PluginError('webpack-dev-server', error);
            }
            gutil.log('[webpack-dev-server]', 'localhost:8888/assets/bundle.js');
            done()
        });
});