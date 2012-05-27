/**
 * Event Aggregator. It allows you have to have disparate parts of your system
 * react to the events of other parts of the system,
 * without having them directly coupled.
 *
 * @link http://martinfowler.com/eaaDev/EventAggregator.html
 * @link http://lostechies.com/derickbailey/2012/04/03/revisiting-the-backbone-event-aggregator-lessons-learned/
 * @link http://lostechies.com/derickbailey/2011/07/19/references-routing-and-the-event-aggregator-coordinating-views-in-backbone-js/
 */

define(['underscore', 'backbone'],
	function ( _, Backbone ) {
		'use strict';

		var vent = _.extend( {}, Backbone.Events );

		return vent;

	});

// # centralized global_dispatcher object added to all Backbone Collection, Model, View, and Router classes
// (->
//   return if this.isExtended
//   # attaching the Events object to the dispatcher variable
//   dispatcher = _.extend({}, Backbone.Events, cid: "dispatcher")
//   _.each [ Backbone.Collection::, Backbone.Model::, Backbone.View::, Backbone.Router:: ], (proto) ->
//     # attaching a global dispatcher instance
//     _.extend proto, global_dispatcher: dispatcher
// )()
