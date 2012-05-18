(function() {
	'use strict';

/* --------------------------------------------------------------------------
   GroupViewModel
   -------------------------------------------------------------------------- */

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

	var GroupViewModel = function(data) {
		var self = this;
		this.group = new Group(data);
		this.update = function() {
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
   LeaderboardViewModel
   -------------------------------------------------------------------------- */

	var LeaderboardEntry = function(item) {
		this.id = item._id;
		this.roomie = item.user.fullName;
		this.points = item.points;
	};

	var LeaderBoardViewModel = function() {
		var self = this;
		this.leaderboardEntries = ko.observableArray([]);
		this.update = function(items) {
			_.each(items, function(item) {
				self.leaderboardEntries.push(new LeaderboardEntry(item));
			});
		};
	};

/* --------------------------------------------------------------------------
   MasterViewModel
   -------------------------------------------------------------------------- */

	var group = {};
	$.ajax({
		async: false,
		url: '/api/me/group',
		success: function (data) {
			group = data;
		}
	});

	var MasterViewModel = {
		groupViewModel : new GroupViewModel(group),
		inviteViewModel : new InviteViewModel(),
		leaderBoardViewModel : new LeaderBoardViewModel()
	};

	ko.applyBindings(MasterViewModel);

/* --------------------------------------------------------------------------
   Leaderboard Socket Communication
   -------------------------------------------------------------------------- */

	var socket = io.connect('/ranking');

	socket.on('connect', function(data) {
		socket.emit('init', {
			"groupId": MasterViewModel.groupViewModel.group.id
		});
	});

	socket.on('update', function(data) {
		MasterViewModel.leaderBoardViewModel.update(data);
	});

	console.log(ko.toJS(MasterViewModel));

})();
