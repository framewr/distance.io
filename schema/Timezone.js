'use strict';

exports = module.exports = function(app, mongoose) {
    var timezoneSchema = new mongoose.Schema({
        timezone: String,
        shape: {
          'type': { type: String },
          coordinates: []
        }
    });

    //timezoneSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Timezone', timezoneSchema);
};