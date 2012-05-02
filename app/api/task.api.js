
// task.api.js   -- RESTful api for tasks

var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = function (app) { 

	// GET /api/tasks

	app.get('/api/tasks', function (req, res) {
		return Task.find(function (err, tasks) {
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
		req.user.populate('group').run(function (err, user) {
			if(err) {
				console.log(err);
			}

			var newTask = new Task({
				text: req.body.text,
				done: req.body.done,
				group: user.group._id
			});

			newTask.save(function (err) {
				if (!err) {
					return console.log("New Task created");
				}
			});

			return res.send(newTask);
		});
	});


	// PUT /api/tasks

	app.put('/api/tasks/:id', function (req, res) {
		return Task.findById(req.params.id, function (err, task) {
			task.text = res.body.text;
			task.done = res.body.done;
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
