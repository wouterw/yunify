/*!
 * Awards Controller
 */

module.exports = function(app) {

	// GET /awards

	app.get('/awards', function(req, res) {
		res.render('desktop/awards', {
			title: 'Awards / Yunify'
		});
	});

};
