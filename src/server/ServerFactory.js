'use strict';

import koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import parse from 'co-body';
import renderApp from './App';
import path from 'path';

export default function (port) {
    var server = koa();

    server.use(serve(path.join(__dirname, './../client/assets')));

    server.use(function* (next) {
        try {
            let renderedOutput = yield renderApp(this.request.path);
            if (renderedOutput.statusCode !== 200) {
                this.throw(renderedOutput.statusCode);
            }
            this.body = renderedOutput.html;
        }
        catch (error) {
            this.throw(500, error);
        }
    });
    server.listen(port, () => {
        console.log('Server is listening on port ' + port);
    });

    return server;
}