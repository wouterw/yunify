/*!
 * Mobile Controller
 */

module.exports = function(app) {

	// GET /mobile

	app.get('/mobile', function(req, res) {
		res.render('mobile/index', {
			title: 'Home / Yunify'
		});
	});

	// GET /mobile/users

	app.get('/mobile/me', function(req, res) {
		res.render('mobile/profile', {
			title: 'Me / Yunify'
		});
	});

	// GET /mobile/users

	app.get('/mobile/users', function(req, res) {
		res.render('mobile/users', {
			title: 'Users / Yunify'
		});
	});

	// GET /mobile/users/5

	app.get('/mobile/users/:id', function(req, res) {
		res.render('mobile/user', {
			title: 'User / Yunify'
		});
	});

};
