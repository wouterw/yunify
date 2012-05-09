/*!
 * User model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		lastMod = require('./plugins/lastMod');

/**
 * Schema
 */

var meta = {
	points: { type: Number, default: 0 }
};

var UserSchema = new Schema({
	fullName: { type: String, required: true },
	bio: { type: String, default: '' },
	email: { type: String, required: true, index: { unique: true, sparse: true } },
	twitter: { type: String, default: '' },
	status: { type: String, enum: ['Available', 'Studying', 'Busy', 'Sleep', 'Out'] },
	group: { type: Schema.ObjectId, ref: 'Group' },
	meta: meta,
	created_at: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */

UserSchema.virtual('invites').get(function() {
	return this.db.model('Invite').where('invitee', this._id).run();
});

/**
 * Plugins
 */

// add updated_at
UserSchema.plugin(lastMod);

// add authentication
require('./plugins/authentication')(mongoose, UserSchema);

/**
 * Methods
 */

UserSchema.methods.findGroup = function(callback) {
	return this.db.model('Group').findById(this.group, callback);
};

/**
 * Export model
 */

module.exports = mongoose.model('User', UserSchema);
