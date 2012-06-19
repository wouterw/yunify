define(function () {

  var socket = io.connect( '/tasks' );

  socket.on('connect', function () {
    console.log('socket:connected');
    yunify.events.trigger('socket:connected');
  });

  socket.on('disconnect', function () {
    console.log('socket:disconnected');
    yunify.events.trigger('socket:disconnected');
  });

  socket.on('error', function ( err ) {
    console.log('socket:error', err);
    yunify.events.trigger('socket:error', err);
  });

  socket.on('load', function ( data ) {
    console.log('task:loaded', data);
    yunify.events.trigger('task:loaded', data);
  });

  socket.on('added', function ( data ) {
    console.log('task:added', data);
    yunify.events.trigger('task:added', data);
  });

  socket.on('updated', function ( data ) {
    console.log('task:updated', data);
    yunify.events.trigger('task:updated', data);
  });

  socket.on('removed', function ( id ) {
    console.log('task:removed', id);
    yunify.events.trigger('task:removed', id);
  });

  yunify.events.on('task:init', function ( groupId ) {
    console.log('task:init', groupId);
    socket.emit( 'init', { "groupId": groupId } );
  });

  yunify.events.on('task:add', function ( task ) {
    console.log('task:add', task);
    socket.emit('add', {
      "title": task.title,
      "completed": task.completed,
      "important": task.important,
      "groupId": task.group
    });
  });

  yunify.events.on('task:complete', function (task) {
    console.log('task:complete', task);
    socket.emit('complete', {
      "id": task._id,
      "groupId": task.group
    });
  });

});
