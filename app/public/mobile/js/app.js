/*!
 * Yunify - Backbone JQuery Mobile
 * Copyright (c) 2012 Codability
 */

define(['jquery', 'underscore', 'backbone', 'router', 'utils'],
  function ($, _, Backbone, Router, utils) {
  'use strict';

    $(function () {

      /**
       * Provide top-level namespaces for our javascript.
       */
      window.yunify = window.yunify || {
        model: {},
        collection: {},
        router: {},
        view: {},
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
       * Start router
       */
      window.yunify.router = new Router();
      window.yunify.router.start();

    });

  });
