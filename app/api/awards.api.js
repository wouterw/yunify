/*!
 * awards.api.js
 * RESTful api for awards
 */

var mongoose = require('mongoose'),
		_ = require('underscore')._,
		User = mongoose.model('User'),
		awarder = require('../models/awarder');

module.exports = function (app) {

	// GET /api/awards

	app.get('/api/awards', function(req, res){
		res.send(awarder.achievements);
	});

	// GET /api/awards/5

	app.get('/api/awards/:id', function(req, res) {
		res.send(awarder.getAchievementById(req.params.id));
	});

	// GET /api/me/awards

	app.get('/api/me/awards', function(req, res){
		res.send(req.user.achievements.unlocked);
	});

	// GET /api/users/5/awards

	app.get('/api/users/:id/awards', function(req, res){
		User.findById(req.params.id, function(err, foundUser) {
			if (!err) {
				res.send(foundUser.achievements.unlocked);
			} else {
				console.log(err);
				res.statusCode = 400;
				res.send('');
			}
		});
	});

	// GET /api/users/5/awards/1

	app.get('/api/users/:id/awards/:awardId', function(req, res) {
		User.findById(req.params.id, function(err, foundUser) {
			if (!err) {
				var found = null;
				_.each(foundUser.achievements.unlocked, function(achievement, key) {
					if(achievement.id === parseInt(req.params.awardId, 10)) {
						found = achievement;
					}
				});
				if(found) {
					res.statusCode = 200;
					res.send(found);
				} else {
					res.statusCode = 404;
					res.send("HTTP Error 404. The requested resource is not found.");
				}
			} else {
				console.log(err);
				res.statusCode = 404;
				res.send("HTTP Error 404. The requested resource is not found.");
			}
		});
	});

	/* --- FOR TEST PURPOSE ONLY ----------------------------------- */

	app.get('/api/award/me/a/badge', function(req, res) {
		awarder.tryUnlockingAchievement("AUTOBIOGRAPHER", req.user, function(achievement) {
			res.send(achievement);
		});
	});

};
