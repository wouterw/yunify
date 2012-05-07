/*!
 * Group model
 */

var mongoose = require('mongoose'),
		Invitation = mongoose.model('Invitation'),
		Schema   = mongoose.Schema;

/**
 * Schema
 */

var GroupSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, default: '' },
	tasks: [{ type: Schema.ObjectId, ref: 'Task' }], // Group has_many tasks
	users: [{ type: Schema.ObjectId, ref: 'User' }], // Group has_many users
	invitations: [Invitation],
	creator: { type: Schema.ObjectId, ref: 'User' }, // Group has_one creator
	created_at: { type: Date, default: Date.now }
});

/**
 * Export model
 */

module.exports = mongoose.model('Group', GroupSchema);
