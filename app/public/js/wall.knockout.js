(function() {
	'use strict';

	var Task = function(data, owner) {
		var self = this;
		this.id = data._id;
		this.title = ko.observable(data.title);
		this.completed = ko.observable(data.completed);
		this.editing = ko.observable(false);

		this.title.subscribe(function() {
			owner.update(ko.toJS(self));
		});

		this.completed.subscribe(function() {
			owner.update(ko.toJS(self));
		});

	};

	var Post = function(data) {
		var profileImageUrl = "http://graph.facebook.com/" + data.from.id + "/picture?type=large";

		this.Type = ko.observable(data.type);
		this.From = ko.observable(data.from.name);
		this.FromPicture = ko.observable(profileImageUrl);
		this.Created = ko.observable(relativeTime(data.created_time));
		this.Comments = ko.observable(data.comments.count);
		this.Message = "";
		this.Likes = "";
		this.LinkImage = "";
		this.LinkName = "";
		this.LinkTitle = "";
		this.LinkDescription = "";
		this.Story = "";
		this.Photo = "";
		this.PhotoDescription = "";

		var self = this;

		if (data.type === 'status') {
				this.Message = ko.observable(data.message);
				if (data.likes == undefined) {
						this.Likes = ko.observable(0);
				} else {
						this.Likes = ko.observable(data.likes.count);
				}
		}
		if (data.type === 'link') {
				this.Message = ko.observable(data.message);
				this.LinkImage = ko.observable(data.picture);
				this.LinkName = ko.observable(data.name);
				this.LinkTitle = ko.observable(data.caption);
				this.LinkDescription = ko.observable(data.description);
				if (data.likes == undefined) {
						this.Likes = ko.observable(0);
				} else {
						this.Likes = ko.observable(data.likes.count);
				}
		}
		if (data.type === 'photo') {
				this.Story = ko.observable(data.story);
				this.Photo = ko.observable(data.picture);
				this.PhotoDescription = ko.observable(data.description);
		}

		this.isLink = ko.computed(function() {
				return (self.Type() === 'link');
		});

		this.isPhoto = ko.computed(function () {
				return (self.Type() === 'photo');
		});

		this.isStatus = ko.computed(function () {
				return (self.Type() === 'status');
		});

	};

	var ViewModel = function(tasks) {
		var self = this;

		// facebook
		this.posts = ko.observableArray([]);
		this.fetchPosts = function() {
			console.log('fetchposts');
			$.getJSON('https://graph.facebook.com/me/home?access_token=' + fb_access_token, function(response) {
				self.posts.removeAll();
				_.each(response.data, function(d) {
					console.log('data recieved');
					var post = new Post(d);
					if (self.posts.indexOf(post) === -1) {
						self.posts.push(post);
					}
				});
			});
		};

		// twitter
		this.tweets = ko.observableArray([]);

		// tasks
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

		// task has been removed server-side,
		// do the same client-side
		this.removed = function(id) {
			self.tasks.remove(function (task) {
				return (task.id === id);
			});
		};

		// task has been updated server-side,
		// do the same client-side
		this.updated = function(updatedTask) {
			var oldTask = ko.utils.arrayFilter(self.tasks(), function(task) {
				return (task.id === updatedTask._id);
			})[0];
			self.notify = false;
			oldTask.title(updatedTask.title);
			oldTask.completed(updatedTask.completed);
			self.notify = true;
		};

	};

	var tasksvm = new ViewModel();
	ko.applyBindings(tasksvm);
	tasksvm.fetchPosts();

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

})();
