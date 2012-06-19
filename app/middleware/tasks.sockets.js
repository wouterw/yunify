/**
* tasks.sockets.js
* tasks socket communication
*/

var mongoose = require('mongoose'),
		ObjectId = mongoose.Types.ObjectId,
		Task = mongoose.model('Task'),
		User = mongoose.model('User');

module.exports = function (io) {

	var tasks = io.of('/tasks').on('connection', function(socket) {

		socket.on('init', function(data) {
			// join user to his a channel
			socket.join(data.groupId);
			// send them all the tasks.
			Task.find({ 'group': new ObjectId(data.groupId) }, function(err, results) {
				socket.emit('load', results);
			});
		});

		socket.on('add', function(data) {
			var newTask = new Task({
				title: data.title,
				completed: data.completed,
				important: data.important,
				group: data.groupId
			});
			newTask.save(function(err, task) {
				if (!err) {
					socket.broadcast.to(data.groupId).emit('added', task);
					socket.emit('added', task);
				} else {
					console.log(err.message);
				}
			});
		});

		socket.on('update', function(data) {
			Task.findById(data.id, function(err, task) {
				if (!err) {
					if(!task.completed) { //can't update a completed task
						task.title = data.title;
						task.important = data.important;
						task.save(function(err) {
							if (!err) {
								socket.broadcast.to(data.groupId).emit('updated', task);
							} else {
								console.log(err.message);
							}
						});
					}
				} else {
					console.log(err.message);
				}
			});
		});

		socket.on('complete', function(data) {
			console.log(data);
			var userId = socket.handshake.session.auth.userId;
			Task.findById(data.id, function(err, task) {
				if(!err) {
					task.complete(userId, function(task) {
						socket.broadcast.to(data.groupId).emit('updated', task);
					});
				} else {
					console.log(err.message);
				}
			});
		});

		socket.on('remove', function(data) {
			Task.findById(data.id, function(err, task) {
				if (!err) {
					task.remove(function (err) {
						if (!err) {
							socket.broadcast.to(data.groupId).emit('removed', data.id);
							socket.emit('removed', data.id);
						} else {
							console.log(err.message);
						}
					});
				} else {
					console.log(err.message);
				}
			});
		});

	});

};
