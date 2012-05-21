/*!
 * Profile Controller
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

	// Route Param Pre-conditions
	app.param('userId', function (req, res, next, id) {
		User.findOne({ _id : id }, function (err, user) {
			if (err) { return next(err); }
			if (!user) { return next(new Error('Failed to load User ' + id)); }
			req.foundUser = user;
			next();
		});
	});

	app.get('/profiles', function (req, res) {
		return User.find(function (err, users) {
			res.render('desktop/profiles', {
				title: 'Profiles / Yunify',
				users: users
			});
		});
	});

	app.get('/profiles/:userId', function (req, res) {
		res.render('desktop/profile', {
			title: 'Profile / Yunify',
			usr: req.foundUser
		});
	});

	app.get('/me', function (req, res) {
		User.findById(req.user.id).populate('group').run(function (err, user) {
			if (err) { console.log(err); }
			res.render('desktop/me', {
				title: 'Me / Yunify',
				me: user
			});
		});
	});

};
