const webpackDevConfig = require("./webpack/dev.config")
const webpackProdConfig = require("./webpack/prod.config")

const NODE_ENV = process.env.NODE_ENV || "development"
let webpackConfig = webpackDevConfig

if (NODE_ENV === "production") {
  webpackConfig = webpackProdConfig
}

module.exports = webpackConfig