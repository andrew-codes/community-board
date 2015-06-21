'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './../config';
import webpackConfigFactory from './../utils/webpackConfigFactory';
let webpackConfig = webpackConfigFactory(config);

gulp.task('webpack', [], function (done) {
    if (!config.isProduction) {
        var webpackDevServer = new WebpackDevServer(webpack(webpackConfig), {
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
        return;
    }
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