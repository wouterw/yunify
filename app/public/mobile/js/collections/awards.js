/* --------------------------------------------------------------------------
   AwardModel
   -------------------------------------------------------------------------- */

define( ['jquery', 'backbone', 'models/award'], function( $, Backbone, Award ) {

	var Awards = Backbone.Collection.extend({

		model: Award,

		url: '/api/awards'

	});

	return Awards;

});
