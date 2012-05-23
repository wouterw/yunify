/* --------------------------------------------------------------------------
   Group Model
   -------------------------------------------------------------------------- */

define(['backbone'], function( Backbone ) {

	var Group = Backbone.Model.extend({
		urlRoot: '/api/groups'
	});

	return Group;

});
