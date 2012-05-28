(function() {

/* --------------------------------------------------------------------------
   HomeViewModel
   -------------------------------------------------------------------------- */

	var Member = function ( data ) {
		console.log(data);
		var self = this;
		this.name = data.fb.first_name;
		this.status = data.status;
		this.picture = "http://graph.facebook.com/" + data.fb.id + "/picture?type=normal";
	};

	var HomeViewModel = function () {
		var self = this;
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
		});

		this.init = function () {
			self.getMembers();
			self.sortMembers();
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
	};

	var homeViewModel = new HomeViewModel();
	homeViewModel.init();
	ko.applyBindings(homeViewModel);
})();