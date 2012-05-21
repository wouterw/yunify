/* --------------------------------------------------------------------------
   UserListPageView
   -------------------------------------------------------------------------- */

window.UserListPage = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('search-page'));
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.listView = new UserListView({ el: $('ul', this.el), model: this.model });
		this.listView.render();
		return this;
	},

	events: {
		"keyup .search-query":"search"
	},

	search: function(event) {
		var key = $('.search-query').val();
		console.log('search ' + key);
		this.model.findByName(key);
	}

});

/* --------------------------------------------------------------------------
   UserView
   -------------------------------------------------------------------------- */

window.UserView = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('user-details'));
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});

/* --------------------------------------------------------------------------
   UserListView
   -------------------------------------------------------------------------- */

window.UserListView = Backbone.View.extend({

	initialize: function() {
		this.model.on('reset', this.render, this);
	},

	render: function(eventName) {
		this.$el.empty();
		_.each(this.model.models, function(user) {
			this.$el.append(new UserListItemView({model:user}).render().el);
		}, this);
		$('#user-list').listview('refresh');
		return this;
	}

});

/* --------------------------------------------------------------------------
   UserListItemView
   -------------------------------------------------------------------------- */

window.UserListItemView = Backbone.View.extend({

	tagName: 'li',

	initialize: function() {
		this.template = _.template(tpl.get('user-list-item'));
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.close, this);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});
