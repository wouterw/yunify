
// group.js   -- group schema

var mongoose = require('mongoose'),
		Schema   = mongoose.Schema;

var GroupSchema = new Schema({
	name: { type: String, default: '' },
	description: { type: String, default: '' },
	tasks: [{ type: Schema.ObjectId, ref: 'Task' }], // Group has_many tasks
	users: [{ type: Schema.ObjectId, ref: 'User' }], // Group has_many users
	creator: { type: Schema.ObjectId, ref: 'User' }, // Group has_one creator
	created_at: { type: Date, default: Date.now }
});

// Expose group model
module.exports = mongoose.model('Group', GroupSchema);
