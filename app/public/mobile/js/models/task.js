define(['backbone'],
  function( Backbone ) {

  var Task = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: function () {
      return {
        title: 'empty task...',
        completed: false,
        important: false
      };
    },

    initialize: function () {
      if (!this.get('title')) {
        this.set({ 'title': this.defaults.title });
      }
    },

    toggle: function () {
      yunify.events.trigger("task:complete", this.attributes);
    },

    destroy: function () {
      this.destroy();
    }

  });

  return Task;

});
