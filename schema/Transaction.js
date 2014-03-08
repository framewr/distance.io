'use strict';

exports = module.exports = function(app, mongoose) {
    var transactionSchema = new mongoose.Schema({
        ip: String,
        account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
        url: String,
        urlref: String,
        timezone: String,
        timestamp: { type: Date, default: Date.now },
        user: String,
        locationType: { type: String, default: 'IP' },
        location: {
          type: { type: String },
          coordinates: []
        },
        target: {
          type: { type: String },
          coordinates: []
        }
    });


    transactionSchema.index({'location': '2dsphere'});
    transactionSchema.index({'target': '2dsphere'});
    transactionSchema.index({'account': 1});

    var locationTypes = ['IP', 'GEO'];

    transactionSchema.virtual('lat').get(function () {
        return this.location.coordinates[1];
    });

    transactionSchema.virtual('lon').get(function () {
        return this.location.coordinates[0];
    });





    app.db.model('Transaction', transactionSchema);
};