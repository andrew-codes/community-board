'use strict';

import webpack from 'webpack';
import path from 'path';

export default function (isProduction, port) {
    return {
        cache: !isProduction,
        debug: !isProduction,
        devtool: !isProduction && 'eval-source-map',
        entry: isProduction ? [
            path.join(__dirname, './../../src/client/index.jsx')
        ] : [
            `webpack-dev-server/client?http://localhost:${port}`,
            // Why only-dev-server instead of dev-server:
            // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
            'webpack/hot/only-dev-server',
            path.join(__dirname, './../../src/client/index.jsx')
        ],
        output: isProduction ? {
            path: path.join(__dirname, './../../src/client/assets'),
            filename: 'bundle.js'
        } : {
            path: path.join(__dirname, './../../src/client/assets'),
            filename: 'bundle.js',
            publicPath: `http://localhost:${port}/assets/`
        },
        plugins: (function () {
            let plugins = [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(isProduction ? 'production' :
                            'development'),
                        IS_BROWSER: true
                    }
                })
            ];
            if (isProduction) {
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
                loaders: isProduction ? ['babel'] : ['react-hot', 'babel']
            }]
        }
    };
}