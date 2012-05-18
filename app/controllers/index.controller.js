/*!
 * Index Controller
 */

module.exports = function(app) {

	// GET /

	app.get('/', function(req, res) {
		res.render('home/index', {
			title: 'Home / Yunify'
		});
	});


	// GET /chat

	app.get('/chat', function(req, res) {
		res.render('home/chat', {
			title: 'Chat / Yunify'
		});
	});


	// GET /tweets

	app.get('/tweets', function(req, res) {
		res.render('home/tweets', {
			title: 'Tweets / Yunify'
		});
	});

	// GET /wall

	app.get('/wall', function(req, res) {
		res.render('wall', {
			title: 'Wall / Yunify'
		});
	});

}
