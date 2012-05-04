module.exports = function (app, sessionStore) {

	var io = require('socket.io').listen(app);
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

	io.sockets.on('connection', function (socket) {
		var sessionId = socket.handshake.sessionId;
		var session = socket.handshake.session;
		console.log('>> New socket connection!');
		console.log('>> Identified as user ' + session.auth.facebook.user.username + ' (' + session.auth.userId + ')');
	});

	// yunify chat socket communication
	var chat = io.of('/chat').on('connection', function (socket) {
	});

	// yunify news socket communication
	var news = io.of('/news').on('connection', function (socket) {
	});

	// yunify tasks socket communication
	var tasks = io.of('/tasks').on('connection', function (socket) {

		var Task = mongoose.model('Task');

		socket.emit('init', function () {
			return data;
		});

		socket.on('add', function (data) {
			console.log('task added');
			socket.broadcast.emit('added', channel, task);
		});

		socket.on('update', function (data) {
			console.log('task updated');
			socket.broadcast.emit('updated', channel, task);
		});

		socket.on('remove', function (id) {
			console.log('task removed');
			socket.broadcast.emit('removed', channel, id);
		});

	});

};
