/**
 * Event Aggregator. It allows you have to have disparate parts of your system
 * react to the events of other parts of the system,
 * without having them directly coupled.
 *
 * @link http://martinfowler.com/eaaDev/EventAggregator.html
 * @link http://lostechies.com/derickbailey/2011/07/19/references-routing-and-the-event-aggregator-coordinating-views-in-backbone-js/
 */

var vent = _.extend( {}, Backbone.Events );

// var vent = _.extend({}, Backbone.Events);
//
// var addEditView = new AddEditView({vent: vent});
//
// medicationList.each(function(med){
//   new MedicationView({model: med, vent: vent});
// });
