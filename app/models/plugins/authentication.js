/*!
 * Mongoose Schema Plugin
 * Provides authentication functionality
 */

var everyauth = require('everyauth'),
		Promise = everyauth.Promise,
		conf = require('../../../config/conf'),
		mongooseauth = require('mongoose-auth');

// configure everyauth's facebook module
everyauth.facebook.scope('user_about_me, email, read_stream');
everyauth.facebook.moduleTimeout(-1);

module.exports = function(mongoose, UserSchema) {
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
};
