/* --------------------------------------------------------------------------
   GroupListPageView
   -------------------------------------------------------------------------- */

window.GroupListPage = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('group-search-page'));
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.listView = new GroupListView({ el: $('ul', this.el), model: this.model });
		this.listView.render();
		return this;
	},

	events: {
		"keyup .search-query": "search"
	},

	search: function(event) {
		var key = $('.search-query').val();
		console.log('search ' + key);
		this.model.findByName(key);
	}

});

/* --------------------------------------------------------------------------
   GroupView
   -------------------------------------------------------------------------- */

window.GroupView = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('group-details'));
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});

/* --------------------------------------------------------------------------
   GroupListView
   -------------------------------------------------------------------------- */

window.GroupListView = Backbone.View.extend({

	initialize: function() {
		this.model.on('reset', this.render, this);
	},

	render: function() {
		this.$el.empty();
		_.each(this.model.models, function(group) {
			this.$el.append(new GroupListItemView({model:group}).render().el);
		}, this);
		$('#group-list').listview('refresh');
		return this;
	}

});

/* --------------------------------------------------------------------------
   GroupListItemView
   -------------------------------------------------------------------------- */

window.GroupListItemView = Backbone.View.extend({

	tagName: 'li',

	initialize: function() {
		this.template = _.template(tpl.get('group-list-item'));
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.close, this);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});
