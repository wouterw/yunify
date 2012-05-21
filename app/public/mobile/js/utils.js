tpl = {

	// Hash of preloaded templates for the app
	templates:{},

	// Recursively pre-load all the templates for the app.
	// This implementation should be changed in a production environment. All the template files should be
	// concatenated in a single file.
	loadTemplates:function (names, callback) {

		var that = this;

		var loadTemplate = function (index) {
			var name = names[index];
			var tpl_path = '/mobile/tpl';
			console.log('Loading template: ' + name);
			$.get(tpl_path + '/' + name + '.html', function (data) {
				that.templates[name] = data;
				index++;
				if (index < names.length) {
					loadTemplate(index);
				} else {
					callback();
				}
			});
		};

		loadTemplate(0);
	},

	// Get template by name from hash of preloaded templates
	get:function (name) {
		return this.templates[name];
	}

};

window.utils = {
	showAlert: function(title, text, cssClass) {
		$('.alert').removeClass("alert-error alert-warning alert-success alert-info");
		$('.alert').addClass(cssClass);
		$('.alert').html('<strong>' + title + '</strong> ' + text);
		$('.alert').show();
	},

	hideAlert: function() {
		$('.alert').hide();
	}

};
