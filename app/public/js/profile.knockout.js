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
				url: '/api/users/' + userId,
				type: 'PUT',
				data: self.toJSON(),
				success: function() {
					$('#update-success').show();
				}
			});

		};
	};

	$.getJSON('/api/users/' + userId, function (data) {
		ko.applyBindings(new Profile(data));
	});

})();
