var fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const manageProcessDotEnv = require('./utils/manageProcessDotEnv');

module.exports = (env, argv) => {
  const envs = manageProcessDotEnv(argv.nodeEnv);

  const plugins = []

  if (envs) {
    plugins.push(new webpack.DefinePlugin(envs));
  }

  const isDev = (argv.nodeEnv === 'development');

  return {
    "mode": argv.nodeEnv,
      "target": "node",
      "watch": isDev,
      watchOptions: {
        aggregateTimeout: 600,
        // poll: 1000,
        ignored: ['htdocs', 'node_modules']
      },
      externals: [nodeExternals()],
      "entry": "./server/index.js",
      "output": {
          "path": __dirname + '/htdocs',
          "filename": "server-build.js"
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
                    plugins: ["@babel/plugin-proposal-class-properties"]
                  }
                }
              },
              {
                test: /\.ejs$/, use: 'ejs-loader?variable=data'
              }
          ]
      },
      plugins: plugins,
      stats: "errors-only"
  }
}