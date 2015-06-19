'use strict';

require('babel/register');
var webpackConfigFactory = require('./utils/webpackConfigFactory');

module.exports = webpackConfigFactory(false, 8888);
