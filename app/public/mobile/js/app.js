/*!
 * Yunify - Backbone JQuery Mobile
 * http://codability.be
 * Copyright (c) 2012 Codability
 */

define(['backbone', 'routers/approuter', 'utils'],
	function (Backbone, AppRouter, utils) {

		$(function () {

			/*
			* Provide top-level namespaces for our javascript.
			*/

			window.yunify = {
				models: {},
				routers: {},
				utils: utils
			};

			/*
			* Start main router
			*/

			yunify.routers.main = new AppRouter();
			yunify.routers.main.start();

		});

	});
