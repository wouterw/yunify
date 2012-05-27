/* --------------------------------------------------------------------------
   utils module
   -------------------------------------------------------------------------- */

define(['jquery'], function ( $ ) {
	"use strict";

	var utils = {};

	utils.changePage = function ( viewID, effect, direction, updateHash ) {
		$( viewID ).page();
		$.mobile.changePage( viewID, { transition: effect, reverse: direction, changeHash: updateHash } );
	};

	utils.switchTitle = function ( title ) {
		$('.ui-title').text( title || '' );
	};

	return utils;
});
