'use strict';

exports.init = function(req, res){

    var trackingScript = "\
<!-- Distance.io -->|||\
<script type='text/javascript' src='http://distance.io/js/distance.js'></script>|||\
<script>var distanceTracker = Distance.getTracker(null, '" + req.user.account + "', {|||\
            'user': '<<USERNAME or ID>>',  // OPTIONAL |||\
            'target': [<<LONGITUDE>>, <<LATITUDE>>]  // OPTIONAL |||\
        });|||\
distanceTracker.trackPageView();</script>|||\
<!-- End Distance.io Tracking Code -->";

    req.app.set('view engine', 'ejs');
    res.render('account/setup', {
        'menu': 'setup',
        'user': req.user,
        'trackingScript': trackingScript
    });


};
