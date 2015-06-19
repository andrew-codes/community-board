'use strict';

import React from 'react';
import Router from 'react-router';
import Routes from './../Routes';
import Html from './../components/Html';
import config from './../../build/config';

export default function (path) {
    return new Promise(resolve => {
        Router.run(Routes, path, (Handler, state) => {
            let html = renderRoute(Handler, path);
            let isNotFound = state.routes.some(route => route.name.toLowerCase() === 'not-found');
            resolve({
                html: html,
                statusCode: isNotFound ? 404 : 200
            });
        });
    });
};

function renderRoute(Handler, path) {
    let data = {
        pageMeta: {
            currentUrl: path
        }
    };
    let appHtml = React.renderToString(<Handler />);
    let bundleScriptSrc = 'assets/bundle.js';
    let appScriptSrc = config.isProduction ? bundleScriptSrc : `${config.webpackDevUrl}/${bundleScriptSrc}`;
    let scriptsHtml = `
        <script>window.__AppState__ = ${JSON.stringify(data)}</script>
        <script src="${appScriptSrc}"></script>
    `;
    let bodyHtml = appHtml + scriptsHtml;
    let title = 'A Title';
    let htmlBody = React.renderToStaticMarkup(
        <Html bodyHtml={bodyHtml} title={title}/>
    );
    return `<!DOCTYPE html>${htmlBody}`;
}
