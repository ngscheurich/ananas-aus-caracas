const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: { sourceMap: 'inline' } },
          ],
        }),
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([{ from: 'images/*', to: 'dist' }]),
    new HtmlWebpackPlugin(),
  ],

  devtool: 'inline-source-map',

  output: {
    filename: 'bundle.js',
  },
};
