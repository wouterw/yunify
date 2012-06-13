# Yunify <sup>v0.1.0-beta</sup>

This project consist of:

1. A Node.js + Express/Jade + Socket.io back-end, using MongoDb & Mongoose on it's data layer.

2. A desktop client application using Twitter Bootstrap, Knockout.js (MVVM).

3. A mobile application using JQuery Mobile, Backbone.js (MVC*), AMD for separation of modules,
Require.js for dependency management, the [Require.js]() Text plugin for template
externalisation and [Underscore](http://underscorejs.org/) for templating.

## Live version

A live version of our application is availible @ [http://deep-earth-8346.herokuapp.com/](http://deep-earth-8346.herokuapp.com/). For demonstration purposes only.

Big thanks to [Heroku](http://www.heroku.com/) & [MongoHQ](http://mongohq.com/) for their (free) cloud hosting. We're grateful! :)

## Installation and usage

Yunify needs [Node.js](http://nodejs.org/) to be installed on the system.

Check out a working copy of the Yunify source code with [Git](http://git-scm.com/):

~~~ bash
$ git clone https://github.com/wouterw/yunify.git yunify
$ cd yunify
~~~

Install dependecies using [npm](http://npmjs.org/):

~~~ bash
$ npm install
~~~

Run your local [MongoDB](http://www.mongodb.org/) instance:

~~~ bash
$ ./mongod
~~~

Finally run Yunify:

~~~ bash
$ node app/index.js
~~~

## Changelog

### <sup>v0.1.0</sup>

 * Initial release

## Authors

[Wouter Willaert](http://wouterwillaert.be/) - wouter.willaert@gmail.com - [@wouter_willaert](https://twitter.com/#!/wouter_willaert)

[Nielsen Ramon](http://nielsenramon.be/) - nielsenramon1@gmail.com - [@NielseRamon](https://twitter.com/#!/NielsenRamon)

## License

(The MIT License)

Copyright (c) 2012 Wouter Willaert &lt;wouter.willaert@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
