/*!
 * Task model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		stats = require('./statistics'),
		awarder = require('./awarder');

/**
* Schema
*/

var Task = new Schema({
	title: { type: String, required: true },
	completed: { type: Boolean },
	important: { type: Boolean },
	group: { type: ObjectId, ref: 'Group' },
	completer: { type: ObjectId, ref: 'User' },
	completed_at: { type: Date, default: null },
	creater: { type: ObjectId, ref: 'User'},
	created_at: { type: Date, default: Date.now() }
});

/**
* Methods
*/

Task.methods.complete = function(usrId, cb) {
	this.completed = true;
	this.completer = usrId;
	this.completed_at = Date.now();
	var points = this.important ? 10 : 5;
	this.save(function (err) {
		if(!err) {

			// statistics
			stats.incrementScoreCount(usrId, points);
			stats.incrementTaskCount(usrId);

			// awards
			awarder.tryUnlockingAchievement("EARN_50_POINTS", usrId, function(achievement) {});
			awarder.tryUnlockingAchievement("COMPLETE_5_TASKS", usrId, function(achievement) {});
			awarder.tryUnlockingAchievement("COMPLETE_25_TASKS", usrId, function(achievement) {});

		}
	});
	cb(this);
};

/**
* Statics
*/

Task.statics.allCompleted = function(usrId, cb) {
	return this.where('completer', usrId).run(cb);
};

Task.statics.countCompleted = function(usrId, cb) {
	return this.allCompleted(usrId, function(err, results) {
		return results.length;
	});
};

/**
* Export model
*/

module.exports = mongoose.model('Task', Task);
