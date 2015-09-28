var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index'),
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: './'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEVTOOLS__': false
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'Nest',
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.template.html'),
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader']
      },
      {
        test: /\.js$/,
        loaders: ['babel'], exclude: /node_modules/
      },
      {
        test: /\.(woff|ttf|svg|eot)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ]
}
