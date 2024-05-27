const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const packageJson = require("./package.json");

module.exports = () => {
  const devConfig = {
    mode: "development",
    output: {
      publicPath: "https://localhost:8091/",
      filename: "[name].[contenthash].js",
    },
    devServer: {
      port: 8091,
      proxy: [
        {
          context: () => true,
          target: 'https://unified-dev.digit.org',
          secure: true,
          changeOrigin: true,
          bypass: function (req, res, proxyOptions){
            if(req.headers.accept.indexOf('html') !== -1){
              console.log('Skipping proxy for browser request.');
              return '/index.html';
            }
          },
          headers:{
            "Connection" : "keep-alive"
          },
        },
      
      ],
      historyApiFallback: {
        index: "/",
      },
      server:"https", //Enable HTTPS
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "engagement",
        filename: "remoteEntry.js",
        exposes: {
          "./EngagementModule": "./src/SingleSpaEntry",
        },
        shared: {
          '@egovernments/digit-ui-react-components': {
            singleton: true,
            requiredVersion: packageJson.dependencies['@egovernments/digit-ui-react-components'],
          },
          ...packageJson.dependencies,
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };

  return merge(commonConfig, devConfig);
};
