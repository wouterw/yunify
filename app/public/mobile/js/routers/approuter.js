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
			"users/:id/awards": "userAwards",

			"groups": "groups",
			"groups/:id": "groupDetails",
			"groups/:id/members": "groupMembers",

			"me": "myProfile",
			"me/edit": "myProfileEdit",
			"me/awards": "myAwards",
			"me/awards/:id": "awardDetails",

			"roomies": "myRoomies",

			"tasks": "taskBrowser",
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
			yunify.utils.changePage('#index-page', 'slide', false, false);
		},

		users: function () {
			require(['collections/users', 'views/userList'], function(Users, UserListView) {
				var users = new Users();
				users.fetch({
					success: function (data) {
						var listView = new UserListView({collection: data});
						listView.render();
					}
				});
				yunify.utils.changePage("#search-users-page", "slide", false, false);
			});
		},

		userDetails: function (id) {
			require(['models/user', 'views/userDetails'], function(User, UserView) {
				var user = new User({id:id});
				user.fetch({
					success: function (data) {
						var userView = new UserView({model: data});
						userView.render();
					}
				});
				yunify.utils.changePage("#user-details-page", "slide", false, false);
			});
		},

		userAwards: function (id) {},

		groups: function () {
			var groups = new GroupCollection();
			groups.fetch();
			this.changePage(new GroupListPage({model: groups}));
		},

		groupDetails: function (id) {
			var group = new Group({id:id});
			var self = this;
			group.fetch({
				success: function (data) {
					self.changePage(new GroupView({model:data}));
				}
			});
		},

		groupMembers: function (id) {}

	});

	return AppRouter;

});
