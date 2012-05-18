/*!
 * Chat model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

/**
 * Schema
 */
var ChatSchema = new Schema({
	room: { type: String },
	text: { type: String, required: true },
	author: { type: String, required: true },
	timestamp: { type: Date, default: Date.now }
});

/**
 * Methods
 */
ChatSchema.methods.findAuthor = function(callback) {
	return this.db.model('User').findById(this.author, callback);
};

ChatSchema.methods.findRoom = function(callback) {
	return this.db.model('Group').findById(this.room, callback);
};

ChatSchema.statics.getChatHistory = function (room, count, callback) {
	return this.where('room').equals(room).limit(count).asc('timestamp').run(callback);
};

/**
 * Export model
 */
module.exports = mongoose.model('Chat', ChatSchema);
