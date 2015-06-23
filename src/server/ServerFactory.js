'use strict';

import koa from 'koa';
import Routes from './routes';

export default function (port) {
    var server = koa();

    Routes.forEach(serverRoute=> {
        server.use(serverRoute);
    });

    server.listen(port, () => {
        console.log('Server is listening on port ' + port);
    });

    return server;
}