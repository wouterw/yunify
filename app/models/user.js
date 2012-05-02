
// user.js   -- user schema

var everyauth = require('everyauth');
var	Promise = everyauth.Promise;
var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var conf = require('../conf');
var	mongooseauth = require('mongoose-auth');
var UserSchema = new Schema({});

everyauth.debug = true;
everyauth.facebook.scope('user_about_me, email');
everyauth.facebook.moduleTimeout(-1);

UserSchema.add({
	fullName: { type: String, required: true },
	bio: { type: String, default: '' },
	email: { type: String, required: true, index: { unique: true, sparse: true } },
	twitter: { type: String, default: '' },
	status: { type: String, default: '' },
	group: { type: Schema.ObjectId, ref: 'Group' }, // user belongs_to group
	created_at: { type: Date, default: Date.now }
});

UserSchema.plugin(mongooseauth, {
	everymodule: {
		everyauth: {
			findUserById: function (userId, callback) {
				mongoose.model('User').findOne({_id: userId}, function (err, foundUser) {
					callback(err, foundUser);
				});
			}
		}
	},
	facebook: {
		everyauth: {
			myHostname: 'http://localhost:' + conf.port,
			appId: conf.fb.appId,
			appSecret: conf.fb.appSecret,
			redirectPath: '/',
			findOrCreateUser: function (session, accessToken, accessTokenExtra, facebookUser) {
				var promise = this.Promise();
				var User = mongoose.model('User');
				User.findOne({'fb.id': facebookUser.id}, function (err, foundUser) {
					if (err) { return promise.fail(err); }
					if (foundUser) {
						return promise.fulfill(foundUser);
					}
					var expiresDate = new Date;
					expiresDate.setSeconds(expiresDate.getSeconds() + accessTokenExtra);
					var newUser = new User({
						fullName: facebookUser.name,
						bio: facebookUser.bio,
						email: facebookUser.email,
						fb: {
							id: facebookUser.id,
							name: facebookUser.name,
							first_name: facebookUser.first_name,
							last_name: facebookUser.last_name,
							link: facebookUser.link,
							gender: facebookUser.gender,
							acessToken: accessToken,
							expires: expiresDate
						}
					});
					newUser.save( function (err, savedUser) {
						if (err) { return promise.fail(err); }
						return promise.fulfill(savedUser);
					});
				});
				return promise;
			}
		}
	}
});

// Expose user model
module.exports = mongoose.model('User', UserSchema);
