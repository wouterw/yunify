
// group.api.js   -- RESTful api for groups

var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var mail = require('../lib/email');
var _ = require('underscore');

module.exports = function (app) {

	// GET /api/groups

	app.get('/api/groups', function (req, res) {
		return Group.find(function (err, groups) {
			return res.send(groups);
		});
	});


	// GET /api/groups/5

	app.get('/api/groups/:id', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			if (!err) {
				return res.send(group);
			}
		});
	});


	// POST /api/groups

	app.post('/api/groups', function (req, res) {
		var newGroup = new Group({
			name: req.body.name,
			description: req.body.description,
			creator: req.user
		});
		newGroup.save(function (err) {
			if (!err) {
				return console.log("New group created");
			}
		});
		return res.send(newGroup);
	});


	// PUT /api/groups

	app.put('/api/groups/:id', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			group.name = res.body.name;
			group.description = res.body.description;
			return group.save(function (err) {
				if (!err) {
					console.log('Group ' + req.params.id + 'updated');
				}
				res.send(group);
			});
		});
	});


	// DELETE /api/groups

	app.del('/api/groups/:id', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			return group.remove(function (err) {
				if (!err) {
					console.log('Group ' + req.params.id + 'removed');
					return res.send('');
				}
			});
		});
	});


	// POST /api/groups/5/invite

	app.post('/api/groups/:id/invite', function (req, res) {
		
		console.log(req.params);

		// send the word out
		mail.sendInvite();

		console.log('Invitations for group :id has been send to {users}');
		return res.send('');
	});


	// POST /api/groups/5/join

	app.post('/api/groups/:id/join', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			req.user.populate('group').run(function (err, user) {
				if (err) {
					console.log(err);
				}

				// add user to group
				group.users.push(user); 
				user.group = group._id;

				group.save();
				user.save();

				return group.save(function (err) {
					if (!err) {
						console.log('User ' + user._id + 'joined the group ' + group._id);
					}
					return res.send('');
				});
			});
		});
	});


	// POST /api/groups/5/leave

	app.post('/api/groups/:id/leave', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			req.user.populate('group').run(function (err, user) {
				if (err) {
				 	console.log(err);
				}

				// remove user from group
				group.users[_.indexOf(group.users, user)].remove(); 
				user.group = 'undefined';

				group.save();
				user.save();

				return group.save(function (err) {
					if (!err) {
						console.log('User ' + req.user._id + 'left the group ' + req.params.id);
					}
					return res.send('');
				});
			});
		});
	});

};
