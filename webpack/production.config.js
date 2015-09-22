const webpack = require('webpack');
const config = require('./../webpack.config');

config.plugins.push(new webpack.DefinePlugin({
  __DEVTOOLS__: false
}));

module.exports = config;
