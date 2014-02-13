'use strict';

exports.init = function(req, res) {
    req.app.set('view engine', 'ejs');
    res.render('account/index');
};
