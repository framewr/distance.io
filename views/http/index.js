'use strict';

exports.http404 = function(req, res){
  res.status(404);
  if (req.xhr) {
    res.send({ error: 'Resource not found.' });
  }
  else {
    req.app.set('view engine', 'jade');
    res.render('http/404');
  }
};

exports.http500 = function(err, req, res, next){
  res.status(500);
  if (req.xhr) {
    res.send({ error: 'Something went wrong.' });
  }
  else {
    console.log(err.stack);
    req.app.set('view engine', 'jade');
    res.render('http/500');
  }
};
