/*!
 * Task Controller
 */

module.exports = function(app) {
	app.get('/tasks', function (req, res) {
		res.render('tasks/index', {
			title: 'Tasks / Yunify'
		});
	});
}
