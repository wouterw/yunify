var	gzippo = require('gzippo'),
		color = require('./lib/ansi-color').set,
		fs = require('fs');

// load configuration file
var conf = require('../config/conf');

// create sessionstore
var mongoStore = require('connect-mongodb');
var	sessionStore = new mongoStore({
	url: conf.session.storeUri,
	collection: conf.session.collection,
	reapInterval: conf.session.reapInterval,
	username: conf.session.username,
	password: conf.session.password
});

// create server
var express = require('express'),
		app = module.exports = express.createServer();

// configure mongoose
var mongoose = module.exports = require('mongoose');
mongoose.connect(conf.db.uri);

// bootstrap models
require('./models/user');
require('./models/invite');
require('./models/group');
require('./models/chat');
require('./models/task');


// load authorization
var everyauth = require('everyauth'),
		mongooseauth = require('mongoose-auth');

// configure express & middleware
app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		store: sessionStore,
		secret: conf.session.secret,
		key: 'express.sid'
	}));
	app.use(express.logger(':method :url :status'));
	app.use(express.favicon(__dirname + '/public/ico/favicon.ico'));
	app.use(gzippo.compress());
	app.use(mongooseauth.middleware());
});

// express error handling
app.use(express.errorHandler({
	dumpExceptions: false,
	showStack: false
}));

// configure environments
app.configure('development', function () {
	app.set('showStackError', true);
	app.use(express.static(__dirname + '/public'));
});

app.configure('staging', function () {
	app.use(gzippo.staticGzip(__dirname + '/public'));
	app.enable('view cache');
});

app.configure('production', function () {
	app.use(gzippo.staticGzip(__dirname + '/public'));
});

mongooseauth.helpExpress(app);
everyauth.helpExpress(app, { userAlias: 'current_user' });

// bootstrap controllers
require('./controllers/auth.controller.js')(app);
require('./controllers/award.controller.js')(app);
require('./controllers/group.controller.js')(app);
require('./controllers/index.controller.js')(app);
require('./controllers/mobile.controller.js')(app);
require('./controllers/profile.controller.js')(app);

// bootstrap api's
require('./api/awards.api.js')(app);
require('./api/fb.api.js')(app);
require('./api/group.api.js')(app);
require('./api/invite.api.js')(app);
require('./api/task.api.js')(app);
require('./api/user.api.js')(app);

// start http server
var port = process.env.PORT || 5000;
app.listen(port, function() {
	var addr = app.address();
	console.log(color("success - ", "green+bold"),
		'Yunify has taken the stage on http://' + addr.address + ':' + addr.port);
});

// start socket server
var sio = require('./middleware/sockets')(app, sessionStore);
