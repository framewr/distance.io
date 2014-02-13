/*jslint node: true */
'use strict';

//dependencies
var async = require('async');

exports.init = function(req, res, next) {

    /* get id
    try {
        var id = mongoose.Types.ObjectId.fromString(req.query.idsite);

    } catch (err) {
        res.statusCode = 400;
        res.send('Invalid account ' + req.query.idsite);
        return;
    }*/

    // create transaction
    var transaction = new req.app.db.models.Transaction({
        ip: req.ip,
        account: req.query.idsite,
        url: req.query.url,
        urlref: req.query.urlref,
        location: {
          type: 'Point',
          coordinates:  [parseFloat(req.query.lon), parseFloat(req.query.lat)]
        }
    });

    async.parallel([findTimezone, findAccount], function(err) {
        if (err) throw err;

        transaction.save(function(err, thor) {
            console.log(err);
            console.log(thor);
            if (err) return 'ERROR' + console.error(err);
            res.type('text/plain');
            res.send('OK');
        });
    });


    // find timezone
    function findTimezone(callback) {
        // find timezone
        req.app.db.models.Timezone.findOne({
            shape: {
                $geoIntersects: {
                    $geometry: {
                        type: "Point",
                        coordinates: [req.query.lon, req.query.lat],
                    }
                }
            }
        }).exec(function(err, timezone) {
            if (err) throw err;
            transaction.timezone = timezone.timezone;
            callback();
        });
    }

    // find account
    function findAccount(callback) {
        // find timezone
        req.app.db.models.Account.findById(req.query.idsite).exec(function(err, timezone) {
            if (err) throw err;
            transaction.timezone = timezone.timezone;
            callback();
        });
    }
};
