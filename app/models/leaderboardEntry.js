/*!
 * LeaderboardEntry Mongoose Model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

/**
 * Schema
 */

var LeaderboardEntry = new Schema({
	group: { type: ObjectId, ref: 'Group' },
	user: { type: ObjectId, ref: 'User' },
	points: { type: Number }
});

/**
 * Methods
 */

LeaderboardEntry.methods.findUser = function(callback) {
	return this.db.model('User').findById(this.user, callback);
};

LeaderboardEntry.methods.findGroup = function(callback) {
	return this.db.model('Group').findById(this.group, callback);
};

/**
 * Export model
 */

module.exports = mongoose.model('LeaderboardEntry', LeaderboardEntry);
