(function() {
	'use strict';

	var Group = function(data) {
		var self = this;
		this.id = data._id;
		this.name = ko.observable(data.name);
		this.description = ko.observable(data.description);
		this.link = function() {
			return '/groups/' + self.id;
		}();
	};

	var ViewModel = function() {
		var self = this;
		this.groups = ko.observableArray([]);
		this.searchquery = ko.observable();
		this.searchquery.subscribe(function(q) {
			if(q) {
				self.search(q);
			} else {
				self.getAll();
			}
		});
		this.search = function(q) {
			$.getJSON('/api/groups/search?q=' + q, function(items) {
				self.groups.removeAll();
				_.each(items, function (item) {
					self.groups.push(new Group(item));
				});
			});
		};
		this.getAll = function() {
			$.getJSON('/api/groups', function (items) {
				self.groups.removeAll();
				_.each(items, function(item) {
					self.groups.push(new Group(item));
				});
			});
		};
	};

	var vm = new ViewModel();
	vm.getAll();
	ko.applyBindings(vm);

})();
