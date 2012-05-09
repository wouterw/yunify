/*!
 * Badge model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

/**
 * Schema
 */

var Badge = new Schema({
	name: { type: String, unique: true, required: true },
	description: { type: String, required: true },
	image: { type: String, required: true },
	worth: { type: Number, required: true, default: 5 },
	hidden: { type: Bool, default: false },
	created_at: { type: Date, default: Date.now }
});

var Award = new Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
	badge: { type: Schema.ObjectId, ref: 'Badge' },
	achieved_at: { type: Date, default: Date.now }
});

points_required
points_earned

var AchievementManager = function () {
	check_condition_for()
};

/**
 * Methods
 */

InvitationSchema.methods.findUser = function(callback) {
	return this.db.model('User').findById(this.invitee, callback);
};

/**
 * Export model
 */

module.exports = mongoose.model('Badge', BadgesSchema);
