var fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

const manageProcessDotEnv = require('./utils/manageProcessDotEnv');

module.exports = (env, argv) => {
  const envs = manageProcessDotEnv(argv.nodeEnv);

  const plugins = [];

  if (envs) {
    plugins.push(
      new webpack.DefinePlugin(envs),
      new CopyPlugin({
        patterns: [
          { from: 'client/root', to: '' }
        ]
      })
      );
  }

  const isDev = (argv.nodeEnv === 'development');

  return {
      "mode": argv.nodeEnv,
      "target": "web",
      "entry": ["./client/index.js"],
      "watch": isDev,
      watchOptions: {
        aggregateTimeout: 600,
        // poll: 1000,
        ignored: ['htdocs', 'node_modules']
      },
      "output": {
          "path": __dirname + '/htdocs/public',
          "filename": "bundle.js",
          "publicPath": "/htdocs/public"
      },
      "devtool": `${isDev ? "" : "inline-"}source-map`,
      "module": {
          "rules": [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"],
                    plugins: ["@babel/plugin-proposal-class-properties"],
                  }
                }
              }
          ]
      },
      stats: "errors-only",
      plugins: plugins
  }
}