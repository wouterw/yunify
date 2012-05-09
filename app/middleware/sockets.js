/**
 * sockets.js
 */

module.exports = function (app, sessionStore) {

	// start socket server
	var io = require('socket.io').listen(app);

	// configure socket.io
	io.configure('production', function () {
		io.enable('browser client minification');  // send minified client
		io.enable('browser client etag');          // apply etag caching logic based on version number
		io.enable('browser client gzip');          // gzip the file
		io.set('log level', 1);                    // reduce logging
		io.set('transports', [                     // enable all transports (optional if you want flashsocket)
			'websocket',
			'flashsocket',
			'htmlfile',
			'xhr-polling',
			'jsonp-polling'
		]);
	});

	// socket authentication
	var parseCookie = require('connect').utils.parseCookie;
	io.set('authorization', function (data, accept) {
		if (!data.headers.cookie) {
			return accept('no cookie', false);
		}
		data.cookie = parseCookie(data.headers.cookie);
		data.sessionId = data.cookie['express.sid'];
		sessionStore.get(data.sessionId, function (err, session) {
			if (err) {
				return accept(err.message, false);
			} else if (!(session && session.auth)) {
				return accept('not authorized', false);
			}
			data.session = session;
			accept(null, true);
		})
	});

	// log on new connection
	io.sockets.on('connection', function (socket) {
		var sessionId = socket.handshake.sessionId;
		var session = socket.handshake.session;
		console.log('>> New socket connection!');
		console.log('>> Identified as user ' + session.auth.facebook.user.username + ' (' + session.auth.userId + ')');
	});

	// load modules
	require('./chat.sockets')(io);
	require('./tasks.sockets')(io);
	require('./twitter.sockets')(io);
	//require('./news.sockets.js')(io);

};
