/* --------------------------------------------------------------------------
   UserList View
   -------------------------------------------------------------------------- */

define(['jquery', 'backbone', 'underscore', 'text!tpl/userList.html'],
	function( $, Backbone, _, listTemplate ) {

		var UserListView = Backbone.View.extend({

			el: $( 'ul#user-list' ),

			initialize: function () {
				this.template = _.template( listTemplate );
				this.collection.on( 'reset', this.render, this );
			},

			render: function() {
				this.$el.empty();
				this.$el.html( this.template( { users: this.collection.models } ) );
				this.$el.listview( 'refresh' );
				return this;
			}

		});

		return UserListView;

	});
