'use strict';
const isProduction = process.env.NODE_ENV === 'production';
const webpackDevPort = 8888;
const port = process.env.PORT || 8091;
const host = process.env.HOST || 'localhost';

const config = {
    isProduction,
    port,
    webpackDevPort,
    webpackDevUrl: `http://localhost:${webpackDevPort}`,
    host: isProduction ? `http://${host}:${port}` : `http://localhost:${port}`
};

export default config;