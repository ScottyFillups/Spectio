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
    path: path.join(__dirname, './docs/viz'),
    publicPath: '/viz/'
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
      },
      {
        test: /\.(jp?eg|png|gif|wav|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader'
      }
    ]
  },
  plugins: plugins
}
