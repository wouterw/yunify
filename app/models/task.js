
// task.js  -- task schema

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TaskSchema = new Schema({
	text: { type: String, default: '' },
	done: { type: Boolean, default: false },
	group: { type: Schema.ObjectId, ref: 'Group' }, // task belongs_to group
	created_at: { type: Date, default: Date.now }
});

// Expose task model
module.exports = mongoose.model('Task', TaskSchema);
