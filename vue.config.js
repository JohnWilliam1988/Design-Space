const { defineConfig } = require("@vue/cli-service");
const { IgnorePlugin } = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    plugins: [
      new IgnorePlugin({
        resourceRegExp: /serialport/,
      }),
    ],
    electronBuilder: {
      nodeIntegration: true,
      externals: ["serialport"],
    },
  },
  devServer: {
    // open: true,
    proxy: {
      "/api": {
        // target: "http://flash.weather.com.cn/wmaps/xml/shenzhen.xml",
        target: "http://q.babymojo.site:5550",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
