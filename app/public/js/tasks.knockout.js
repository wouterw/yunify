(function() {
	'use strict';
	var ENTER_KEY = 13;

	// trim polyfill
	if ( !String.prototype.trim ) {
		String.prototype.trim = function() {
			return this.replace( /^\s+|\s+$/g, '' );
		};
	}

	// a custom binding to handle the enter key (could go in a separate library)
	ko.bindingHandlers.enterKey = {
		init: function( element, valueAccessor, allBindingsAccessor, data ) {
			var wrappedHandler, newValueAccessor;

			// wrap the handler with a check for the enter key
			wrappedHandler = function( data, event ) {
				if ( event.keyCode === ENTER_KEY ) {
					valueAccessor().call( this, data, event );
				}
			};

			// create a valueAccessor with the options that we would want to pass to the event binding
			newValueAccessor = function() {
				return {
					keyup: wrappedHandler
				};
			};

			// call the real event binding's init function
			ko.bindingHandlers.event.init( element, newValueAccessor, allBindingsAccessor, data );
		}
	};

	// wrapper to hasfocus that also selects text and applies focus async
	ko.bindingHandlers.selectAndFocus = {
		init: function( element, valueAccessor, allBindingsAccessor ) {
			ko.bindingHandlers.hasfocus.init( element, valueAccessor, allBindingsAccessor );
			ko.utils.registerEventHandler( element, 'focus', function() {
				element.select();
			} );
		},
		update: function( element, valueAccessor ) {
			ko.utils.unwrapObservable( valueAccessor() ); // for dependency
			// ensure that element is visible before trying to focus
			setTimeout(function() {
				ko.bindingHandlers.hasfocus.update( element, valueAccessor );
			}, 0 );
		}
	};

	var Proxy = function () {
		var self = this;

		this.socket.on('init', function () {
		
		});

		this.socket.on('added', function () {
		
		});

		this.socket.on('updated', function () {

		});

		this.socket.on('removed', function () {

		});

		this.start = function () {
			self.socket = io.connect('/chat');
		};

		this.add = function (task) {
			self.socket.emit('add', task);
		};

		this.update = function (task) {
			self.socket.emit('update', task);
		};

		this.remove = function (task) {
			self.socket.emit('remove', task);
		};

	};

	var Task = function(title, completed, owner) {
		var self = this;
		this.title = ko.observable(title);
		this.completed = ko.observable(completed);
		this.editing = ko.observable(false);
	};

	var ViewModel = function(tasks) {
		var self = this;
		self.proxy = new Proxy();  

		// map array of passed in tasks to an observableArray of Task objects
		self.tasks = ko.observableArray(ko.utils.arrayMap(tasks, function(task) {
			return new Task(task.title, task.completed, self);
		}));

		// store the new task value being entered
		self.current = ko.observable();

		// add a new task, when enter key is pressed
		self.add = function() {
			var current = self.current().trim();
			if (current) {
				var t = new Task(current);
				self.proxy.add(t);
				self.tasks.push(t);
				self.current('');
			}
		};

		// remove a single task
		self.remove = function(task) {
			self.proxy.remove(task);
			self.tasks.remove(task);
		};

		// remove all completed tasks
		self.removeCompleted = function() {
			self.tasks.remove(function(task) {
				return task.completed();
			});
		};

		// edit an task
		self.editItem = function(task) {
			task.editing(true);
		};

		// stop editing an task. 
		// remove the task, if it is now empty
		self.stopEditing = function(task) {
			task.editing(false);
			self.proxy.update(task);
			if (!task.title().trim()) {
				self.proxy.remove(task);
				self.remove(task);
			}
		};

		// count of all completed tasks
		self.completedCount = ko.computed(function() {
			return ko.utils.arrayFilter(self.tasks(), function(task) {
				return task.completed();
			}).length;
		});

		// count of tasks that are not complete
		self.remainingCount = ko.computed(function() {
			return self.tasks().length - self.completedCount();
		});

		// writeable computed observable to handle marking all complete/incomplete
		self.allCompleted = ko.computed({
			//always return true/false based on the done flag of all tasks
			read: function() {
				return !self.remainingCount();
			},
			// set all tasks to the written value (true/false)
			write: function(newValue) {
				ko.utils.arrayForEach(self.tasks(), function( task ) {
					// set even if value is the same, as subscribers are not notified in that case
					task.completed( newValue );
				});
			}
		});

		// helper function to keep expressions out of markup
		self.getLabel = function( count ) {
			return ko.utils.unwrapObservable( count ) === 1 ? 'item' : 'items';
		};

	};

	//$.getJSON('/api/tasks', function (data) { 
		// bind a new instance of our view model to the page
		ko.applyBindings( new ViewModel( data || [] ) );
	//});

})();
