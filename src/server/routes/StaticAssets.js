'use strict';

import send from 'koa-send';
import path from 'path';

export default function* (next) {
    if (!match(this.request)) {
        return yield next;
    }
    yield send(this, this.path, {root: path.join(__dirname, './../client')});
}

function match(request){
    return  request.path.indexOf('/assets') === 0 && request.path.indexOf('favicon') >= 0;
}