'use strict';

import koa from 'koa';
import route from 'koa-route';
import send from 'koa-send';
import parse from 'co-body';
import path from 'path';
import renderApp from './App';

export default function (port) {
    var server = koa();

    server.use(function* (next) {
        if (this.request.path.indexOf('/assets') !== 0) {
            yield next;
        }
        yield send(this, this.path, {root: path.join(__dirname, './../client')});
    });

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