
// invite.js   -- Knockout app for invites

(function () {
	'use strict';

	var Invitee = function (id, fbId, name) {
		var self = this;
		self.id = id;
		self.fbId = fbId;
		self.name = name;
		self.picture = function () {
			return 'https://graph.facebook.com/' + self.fbId + '/picture?type=square';
		};
		self.profile = function () {
			return '/profiles/' + self.id;
		};
	};

	var Invitees = function () {
		var self = this;
		self.suggestions = ko.observableArray([]);
		self.selectedSuggestions = ko.observableArray([]);
		self.invitees = ko.observableArray([]);

		self.addInvitee = function (invitee) {
			console.log(invitee);
			if (self.invitees().indexOf(invitee) < 0) {
				self.invitees().push(invitee);
			}
		};

		self.queryChanged = function () {
			$.getJSON('/api/users/search?q=' + $('input#invite-user').val(), function(items) {
				self.suggestions.removeAll();
				_.each(items, function(item) {
					var inv = new Invitee(item._id, item.fb.id, item.fullName);
					self.suggestions().push(inv);
					ko.applyBindings(self);
				});
			});
			return true;
		};

		self.suggestionSelected = function (e) {
			_.each(self.selectedSuggestions(), function(selectedItem) {
				self.addInvitee(selectedItem);
			});
			return true;
		};

		self.sendInvites = function () {
			$.post('/api/groups/' + grp._id + '/invite', JSON.stringify(self.invitees), function(data) {
				// show notification
			});
		};

	};

	ko.applyBindings(new Invitees());

})();
