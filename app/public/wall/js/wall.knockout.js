$(document).ready(function () {
	'use strict';

	/*-------------------------------------
	Task ViewModel
	---------------------------------------*/
	var Task = function(data, owner) {
		this.id = data._id;
		this.title = ko.observable(data.title);
		this.completed = ko.observable(data.completed);
		this.important = ko.observable(data.important);
		this.created_at = ko.observable(data.created_at);
		this.editing = ko.observable(false);
	};

	/*-------------------------------------
	Twitter ViewModel
	---------------------------------------*/
	var Tweet = function(data) {
		this.from_user = data.from_user;
		this.profile_image_url = "https://api.twitter.com/1/users/profile_image?screen_name=" + data.from_user + "&size=original";
		this.text = data.text.parseURL().parseUsername().parseHashtag();
		console.log(this.text);
		this.created_at = relativeTime(data.created_at);
	};

	/*-------------------------------------
		Facebook ViewModel
		-------------------------------------*/
	var Post = function(data) {
		var profileImageUrl = "http://graph.facebook.com/" + data.from.id + "/picture?type=large";
		var self = this;

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

		// Bindings for a status update
		if (data.type === 'status') {
			// Check if there is a normal message or a like message
			if(data.message === undefined) {
				this.Message = ko.observable(data.story);
			} else {
				this.Message = ko.observable(data.message);
			}
			// Check if likes excist for status
			if (data.likes === undefined) {
					this.Likes = ko.observable(0);
			} else {
					this.Likes = ko.observable(data.likes.count);
			}
		}

		// Bindings for a link update
		else if (data.type === 'link') {
			// Filter out the profile picture changes
			if (data.name === undefined) {
				this.Message = ko.observable(data.story);
				this.LinkImage = ko.observable(data.picture);
			} else {
				this.Message = ko.observable(data.story);
				this.LinkImage = ko.observable(data.picture);
				this.LinkName = ko.observable(data.name);
				this.LinkTitle = ko.observable(data.caption);
				this.LinkDescription = ko.observable(data.description);
				if (data.likes === undefined) {
						this.Likes = ko.observable(0);
				} else {
						this.Likes = ko.observable(data.likes.count);
				}
			}
		}

		// Bindings for a photo post
		else if (data.type === 'photo') {
			if (data.message === undefined) {
					this.Story = ko.observable(data.story);
				} else {
					this.Story = ko.observable(data.message);
				}
				this.Photo = ko.observable(data.picture);
		}

		// Helpers for the if-statements in wall/index.js
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

	/*-------------------------------------
	Main ViewModel
	---------------------------------------*/
	var ViewModel = function(tasks) {
		var self = this;

		// Facebook
		this.posts = ko.observableArray([]);
		this.fetchPosts = function() {
			$.getJSON('https://graph.facebook.com/me/home?access_token=' + fb_access_token, function(response) {
				self.posts.removeAll();
				_.each(response.data, function(d) {
					var post = new Post(d);
					self.posts.push(post);
				});
			});
		};

		// Twitter
		this.twitter_names = '';
		this.addTweetNames = function(member) {
			if (self.twitter_names.length === 0) {
				self.twitter_names += 'from:' + member.twitter;
			} else {
				self.twitter_names += '%20OR%20from:' + member.twitter;
			}
		};

		// Tweets
		this.tweets = ko.observableArray([]);
		this.fetchTweets = function() {
			console.log("test");
			$.getJSON('http://search.twitter.com/search.json?callback=?&rpp=10&include_organizations=true&q=' + self.twitter_names, function(response) {
				self.tweets.removeAll();
				_.each(response.results, function(d) {
					self.tweets.push(new Tweet(d));
				});

			});
		};

		// Tasks
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
			oldTask.important(updatedTask.important);
			self.notify = true;
		};

		this.sortTasks = function(data) {
			data.sort(function(left,right) {
				var result;
				if (left.important() && right.important()) {
					result = 0;
				}
				else if (!left.important() && right.important()) {
					result = 1;
				}
				else {
					result = -1;
				}
				return result;
			});
		};

		this.sortTasksWithDate = function(data) {
			data.sort(function(left, right){
				var result;
				if(left.created_at() > right.created_at()){
					result = -1;
				} else if (left.created_at() === right.created_at()) {
					result = 0;
				} else {
					result = 1;
				}
				return result;
			});
		};

		this.completedTasks = ko.computed(function() {
			var d = ko.utils.arrayFilter(self.tasks(), function(task) {
				return task.completed();
			});
			self.sortTasks(d);
			self.sortTasksWithDate(d);
			return d.splice(0,3);
		});

		this.uncompletedTasks = ko.computed(function() {
			var d = ko.utils.arrayFilter(self.tasks(), function(task) {
				return !task.completed();
			});
			self.sortTasks(d);
			return d;
		});
	};

	var vm = new ViewModel();

	// facebook
	vm.fetchPosts();
	setInterval(vm.fetchPosts, 60000);

	// Tweets
	$.getJSON('/api/me/group/members', function(members) {
		_.each(members, function(member) {
			vm.addTweetNames(member);
		});
		vm.fetchTweets();

		setInterval(vm.fetchTweets, 60000);

	});

	// Apply binding
	ko.applyBindings(vm);

	// Facebook stream
	// Need timeout to wait for bindings to load
	setTimeout(function() {triggerslider();}, 5000);
	var triggerslider = function() {
		$('#jcarousel').jcarousel({
        wrap: 'circular',
        vertical:true
    }).jcarouselAutoscroll({
        target: '+=2'
    });
	}

	var socket = io.connect('/tasks');

	socket.on('connect', function(data) {
		socket.emit('init', {
			"groupId": groupId
		});
	});

	socket.on('load', function(data) {
		_.each(data, function(d) {
			vm.added(d);
		});
	});

	socket.on('added', function(data) {
		vm.added(data);
	});

	socket.on('updated', function(data) {
		vm.updated(data);
	});

	socket.on('removed', function(id) {
		vm.removed(id);
	});
});