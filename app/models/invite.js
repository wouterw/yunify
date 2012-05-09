/*!
 * Invitation model
 */

var mongoose = require('mongoose'),
		Schema	 = mongoose.Schema,
		ObjectId = Schema.ObjectId;

/**
 * Schema
 */

var InviteSchema = new Schema({
	group: { type; ObjectId, ref: 'Group' },
	invitee: { type: ObjectId, ref: 'User' },
	motivation: { type: String, default: '' },
	status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
	invited_by: { type: String, required: true },
	created_at: { type: Date, default: Date.now }
});

/**
 * Methods
 */

InviteSchema.methods.invitee = function(callback) {
	return this.db.model('User').findById(this.invitee, callback);
};

InviteSchema.methods.group = function(callback) {
	return this.db.model('Group').findById(this.group, callback);
};

InviteSchema.statics.getAllForUser = function(id, callback) {
	return this.where('group', ObjectId.fromString(id)).run(callback);
};

InviteSchema.statics.getAllForGroup = function(id, callback) {
	return this.where('invitee', ObjectId.fromString(id)).run(callback);
};

/**
 * Export model
 */

module.exports = mongoose.model('Invite', InviteSchema);
