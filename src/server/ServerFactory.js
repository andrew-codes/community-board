'use strict';

import koa from 'koa';
import * as Routes from './routes';
import cors from 'koa-cors';

const applicationRoutes = [
	Routes.AuthorizationCallback,
	Routes.StaticAssets,
	Routes.Application
];
const apiRoutes = [
	Routes.GitHubIssueApi
];

export function application(port) {
	return startServer(port, applicationRoutes);
}

export function api(port) {
	return startServer(port, apiRoutes, true);
}

function startServer(port, routes, isApi) {
	var server = koa();

	if (isApi){
		server.use(cors());
	}

	routes.forEach(serverRoute=> {
		server.use(serverRoute);
	});

	server.listen(port, () => {
		console.log('Server is listening on port ' + port);
	});

	return server;
}