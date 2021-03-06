/*!
 * user.api.js
 * RESTful api for users
 */

var mongoose = require('mongoose');
		User = mongoose.model('User'),
		awarder = require('../models/awarder');

module.exports = function(app) {

	// GET /api/users

	app.get('/api/users', function (req, res) {
		return User.find(function (err, users) {
			return res.send(users);
		});
	});


	// GET /api/users/search?q=query

	app.get('/api/users/search', function(req, res) {
			User.$where('this.fullName.toLowerCase().search(/' + req.query['q'].toLowerCase() + '/) !== -1').exec(function (err, users) {
				res.send(users);
			});
	});


	// GET /api/me

	app.get('/api/me', function(req, res) {
		return res.send(req.user);
	});

	// PUT /api/me/status

	app.put( '/api/me/status', function( req, res ) {
		User.findById(req.user._id, function(err, me) {
			console.log(req.body);
			me.status = req.body.status;
			me.save(function(err) {
				if(!err) {
					res.statusCode = 200;
					res.send('');
				} else {
					console.log(err);
					res.statusCode = 500;
					res.send('');
				}
			});
		});
	});

	// GET /api/users/5

	app.get('/api/users/:id', function(req, res) {
		return User.findById(req.params.id, function (err, user) {
			return res.send(user);
		});
	});


	// POST /api/users

	app.post('/api/users', function(req, res) {
		var newUser = new User({
			fullName: req.body.fullName,
			bio: req.body.bio,
			email: req.body.email,
			twitter: req.body.twitter,
			status: req.body.status,
			group: req.body.group
		});
		newUser.save(function(err, createdUser) {
			res.send(createdUser);
		});
	});


	// PUT /api/users/5

	app.put('/api/users/:id', function(req, res) {
		return User.findById(req.params.id, function(err, user) {
			user.fullName = req.body.fullName;
			user.email = req.body.email;
			user.bio = req.body.bio;
			user.status = req.body.status;
			user.twitter = req.body.twitter;
			return user.save(function(err) {
				if(!err) {

					// awards
					awarder.tryUnlockingAchievement("SOCIAL_MEDIA_JUNKIE", user, function(achievement) {});

					res.statusCode = 200;
					res.send(user);
				} else {
					console.log(err);
					res.statusCode = 500;
				}
			});
		});
	});


	// DELETE /api/users/5

	app.del('/api/users/:id', function(req, res) {
		return User.findById(req.params.id, function(err, user) {
			return user.remove(function(err) {
				return res.send('');
			});
		});
	});

};
