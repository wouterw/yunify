var fs = require('fs'),
    https = require('https');

module.exports = function (app) {

  /**
    * POST /api/me/photobooth
    */
  app.post('/api/me/photobooth', function(req, res) {

    var message = 'Just took a picture from the Yunify photobooth!',
        base64Data = req.body.data.replace(/^data:image\/jpeg;base64,/, '');
        //imageData = new Buffer(base64Data, 'base64').toString('binary');

    // base64 uploading refused to work, so binary it is
    var enc = 'binary',
        isoDate = new Date().toISOString(),
        filepath = __dirname + '/public/data/photo_' + isoDate + '.jpeg',
        filename = 'photo_' + isoDate + '.jpeg';

    // extract file extention
    var re = /(?:\.([^.]+))?$/,
        ext = re.exec(filename)[1],
        authKey = req.session.auth.facebook.accessToken;

    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(filepath, dataBuffer, function(err) {
      console.log('fs:error', err);
    });

    // set up body for the request
    var outputBits = [];
    outputBits.push('------------0xKhTmLbOuNdArY\r\n');
    outputBits.push('Content-Disposition: form-data; name="access_token"\r\n\r\n');
    outputBits.push(authKey + '\r\n');
    outputBits.push('------------0xKhTmLbOuNdArY\r\n');
    outputBits.push('Content-Disposition: form-data; name="message"\r\n\r\n');
    outputBits.push(filename + '\r\n');
    outputBits.push('------------0xKhTmLbOuNdArY\r\n');
    outputBits.push('Content-Disposition: form-data; name="source"; filename="' + filepath + '"\r\n');
    outputBits.push('Content-Type: image/' + ext + '\r\n');
    outputBits.push('Content-Transfer-Encoding: ' + enc + '\r\n\r\n');
    var output0 = outputBits.join("");

    // This terminates the output body
    var outputBits2 = [];
    outputBits2.push('\r\n------------0xKhTmLbOuNdArY--\r\n');
    var output2 = outputBits2.join("");

    fs.readFile(filepath, function(err, imageData) {
      if (err) {
        console.log('500 Error reading the image form disk:', err);
      } else {
        // set up header for the request
        var options = {
          host: 'graph.facebook.com',
          port: 443,
          path: '/me/photos',
          method: 'POST',
          headers: {
            'Content-Type'   : 'multipart/form-data; boundary=----------0xKhTmLbOuNdArY',
            'Content-Length' : output0.length + imageData.length + output2.length
          }
        };

        // listen to response form the Facebook servers.
        var request = https.request(options, function(response) {
          response.setEncoding('utf8');
          response.on('data', function(chunk) {
            console.log(chunk);
          });
          response.on('end', function() {
            console.log('200 OK');
          });
          response.on('close', function() {
            console.log('500 Premature closing of the Facebook upload response.');
          });
        });

        // catch errors
        request.on('error', function(err) {
          console.log('500 Problem with uploading the picture to Facebook: ' + err);
        });

        // write/send the request.
        request.write(output0);
        request.write(imageData);
        request.write(output2);
        request.end();
      }
    });

  });

};
