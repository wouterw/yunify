define( ['jquery', 'backbone', 'models/Task'],
  function( $, Backbone, Task ) {

  var Tasks = sandbox.mvc.Collection({

    model: Task,

    completed: function() {
      return this.filter(function(task){ return task.get('completed'); });
    },

    remaining: function() {
      return this.without.apply(this, this.completed());
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(todo) {
      return todo.get('order');
    }

  });

  return Object.create(Tasks);

});
