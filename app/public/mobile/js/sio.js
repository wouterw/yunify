define(function () {

  var tasksSocket = function () {

    var socket = io.connect( '/tasks' );

    socket.on('connect', function () {
      yunify.events.trigger( 'socket:connected' );
    });

    socket.on('disconnect', function () {
      yunify.events.trigger( 'socket:disconnected' );
    });

    socket.on('error', function ( err ) {
      yunify.events.trigger( 'socket:error', err );
    });

    socket.on('load', function ( data ) {
      yunify.events.trigger( 'socket:loaded', data );
    });

    socket.on('added', function ( data ) {
      yunify.events.trigger( 'socket:added', data );
    });

    socket.on('updated', function ( data ) {
      yunify.events.trigger( 'socket:updated', data );
    });

    socket.on('removed', function ( id ) {
      yunify.events.trigger( 'socket:removed', id );
    });

    yunify.events.on('task:init', function ( groupId ) {
      socket.emit( 'init', { "groupId": groupId } );
    });

    yunify.events.on('task:add', function ( task ) {
      socket.emit('add', {
        "title": task.title,
        "completed": task.completed,
        "important": task.important,
        "groupId": groupId
      });
    });

    yunify.events.on('task:update', function ( task ) {
      socket.emit('update', {
        "id": task.id,
        "title": task.title,
        "completed": task.completed,
        "important": task.important,
        "groupId": groupId
      });
    });

    yunify.events.on('task:complete', function ( task ) {
      socket.emit('complete', {
        "id": task.id,
        "groupId": groupId
      });
    });

    yunify.events.on('task:remove', function ( id ) {
      socket.emit('remove', {
        "id": id,
        "groupId": groupId
      });
    });

  };

  return tasksSocket;

});
