
// group.controller.js

var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');

module.exports = function (app) {

	// GET /groups
	app.get('/groups', function (req, res) {
		return Group.find(function (err, groups) { 
			res.render('groups/index', {
				title: 'Groups',
				groups: groups
			});
		});
	});


	// GET /groups/5
	app.get('/groups/:id', function (req, res) {
		return Group.findById(req.params.id).populate('users').run(function (err, group) {
			res.render('groups/show', {
				title: 'Group Detail / Yunify',
				group: group
			});
		});
	});


	// POST /groups
	app.post('/groups', function (req, res) {
		if (!req.user.group) {

			var newGroup = new Group({
				name: req.body.name,
				description: req.body.description,
				creator: req.user.id
			});

			newGroup.users.push(req.user);

			newGroup.save(function (err, savedGroup) {
				if (!err) { 

					User.findById(req.user.id, function (err, user) {
						user.group = newGroup._id;
						user.save();
					});

					res.redirect('/groups/' + savedGroup._id);
				}
			});

		}
	});


	// PUT /groups/5
	app.put('/groups/:id', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			group.name = req.body.name;
			group.description = req.body.description;
			task.done = res.body.done;
			return group.save(function (err, savedGroup) {
				if (!err) {
					console.log('Group ' + req.params.id + 'updated');
				}
				res.redirect('/groups/' + savedGroup._id);
			});
		});
	});


	// GET /roomies
	app.get('/roomies', function (req, res) {

	});

}
