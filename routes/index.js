
/*
 * GET home page.
 */



exports.index = function(req, res){
  res.render('index', { title: 'dRAILD | How Screwed Am I?' , layout: false})
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

