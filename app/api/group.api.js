
// group.api.js   -- RESTful api for groups

var mongoose = require('mongoose'),
		Group = mongoose.model('Group'),
		Invitation = mongoose.model('Invitation'),
		_ = require('underscore');

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
		console.log(req.body);
		return Group.findById(req.params.id, function (err, group) {
			group.name = req.body.name;
			group.description = req.body.description;
			return group.save(function (err) {
				if (!err) {
					res.statusCode = 200;
					res.send(group);
				} else {
					console.log(err);
					res.statusCode = 500;
				}
			});
		});
	});


	// DELETE /api/groups

	app.del('/api/groups/:id', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			return group.remove(function (err) {
				if (!err) {
					return res.send('');
				}
			});
		});
	});


	// GET /api/groups/5/invitations

	app.get('/api/groups/:id/invitations', function(req, res) {
		return Group.findById(req.params.id, function(err, group) {
			return res.send(group.invitations);
		});
	});

	// GET /api/groups/5/invitations/5

	app.get('/api/groups/:id/invitations/:invId', function(req, res) {
		return Group.findById(req.params.id, function(err, group) {
			return res.send(group)
		});
	});


	// POST /api/groups/5/invitations

	app.post('/api/groups/:id/invitations', function(req, res) {
		return Group.findById(req.params.id, function(err, group) {
			group.invitations.push(new Invitation({
				invitee: req.body.invitee,
				motivation: req.body.motivation,
				invited_by: req.body.invited_by
			}));
			return group.save(function(err) {
				if(!err) {
					res.statusCode = 200;
					res.send(group);
				} else {
					res.statusCode = 500;
					console.log(err);
				}
			});
		});
	});


	// DELETE /api/groups/5/invitations/5

	app.get('/api/groups/:id/invitations/:invId', function(req, res) {

	});

};
