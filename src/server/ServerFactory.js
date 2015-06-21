'use strict';

import koa from 'koa';
import route from 'koa-route';
import send from 'koa-send';
import parse from 'co-body';
import path from 'path';
import RenderRoute from './RenderRoute';

export default function (port) {
    var server = koa();

    server.use(function* (next) {
        if (this.request.path.indexOf('/assets') !== 0 && this.request.path.indexOf('favicon') < 0) {
            yield next;
        }
        yield send(this, this.path, {root: path.join(__dirname, './../client')});
    });

    server.use(function* (next) {
        try {
            let renderedOutput = yield RenderRoute(this.request.path);
            this.body = renderedOutput;
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