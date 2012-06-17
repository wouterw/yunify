require.config({
  paths: {
    'backbone': '/common/js/lib/backbone/backbone',
    'underscore': '/common/js/lib/underscore/underscore',
    'text': '/common/js/lib/require/require-text-2.0.0',
    'jquery': '/common/js/lib/jquery/jquery-1.7.2.min',
    'json2': '/common/js/lib/json2',
    'jquerymobile': '/mobile/js/libs/jquery.mobile-1.1.0',
    'models': '/mobile/js/models',
    'views': '/mobile/js/views',
    'tpl': '/mobile/js/templates'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['jquery'], function($) {
  $(document).one('mobileinit', function() {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
  });
  require(['jquerymobile', 'app']);
});
