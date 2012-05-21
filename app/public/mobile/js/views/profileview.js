/* --------------------------------------------------------------------------
   ProfileView
   -------------------------------------------------------------------------- */

window.ProfileView = Backbone.View.extend({

	el: '#profile',

	initialize: function() {
		this.template = _.template(tpl.get('profile-form'));
		this.render();
	},

	render: function() {
		var self = this;
		this.model = new Profile();
		this.model.fetch({
			success: function() {
				self.$el.html(self.template(self.model.toJSON()));
			},
			error: function() {

			}
		});
	},

	events: {
		"click .save-changes": "saveChanges"
	},

	saveChanges: function() {
		var self = this;
		var newValue = $('select#status option:selected').val();
		this.model.save({ status: newValue }, {
			success: function(model) {
				self.render();
				utils.showAlert('Success!', 'Profile saved successfully', 'alert-success');
			},
			error: function() {
				utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
			}
		});
	}

});

/* --------------------------------------------------------------------------
   Kickoff
   -------------------------------------------------------------------------- */

$(document).ready(function () {
	tpl.loadTemplates(['profile-form'], function () {
			var app = new ProfileView();
	});
});
