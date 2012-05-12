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
		this.picture = function () {
			return 'https://graph.facebook.com/' + self.fbId() + '/picture?type=square';
		}();
		this.link = function () {
			return '/profiles/' + self.id();
		}();
	};

	var ViewModel = function(data) {
		var self = this;
		this.group = new Group(data);
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
			self.invitee(item);
			console.log(ko.toJSON(item));
			console.log(ko.toJSON(self.invitee));
		};

		// update the group
		this.update = function() {
			$.ajax({
				url: '/api/groups/' + self.group.id,
				type: 'PUT',
				data: self.toJSON(),
				success: function() {
					$('#update-success').show();
				}
			});
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

	// initialize
	$.getJSON('/api/me/group', function (data) {
		ko.applyBindings(new ViewModel(data));
	});

	// Close the search dropdown on click anywhere in the UI
  $('body').click(function () {
      $('.dropdown').removeClass("open");
  });

})();
