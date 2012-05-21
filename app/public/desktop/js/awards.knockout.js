(function() {
	'use strict';

	var Award = function(data) {
		var self = this;
		this.id = data.id;
		this.name = data.name;
		this.desc = data.desc;
		this.worth = data.worth;
		this.image = function() {
			//return '/img/badges/' + self.name + '.png';
			return 'https://d1ffx7ull4987f.cloudfront.net/images/courses/large_badge/7/jquery-air-captains-log-0f4b90723003d3c9c132ed6270298be5.png';
		}();
	};

	var ViewModel = function() {
		var self = this;
		this.awards = ko.observableArray([]);

		this.getAll = function() {
			$.getJSON('/api/awards', function (items) {
				self.awards.removeAll();
				_.each(items, function(item) {
					self.awards.push(new Award(item));
				});
			});
		};

	};

	var vm = new ViewModel();
	vm.getAll();
	ko.applyBindings(vm);

})();
