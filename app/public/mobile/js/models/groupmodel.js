/* --------------------------------------------------------------------------
   GroupModel
   -------------------------------------------------------------------------- */

window.Group = Backbone.Model.extend({

	urlRoot: '/api/groups'

});

/* --------------------------------------------------------------------------
   GroupCollection
   -------------------------------------------------------------------------- */

window.GroupCollection = Backbone.Collection.extend({

	model: Group,

	url: '/api/groups',

	findByName: function(key) {
		var url = (key === '') ? '/api/groups' : '/api/groups/search?q=' + key;
		var self = this;
		$.ajax({
			url: url,
			cache: false,
			dataType: 'json',
			success: function(results) {
				self.reset(results);
			}
		});
	}

});
