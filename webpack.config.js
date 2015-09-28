var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, './src/index')
    ],
    vendors: ['react', 'react-router']
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false
    }),
    new HtmlWebpackPlugin({
      title: 'Nest',
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.template.html'),
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader']
      },
      {
        test: /\.js$/,
        loaders: ['babel'], include: /src/
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
