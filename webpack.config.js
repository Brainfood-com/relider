var path = require('path')

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: 'static',
    reportFilename: 'bundle-report.html',
    generateStatsFile: true,
    statsFilename: 'bundle-stats.json',
  }),
]

const splittingPlugins = [
  new webpack.optimize.AggressiveMergingPlugin(),
]

const reducingPlugins = [
  new UglifyJsPlugin({
    extractComments: true,
    parallel: true,
    sourceMap: true,
    uglifyOptions: {
      compress: true,
      mangle: true,
    },
  }),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),

]

plugins.concat(splittingPlugins, reducingPlugins)

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].[id].[chunkhash].bundle.js',
    filename: '[name].[id].[hash].entry.js',
  },
  devtool: 'sourcemap',
  watchOptions: {
    poll: true,
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
    historyApiFallback: {
      index: '/index.html'
    },
    historyApiFallback: true,
    contentBase: 'dist',
    host: '0.0.0.0',
    port: 8080,
  },
}
