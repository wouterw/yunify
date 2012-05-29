(function() {

	var Member = function ( data ) {
		var self = this;
		this.name = data.fb.first_name;
		this.status = data.status;
		this.picture = "http://graph.facebook.com/" + data.fb.id + "/picture?type=normal";
	};

	var HomeViewModel = function () {
		var self = this;
		this.members = ko.observableArray([]);

		this.init = function () {
			self.getMembers();
		};

		this.getMembers = function () {
			$.ajax({
				async: false,
				url: '/api/me/group/members',
				success: function ( data ) {
					_.each(data, function( item ) {
						self.members.push( new Member( item ) );
					});
				},
				error: function ( data ) {
					$('#members').hide();
					$('#no-group').show();
				}
			});
		};

	};

	var vm = new HomeViewModel();
	vm.init();
	ko.applyBindings(vm);

})();
