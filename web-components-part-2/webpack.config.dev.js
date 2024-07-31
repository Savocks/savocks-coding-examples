const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // Exclude CSS files in 'components' directory from this rule
        exclude: path.resolve(__dirname, 'src/components'),
      },
      {
        test: /\.css$/,
        use: ['raw-loader'],
        // Only apply this rule to CSS files in 'components' directory
        include: path.resolve(__dirname, 'src/components'),
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,  // if the file is greater than 10kb, file-loader will be used
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new SpriteLoaderPlugin(),
  ]
});
