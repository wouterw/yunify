/* --------------------------------------------------------------------------
   AppRouter
   -------------------------------------------------------------------------- */

define(['jquery', 'backbone', 'underscore'],
	function($, Backbone, _) {

	var AppRouter = Backbone.Router.extend({

		routes:{

			"": "root",

			"users": "users",
			"users/:id": "userDetails",

			"groups": "groups",
			"groups/:id": "groupDetails",

			"me": "myProfile",
			"me/edit": "myProfileEdit",
			"me/awards": "myAwards",
			"me/awards/:id": "awardDetails",

			"roomies": "myRoomies",

			"tasks": "tasks",
			"tasks/:id": "taskDetails"

		},

		initialize: function () {
			$('.back').live('click', function(event) {
				window.history.back();
				return false;
			});
		},

		start: function ( pushState ) {
			if (pushState) {
				Backbone.history.start({pushState: true});
			} else {
				Backbone.history.start();
			}
		},

		root: function () {
			require(['views/myStatus'], function( MyStatusView ) {
				var myStatusView = new MyStatusView();
				myStatusView.render();
				yunify.utils.changePage( '#index-page', 'fade', false, false );
			});
		},

		users: function () {
			require(['collections/users', 'views/userSearch'], function( Users, UserSearchView ) {
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
			require(['collections/groups', 'views/groupSearch'], function ( Groups, GroupSearchView ) {
				var groups = new Groups();
				groups.fetch({
					success: function ( data ) {
						var searchView = new GroupSearchView( { collection: data } );
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

		myProfile: function () {

		},

		myProfileEdit: function () {

		},

		myRoomies: function () {

		},

		tasks: function () {
			require(['views/tasks'], function ( TasksView ) {
				var tasksView = new TasksView();
				taskView.render();
			});
			yunify.utils.changePage("#tasks-page", "slide", false, false);
		}

	});

	return AppRouter;

});
