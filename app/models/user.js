	/*!
 * User model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = mongoose.Types.ObjectId,
		lastMod = require('./plugins/lastMod');

/**
 * Schema
 */

var UserSchema = new Schema({
	fullName: { type: String, required: true },
	bio: { type: String, default: '' },
	email: { type: String, required: true, index: { unique: true, sparse: true } },
	twitter: { type: String, default: '' },
	status: { type: String, enum: ['Available', 'Studying', 'Busy', 'Sleep', 'Out'] },
	group: { type: Schema.ObjectId, ref: 'Group' },
	created_at: { type: Date, default: Date.now }
});

/**
 * Plugins
 */

UserSchema.plugin(lastMod);

require('./plugins/authentication')(mongoose, UserSchema);

/**
 * Methods
 */

UserSchema.methods.findGroup = function(cb) {
	return this.db.model('Group').findById(this.group, cb);
};

UserSchema.methods.invites = function(cb) {
	return this.db.model('Invite').where('invitee').equals(this._id)
		.populate('group', ['name']).populate('invited_by', ['fullName'])
		.run(cb);
};


/**
 * Export model
 */

module.exports = mongoose.model('User', UserSchema);
