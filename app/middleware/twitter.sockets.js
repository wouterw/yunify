/**
 * twitter.sockets.js
 * twitter feed socket communication
 */
var TwitterStream = require('../lib/twitterStream');

module.exports = function (io) {

	var tweets = io.of('/tweets').on('connection', function(socket) {

		var stream = new TwitterStream({
			username: '',
			password: '',
			track: ''
		});

		stream.on('tweet', function(tweet) {
			socket.broadcast.emit('tweet', tweet);
		});

		stream.on('error', function(err) {
			console.log(err);
		});

		stream.getTweets();

	});

};
