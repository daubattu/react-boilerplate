const merge = require('webpack-merge')
const webpackBaseConfig = require('./base.config.js')

module.exports = merge(webpackBaseConfig, {
  devtool: 'eval-source-map',
  // Don't use hashes in dev mode for better performance
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    hints: false
  }
})