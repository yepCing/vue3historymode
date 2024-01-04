const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  devServer: {
    proxy: {
      "/test": {
        target: "https://api.twitter.com",
        pathRewrite: {
          "^/test": "",
        },
        changeOrigin: true,
      },
    },
  },
  indexPath: "home.html",
});
