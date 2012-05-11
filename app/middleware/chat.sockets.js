/**
 * Realtime Chat
 */

var Chat = require('mongoose').model('Chat'),
		mapper = require('../helpers/mapper'),
		usernames = [];

module.exports = function (io) {

	var chat = io.of('/chat').on('connection', function (socket) {

		// determine room for current socket
		var room = 'free_for_all';
		var groupId = '';
		if (groupId && groupId.length) {
			room = 'group_' + groupId;
		}

		socket.on('message', function(text) {
			var msg = mapper.createChatMessage(socket.username, text);
			socket.broadcast.emit('updatechat', msg);
			logMessage(room, msg);
		});

		socket.on('newuser', function(username) {
			socket.username = username;
			usernames[username] = username;

			// load chat history
			var messages = Chat.getChatHistory(room, 15, function (err, messages) {
				if (err) {
					console.log(err.message);
				}
				if (messages && messages.length) {
					socket.emit('loadmessages', messages);
				}
			});

			// show welcome message
			socket.emit('updatechat', mapper.createChatMessage('SERVER', 'Welcome ' + username));

			// notify everyone
			var msg = mapper.createChatMessage('SERVER', username + ' connected');
			socket.broadcast.emit('updatechat', msg);
			logMessage(room, msg);

			// refresh user list
			socket.emit('loadusers', mapper.mapArray(usernames, mapper.createUser));
			socket.broadcast.emit('adduser', mapper.createUser(username));
		});

		socket.on('disconnect', function(data) {
			delete usernames[socket.username];
			socket.emit('removeuser', mapper.createUser(socket.username));
			var msg = mapper.createChatMessage(socket.username + ' disconnected.');
			socket.broadcast.emit('updatechat', msg);
			logMessage(room, msg);
		});

	});

	var logMessage = function(room, message) {
		var chat = new Chat({
			room: room,
			text: message.text,
			author: message.author,
			timestamp: message.timestamp
		});
		chat.save(function(err, savedMessage) {
			if (err) {
				console.log(err.message);
			}
		});
	};

};
