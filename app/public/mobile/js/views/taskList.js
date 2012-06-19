define(['jquery', 'backbone', 'underscore', 'xdate', 'text!tpl/taskList.html'],
  function($, Backbone, _, XDate, listTemplate) {

    var TasksView = Backbone.View.extend({

      el: $('#tasks-page'),

      $list: this.$('#task-list'),

      $input: this.$('#new-task'),

      template: _.template(listTemplate),

      events: {
        "click #create-task": "create",
        "click .task": "complete"
      },

      initialize: function (options) {
        _.bindAll(this, 'render', 'loaded', 'added', 'removed', 'updated');

        this.collection.bind('all', this.render);

        yunify.events.bind('task:loaded', this.loaded);
        yunify.events.bind('task:added', this.added);
        yunify.events.bind('task:removed', this.removed);
        yunify.events.bind('task:updated', this.updated);

        this.me = options.me.attributes;
        yunify.events.trigger('task:init', this.me.group);
      },

      render: function() {
        this.$list.empty();
        this.$list.html(this.template({ tasks: this.collection.models }));
        this.$list.listview('refresh');
      },

      loaded: function(tasks) {
        console.log('tasksView:loaded', tasks);

        tasks = _.filter(tasks, function(task) {
          return !task.completed;
        });

        var self = this;
        _.each(tasks, function(t) {
          t.created_at = self.parseDate(t.created_at);
        });

        this.collection.reset(tasks);
      },

      parseDate: function(datestring) {
        return new XDate(datestring).toString('MMM d, yyyy @ h(:mm)TT');
      },

      added: function(task) {
        console.log('tasksView:added', task);
        task.created_at = this.parseDate(task.created_at);
        this.collection.create(task);
      },

      updated: function(task) {
        console.log('tasksView:updated', task);
        if (task.completed) {
          this.collection.remove(this.collection.get(task._id));
        } else {
          var t = this.collection.get(task._id);
          t.set(task);
        }
      },

      removed: function(id) {
        console.log('tasksView:removed', id);
        this.collection.remove(this.collection.get(id));
      },

      newAttributes: function() {
        return {
          title: this.$input.val(),
          important: false,
          completed: false
        };
      },

      create: function() {
        var task = this.newAttributes();
        task.group = this.me.group;
        yunify.events.trigger('task:add', task);
        this.$input.val('');
      },

      complete: function(e) {
        var task = this.collection.get(e.currentTarget.id);
        task.toggle();
      }

    });

    return TasksView;

  });
