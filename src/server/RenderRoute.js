'use strict';

import React from 'react';
import Router from 'react-router';
import config from './../../build/config';
import Routes from './../Routes';
import Root from './../containers/Root';
import Html from './Html';
import { createRedux } from 'redux';
import * as stores from '../stores/index';

export default function (path) {
    return new Promise(resolve => {
        Router.run(Routes, path, (routeRoot, state) => {
            resolve(renderRoute(routeRoot, state));
        });
    });
};

function renderRoute(RouteRoot, state) {
    var initialData = {};
    const redux = createRedux(stores, initialData);
    var appHtml = React.renderToString(<Root redux={redux} handler={RouteRoot} {...state} />);
    var bundleScriptSrc = 'assets/bundle.js';
    var appScriptSrc = config.isProduction ? bundleScriptSrc : `${config.webpackDevUrl}/${bundleScriptSrc}`;
    var scriptsHtml = `
        <script>window.__APP_STATE__ = ${JSON.stringify(initialData)}</script>
        <script src="${appScriptSrc}"></script>
    `;
    var bodyHtml = appHtml + scriptsHtml;
    var title = 'A Title';
    var htmlBody = React.renderToStaticMarkup(
        <Html bodyHtml={bodyHtml} title={title}/>
    );
    return `<!DOCTYPE html>${htmlBody}`;
}
