'use strict';

import Home from './../components/Home';
import NotFound from './../components/NotFound';

export default Object.freeze({
    home: {
        isDefault: true,
        name: 'home',
        path: '/',
        handler: Home
    },
    notFound: {
        isNotFound: true,
        name: 'not-found',
        path: '',
        handler: NotFound
    }
});