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
		}();
		this.profile_picture = function() {
			return 'https://graph.facebook.com/' + self.fbId + '/picture?type=square';
		}();
	};

	var ViewModel = function() {
		var self = this;
		this.users = ko.observableArray([]);
		this.searchquery = ko.observable();
		this.searchquery.subscribe(function(q) {
			if(q) {
				self.search(q);
			} else {
				self.getAll();
			}
		});
		this.search = function(q) {
			$.getJSON('/api/users/search?q=' + q, function(items) {
				self.users.removeAll();
				_.each(items, function (item) {
					self.users.push(new User(item));
				});
			});
		};
		this.getAll = function() {
			$.getJSON('/api/users', function (items) {
				self.users.removeAll();
				_.each(items, function(item) {
					self.users.push(new User(item));
				});
			});
		};
	};

	var vm = new ViewModel();
	vm.getAll();
	ko.applyBindings(vm);


})();
