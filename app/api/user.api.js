
// user.api.js   -- RESTful api for users

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function(app) { 

	// GET /api/users
	app.get('/api/users', function (req, res) {
		return UserModel.find(function (err, users) {
			if (!err) {
				return res.send(users);
			}
			else {
				return console.log(err);
			}
		});
	});

	// GET /api/users/5
	app.get('/api/users/:id', function (req, res) {
		return UserModel.findOne({}, function (err, user) {

		});
	});

	// POST /api/users
	app.post('/api/users', function (req, res) {

	});

	// PUT /api/users
	app.put('/api/users', function (req, res) {

	});

	// DELETE /api/users
	app.del('/api/users/:id', function (req, res) {

	});

};
