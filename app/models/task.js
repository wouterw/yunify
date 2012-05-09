/*!
 * Task model
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Schema
 */

var TaskSchema = new Schema({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
	important: { type: Boolean, default: false },
	group: { type: Schema.ObjectId, ref: 'Group' },
	created_at: { type: Date, default: Date.now }
});

/**
 * Export model
 */

module.exports = mongoose.model('Task', TaskSchema);
