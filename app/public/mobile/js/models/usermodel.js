/* --------------------------------------------------------------------------
   UserModel
   -------------------------------------------------------------------------- */

window.User = Backbone.Model.extend({

	urlRoot: '/api/users'

});

/* --------------------------------------------------------------------------
   UserCollection
   -------------------------------------------------------------------------- */

window.UserCollection = Backbone.Collection.extend({

	model: User,

	url: '/api/users',

	findByName: function(key) {
		var url = (key === '') ? '/api/users' : '/api/users/search?q=' + key;
		console.log('findByName: ' + key);
		var self = this;
		$.ajax({
			url: url,
			cache: false,
			dataType: 'json',
			success: function(results) {
				console.log('search success: ' + results.length);
				self.reset(results);
			}
		});
	}

});
