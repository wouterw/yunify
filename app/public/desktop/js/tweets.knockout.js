(function() {
	'use strict';

	var Tweet = function(data) {
		this.text = data.text;
		this.img = data.img;
		this.name = data.name;
		this.time = data.time;
	};

	var ViewModel = function() {
		this.tweets = ko.observableArray([]);
	};

	var vm = new ViewModel();
	ko.applyBindings(vm);

	var socket = io.connect('/tweets');

	socket.on('tweet', function(data) {
		console.log(data);
		vm.tweets.push(new Tweet(data));
	});

})();
