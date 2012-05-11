(function() {
	'use strict';

	var User = function(data) {
		var self = this;

		this.id = data._id;
		this.name = ko.observable(data.fullName);
		this.bio = ko.observable(data.bio);

		this.fbId = data.fb.id;
		this.groupId = ko.observable(data.group);

		this.profile_link = function() {
			return '/profiles/' + self.id;
		};

		this.profile_picture = function() {
			return 'https://graph.facebook.com/' + self.fbId + '/picture?type=square';
		};

		this.inviteable = function() {
			return (typeof self.groupId() === 'undefined');
		};

		this.invite = function() {
			if (self.inviteable()) {
				$.post('/api/me/group/invites', {
					'invitee': self.id
				}).success(function() {
					// handle success
				}).error(function(err) {
					console.log(err);
				});
			}
		};

	};

	var ViewModel = function() {
		var self = this;
		this.users = ko.observableArray([]);
		this.searchquery = ko.observable();

		this.searchquery.subscribe(function(q) {
			if (q && q.length > 3) {
				$.getJSON('/api/users/search?q=' + q, function(items) {
					self.invitee = new User(items[0]);
				});
			}
		});

		this.addUser = function(data) {
			self.users.push(new User(data));
		};

	};

	// apply bindings
	var vm = new ViewModel()
	ko.applyBindings(vm);

	// initialize
	$.getJSON('/api/users', function (items) {
		_.each(items, function(item) {
			vm.addUser(item);
		});
	});

})();
