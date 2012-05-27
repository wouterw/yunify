/**
 * Standard interface for all modules.
 * This is a subset of the mediator functionality.
 */

/*global define*/
define(["aura_core", "aura_perms"],
  function (mediator, permissions) {
    "use strict";

    var facade = {};

    /**
     * @param {string} subscriber Module name
     * @param {string} channel Event name
     * @param {object} callback Module
     */
    facade.subscribe = function ( subscriber, channel, callback ) {
      if ( permissions.validate( subscriber, channel ) ) {
        mediator.subscribe( channel, callback, this );
      }
    };

    /**
     * @param {string} channel Event name
     */
    facade.publish = function ( channel ) {
      mediator.publish.apply( mediator, arguments );
    };

    /**
     * @param {string} channel Event name
     */
    facade.stop = function ( channel ) {
      mediator.stop.apply( mediator, arguments );
    };

    /**
     * @param {string} channel Event name
     */
    facade.start = function ( channel ) {
      mediator.start.apply(mediator, arguments);
    };

    facade.dom = {
      /**
       * @param {string} selector CSS selector for the element
       * @param {string} context CSS selector for the context in which to
       * search for selector
       * @returns {object} Found elements or empty array
       */
      find: function ( selector, context ) {
        return mediator.dom.find( selector, context );
      }
    };

    facade.events = {
      /**
       * @param {object} context Element to listen on
       * @param {string} events Events to trigger, e.g. click, focus, etc.
       * @param {string} selector Items to listen for
       * @param {object} data
       * @param {object} callback
       */
      listen: function ( context, events, selector, callback ) {
        mediator.events.listen( context, events, selector, callback );
      },
      bindAll: mediator.events.bindAll
    };

    facade.util = {
      each: mediator.util.each,
      rest: mediator.util.rest,
      delay: mediator.util.delay,
      extend: mediator.util.extend
    };

    facade.data = mediator.data;
    facade.template = mediator.template;

    return facade;

	});
