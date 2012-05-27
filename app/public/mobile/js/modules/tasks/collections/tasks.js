/* --------------------------------------------------------------------------
   Tasks Collection
   -------------------------------------------------------------------------- */

define( ['jquery', 'backbone', 'models/task'], function( $, Backbone, Task ) {

	var Tasks = Backbone.Collection.extend({

		model: Task,

		nextOrder: function() {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(todo) {
			return todo.get('order');
		}

	});

	return Tasks;

});
