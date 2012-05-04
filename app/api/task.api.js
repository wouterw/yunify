
// task.api.js   -- RESTful api for tasks

var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = function (app) { 

	// GET /api/tasks

	app.get('/api/tasks', function (req, res) {
		return Task.find({ 'group': req.user.group }, function (err, tasks) {
			return res.send(tasks);
		});
	});


	// GET /api/tasks/5

	app.get('/api/tasks/:id', function (req, res) {
		return Task.findById(req.params.id, function (err, task) {
			if (!err) {
				return res.send(task);
			}
		});
	});


	// POST /api/tasks

	app.post('/api/tasks', function (req, res) {
		var newTask = new Task({
			title: req.body.title,
			completed: req.body.completed,
			group: req.user.group
		});
		newTask.save(function (err) {
			if (!err) {
				return console.log("New Task created");
			}
		});
		return res.send(newTask);
	});


	// PUT /api/tasks

	app.put('/api/tasks/:id', function (req, res) {
		return Task.findById(req.params.id, function (err, task) {
			task.title = res.body.title;
			task.completed = res.body.completed;
			return task.save(function (err) {
				if (!err) {
					console.log('Task ' + req.params.id + 'updated');
				}
				res.send(task);
			});
		});
	});


	// DELETE /api/tasks

	app.del('/api/tasks/:id', function (req, res) {
		return Task.findById(req.params.id, function (err, task) {
			return task.remove(function (err) {
				if (!err) {
					console.log('Task ' + req.params.id + 'removed');
					return res.send('');
				}
			});
		});
	});

};
