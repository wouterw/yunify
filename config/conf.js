/*!
 * conf.js
 * global configuration file
 */

var _ = require('underscore')._;

/**
 * General Configuration
 */
var common = {
  fb: {
    appId: '407986405880590',
    appSecret: '545a8fea00ec7c0e74c3203e1141c592'
  }
};

/**
 * Configuration for 'development' environment
 */
var dev = {
  server: {
    url: "http://localhost:5000"
  },
  session: {
    secret: '90nds9d219fds2c',
    collection: 'sessions',
    reapInterval: 3000,
    storeUri: 'mongodb://localhost/yunify',
    username: '',
    password: ''
  },
  db: {
    uri: 'mongodb://localhost/yunify'
  }
};

/**
 * Configuration for 'production' environment
 */
var prod = {
  server: {
    url: "http://deep-earth-8346.herokuapp.com/"
  },
  session: {
    secret: '90nds9d219fds2c',
    collection: 'sessions',
    reapInterval: 3000,
    storeUri: 'mongodb://staff.mongohq.com:10046/yunify',
    username: 'codability',
    password: 'adm123'
  },
  db: {
    uri: 'mongodb://codability:adm123@staff.mongohq.com:10046/yunify'
  }
};

module.exports.configuration = global.process.env.NODE_ENV === 'production' ?
  _.extend(prod, common) : _.extend(dev, common);
