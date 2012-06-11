/*!
 * conf.js
 * global configuration file
 */

module.exports = {
	server: {
		url: "http://deep-earth-8346.herokuapp.com/"
	},
	session: {
		secret: '90nds9d219fds2c',
		storeUri: 'mongodb://staff.mongohq.com:10046/yunify',
		username: 'codability',
		password: 'adm123',
		collection: 'sessions',
		reapInterval: 3000
	},
	db: {
		uri: 'mongodb://codability:adm123@staff.mongohq.com:10046/yunify'
	},
	fb: {
		appId: '407986405880590',
		appSecret: '545a8fea00ec7c0e74c3203e1141c592'
	}
};
