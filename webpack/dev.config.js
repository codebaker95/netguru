const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const config = require('./../webpack.config');

config.plugins.push(new WebpackNotifierPlugin(), new webpack.DefinePlugin({
  __DEVTOOLS__: true
}));

module.exports = config;
