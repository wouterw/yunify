/**
 * leaderboard.sockets.js
 * tasks socket communication
 */

var lb = require('../models/leaderboard');

module.exports = function (io) {

	var ranking = io.of('/ranking').on('connection', function(socket) {

		socket.on('init', function(data) {
			socket.join(data.groupId);
			lb.getPoints(data.groupId, function(err, results) {
				console.log(results);
				socket.emit('update', results);
			});
		});

		lb.on('changes', function() {
			lb.getPoints(groupId, function(results) {
				console.log(results);
				socket.broadcast.to(data.groupId).emit('updated', results);
			});
		});

	});

};
