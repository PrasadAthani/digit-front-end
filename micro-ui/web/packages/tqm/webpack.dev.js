const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJson = require('./package.json');

module.exports = () => {
  const devConfig = {
    mode: 'development',
    output: {
      publicPath: 'https://localhost:8089/',
      filename: '[name].[contenthash].js',
    },
    devServer: {
      port: 8089,
      proxy: [
        {
          context: () => true,
          target: 'https://staging.digit.org',
          secure: true,
          changeOrigin: true,
          bypass: function (req, res, proxyOptions) {
            if (req.headers.accept.indexOf('html') !== -1) {
              console.log('Skipping proxy for browser request.');
              return '/index.html';
            }
          },
          headers: {
            Connection: 'keep-alive',
          },
        },
      ],
      historyApiFallback: {
        index: '/',
      },
      server: 'https', //Enable HTTPS
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'tqm',
        filename: 'remoteEntry.js',
        exposes: {
          './TQMModule': './src/SingleSpaEntry',
        },
        shared:packageJson.dependencies,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };

  return merge(commonConfig, devConfig);
};
