
// task.js  -- task schema

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TaskSchema = new Schema({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
	group: { type: Schema.ObjectId, ref: 'Group' }, // task belongs_to group
	created_at: { type: Date, default: Date.now }
});

// Expose task model
module.exports = mongoose.model('Task', TaskSchema);
