define(['sandbox'], function(sandbox) {

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
			this.save({ completed: !this.get('completed') });
		},

		destroy: function () {
			this.destroy();
		}

	});

	return Task;

});
