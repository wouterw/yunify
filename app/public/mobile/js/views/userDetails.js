/* --------------------------------------------------------------------------
   UserDetail View
   -------------------------------------------------------------------------- */


define(['jquery', 'backbone', 'underscore', 'models/user', 'text!tpl/userDetails.html'],
	function( $, Backbone, _, Users, userTemplate ) {

	var UserView = Backbone.View.extend({

		el: $('section#user-details'),

		initialize: function() {
			this.template = _.template(userTemplate);
		},

		render: function() {
			//this.$el.listview();
			$('ul#user-details-list').listview();
			this.$el.html(this.template(this.model.toJSON()));
			//this.$el.listview('refresh');
			$('ul#user-details-list').listview('refresh');
			return this;
		}

	});

	return UserView;

});
