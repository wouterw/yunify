var email = require('mailer');

module.exports.sendInvite = function (to) {

	email.send({
		host: "localhost",              // smtp server hostname
	  	port: "25",                     // smtp server port
	  	domain: "localhost",            // domain used by client to identify itself to server
	  	to: to,
	  	from: "noreply@yunify.com",
	  	subject: "You've been invited to Yunify",
	  	template: "email-template.txt",   // path to template name
	  	data: {
	    	"name": "Billy Bob",
	    	"base_url": "http://yunify.com/invite",
	    	"group_id": "1"
	    	//"token": "123456"
  		},
	  	authentication: "login",        // auth login is supported; anything else is no auth
	  	username: "dXNlcm5hbWU=",       // Base64 encoded username
	  	password: "cGFzc3dvcmQ="        // Base64 encoded password
	},
	function (err, result) {
		if (err) { 
			console.log(err); 
		}
	});

};
