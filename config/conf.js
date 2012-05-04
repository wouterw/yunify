
// conf.js  -- Contains app configuration

module.exports = {
	port: 4000,
	session: {
		secret: '90nds9d219fds2c',
		storeUri: 'mongodb://localhost/yunify', //'mongodb://flame.mongohq.com:27031/yunify',
		username: '', //'codability',
		password: '', //'adm123',
		collection: 'sessions',
		reapInterval: 3000
	},
	db: {
		uri: 'mongodb://localhost/yunify', //'mongodb://codability:adm123@flame.mongohq.com:27031/yunify'
	},
	mail: {
		host: 'localhost',		// smtp server hostname
		port: '25',						// smtp server port
		domain: 'localhost'		// domain used by client to identify itself to server
	},
	fb: {
		appId: '407986405880590',
		appSecret: '545a8fea00ec7c0e74c3203e1141c592'
	},
	twitter: {
		consumerKey: '',
		consumerSecret: ''
	},
	google: {
		clientId: '',
		clientSecret: ''
	},
	instagram: {
		clientId: '',
		clientSecret: ''
	}
}
