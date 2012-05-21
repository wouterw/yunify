/*!
 * User Statistics module
 */

var mongoose = require('mongoose'),
		User = mongoose.model('User');

var stats = exports = module.exports = {};

stats.getLoginCount = function(user) {
	//return user.achievements.login_count;
	return 1;
};

stats.incrementLoginCount = function(user, cb) {
	user.achievements.login_count++;
	user.save(cb);
};

stats.getAwardCount = function(user) {
	return 5;
};

stats.getScoreCount = function(user) {
	return 50;
};

stats.getTaskCount = function(user) {
	return 5;
};
