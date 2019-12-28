const path = require("path")

module.exports = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack: config => {
    config.resolve.alias["~"] = path.resolve(__dirname)
    return config
  },
}
