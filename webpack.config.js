const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const env = require('yargs').argv.env

let plugins = []
let fileExt

if (env === 'build') {
  fileExt = 'min.js'
  plugins.push(new UglifyJsPlugin({minimize: true}))
} else {
  fileExt = 'js'
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: `bundle.${fileExt}`,
    path: path.join(__dirname, './docs/js'),
    publicPath: '/js/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader'
      }
    ]
  },
  plugins: plugins
}
