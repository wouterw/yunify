/* --------------------------------------------------------------------------
   Configure Require.js
   -------------------------------------------------------------------------- */

require.config({

	paths: {

		'backbone': '/common/js/lib/backbone/backbone.amd.min',
		'underscore': '/common/js/lib/underscore/underscore.amd.min',
		'text': '/common/js/lib/require/text.min',
		'jquery': '/common/js/lib/jquery/jquery-1.7.2.min',
		'json2': '/common/js/lib/json2',
		'jquerymobile': '/mobile/js/lib/jquerymobile/jquery.mobile-1.1.0.min',

		'models': '/mobile/js/models',
		'collections': '/mobile/js/collections',
		'views': '/mobile/js/views',
		'routers': '/mobile/js/routers',
		'tpl': '/mobile/tpl'

	}

});

/* --------------------------------------------------------------------------
   Configure JQuery Mobile & Load our main app file
   -------------------------------------------------------------------------- */

require(['require', 'underscore', 'backbone', 'jquery'],
	function (require, _, Backbone, $) {

	require(['require', 'jquerymobile', 'json2', 'app'],
		function (require) {

		$.mobile.ajaxEnabled = false;
		$.mobile.linkBindingEnabled = false;
		$.mobile.hashListeningEnabled = false;
		$.mobile.pushStateEnabled = false;

	});

} );
