 /*!
 * activityStream.js
 * Allows you to publish and
 * subscribe to events.
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		DocumentObjectId = mongoose.Types.ObjectId,
		_ = require('underscore')._;

/**
 * Schema
 */

var Activity = {
	verb: {type: String},			// earned
	url: {type: String},			// url_to_badge
	title: {type: String},
	content: {type: String},
	image: {type: String},		// url_to_img
	object: {type: ActivityObjectHash, default: null},	//
	actor: {type: ActivityObjectHash, default: null},		//
	target: {type: ObjectId, ref: 'activityObject'},		//
	published: {type: Date, default: Date.now}
};

var ActivityObject = {
	image: {type: String},
	name: {type: String},
	content: {type: String},
	url: {type: String}
};



/**
 * Export model
 */
module.exports = mongoose.model('activityObject', new Schema(ActivityObject));
module.exports = mongoose.model('activity', new Schema(Activity));
