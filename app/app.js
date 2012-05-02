
// index.js   -- bootstrapper for the entire application

var express = require('express');
var gzippo = require('gzippo');
var mongoStore = require('connect-mongodb');
var fs = require('fs');
var	everyauth = require('everyauth');
var mongooseauth = require('mongoose-auth');
var conf = require('./conf');
var auth = require('./authorization')

// create server
var app = module.exports = express.createServer();

// bootstrap db connection
var mongoose = module.exports = require('mongoose');
mongoose.connect(conf.db.uri);

// bootstrap models
var modelsPath = __dirname + '/models';
var modelFiles = fs.readdirSync(modelsPath);
modelFiles.forEach(function (file) {
  	require(modelsPath + '/' + file);
  	console.log('> ' + file + ' loaded.');
});

// configure express and middleware
app.configure(function () {
	// set views path, template engine and default layout
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });

	// bodyParser should be above methodOverride
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// cookieParser should be above session
	app.use(express.cookieParser());
	app.use(express.session({ 
		secret: conf.session.secret,
		store: new mongoStore({
			url: conf.session.storeUri,
			collection: conf.session.collection,
			reapInterval: conf.session.reapInterval,
			username: conf.session.username,
			password: conf.session.password	
		}) 
	}));

	// logger and favicon
	app.use(express.logger(':method :url :status'));
    app.use(express.favicon());
	
	// routes should be at the last
	app.use(mongooseauth.middleware());
});

// express error handling
app.use(express.errorHandler({ 
	dumpExceptions: true, 
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

// dynamic view helpers
app.dynamicHelpers({
	appName: function (req, res) {
		return 'YunifyJs';
	}
});

mongooseauth.helpExpress(app);
everyauth.helpExpress(app, { userAlias: 'current_user' });

// bootstrap controllers
var controllersPath = __dirname + '/controllers';
var controllerFiles = fs.readdirSync(controllersPath);
controllerFiles.forEach(function (file) {
  require(controllersPath + '/' + file)(app);
  console.log('> ' + file + ' loaded.');
});

// bootstrap APIs
var apisPath = __dirname + '/api';
var apiFiles = fs.readdirSync(apisPath);
apiFiles.forEach(function (file) {
  require(apisPath + '/' + file)(app);
  console.log('> ' + file + ' loaded.');
});

// start the app
app.listen(conf.port);
console.log('>> Yunify has taken the stage');
console.log('>> Listening on port %s', app.address().port);
