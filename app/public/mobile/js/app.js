/*!
 * Yunify - Backbone JQuery Mobile
 * http://codability.be
 * Copyright (c) 2012 Codability
 */

define(['backbone', 'routers/approuter', 'utils', 'vent'],
	function ( Backbone, AppRouter, utils, vent ) {

		$(function () {

			/*
			* Provide top-level namespaces for our javascript.
			*/

			window.yunify = {
				models: {},
				routers: {},
				utils: utils,
				events: vent
			};

			
			
			if (typeof Object.create !== 'function') {
				Object.create = function(o) {
					function F() {}
					F.prototype = o;
					return new F();
				};
			}
			
			/*
			* Start main router
			*/
			yunify.routers.main = new AppRouter();
			yunify.routers.main.start();

		});

	});
