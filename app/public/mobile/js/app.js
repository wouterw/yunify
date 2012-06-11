/*!
 * Yunify - Backbone JQuery Mobile
 * http://codability.be
 * Copyright (c) 2012 Codability
 */

require.config({

  paths: {

    'backbone': '/common/js/lib/backbone/backbone.amd.min',
    'underscore': '/common/js/lib/underscore/underscore.amd.min',
    'text': '/common/js/lib/require/text.min',
    'jquery': '/common/js/lib/jquery/jquery-1.7.2.min',
    'json2': '/common/js/lib/json2',
    'jquerymobile': '/mobile/js/lib/jquerymobile/jquery.mobile-1.1.0.min',

    'models': '/mobile/js/models',
    'collections': '/mobile/js/collections',
    'views': '/mobile/js/views',
    'routers': '/mobile/js/routers',
    'tpl': '/mobile/tpl'

  },

  shim: {

    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }

  }

});

define(['jquery', 'underscore', 'backbone', 'routers/approuter', 'utils'],
  function ($, _, Backbone, AppRouter, utils) {

    $(function () {

      /**
       * Provide top-level namespaces for our javascript.
       */
      window.yunify = {
        models: {},
        collections: {},
        routers: {},
        views: {},
        defaults: {},
        utils: utils,
        events: _.extend({}, Backbone.Events)
      };


      /**
       * ECMAScript 5 'Object.create()' polyfil
       */
      if (typeof Object.create !== 'function') {
        Object.create = function(o) {
          function F() {}
          F.prototype = o;
          return new F();
        };
      }

      /**
       * Configure Jquery Mobile
       */
      require(['jquerymobile'], function(JQueryMobile) {
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
      });

      /**
       * Start main router
       */
      yunify.routers.main = new AppRouter();
      yunify.routers.main.start();

    });

  });
