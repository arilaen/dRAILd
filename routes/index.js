
/*
 * GET home page.
 */



exports.index = function(req, res){
var d3 = require('d3')
  , topojson = require('topojson')
  , queue = require('queue-async')
  , jsdom = require('jsdom')
  , $ = require('jquery');


  res.render('index', { title: 'Express' , layout: false})
};

exports.about = function(req, res){
  res.render('about', {
    pageTitle: 'dRAILD | About' , layout: false
  });
};
//app.get('/', function(req, res){
//  res.render('index.jade', {
//    pageTitle: 'dRAILd | How Screwed Am I?'
//  });
//});

