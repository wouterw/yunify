/*!
 * invite.api.js
 * RESTful api for invite
 */

var mongoose = require('mongoose'),
		_ = require('underscore')._,
		Group = mongoose.model('Group'),
		User = mongoose.model('User'),
		Invite = mongoose.model('Invite');


module.exports = function (app) {

	/**
	 * Route Param Pre-conditions for 'invId'
	 */

	app.param('invId', function (req, res, next, id) {
		Invite.findOne({ _id : id }, function (err, invite) {
			if (err) { return next(err); }
			if (!invite) { return next(new Error('Failed to load invite ' + id)); }
			req.found_invite = invite;
			next();
		});
	});

	/**
	 * GET /api/me/group/invitates
	 * @return all pending invites of current user's group
	 */

	app.get('/api/me/group/invites', function(req, res) {
		var me = req.user;
		me.populate('group').run(function(err, me) {
			res.send(me.group.invites);
		});
	});

	/**
	 * POST /api/me/group/invites
	 * invites a given user to the current user's group
	 */

	app.post('/api/me/group/invites', function(req, res) {
		var me = req.user;
		return Group.findById(me.group, function(err, group) {
			var invite = new Invite({
				group: me.group,
				invitee: req.body.invitee,
				invited_by: me._id
			});
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
		req.user.invites(function(err, invites) {
			res.send(invites);
		});
	});

	/**
	 * POST /api/me/invites/1/accept
	 */

	app.get('/api/me/invites/:invId/accept', function(req, res) {
		var invite = req.found_invite;
		var me = req.user;
		if(isValid(invite, me)) {
			Group.findById(invite.group, function (err, group) {
				group.addMember(me, function() {
					invite.status = 'Accepted';
					invite.save();
				});
			});
		} else {
			res.statusCode = 400;
			res.send({"err":"invalid invite"});
		}
	});

	/**
	 * POST /api/me/invites/:invId/reject
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
		return (invite.status === 'Pending'
			&& invite.invitee.toString() === user._id.toString());
	};

};
