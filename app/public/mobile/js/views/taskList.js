define(['jquery', 'backbone', 'underscore', 'text!tpl/tasks-stats-template.html'],
  function( $, Backbone, _, statsTemplate ) {

    var TasksView = Backbone.View.extend({

      el: $( 'div#tasks-page' ),

      statsTemplate: _.template( statsTemplate ),

      events: {
        'keypress input#new-task': 'createOnEnter'
      },

      initialize: function () {
        _.bindAll(this, 'addOne', 'addAll', 'render');

        this.input = this.$("input#new-task");

        Todos.bind('add', this.addOne);
        Todos.bind('reset', this.addAll);
        Todos.bind('all', this.render);

        Todos.fetch();
      },

      render: function() {
        var done = Todos.done().length;
        var remaining = Todos.remaining().length;

        this.$('#todo-stats').html(this.statsTemplate({
          total:      Todos.length,
          done:       done,
          remaining:  remaining
        }));

        this.allCheckbox.checked = !remaining;
      },

      addOne: function(todo) {
        var view = new TodoView({model: todo});
        this.$("#todo-list").append(view.render().el);
      },

      addAll: function() {
        Todos.each(this.addOne);
      },

      newAttributes: function() {
        return {
          content: this.input.val(),
          order: Todos.nextOrder(),
          done: false
        };
      },

      createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        Todos.create(this.newAttributes());
        this.input.val('');
      }

    });

    return TasksView;

  });
