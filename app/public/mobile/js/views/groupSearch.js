define(['jquery', 'backbone', 'underscore', 'views/groupList'],
  function( $, Backbone, _, GroupListView) {

    var GroupSearchView = Backbone.View.extend({

      el: $('div#search-groups-page'),

      initialize: function () {},

      render: function () {
        this.groupListView = new GroupListView( { collection: this.collection } );
        this.groupListView.render();
        return this;
      },

      events: {
        "keyup .search-query": "search"
      },

      search: function () {
        var key = $('div#search-groups-page .search-query').val();
        this.collection.findByName(key);
      }

    });

    return GroupSearchView;

  });
