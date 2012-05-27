/*!
 * Group model
 */

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

/**
 * Schema
 */

var GroupSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, default: '' },
	created_at: { type: Date, default: Date.now }
});

/**
 * Methods
 */

GroupSchema.methods.members = function ( cb ) {
	return this.db.model('User')
		.where('group').equals(this._id)
		.run(cb);
};

GroupSchema.methods.addMember = function( user, cb ) {
	user.group = this._id;
	user.save(cb);
};

GroupSchema.methods.removeMember = function( user, cb ) {
	user.group = null;
	user.save(cb);
};

GroupSchema.methods.leaderboard = function ( cb ) {
	return this.db.model('User')
		.where('group').equals(this._id)
		.desc('achievements.score_count')
		.run(cb);
};

GroupSchema.methods.invites = function ( cb ) {
	return this.db.model('Invite')
		.where('group').equals(this._id)
		.populate('invitee', ['fullName'])
		.populate('invited_by', ['fullName'])
		.run(cb);
};

GroupSchema.methods.tasks = function ( cb ) {
	return this.db.model('Task')
		.where('group').equals(this._id)
		.run(cb);
};

/**
 * Export model
 */

module.exports = mongoose.model( 'Group', GroupSchema );
