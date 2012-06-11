define(['jquery'], function($) {
  'use strict';

  /**
   * A utility class for working with Jquery Mobile.
   *
   * @class Utils
   * @constructor
   */
  var Utils = {};

  /**
   * Changes the current Page.
   *
   * @method changePage
   * @param {String} viewID
   * @param {String} effect
   * @param {Boolean} direction
   * @param {Boolean} updateHash
   */
  Utils.prototype.changePage = function(viewID, effect, direction, updateHash) {
    $(viewID).page();
    $.mobile.changePage(viewID, { transition: effect, reverse: direction, changeHash: updateHash });
  };

  /**
   * Changes the title for current Page.
   *
   * @method switchTitle
   * @param {String} title
   */
  Utils.prototype.switchTitle = function(title) {
    $('.ui-title').text(title || '');
  };

  return Utils;

});
