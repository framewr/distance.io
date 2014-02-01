'use strict';

exports.port = process.env.PORT || 80;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/drywall'
};
exports.companyName = 'Distance.io.';
exports.projectName = 'Distance.io';
exports.systemEmail = 'keith@rentersfriend.com';
exports.cryptoKey = 'k3yadfsf33c';
exports.requireAccountVerification = false;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: process.env.SMTP_FROM_ADDRESS || 'keith@rentersfriend.com'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'keith@rentersfriend.com',
    password: process.env.SMTP_PASSWORD || 'CoffeeBean999',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};
exports.oauth = {
  twitter: {
    key: process.env.TWITTER_OAUTH_KEY || '',
    secret: process.env.TWITTER_OAUTH_SECRET || ''
  },
  facebook: {
    key: process.env.FACEBOOK_OAUTH_KEY || '',
    secret: process.env.FACEBOOK_OAUTH_SECRET || ''
  },
  github: {
    key: process.env.GITHUB_OAUTH_KEY || '',
    secret: process.env.GITHUB_OAUTH_SECRET || ''
  }
};
