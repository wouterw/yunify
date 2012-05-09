(function() {
	'use strict';

	var Task = function(data, owner) {
		var self = this;
		this.id = data._id;
		this.title = ko.observable(data.title);
		this.completed = ko.observable(data.completed);
		this.important = ko.observable(data.important);
		this.editing = ko.observable(false);

		this.title.subscribe(function() {
			owner.update(ko.toJS(self));
		});

		this.completed.subscribe(function() {
			owner.update(ko.toJS(self));
		});

		this.important.subscribe(function() {
			owner.update(ko.toJS(self));
		});
	};

	var TasksViewModel = function(tasks) {
		var self = this;
		this.notify = true;
		this.tasks = ko.observableArray([]);
		this.current = ko.observable();

		// task has been added server-side,
		// do the same client-side
		this.added = function(data) {
			var t = new Task(data, self);
			if(self.tasks.indexOf(t) === -1) {
				self.tasks.push(t);
			}
		};

		// emit 'add task' event to server
		this.add = function() {
			var current = self.current().trim();
			if (current) {
				var data = {
					"title": current,
					"completed": false,
					"important": false
				};
				emitAdd(data);
				self.current('');
			}
		};

		// task has been removed server-side,
		// do the same client-side
		this.removed = function(id) {
			self.tasks.remove(function (task) {
				return (task.id === id);
			});
		};

		// emit 'remove task' event to server
		this.remove = function(task) {
			emitRemove(task.id);
		};

		// task has been updated server-side,
		// do the same client-side
		this.updated = function(updatedTask) {
			console.log(updatedTask);
			var oldTask = ko.utils.arrayFilter(self.tasks(), function(task) {
				return (task.id === updatedTask._id);
			})[0];
			self.notify = false;
			oldTask.title(updatedTask.title);
			oldTask.completed(updatedTask.completed);
			oldTask.completed(updatedTask.important);
			self.notify = true;
		};

		// emit 'update task' event to server
		this.update = function(task) {
			if (self.notify) {
				emitUpdate(task);
			}
		};

		// enable edit mode
		this.editItem = function(task) {
			task.editing(true);
		};

		// disable edit mode
		this.stopEditing = function(task) {
			task.editing(false);
			// remove task if empty
			if (!task.title().trim()) {
				self.remove(task.id);
			}
		};

		this.completedCount = ko.computed(function() {
			return ko.utils.arrayFilter(self.tasks(), function(task) {
				return task.completed();
			}).length;
		});

		this.remainingCount = ko.computed(function() {
			return self.tasks().length - self.completedCount();
		});

	};

	var tasksvm = new TasksViewModel();
	ko.applyBindings(tasksvm);

	var socket = io.connect('/tasks');

	socket.on('connect', function(data) {
		socket.emit('init', {
			"groupId": groupId
		});
	});

	socket.on('load', function(data) {
		_.each(data, function(d) {
			tasksvm.added(d);
		});
	});

	socket.on('added', function(data) {
		tasksvm.added(data);
	});

	socket.on('updated', function(data) {
		tasksvm.updated(data);
	});

	socket.on('removed', function(id) {
		tasksvm.removed(id);
	});

	var emitAdd = function(task) {
		socket.emit('add', {
			"title": task.title,
			"completed": task.completed,
			"important": task.important,
			"groupId": groupId
		});
	};

	var emitUpdate = function(task) {
		socket.emit('update', {
		 "id": task.id,
		 "title": task.title,
		 "completed": task.completed,
		 "important": task.important,
		 "groupId": groupId
		});
	};

	var emitRemove = function(id) {
		socket.emit('remove', {
			"id": id,
			"groupId": groupId
		});
	};

})();
