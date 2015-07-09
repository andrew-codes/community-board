'use strict';

import React from 'react';
import Router from 'react-router';
import config from './../../build/config';
import Routes from './../Routes';
import Root from './../containers/Root';
import {createDispatcher, createRedux, composeStores} from 'redux';
import * as stores from './../modules/stores';
import RouteToInitialData from './RouteToInitialData';
import * as middlewares from './../middleware';
const {thunkMiddleware, promiseMiddleware} = middlewares;
const dispatcher = createDispatcher(
	composeStores(stores),
		getState => [promiseMiddleware, thunkMiddleware(getState)]
);

export default function (path) {
	return new Promise(resolve => {
		Router.run(Routes, path, (routeRoot, state) => {
			resolve(renderRoute(routeRoot, state));
		});
	});
};

function renderRoute(RouteRoot, state) {
	const redux = createRedux(dispatcher, {});
	var bundleScriptSrc = 'assets/bundle.js';
	var appScriptSrc = config.isProduction ? bundleScriptSrc : `${config.webpackDevUrl}/${bundleScriptSrc}`;
	return RouteToInitialData(redux, state)
		.then(initialData=> {
			var appHtml = React.renderToString(<Root redux={redux} handler={RouteRoot} {...state} />);
			var scriptsHtml = `
		        <script src="${appScriptSrc}"></script>
		        <script>CommunityBoard(document.body, ${JSON.stringify(initialData)});</script>
            `;
			var title = 'A Title';
			return buildHtmlPage(scriptsHtml, appHtml, title);
		});
}

function buildHtmlPage(scriptsHtml, bodyHtml, title) {
	return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <title ref="title">${title}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
        <meta name="HandheldFriendly" content="True"/>
        <link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico" />
    </head>
    <body><div>${bodyHtml}</div>${scriptsHtml}<body>
    </html>`;
}
