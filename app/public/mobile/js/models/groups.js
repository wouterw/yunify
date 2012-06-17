define( ['jquery', 'backbone', 'models/group'],
  function( $, Backbone, Group ) {

  var Groups = Backbone.Collection.extend({

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

  return Groups;

});
