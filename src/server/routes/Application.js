'use strict';

import RenderRoute from './../RenderRoute';

export default function* (next) {
    try {
        let renderedOutput = yield RenderRoute(this.request.path);
        this.body = renderedOutput;
    }
    catch (error) {
        this.throw(500, error);
    }
};