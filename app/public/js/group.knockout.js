(function() {
	'use strict';

	var Group = function(data) {
		var self = this;
		this.id = data._id;
		this.name = ko.observable(data.name);
		this.description = ko.observable(data.description);
		this.toJSON = function() {
			return {
				"id": self.id,
				"name": self.name,
				"description": self.description
			};
		};
	};

	var Invitee = function(data) {
		var self = this;
		this.id = ko.observable(data._id);
		this.fbId = ko.observable(data.fb.id);
		this.name = ko.observable(data.fullName);
		this.picture = ko.computed(function() {
			return 'https://graph.facebook.com/' + self.fbId() + '/picture?type=square';
		});
		this.link = ko.computed(function() {
			return '/profiles/' + self.id();
		});
	};

	var ViewModel = function(data) {
		var self = this;
		this.group = new Group(data);
		this.invitee = ko.observable();
		this.motivation = ko.observable();
		this.searchquery = ko.observable();

		this.searchquery.subscribe(function(q) {
			if (q && q.length > 3) {
				$.getJSON('/api/users/search?q=' + q, function(items) {
					self.invitee = new Invitee(items[0]);
				});
			}
		});

		// update the group
		this.update = function() {
			$.ajax({
				url: '/api/groups/' + groupId,
				type: 'PUT',
				data: self.toJSON(),
				success: function() {
					$('#update-success').show();
				}
			});
		};

		// invite the selected user
		this.invite = function() {
			$.post('/api/groups/' + groupId + '/invitations', {
				"invitee": self.invitee.id,
				"motivation": self.motivation
			}).done(function() {
				$('#invite-success').show();
			});
		};

	};

	// initialize
	$.getJSON('/api/groups/' + groupId, function (data) {
		ko.applyBindings(new ViewModel(data));
	});

})();
