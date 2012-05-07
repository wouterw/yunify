
// invite.js   -- Knockout app for invites

(function () {
	'use strict';

	var Invitee = function (data) {
		var self = this;
		this.id = data._id;
		this.fbId = data.fb.id;
		this.name = data.fullName;

		this.picture = function () {
			return 'https://graph.facebook.com/' + self.fbId + '/picture?type=square';
		};

		this.profile = function () {
			return '/profiles/' + self.id;
		};

		this.toJSON = function() {
			return {
				"id": self.id
			};
		};

	};

	var Invitees = function () {
		var self = this;
		this.suggestions = ko.observableArray([]);
		this.selectedSuggestions = ko.observableArray([]);
		this.invitees = ko.observableArray([]);

		this.addInvitee = function (invitee) {
			if (self.invitees().indexOf(invitee) === -1) {
				self.invitees().push(invitee);
			}
		};

		this.queryChanged = function () {
			$.getJSON('/api/users/search?q=' + $('input#invite-user').val(), function(items) {
				self.suggestions.removeAll();
				_.each(items, function(item) {
					var inv = new Invitee(item);
					self.suggestions().push(inv);
					ko.applyBindings(self);
				});
			});
			return true;
		};

		this.suggestionSelected = function (e) {
			_.each(self.selectedSuggestions(), function(selectedItem) {
				self.addInvitee(selectedItem);
			});
			return true;
		};

		this.sendInvites = function () {
			$.post('/api/groups/' + groupId + '/invite', JSON.stringify(self.invitees), function(data) {
				// show notification
			});
		};

	};

	ko.applyBindings(new Invitees());

})();
