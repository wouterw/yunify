(function() {

	var Message = function(author, text, timestamp) {
		this.author = ko.observable(author);
		this.text = ko.observable(text);
		this.timestamp = ko.observable(new XDate(timestamp).toString('MMM d, yyyy h(:mm)TT'));
	};

	var User = function(username) {
		this.username = ko.observable(username);
	};

	var ChatViewModel = function() {
		var self = this;

		this.users = ko.observableArray([]);
		this.messages = ko.observableArray([]);

		// store the message value being entered
		this.current = ko.observable();

		this.addMessage = function() {
			var current = self.current().trim();
			if (current) {
				emitMessage(current);
				self.messages.push(new Message(username, current, new Date()));
				self.current('');
			}
		};

		this.newMessage = function(data) {
			self.messages.push(new Message(data.author, data.text, data.timestamp));
		};

		this.addUser = function(data) {
			self.users.push(new User(data.username));
		};

		this.removeUser = function (user) {
			console.log('removeuser triggered', user);
			console.log(ko.toJS(self.users));
			self.users.remove(function(item) {
				return (item.username() === user.username);
			});
			console.log(ko.toJS(self.users));
		};

		this.loadUsers = function(users) {
			_.each(users, function(user) {
				self.addUser(user);
			});
		};

		this.loadMessages = function(messages) {
			_.each(messages, function(msg) {
				self.newMessage(msg);
			});
		};

	};

	var chatvm = new ChatViewModel();
	ko.applyBindings(chatvm);

	var socket = io.connect('/chat');

	socket.on('connect', function() {
		socket.emit('newuser', username);
	});

	socket.on('loadusers', function(data) {
		chatvm.loadUsers(data);
	});

	socket.on('loadmessages', function(data) {
		chatvm.loadMessages(data);
	});

	socket.on('updatechat', function(msg) {
		chatvm.newMessage(msg);
	});

	socket.on('adduser', function(data) {
		chatvm.addUser(data);
	});

	socket.on('removeuser', function(user) {
		console.log('removeuser', user);
		chatvm.removeUser(user);
	});

	var emitMessage = function (msg) {
		socket.emit('message', msg);
	};

})();
