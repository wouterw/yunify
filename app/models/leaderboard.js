/*!
 * Leaderboard Mongoose Model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

/**
 * Schema
 */

var Leaderboard = new Schema({
	group: { type: Schema.ObjectId, ref: 'Group' },
	user: { type: Schema.ObjectId, ref: 'User' },
	points: { type: Number, default: 0 },
});

/**
 * Methods
 */

Leaderboard.methods.findUser = function(callback) {
	return this.db.model('User').findById(this.user, callback);
};

Leaderboard.methods.findGroup = function(callback) {
	return this.db.model('Group').findById(this.group, callback);
};

// Add a score to the scoreboard, appends if key exists
Leaderboard.statics.addPoints = function(user, points, callback) {

};

// Remove a score from the scoreboard
Leaderboard.statics.removePoints = function(user, points, callback) {

};

// Get scoreboard order by leader first
Leaderboard.statics.getPoints = function(callback) {

};

/**
 * Export model
 */

module.exports = mongoose.model('Leaderboard', Leaderboard);
