define( ['jquery', 'backbone', 'models/user'],
  function( $, Backbone, User ) {

  var Users = Backbone.Collection.extend({

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

  return Users;

});
