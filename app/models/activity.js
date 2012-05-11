 /*!
 * activity.js
 * Allows you to publish and
 * subscribe to events.
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		DocumentObjectId = mongoose.Types.ObjectId,
		events = require('events');

/**
 * Schema
 */

// <actor>	<verb>		<target>
// <user> 	earned 		<badge>
// <user> 	earned 		<points>
// <user> 	has taken <1ste place>
// <user> 	joined 		<group>
// <user> 	left 			<group>
// <user>		invited		<invitee>

var Activity = new Schema({
	stream: { type: Schema.ObjectId, ref: 'Group' },
	actor: {type: String},
	verb: {type: String},
	target: {type: String},
	image: {type: String},
	url: {type: String},
	published: {type: Date, default: Date.now}
});

Activity.prototype = new events.EventEmitter;

/**
 * Virtuals
 */

Activity.virtual('content').get(function () {
	return this.actor + ' ' + this.verb + ' ' + this.target;
});

/**
 * Statics
 */

Activity.statics.getRecentItems = function (stream, n, cb) {
	return this.where('stream').equals(stream)
		.sort('published', 'descending').limit(n)
		.populate('target').run(cb);
};

/**
 * Methods
 */

Activity.methods.publish = function(stream, actor, verb, target, image, url, cb) {
	var act = new Activity({
		stream: stream,
		actor: actor,
		verb: verb,
		target: target,
		image: image,
		url: url
	});

	act.save(cb);
	this.emit('new_activity', activity);
};

/**
 * Export model
 */
module.exports = mongoose.model('activity', Activity);
