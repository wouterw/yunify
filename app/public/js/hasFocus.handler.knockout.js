(function() {
	'use strict';

	// wrapper to hasfocus that also selects text and applies focus async
	ko.bindingHandlers.selectAndFocus = {
		init: function( element, valueAccessor, allBindingsAccessor ) {
			ko.bindingHandlers.hasfocus.init( element, valueAccessor, allBindingsAccessor );
			ko.utils.registerEventHandler( element, 'focus', function() {
				element.select();
			} );
		},
		update: function( element, valueAccessor ) {
			ko.utils.unwrapObservable( valueAccessor() ); // for dependency
			// ensure that element is visible before trying to focus
			setTimeout(function() {
				ko.bindingHandlers.hasfocus.update( element, valueAccessor );
			}, 0 );
		}
	};

})();
