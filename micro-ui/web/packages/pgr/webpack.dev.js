require('dotenv').config();
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const packageJson = require("./package.json");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ExternalRemotesPlugin = require('external-remotes-plugin');
module.exports = () => {
  const devConfig = {
    mode: "development",
    output: {
      publicPath: "https://localhost:8087/",
      filename: "[name].[contenthash].js",
    },
    devServer: {
      port: 8087,
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
      new ExternalRemotesPlugin(),
      new ModuleFederationPlugin({
        name: "pgr",
        filename: "remoteEntry.js",
        exposes: {
          "./PGRModule": "./src/SingleSpaEntry",
        },
        shared: {
          ...packageJson.dependencies,
          react: { singleton: true }, // React will be shared as a singleton
          'react-dom': { singleton: true }, // ReactDOM will be shared as a singleton
          'react-query': { singleton: true },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin(
        false
          ? {
              filename: 'static/css/[name].[contenthash].css',
              chunkFilename: 'static/css/[name].[contenthash].css',
            }
          : {}
      ),
    ].filter(Boolean),
    optimization: {
      minimize: false, //true if prod
      minimizer: ['...', new CssMinimizerPlugin()],
    },
  };

  return merge(commonConfig, devConfig);
};
