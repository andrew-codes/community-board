'use strict';

const config = {
    isProduction: process.env.NODE_ENV === 'production',
    webpackDevPort: 8888,
    webpackDevUrl: 'http://localhost:8888'
};

export default config;