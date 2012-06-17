define(['jquery', 'backbone', 'underscore', 'text!tpl/profileStatus.html'],
  function( $, Backbone, _, statusTemplate ) {

    var MyStatusView = Backbone.View.extend({

      el: $('section#my-status'),

      events: {
        'click .status': 'changeStatus',
        'afterRender': 'afterRender'
      },

      initialize: function () {
        this.template = _.template(statusTemplate);
        this.fetchModel();
      },

      render: function () {
        this.$el.html( this.template({ me: this.model }) ) ;
        this.$el.trigger('afterRender');
        return this;
      },

      afterRender: function () {
        $('#index-page').page('destroy').page();
      },

      changeStatus: function ( e ) {
        e.preventDefault();
        var newStatus = $( e.currentTarget ).data( 'status' );
        this.save( newStatus );
      },

      fetchModel: function () {
        var self = this;
        $.ajax({
          async: false,
          url: '/api/me',
          type: 'GET',
          dataType: 'json',
          success: function ( data ) {
            self.model = data;
            return self;
          }
        });
      },

      save: function ( status ) {
        var self = this;
        $.ajax({
          url: '/api/me/status',
          type: 'PUT',
          data: {status: status}
        }).done(function( msg ) {
            self.fetchModel();
            self.render();
        });
      }

    });

    return MyStatusView;

  });
