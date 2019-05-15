const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
// extract-text-webpack-plugin does'nt work with webpack 4
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpackBaseConfig = require('./base.config.js')

module.exports = merge(webpackBaseConfig, {
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      // new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      })
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    }
  },
  performance: {
    assetFilter: fileName => !/(\.map$)|(^(main\.|favicon\.))/.test(fileName)
  }
})