const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const env = require('yargs').argv.env

let plugins = []
let publicPath

if (env === 'build') {
  publicPath = '/spectio/viz/'
  plugins.push(new UglifyJsPlugin({minimize: true}))
} else {
  publicPath = '/viz/'
}

module.exports = {
  entry: {
    'vertical-line': './src/vertical-line/index.js',
    'sphere': './src/sphere/index.js'
  },
  output: {
    filename: `[name].bundle.min.js`,
    path: path.join(__dirname, './docs/viz'),
    publicPath: publicPath
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
