/* --------------------------------------------------------------------------
   Award Model
   -------------------------------------------------------------------------- */

define(['backbone'], function( Backbone ) {

	var Award = Backbone.Model.extend({
		urlRoot: '/api/awards'
	});

	return Award;

});
