module.exports = function (context, options) {
  console.log("load custom-webpack-plugin")
  return {
    name: "cusotm-webpack-plugin",
    configureWebpack(config, isServer, utils) {
      return {
        mergeStrategy: { "devServer.proxy": "replace" },
        devServer: {
          proxy: {
            "/api/v1/canteen/config/datasource/list": {
              target: "https://server.ceobecanteen.top/",
              secure: false,
              changeOrigin: true,
              logLevel: "debug",
            },
          },
        },
      }
    },
  }
}
