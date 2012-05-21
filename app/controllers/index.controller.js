/*!
 * Index Controller
 */

module.exports = function(app) {

	// GET /

	app.get('/', function(req, res) {
		res.render('desktop/home', {
			title: 'Home / Yunify'
		});
	});

	// GET /home

	app.get('/home', function(req, res) {
		res.render('desktop/home', {
			title: 'Home / Yunify'
		});
	});

	// GET /chat

	app.get('/chat', function(req, res) {
		res.render('desktop/chat', {
			title: 'Chat / Yunify'
		});
	});

	// GET /tweets

	app.get('/tweets', function(req, res) {
		res.render('desktop/tweets', {
			title: 'Tweets / Yunify'
		});
	});

	// GET /wall

	app.get('/wall', function(req, res) {
		res.render('desktop/wall', {
			title: 'Wall / Yunify'
		});
	});

	// GET /tasks

	app.get('/tasks', function (req, res) {
		res.render('desktop/tasks', {
			title: 'Tasks / Yunify'
		});
	});

};
