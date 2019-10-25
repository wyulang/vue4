'use strict'

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let config = require('./webpack.config.js');

let webpackDll = {
  mode: 'production',
  entry: {
    vue: [
      'vue/dist/vue.esm.js',
      'vuex',
      'axios',
      'vue-router'
    ]
  },
  output: {
    path: path.join(__dirname, '../webpack/vendor/'), // 生成的文件存放路径
    filename: '[name].library.js', // 生成的文件名字(默认为dll.vendor.[hash].js)
    library: '[name]_library' // 生成文件的映射关系，与下面DllPlugin中配置对应
  },
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../webpack/vendor/[name]-manifest.json'),
      name: '[name]_library', // 与上面output中配置对应
      context: __dirname // 上下文环境路径（必填，为了与DllReferencePlugin存在与同一上下文中）
    })
  ]
}
module.exports = webpackDll;