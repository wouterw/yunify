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
	priority: { type: String, enum: ['Low', 'Medium', 'High'] },
	completed: { type: Boolean, default: false },
	group: { type: Schema.ObjectId, ref: 'Group' }, // task belongs_to group
	created_at: { type: Date, default: Date.now }
});

/**
 * Export model
 */

module.exports = mongoose.model('Task', TaskSchema);
