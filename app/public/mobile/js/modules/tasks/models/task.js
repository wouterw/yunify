/* --------------------------------------------------------------------------
   Task Model
   -------------------------------------------------------------------------- */

define(['backbone'], function( Backbone ) {

	var Task = Backbone.Model.extend({

		idAttribute: '_id',

		defaults: function () {
			return {
				title: 'empty task...',
				completed: false,
				important: false,
				order: Tasks.nextOrder()
			};
		},

		initialize: function () {
			if (!this.get('title')) {
				this.set({ 'title': this.defaults.title });
			}
		},

		toggle: function () {
			this.save( { done: !this.get('completed') } );
		},

		destroy: function () {
			this.destroy();
		}

	});

	return Task;

});
