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
        appId: "Sog'lom avlod",
        productName: "Sog'lom avlod",
        win: {
          target: ["nsis"],
          icon: "build/icon.ico"
        },
        nsis: {
          oneClick: false,
          installerIcon: "build/icon.ico",
          uninstallerIcon: "build/icon.ico",
          uninstallDisplayName: "Sog'lom avlod Unistaller",
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
