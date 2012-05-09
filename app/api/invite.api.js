/*!
 * invite.api.js
 * RESTful api for invitation
 */

var mongoose = require('mongoose'),
		Group = mongoose.model('Group'),
		User = mongoose.model('User'),
		Invite = mongoose.model('Invitation');

module.exports = function (app) {

	/**
	 * Route Param Pre-conditions for 'invId'
	 */

	app.param('invId', function (req, res, next, id) {
		Invite.findOne({ _id : id }, function (err, invitation) {
			if (err) { return next(err); }
			if (!invitation) { return next(new Error('Failed to load invitation ' + id)); }
			req.found_invite = invitation;
			next();
		});
	});

	/**
	 * GET /api/group/invitates
	 * @return all pending invites of current user's group
	 */

	app.get('/api/group/invites', function(req, res) {
		var me = req.user;
		.populate('group').run(function(err, me) {

		});
	});

	/**
	 * POST /api/group/invites
	 * invites a given user to the current user's group
	 */

	app.post('/api/group/invites', function(req, res) {
		var me = user.group;
		return Group.findById(req.params.id, function(err, group) {
			var invite = new Invite({
				group: me.group,
				invitee: req.body.invitee,
				motivation: req.body.motivation,
				invited_by: me._id,
			}));
			return invite.save(function(err) {
				if(!err) {
					res.statusCode = 200;
					res.send(invite);
				} else {
					res.statusCode = 500;
					console.log(err);
				}
			});
		});
	});

	/**
	 * GET /api/me/invites
	 * @return all invites for the current user
	 */

	app.get('/api/me/invites', function(req, res) {
		res.send(req.user.invites);
	});

	/**
	 * GET /api/me/invites/1/accept
	 */

	app.get('/api/me/invites/:invId/accept', function(req, res) {
		var invite = req.found_invite;
		var me = req.user;
		if(isValid(invite, me)) {
			Group.findById(invite.group, function (err, group) {
				group.addMember(me);
				invite.status = 'Accepted';
				invite.save();
			});
		}
	});

	/**
	 * GET /api/me/invites/:invId/reject
	 */

	app.get('/api/me/invites/:invId/reject', function(req, res) {
		var invite = req.found_invite;
		var me = req.user;
		if(isValid(invite, me)) {
			invite.status = 'Rejected';
			invite.save();
		}
	});

	var isValid = function(invite, user) {
		if(invite && invite.status === 'Pending' && invite.user === user) {
			return true;
		}
	};

};
