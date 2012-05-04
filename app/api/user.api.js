
// user.api.js   -- RESTful api for users

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) { 

	// GET /api/users

	app.get('/api/users', function (req, res) {
		return User.find(function (err, users) {
			return res.send(users);
		});
	});


	// GET /api/users/search?q=query

	app.get('/api/users/search', function (req, res) {
			User.$where('this.fullName.toLowerCase().search(/' + req.query['q'].toLowerCase() + '/) !== -1').exec(function (err, users) {
				res.send(users);
			});
	});


	// GET /api/users/5	

	app.get('/api/users/:id', function (req, res) {
		return User.findById(req.params.id, function (err, user) {
			return res.send(user);
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
