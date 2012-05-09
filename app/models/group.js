/*!
 * Group model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

/**
 * Schema
 */

var GroupSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, default: '' },
	created_at: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */

GroupSchema.virtual('members').get(function() {
	return this.db.model('User').where('group', this._id).run();
});

GroupSchema.virtual('tasks').get(function() {
	return this.db.model('Task').where('group', this._id).run();
});

/**
 * Methods
 */

InvitationSchema.statics.addMember = function(user) {
	user.group = this._id;
	user.save();
};

InvitationSchema.statics.removeMember = function(user) {
	user.group = null;
	user.save();
};

/**
 * Export model
 */

module.exports = mongoose.model('Group', GroupSchema);
