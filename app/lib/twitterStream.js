/*!
 * TwitterStream.js
 * Twitter Streaming API listener
 * GET https://stream.twitter.com/1/statuses/sample.json
 * https://dev.twitter.com/docs/api/1/get/statuses/show/%3Aid
 * https://github.com/technoweenie/twitter-node/blob/master/lib/twitter-node/index.js
 */

var https = require('https'),
		events = require('events');

var TwitterStream = function(options) {
	this.user = options.username,
	this.pwd = options.password,
	this.track = options.track
};

TwitterStream.prototype = new events.EventEmitter;

TwitterStream.prototype.getTweets = function() {
	var self = this;
	var auth = new Buffer(this.user + ':' + this.pwd).toString('base64');
	var host = {
		host: 'stream.twitter.com',
		port: '443',
		path: '/1/statuses/filter.json?track=' + this.track,
		headers: {
			'Connection': 'keep-alive',
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + auth
		}
	};

	// Fix the "Could not decode a text frame as UTF-8."
	// bug #socket.io #nodejs #websocket
	// http://blog.fgribreau.com/2012/05/how-to-fix-could-not-decode-text-frame.html
	var escapable = /[\x00-\x1f\ud800-\udfff\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;
	var filterUnicode = function(quoted){
		escapable.lastIndex = 0;
		if(!escapable.test(quoted)) {
			return quoted;
		}
		return quoted.replace(escapable, function(a) {
			return '';
		});
	}

	return https.get(host, function(response) {
		response.setEncoding('utf8');
		response.on('data', function(chunk) {
			try {
				var json = JSON.parse(chunk.toString('utf8'));
				if (json.user) {
					json = {
						text: json.text,
						img: json.user.profile_image_url,
						name: json.user.name,
						time: json.created_at
					};
					self.emit('tweet', json);
				}
			} catch(err) {
				self.emit('error', err.message);
			}
		}).on('error', function(err) {
			console.log(err);
		});
	});

};

module.exports = TwitterStream;
