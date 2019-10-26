const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const webpackbase = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const chalk = require('chalk');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const _version = new Date().getTime();

const webpackProdConfig = {
  devtool: 'inline-cheap-source-map',
  mode: 'production',
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano')
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name].${_version}.css`,
      chunkFilename: `css/[name].${_version}.css`,
    }),
    new ProgressBarPlugin(
      {
        format: chalk.blueBright(' build :bar :percent (:elapsed seconds) '),
        clear: false,
        summary: false,
        customSummary: res => {
          process.stderr.write(chalk.blueBright.bold(` build end use time ${res} \n`))
        }
      }
    ),
    // new ParallelUglifyPlugin({
    //   uglifyJS: {
    //     output: {
    //       beautify: false,
    //       comments: false
    //     },
    //     compress: {
    //       drop_console: true,
    //       collapse_vars: true,
    //       reduce_vars: true
    //     }
    //   }
    // })
  ]
}

module.exports = merge(webpackbase, webpackProdConfig)