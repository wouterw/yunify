/*!
 * User model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = mongoose.Types.ObjectId,
		lastMod = require('./plugins/lastMod');

/**
 * Schema
 */
var Award = new Schema({
	id: { type: Number },
	name: { type: String },
	desc: { type: String },
	worth: { type: Number },
	awarded_at: { type: Date, default: Date.now }
});

var User = new Schema({

	fullName: {
		type: String,
		required: true
	},

	bio: {
		type: String
	},

	email: {
		type: String,
		required: true,
		index: {
			unique: true,
			sparse: true
		}
	},

	twitter: {
		type: String
	},

	status: {
		type: String,
		enum: ['Available', 'Studying', 'Busy', 'Sleep', 'Out']
	},

	group: {
		type: Schema.ObjectId,
		ref: 'Group'
	},

	achievements: {
		unlocked: [Award],
		login_count: { type: Number, default: 0 },
		award_count: { type: Number, default: 0 },
		score_count: { type: Number, default: 0 },
		tasks_count: { type: Number, default: 0 }
	},

	created_at: {
		type: Date,
		default: Date.now
	}

});

/**
 * Plugins
 */

User.plugin(lastMod);

require('./plugins/authentication')(mongoose, User);

/**
 * Methods
 */

User.methods.findGroup = function(cb) {
	return this.db.model('Group').findById(this.group, cb);
};

User.methods.invites = function(cb) {
	return this.db.model('Invite').where('invitee').equals(this._id)
		.populate('group', ['name']).populate('invited_by', ['fullName'])
		.run(cb);
};

/**
 * Export model
 */

module.exports = mongoose.model('User', User);
