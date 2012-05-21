/* --------------------------------------------------------------------------
   AppRouter
   -------------------------------------------------------------------------- */

window.AppRouter = new (Backbone.Router.extend({

	routes:{
		'':'list',
		'list':'list',
		'users/:id':'userDetails'
	},

	initialize:function () {
		$('.back').live('click', function(event) {
			window.history.back();
			return false;
		});
		this.firstPage = true;
		this.searchResults = new UserCollection();
	},

	start: function() {
		Backbone.history.start({ pushState: true, root: '/mobile' });
	},

	list:function () {
		this.changePage(new UserListPage({model: this.searchResults}));
	},

	userDetails:function (id) {
		var user = new User({id:id});
		var self = this;
		user.fetch({
			success:function (data) {
				self.changePage(new UserView({model:data}));
			}
		});
	},

	changePage:function (page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		var transition = $.mobile.defaultPageTransition;
		// We don't want to slide the first page
		if (this.firstPage) {
				transition = 'fade';
				this.firstPage = false;
		}
		$.mobile.changePage($(page.el), {changeHash:false, transition: transition});
	}

}))();

/* --------------------------------------------------------------------------
   Kick off
   -------------------------------------------------------------------------- */

$(document).ready(function () {
	tpl.loadTemplates(['search-page', 'user-details', 'user-list-item'], function () {
		AppRouter.start();
	});
});
