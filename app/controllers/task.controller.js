
// task.controller.js

module.exports = function(app) {
	app.get('/tasks', function (req, res) {
		res.render('tasks/index', {
			title: 'Home'
		});
	});
}
