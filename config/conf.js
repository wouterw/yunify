/*!
 * conf.js
 * global configuration file
 */

module.exports = {
	server: {
		port: 4000
	},
	session: {
		secret: '90nds9d219fds2c',
		storeUri: 'mongodb://localhost/yunify',
		username: '',
		password: '',
		collection: 'sessions',
		reapInterval: 3000
	},
	points: {
		normal_task: 10,
		starred_task: 25,
		award: 50
	},
	db: {
		uri: 'mongodb://localhost/yunify'
	},
	fb: {
		appId: '407986405880590',
		appSecret: '545a8fea00ec7c0e74c3203e1141c592'
	}
};
