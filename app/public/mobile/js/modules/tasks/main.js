define([ 'collections/tasks', 'views/tasksView', 'routers/tasksRouter' ],
	function( Tasks, TasksView, TaskRouter ) {
		'use strict';

		var TaskModule = function () {

			this.tasks = new Tasks();

			this.tasksView = new TasksView({
				collection: this.tasks,
				el: '#task-list'
			});

			this.router = TaskRouter({
				tasks: this.tasks
			});

		};

		TaskModule.prototype.addHandlers = function () {

			var self = this;

			yunify.events.on('connect', function () {

			});




		};


		return TaskModule;

	});
