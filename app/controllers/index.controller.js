
// index.controller.js

module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('home/index', {
			title: 'Home'
		});
	});
}
