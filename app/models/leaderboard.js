/*!
 * leaderboard.js
 */

var mongoose = require('mongoose'),
		DocumentObjectId = mongoose.Types.ObjectId,
		Entry = mongoose.model('LeaderboardEntry'),
		User = mongoose.model('User'),
		EventEmitter = require('events').EventEmitter;

var leaderboard = exports = module.exports = new EventEmitter();

leaderboard.addPoints = function(usrId, points, cb) {
	User.findById(usrId, function(err, user) {
		if(err) { console.log(err.message); }
		Entry.findOne({ "user":user._id, "group":user.group}, function(err, entry) {
			if(!err) {
				if (entry) {
					entry.points += points;
					entry.save(cb);
				} else {
					new Entry({
						group: user.group,
						user: user._id,
						points: points
					}).save(cb);
				}
				leaderboard.emit('changes');
			} else {
				cb(err);
			}
		});
	});
};

leaderboard.getPoints = function(grpId, cb) {
	Entry.where('group', new DocumentObjectId.fromString(grpId))
		.populate('user', ['fullName'])
		.desc('points').run(cb);
};
