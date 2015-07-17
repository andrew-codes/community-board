'use strict';
const isProduction = process.env.NODE_ENV === 'production';
const webpackDevPort = 8888;
const port = process.env.PORT || 8091;
const apiPort = process.env.API_PORT || 8092;
const host = process.env.HOST || 'localhost';
const apiHost = process.env.API_HOST || 'localhost';

const config = {
    isProduction,
    port,
    apiPort,
    apiHost,
    webpackDevPort,
    webpackDevUrl: `http://localhost:${webpackDevPort}`,
    host: isProduction ? `http://${host}:${port}` : `http://localhost:${port}`
};

export default config;