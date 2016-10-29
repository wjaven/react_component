module.exports = {
  entry: './index.js',
  output: {
    filename:'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test:/\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=10240name=[hash:8].[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['','.js']
  }
}
