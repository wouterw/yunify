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
	};

	$.getJSON('/api/groups/' + groupId, function (data) {
		ko.applyBindings(new Group(data));
	});

})();
