'use strict';

import webpack from 'webpack';
import path from 'path';

export default function (config) {
    return {
        cache: !config.isProduction,
        debug: !config.isProduction,
        devtool: !config.isProduction && 'eval-source-map',
        entry: config.isProduction ? [
            path.join(__dirname, './../../src/client/clientApplication.js')
        ] : [
            `webpack-dev-server/client?${config.webpackDevUrl}`,
            // Why only-dev-server instead of dev-server:
            // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
            'webpack/hot/only-dev-server',
            path.join(__dirname, './../../src/client/clientApplication.js')
        ],
        output: config.isProduction ? {
            path: path.join(__dirname, './../../src/client/assets'),
            filename: 'bundle.js',
            libraryTarget: 'umd',
            library: 'CommunityBoard'
        } : {
            path: path.join(__dirname, './../../src/client/assets'),
            filename: 'bundle.js',
            publicPath: `${config.webpackDevUrl}/assets/`,
            libraryTarget: 'umd',
            library: 'CommunityBoard'
        },
        plugins: (function () {
            let plugins = [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(config.isProduction ? 'production' :
                            'development'),
                        IS_BROWSER: true
                    }
                })
            ];
            if (config.isProduction) {
                plugins.push(
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    })
                );
            }
            else {
                plugins.push(
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoErrorsPlugin()
                );
            }
            return plugins;
        })(),
        resolve: {
            extensions: ['', '.js', '.jsx', '.json']
        },
        module: {
            loaders: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: config.isProduction ? ['babel'] : ['react-hot', 'babel']
            }]
        }
    };
}