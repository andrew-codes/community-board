'use strict';

require('babel/register');
var serverFactory = require('./server/ServerFactory');
var config = require('./../build/config');

serverFactory(config.port);