/*!
 * Realtime activity feed
 */

var Activity = require('mongoose').model('Activity');

var news = io.of('/news').on('connection', function (socket) {

	socket.emit('news_items', items);

	socket.on('new_item', function(item) {

	});

	socket.on('del_item', function(item) {

	});

});
