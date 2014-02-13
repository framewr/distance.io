'use strict';

exports = module.exports = function(app, mongoose) {

  require('./schema/Timezone')(app, mongoose);
  require('./schema/Transaction')(app, mongoose);

  //then regular docs
  require('./schema/User')(app, mongoose);
  require('./schema/Account')(app, mongoose);

  mongoose.set('debug', true);
};
