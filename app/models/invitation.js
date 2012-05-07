/*!
 * Invitation model
 */

var mongoose = require('mongoose'),
		Schema	 = mongoose.Schema;

/**
 * Schema
 */

var InvitationSchema = new Schema({
	invitee: { type: Schema.ObjectId, ref: 'User' },
	motivation: { type: String, default: '' },
	status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'] },
	invited_by: { type: String, required: true },
	created_at: { type: Date, default: Date.now }
});

/**
 * Methods
 */

InvitationSchema.methods.findUser = function(callback) {
	return this.db.model('User').findById(this.invitee, callback);
};

/**
 * Export model
 */

module.exports = mongoose.model('Invitation', InvitationSchema);
