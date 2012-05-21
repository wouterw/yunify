/*!
 * Mobile Controller
 */

module.exports = function(app) {

	// GET /mobile

	app.get('/mobile', function(req, res) {
		res.render('mobile/home', {
			title: 'Home / Yunify'
		});
	});

};

