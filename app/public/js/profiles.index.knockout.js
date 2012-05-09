(function() {
	'use strict';

	var User = function(data) {
		var self = this;
		this.id = data._id;
		this.fbId = data.fb.id;
		this.name = ko.observable(data.name);
		this.bio = ko.observable(data.bio);
		this.url = ko.computed(function() {
			return '/profiles/' + self.id;
		});
		this.img = ko.computed(function() {
			return 'https://graph.facebook.com/' + self.fbId + '/picture?type=square';
		});
		this.inviteable = ko.computed(function() {
		};
		this.inviteUrl = ko.computed(function() {
			return '/user'
		});
	};

	var ViewModel = function(data) {
		var self = this;
		this.users = ko.observableArray(data);
		this.searchquery = ko.observable();

		this.searchquery.subscribe(function(q) {
			if (q && q.length > 3) {
				$.getJSON('/api/users/search?q=' + q, function(items) {
					self.invitee = new User(items[0]);
				});
			}
		});
	};

	// initialize
	$.getJSON('/api/users', function (data) {
		ko.applyBindings(new ViewModel(data));
	});

})
