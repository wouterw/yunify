/* --------------------------------------------------------------------------
   UpdateProfileView
   -------------------------------------------------------------------------- */

window.UpdateProfileView = Backbone.View.extend({

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	events: {
		"click .save": "beforeSave"
	},

	beforeSave: function() {
		var self = this;
		var check = this.model.validateAll();
		if (check.isValid === false) {
			utils.displayValidation(check.message);
			return false;
		} else {
			this.saveChanges();
		}
		return false;
	},

	saveChanges: function() {
		var self = this;
		this.model.save(null, {
			success: function(model) {
				self.render();
				app.navigate('', false);
				utils.showAlert('Success!', 'Profile saved successfully', 'alert-success');
			},
			error: function() {
				utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
			}
		});
	}

});

/* --------------------------------------------------------------------------
   ProfileView
   -------------------------------------------------------------------------- */

window.ProfileView = Backbone.View.extend({

	initialize: function () {
		this.render();
	},

	render: function () {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}

});

/* --------------------------------------------------------------------------
   AwardsPage
   -------------------------------------------------------------------------- */

window.AwardsPage = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('award-list'));
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.listView = new AwardListView();
		return this;
	}

});

/* --------------------------------------------------------------------------
   AwardListView
   -------------------------------------------------------------------------- */

window.AwardListView = Backbone.View.extend({

	initialize:function () {
		this.model.bind("reset", this.render, this);
	},

	render:function (eventName) {
		this.$el.empty();
		_.each(this.model.models, function (award) {
			this.$el.append(new AwardListItemView({model:award}).render().el);
		}, this);
		$('#award-list').listview('refresh');
		return this;
	}

});

/* --------------------------------------------------------------------------
   AwardListItemView
   -------------------------------------------------------------------------- */

window.AwardListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.template = _.template(tpl.get('award-list-item'));
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
