/*global require, yunify*/
define(['jquery', 'backbone', 'underscore'],
  function($, Backbone, _) {
    'use strict';

    var Router = Backbone.Router.extend({

      routes: {
        "": "root",

        "users": "users",
        "users/:id": "userDetails",

        "groups": "groups",
        "groups/:id": "groupDetails",

        "tasks": "tasks"
      },

      initialize: function () {
        $('.back').live('click', function(event) {
          window.history.back();
          return false;
        });
      },

      start: function () {
        Backbone.history.start();
      },

      root: function () {
        require(['views/myStatus'], function( MyStatusView ) {
          var myStatusView = new MyStatusView();
          myStatusView.render();
          yunify.utils.changePage( '#index-page', 'fade', false, false );
        });
      },

      users: function () {
        require(['models/users', 'views/userSearch'], function( Users, UserSearchView ) {
          var users = new Users();
          users.fetch({
            success: function ( data ) {
              var searchView = new UserSearchView( { collection: data } );
              searchView.render();
            }
          });
          yunify.utils.changePage( "#search-users-page", "slide", false, false );
        });
      },

      userDetails: function (id) {
        require(['models/user', 'views/userDetails'], function ( User, UserView ) {
          var user = new User( { id:id } );
          user.fetch({
            success: function ( data ) {
              var userView = new UserView( { model: data } );
              userView.render();
            }
          });
          yunify.utils.changePage("#user-details-page", "slide", false, false);
        });
      },

      groups: function () {
        require(['models/groups', 'views/groupSearch'], function ( Groups, GroupSearchView ) {
          var groups = new Groups();
          groups.fetch({
            success: function ( data ) {
              var searchView = new GroupSearchView({ collection: data });
              searchView.render();
            }
          });
          yunify.utils.changePage( "#search-groups-page", "slide", false, false );
        });
      },

      groupDetails: function (id) {
        require(['models/group', 'views/groupDetails'], function ( Group, GroupView ) {
          var group = new Group( { id: id } );
          group.fetch({
            success: function (data) {
              var groupView = new GroupView( { model: data } );
              groupView.render();
            }
          });
          yunify.utils.changePage("#group-details-page", "slide", false, false);
        });
      },

      tasks: function () {
        require(['models/me', 'models/tasks', 'views/taskList', 'sio'],
          function(Me, Tasks, TasksView) {
            var tasks = new Tasks(),
                me = new Me();

            me.fetch({
              success: function ( data ) {
                var tasksView = new TasksView({ me: data, collection: tasks });
              }
            });

          });
        yunify.utils.changePage("#tasks-page", "slide", false, false);
      }

    });

    return Router;

  });
