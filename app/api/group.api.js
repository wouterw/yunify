/*!
 * group.api.js
 * RESTful api for groups
 */

var mongoose = require('mongoose'),
		Group = mongoose.model('Group');

module.exports = function (app) {

	// GET /api/groups

	app.get('/api/groups', function (req, res) {
		return Group.find(function (err, groups) {
			return res.send(groups);
		});
	});

	// GET /api/groups/search?q=query

	app.get('/api/groups/search', function(req, res) {
			Group.$where('this.name.toLowerCase().search(/' + req.query['q'].toLowerCase() + '/) !== -1').exec(function (err, groups) {
				res.send(groups);
			});
	});

	// GET /api/me/group

	app.get('/api/me/group', function (req, res) {
		return Group.findById(req.user.group, function (err, group) {
			if (!err) {
				return res.send(group);
			}
		});
	});

	// GET /api/me/group/members

	app.get('/api/me/group/members', function(req, res) {
		return Group.findById(req.user.group, function(err, group) {
			if(!err) {
				return group.members(function(err, members) {
					if(!err) {
						return res.send(members);
					} else {
						console.log(err.message);
					}
				});
			} else {
				console.log(err.message);
			}
		});
	});

	// GET /api/me/group/leave

	app.post('/api/me/group/leave', function (req, res) {
		Group.findById(req.user.group, function (err, group) {
			if (!err) {
				group.removeMember(req.user);
				res.statusCode = 200;
			} else {
				console.log(err.message);
				res.statusCode = 500;
			}
		});
		res.send('');
	});

	// GET /api/groups/5

	app.get('/api/groups/:id', function (req, res) {
		return Group.findById(req.params.id, function (err, group) {
			if (!err) {
				return res.send( group );
			} else {
				console.log(err.message);
				res.statusCode = 500;
			}
		});
	});

	// GET /api/groups/5/members

	app.get( '/api/groups/:id/members', function ( req, res ) {
		return Group.findById(req.params.id, function(err, group) {
			if(!err) {
				return group.members(function(err, members) {
					if(!err) {
						return res.send(members);
					} else {
						console.log(err.message);
					}
				});
			} else {
				console.log(err.message);
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

};
