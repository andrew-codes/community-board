'use strict';

let isProduction = process.NODE_ENV === 'production';

const config = {
    isProduction,
    webpackDevPort: 8888,
    webpackDevUrl: 'http://localhost:8888'
};

export default config;