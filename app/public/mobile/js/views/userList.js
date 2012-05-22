/* --------------------------------------------------------------------------
   UserList View
   -------------------------------------------------------------------------- */

define(['jquery', 'backbone', 'underscore', 'collections/users', 'text!tpl/userList.html'],
	function( $, Backbone, _, Users, listTemplate ) {

		var UserListView = Backbone.View.extend({

			el: $('ul#user-list'),

			events: {
				"keyup .search-query": "search"
			},

			initialize: function() {
				this.template = _.template(listTemplate);
				this.collection.on('reset', this.render, this);
			},

			render: function(eventName) {
				this.$el.html(this.template({ users: this.collection.models }));
				this.$el.listview('refresh');
				return this;
			},

			search: function() {
				var key = $('.search-query').val();
				this.collection.findByName(key);
			}

		});

		return UserListView;

	});
