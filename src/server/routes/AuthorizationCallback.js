'use strict';

export default function* (next){
    if (!match(this.request)){
        return yield next;
    }
    console.log(this.request.query);
}

function match(request){
    return request.path.indexOf('/callback') === 0;
}