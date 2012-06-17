define(['jquery', 'backbone', 'underscore', 'text!tpl/groupDetails.html'],
	function( $, Backbone, _, groupTemplate ) {

	var GroupView = Backbone.View.extend({

		el: $('section#group-details'),

		events: {
			'afterRender': 'afterRender'
		},

		initialize: function() {
			this.template = _.template( groupTemplate );
		},

		render: function() {
			var self = this;
			$.ajax({
				url: '/api/groups/' + this.model.get('_id') + '/members',
				type: 'GET',
				dataType: 'json',
				success: function ( data ) {
					self.$el.html( self.template( { group: self.model, members: data } ) );
					self.$el.trigger('afterRender');
					return self;
				}
			});
		},

		afterRender: function () {
			$( '#group-members-list' ).listview();
		}

	});

	return GroupView;

});
