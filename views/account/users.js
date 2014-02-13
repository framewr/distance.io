'use strict';

exports.init = function(req, res){

    req.app.db.models.Transaction.find({account: req.user.account}).sort('-timestamp').exec(function(err, transactions) {
            if (err) console.log('Error #101: ' + err);
            req.app.set('view engine', 'ejs');
            res.render('account/users', {
                'menu': 'users',
                'transactions': transactions
            });
        });


/*
db.zips.aggregate([
...   {$match:{$or:[{state:'CA'},{state:'NY'}]}},
...   {$group:{'_id':{'city':'$city','state':'$state'},'total':{$sum:'$pop'}}},
...   {$match:{total:{$gt:25000}}},
...   {$group:{'_id':'not used you can put a monkey here','avg_pop':{$avg:'$total'}}}
... ]);
*/


};
