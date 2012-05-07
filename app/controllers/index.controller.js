/*!
 * Index Controller
 */

module.exports = function(app) {

	// GET /

	app.get('/', function(req, res) {
		res.render('home/index', {
			title: 'Home'
		});
	});


	// GET /chat

	app.get('/chat', function(req, res) {
		res.render('home/chat', {
			title: 'Chat'
		});
	});


	// GET /wall

	app.get('/wall', function(req, res) {
		res.render('wall', {
			title: 'Wall'
		});
	});

}
