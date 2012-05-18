/*!
 * Fb api wrapper
 *
 * Docs:
 * https://onteria.wordpress.com/2011/05/30/multipartform-data-uploads-using-node-js-and-http-request/
 * http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html
 * http://stackoverflow.com/questions/7511321/uploading-base64-encoded-image-to-amazon-s3-via-node-js
 * http://stackoverflow.com/questions/8110294/nodejs-base64-image-encoding-decoding-not-quite-working
 */

var fs = require('fs'),
		https = require('https');

module.exports = function (app) {

	/**
	* POST /api/me/photobooth
	*/
	app.post('/api/me/photobooth', function(req, res) {
		var boundary = Math.random();
		var post_data = [];

		var message = 'Just took a picture from the Yunify photobooth!';
		var base64Image = req.body.data.replace(/^data:image\/\w+;base64,/, '');

		post_data.push(new Buffer(EncodeFieldPart(boundary, 'message', message), 'ascii'));
		post_data.push(new Buffer(EncodeFieldPart(boundary, 'image/jpeg', 'source', 'filename'), 'ascii'));
		post_data.push(new Buffer(base64Image, 'base64').toString('binary'), 'binary');
		post_data.push(new Buffer("\r\n--" + boundary + "--"), 'ascii');

		var length = 0;
		for(var i = 0; i < post_data.length; i++) {
			length += post_data[i].length;
		}

		var opts = {
			host: 'graph.facebook.com',
			port: 443,
			path: '/me/photos?access_token=' + req.session.auth.facebook.accessToken,
			method: 'POST',
			headers: {
				'Content-Type' : 'multipart/form-data; boundary=' + boundary,
				'Content-Length' : length
			}
		};

		var post_request = https.request(opts, function(response) {
			response.setEncoding('utf8');
			response.on('data', function(chunk) {
				console.log(chunk);
			});
		});

		for(var j = 0; j < post_data.length; j++) {
			post_request.write(post_data[j]);
		}

		post_request.end();

	});

	function EncodeFieldPart(boundary, name, value) {
		var part = "--" + boundary + "\r\n";
		part += "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n";
		part += value + "\r\n";
		return part;
	}

	function EncodeFilePart(boundary, type, name, filename) {
		var part = "--" + boundary + "\r\n";
		part += "Content-Disposition: form-data; name=\"" + name + "\"; filename=\"" + filename + "\"\r\n";
		part += "Content-Type: " + type + "\r\n\r\n";
		return part;
	}

};
