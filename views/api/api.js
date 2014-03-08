/*jslint node: true */
'use strict';

//dependencies
var async = require('async');
var geoip = require('geoip-lite');

exports.init = function(req, res, next) {

    /* get id
    try {
        var id = mongoose.Types.ObjectId.fromString(req.query.idsite);

    } catch (err) {
        res.statusCode = 400;
        res.send('Invalid account ' + req.query.idsite);
        return;
    }*/

    var lat,
        lon,
        ipinfo = geoip.lookup(req.ip),
        extraVariables;

    // compute lat/lng
    if (req.query.lon && req.query.lat) {
        lat = req.query.lat;
        lon = req.query.lon;
    } else if (ipinfo.ll) {
        lat = ipinfo.ll[0];
        lon = ipinfo.ll[1];
    }

    // create transaction
    var transaction = new req.app.db.models.Transaction({
        ip: req.ip,
        account: req.query.idsite,
        url: req.query.url,
        urlref: req.query.urlref,
        location: {
          type: 'Point',
          coordinates:  [parseFloat(lon), parseFloat(lat)]
        }
    });


    // Parse user and location variables
    try {
        extraVariables = JSON.parse(req.query.data);
        transaction.user = extraVariables.user;
        transaction.target = {
            type: 'Point',
            coordinates:  extraVariables.target
        };
    } catch (e) {
        console.error("Parsing error:", e);
    }

    async.parallel([findAccount], function(err) {
        transaction.save(function(err) {
            console.log('API SAVE ERROR:' + err);
            res.type('png');
            res.send();
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
                        coordinates: [lon, lat],
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
