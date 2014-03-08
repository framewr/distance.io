'use strict';

exports.init = function(req, res){

    var query = {account: req.user.account};

    if (req.query.locationType) {
        query['locationType'] = req.query.locationType;
    }

    if (req.query.user) {
        query['user'] = req.query.user;
    }

    if (req.query.ip) {
        query['ip'] = req.query.ip;
    }

    req.app.db.models.Transaction.find(query
            ).sort('-timestamp').limit(200).exec(function(err, transactions) {
        if (err) console.log('Error #101: ' + err);
        req.app.set('view engine', 'ejs');
        res.render('account/targets', {
            'menu': 'targets',
            'transactions': transactions,
            'user': req.user
        });
    });


};
