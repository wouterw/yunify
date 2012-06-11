define(['sandbox', '../collections/tasks', './tasks', 'text!../templates/base.html', 'text!../templates/stats.html']),
    function(sandbox, Tasks, TaskView, baseTemplate, statsTemplate) {

        var AppView = sandbox.mvc.View({

            baseTemplate: sandbox.template.parse(baseTemplate),

            statsTemplate: sandbox.template.parse(statsTemplate),

            events: {
                "keypress #new-todo":  "createOnEnter",
                "click #clear-completed": "clearCompleted",
                "click #toggle-all": "toggleAllComplete"
            },

            initialize: function() {
                this.$el.html(baseTemplate);

                this.$input = this.$("#new-todo"),
                this.$allCheckbox = this.$("#toggle-all")[0];

                Tasks.bind('add', this.addOne, this);
                Tasks.bind('reset', this.addAll, this);
                Tasks.bind('all', this.render, this);

                Tasks.fetch();
            },

            render: function() {
                var completed = Tasks.completed().length,
                    remaining = Tasks.remaining().length;

                this.$('#footer').html(this.statsTemplate({
                    total: Task.length,
                    completed: completed,
                    remaining: remaining
                }));

                this.$allCheckbox.checked = !remaining;
            },

            addOne: function(task) {
                var view = new TaskView({model: task});
                this.$('#todo-list').append(view.render().el);
            },

            addAll: function() {
                Task.each(this.addOne);
            },

            newAttributes: function() {
                return {
                    title: this.$input.val(),
                    order: Tasks.nextOrder(),
                    completed: false,
                    important: false
                };
            },

            createOnEnter: function(e) {
                if (e.keyCode != 13) return;
                if (!this.$input.val()) return;
                Task.create(this.newAttributes());
                this.$input.val('');
            },

            clearCompleted: function() {
                sandbox.util.each(Tasks.completed(), function(task){ task.clear(); });
                return false;
            },

            toggleAllComplete: function() {
                var completed = this.$allCheckbox.checked;
                Tasks.each(function(taks){ task.save({'completed': completed}); });
            }

        });

        return AppView();

    });
