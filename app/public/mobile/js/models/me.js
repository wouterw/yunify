define(['backbone'],
  function( Backbone ) {

    var Me = Backbone.Model.extend({
      urlRoot: '/api/me'
    });

    return Me;

  });
