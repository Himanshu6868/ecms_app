const fs = require('fs');
const path = require('path');
const appJson = require('./app.json');

const config = appJson.expo;

const androidGoogleServicesPath = './google-services.json';
const iosGoogleServicesPath = './GoogleService-Info.plist';

if (fs.existsSync(path.resolve(__dirname, androidGoogleServicesPath))) {
  config.android = {
    ...config.android,
    googleServicesFile: androidGoogleServicesPath,
  };
}

if (fs.existsSync(path.resolve(__dirname, iosGoogleServicesPath))) {
  config.ios = {
    ...config.ios,
    googleServicesFile: iosGoogleServicesPath,
  };
}

module.exports = {
  expo: config,
};
