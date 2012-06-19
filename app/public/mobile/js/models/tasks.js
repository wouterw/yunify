define( ['jquery', 'backbone', 'models/Task'],
  function( $, Backbone, Task ) {

  var Tasks = Backbone.Collection.extend({

    model: Task,

    initialize: function() {},

    completed: function() {
      return this.filter(function(task){ return task.get('completed'); });
    },

    remaining: function() {
      return this.without.apply(this, this.completed());
    }

  });

  return Tasks;

});
