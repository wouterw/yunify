(function() {

/* --------------------------------------------------------------------------
   GroupViewModel
   -------------------------------------------------------------------------- */

	var Group = function ( data ) {
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

	var Member = function ( data ) {
		var self = this;
		this.id = data._id;
		this.fbId = data.fb.id;
		this.name = data.fullName;
		this.status = data.status;
		this.picture = function () {
			return 'https://graph.facebook.com/' + self.fbId + '/picture?type=normal';
		}();
		this.award_count = data.achievements.unlocked.length;
		this.task_count = data.achievements.task_count || 0;
		this.score_count = data.achievements.score_count || 0;
	};

	var GroupViewModel = function () {
		var self = this;

		this.group = {};
		this.major = {};
		this.members = ko.observableArray([]);
		this.members.subscribe(function ( newValue ) {
			var members = self.members();
			for (var i = 0, j = members.length; i < j; i++) {
				var member = members[i];
				if (!member.index) {
					member.index = ko.observable(i+1);
				} else {
					member.index(i+1);
				}
			}
			self.getMajor();
		});

		this.getMajor = function () {
			self.major = self.members()[0];
		};

		this.init = function () {
			self.getGroup();
			self.getMembers();
			self.sortMembers();
		};

		this.getGroup = function () {
			$.ajax({
				async: false,
				url: '/api/me/group',
				success: function (data) {
					self.group = new Group(data);
				}
			});
		};

		this.getMembers = function () {
			$.ajax({
				async: false,
				url: '/api/me/group/members',
				success: function (data) {
					_.each(data, function(item) {
						self.members.push(new Member(item));
					});
				}
			});
		};

		this.sortMembers = function () {
			this.members.sort(function(left, right) {
				return left.score_count === right.score_count ? 0 : (left.score_count > right.score_count ? -1 : 1);
			});
		};

		this.update = function () {
			$.ajax({
				url: '/api/groups/' + self.group.id,
				type: 'PUT',
				data: self.group.toJSON(),
				success: function() {
					$('#update-success').show();
				}
			});
		};

	};

/* --------------------------------------------------------------------------
   InviteViewModel
   -------------------------------------------------------------------------- */

	var Invitee = function(data) {
		var self = this;
		this.id = ko.observable(data._id);
		this.fbId = ko.observable(data.fb.id);
		this.name = ko.observable(data.fullName);
		this.picture = function () {
			return 'https://graph.facebook.com/' + self.fbId() + '/picture?type=square';
		}();
		this.link = function () {
			return '/profiles/' + self.id();
		}();
	};

	var InviteViewModel = function() {
		var self = this;
		this.invitee = ko.observable();
		this.motivation = ko.observable();
		this.searchquery = ko.observable();
		this.searchResults = ko.observableArray([]);

		this.searchquery.subscribe(function(q) {
			if (q) {
				self.search(q);
				setTimeout(function () {
					$('#searchForm').addClass('open');
				});
			}
		});

		this.search = function(q) {
			$.getJSON('/api/users/search?q=' + q, function(items) {
				self.searchResults.removeAll();
				_.each(items, function (item) {
					self.searchResults.push(new Invitee(item));
				});
			});
		};

		this.select = function(item) {
			console.log(item);
			self.invitee(item);
		};

		// invite the selected user
		this.invite = function() {
			$.post('/api/me/group/invites', {
				"invitee": self.invitee().id(),
				"motivation": self.motivation
			}).done(function() {
				$('#invite-user-modal').modal('hide');
				$('#invite-success').show();
			});
		};
	};

	// Close the search dropdown on click anywhere in the UI
	$('body').click(function () {
		$('.dropdown').removeClass("open");
	});

/* --------------------------------------------------------------------------
   MasterViewModel
   -------------------------------------------------------------------------- */

	var MasterViewModel = {
		groupViewModel : new GroupViewModel(),
		inviteViewModel : new InviteViewModel()
	};

	MasterViewModel.groupViewModel.init();

	ko.applyBindings(MasterViewModel);

})();
