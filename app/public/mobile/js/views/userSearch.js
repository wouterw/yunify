define(['jquery', 'backbone', 'underscore', 'views/userList'],
  function( $, Backbone, _, UserListView ) {

    var UserSearchView = Backbone.View.extend({

      el: $('div#search-users-page'),

      initialize: function () {},

      render: function () {
        this.userListView = new UserListView({ collection: this.collection });
        this.userListView.render();
        return this;
      },

      events: {
        "keyup .search-query": "search"
      },

      search: function () {
        var key = $( 'div#search-users-page .search-query' ).val();
        this.collection.findByName( key );
      }

    });

    return UserSearchView;

  });

