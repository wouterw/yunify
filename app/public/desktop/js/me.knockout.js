(function() {
	'use strict';

	var Profile = function(data) {
		var self = this;
		this.id = data._id;
		this.fullName = ko.observable(data.fullName);
		this.email = ko.observable(data.email);
		this.bio = ko.observable(data.bio);
		this.statusValues = ["Available", "Studying", "Busy", "Sleep", "Out"];
		this.status = ko.observable(data.status);
		this.twitter = ko.observable(data.twitter);

		this.email_link = function() {
			return 'mailto:' + self.email();
		}();

		this.twitter_link = function() {
			return 'https://twitter.com/#!/' + self.twitter();
		}();

		this.toJSON = function() {
			return {
				"id": self.id,
				"fullName": self.fullName,
				"email": self.email,
				"bio": self.bio,
				"status": self.status,
				"twitter": self.twitter
			};
		};

		this.update = function() {
			$.ajax({
				url: '/api/users/' + self.id,
				type: 'PUT',
				data: self.toJSON(),
				success: function() {
					$('#update-success').show();
				}
			});

		};
	};

	var Invite = function(data) {
		var self = this;
		this.id = data._id;
		this.invitee = data.invitee;
		this.group = data.group;
		this.status = data.status;
		this.motivation = data.motivation;
		this.invited_by = data.invited_by;
		this.created_at = data.created_at;

		this.group_link = function() {
			return '/groups/' + self.group._id;
		}();

		this.invited_by_link = function() {
			return '/profiles/' + self.invited_by._id;
		}();

		this.isPending = function() {
			return (self.status === 'Pending');
		}();

		this.accept = function() {
			$.ajax({
				async: false,
				url: '/api/me/invites/' + self.id + '/accept',
				success: function (data) {
					$('#invited').hide();
					window.location.reload();

				}
			});
		};

		this.reject = function() {
			$.ajax({
				async: false,
				url: '/api/me/invites/' + self.id + '/reject',
				success: function (data) {
					$('#invited').hide();
				}
			});
		};
	};

	var ViewModel = function() {
		var self = this;
		this.profile = {};
		this.invites = ko.observableArray([]);

		this.init = function(data) {
			this.profile = new Profile(data);
			$.getJSON('/api/me/invites', function (data) {
				_.each(data, function(d) {
					self.invites.push(new Invite(d));
				});
			});
		};

		this.leaveGroup = function() {
			$.post('/api/me/group/leave', function(response) {
				window.location.reload();
			});
		};

	};

	$.getJSON('/api/me', function (data) {
		var vm = new ViewModel();
		vm.init(data);
		ko.applyBindings(vm);
	});

})();
