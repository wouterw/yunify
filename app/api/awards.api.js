/*!
 * awards.api.js
 * RESTful api for awards
 */

var mongoose = require('mongoose'),
		awarder = require('../models/awarder');

module.exports = function (app) {

	app.get('/api/awards', function(req, res){
		res.send(awarder.achievements);
	});

	app.get('/api/me/awards', function(req, res){
		res.send(req.user.achievements.unlocked);
	});

	app.get('/api/award/me/a/badge', function(req, res) {
		awarder.tryUnlockingAchievement("AUTOBIOGRAPHER", req.user, function(achievement) {
			res.send(achievement);
		});
	});

};
