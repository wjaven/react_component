const webpack = require('webpack');
const PATH = require('./build_path');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');

module.exports = {
  context: PATH.ROOT_PATH,
  entry: {
    index: './index.js'
  },
  output: {
    path: PATH.ASSET_PATH,
    filename: '[name]_bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test:/\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=10240name=[hash:8].[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    postcssImport({
      addDependencyTo: webpack
    }),
    cssnext({
      autoprefixer: {
        browers: 'ie >= 9, ...'
      }
    }),
    stylelint({
      config: require('./stylelint.config.js'),
      failOnError: true
    }),
    postcssReporter({
      clearMessages: true
    })
  ]
}
