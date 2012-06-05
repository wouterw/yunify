/*!
 * Authorization Controller
 */

var _ = require('underscore')._;

module.exports = function(app) {

	// Authentication Check

	app.all('/*', function(req, res, next) {

		var public_routes = ['/auth/login', '/', '/about', '/team'];

		if(!_.include(public_routes, req.url) && !req.loggedIn) {
			req.flash('notice', 'You are not authorized. Please login');
			res.redirect('/');
			return;
		}
		next();
	});

	// GET /logout

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	// GET /mobile/logout

	app.get('/mobile/logout', function (req, res) {
		req.logout();
		res.redirect('/mobile');
	});

};
