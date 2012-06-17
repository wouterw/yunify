define(['jquery', 'backbone', 'underscore', 'text!tpl/userDetails.html'],
  function( $, Backbone, _, userTemplate ) {

    var UserView = Backbone.View.extend({

      el: $('section#user-details'),

      events: {
        'afterRender': 'afterRender'
      },

      initialize: function () {
        this.template = _.template( userTemplate );
      },

      render: function () {
        this.$el.html( this.template( this.model.toJSON() ) ) ;
        this.$el.trigger('afterRender');
        return this;
      },

      afterRender: function () {
        $( '#user-details-list' ).listview();
        $( '#user-awards-list' ).listview();
      }

    });

    return UserView;

  });
