
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , d3 = require('d3')
  , topojson = require('topojson')
  , queue = require('queue-async')
  , $ = require('jquery');
  //, requirejs = require('requirejs');

var app = module.exports = express.createServer();

// Configuration
//requirejs.config({
//  nodeRequire: require
//});



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  //app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var port = process.env.PORT || 5000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
