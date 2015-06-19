'use strict';

require('babel/register');
var serverFactory = require('./server/ServerFactory');

serverFactory(8091);