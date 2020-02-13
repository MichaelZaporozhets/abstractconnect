const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: false
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [

  ],
  stats: {
    warnings: false
  }
};
