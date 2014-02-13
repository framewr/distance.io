'use strict';

exports = module.exports = function(app, mongoose) {
    var transactionSchema = new mongoose.Schema({
        ip: String,
        account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', index: true },
        url: String,
        urlref: String,
        timezone: String,
        timestamp: { type: Date, default: Date.now },
        location: {
          //index: { type: '2dsphere' },
          type: { type: String },
          coordinates: []
        }
    });

    transactionSchema.virtual('lat').get(function () {
        return this.location.coordinates[1];
    });

    transactionSchema.virtual('lon').get(function () {
        return this.location.coordinates[0];
    });

    /*transactionSchema.pre('save', function (next) {
      var value = this.get('location');

      if (value === null) return next();
      if (value === undefined) return next();
      if (!Array.isArray(value)) return next(new Error('Coordinates must be an array'));
      if (value.length === 0) return this.set(path, undefined);
      if (value.length !== 2) return next(new Error('Coordinates should be of length 2'))

      next();
    });*/


    //transactionSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Transaction', transactionSchema);
};