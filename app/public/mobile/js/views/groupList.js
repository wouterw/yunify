define(['jquery', 'backbone', 'underscore', 'text!tpl/groupList.html'],
  function( $, Backbone, _, listTemplate ) {

    var GroupListView = Backbone.View.extend({

      el: $( 'ul#group-list' ),

      initialize: function () {
        this.template = _.template( listTemplate );
        this.collection.on( 'reset', this.render, this );
      },

      render: function () {
        this.$el.empty();
        this.$el.html( this.template( { groups: this.collection.models } ) );
        this.$el.listview( 'refresh' );
        return this;
      }

    });

    return GroupListView;

  });
