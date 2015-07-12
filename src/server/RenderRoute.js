'use strict';

import React from 'react';
import Router from 'react-router';
import config from './../../build/config';
import Routes from './../Routes';
import Location from 'react-router/lib/Location';
import Root from './../containers/Root';
import {createDispatcher, createRedux, composeStores} from 'redux';
import * as stores from './../modules/stores';
import RouteToInitialData from './RouteToInitialData';
import * as middlewares from './../lib/middleware';
const {thunkMiddleware, promiseMiddleware} = middlewares;
const dispatcher = createDispatcher(
	composeStores(stores),
		getState => [promiseMiddleware, thunkMiddleware(getState)]
);

export default function (path, query) {
	var location = new Location(path, query);
	return new Promise(resolve => {
		Router.run(Routes, location, (error, routerState, transition) => {
			resolve(renderRoute(routerState, transition));
		});
	});
};

function renderRoute(routerState, transition) {
	const redux = createRedux(dispatcher, {});
	var bundleScriptSrc = 'assets/bundle.js';
	var appScriptSrc = config.isProduction ? bundleScriptSrc : `${config.webpackDevUrl}/${bundleScriptSrc}`;
	return Promise.all(RouteToInitialData(redux, routerState))
		.then(()=> {
			var appHtml = React.renderToString(<Root redux={redux} routerState={routerState} />);
			var scriptsHtml = `
		        <script src="${appScriptSrc}"></script>
		        <script>CommunityBoard(document.body, ${JSON.stringify(redux.getState())});</script>
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
        <link rel="shortcut icon" type="image/x-icon" href="/assets/favicon.ico" />
    </head>
    <body><div>${bodyHtml}</div>${scriptsHtml}<body>
    </html>`;
}
