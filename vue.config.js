const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js" // 'vue/dist/vue.common.js' for webpack 1
      }
    }
  },

  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "Best Med",
        productName: "Best Med",
        win: {
          target: ["nsis"],
          icon: "build/icos.ico"
        },
        nsis: {
          oneClick: false,
          installerIcon: "build/icos.ico",
          uninstallerIcon: "build/icos.ico",
          uninstallDisplayName: "Best Med Unistaller",
          license: "license.md",
          allowToChangeInstallationDirectory: true
        }
      }
    }
  },

  chainWebpack: config => {
    config.module.rules.delete("eslint");
  },

  transpileDependencies: ["vuetify"]
};
