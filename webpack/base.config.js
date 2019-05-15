const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin");
// extract-text-webpack-plugin does'nt work with webpack 4
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: process.env.NODE_ENV === "production" ? 'images/[name].[contenthash:8].[ext]' : 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@images': path.resolve(__dirname, '../public/images'),
      '@css': path.resolve(__dirname, '../public/css'),
      '@': path.resolve(__dirname, '../src')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src')
    ],
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === "production" ? "css/[name].[contenthash:8].css" : "css/[name].css"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    compress: true
  }
};