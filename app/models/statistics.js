/*!
 * User Statistics module
 */

var mongoose = require('mongoose'),
		User = mongoose.model('User');

var stats = exports = module.exports = {};

/*
 * Increments
 */

stats.incrementScoreCount = function ( user, amount ) {
	fixUser(user, function ( err, user ) {
		if (amount && amount >= 1) {
			user.achievements.score_count += amount;
			user.save();
		} else {
			console.log( new Error( 'Amount must be 1 or more' ) );
		}
	});
};

stats.incrementTaskCount = function ( user ) {
	fixUser(user, function ( err, user ) {
		user.achievements.task_count++;
		user.save();
	});
};

/*
 * Gets
 */

stats.getScoreCount = function ( user ) {
	var score_count = 0;
	fixUser(user, function ( err, user ) {
		score_count = user.achievements.score_count;
	});
	return score_count;
};

stats.getAwardCount = function ( user ) {
	var award_count;
	fixUser(user, function ( err, user ) {
		award_count = user.achievements.unlocked.length();
	});
	return award_count;
};

stats.getTaskCount = function ( user ) {
	var task_count = 0;
	fixUser(user, function ( err, user ) {
		task_count = user.achievements.task_count;
	});
	return task_count;
};

/*
 * Helpers
 */

var fixUser = function ( user, cb ) {
	if (typeof user === 'string' || typeof user === 'number') {
		User.findById(user, cb);
	} else {
		cb( null, user );
	}
};
