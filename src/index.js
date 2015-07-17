'use strict';

require('babel/register');
var ServerFactory = require('./server/ServerFactory');
var config = require('./../build/config');

ServerFactory.application(config.port);
ServerFactory.api(config.apiPort);