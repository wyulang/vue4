let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./webpack.config.js');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: config.entry,
  output: {
    filename: 'bundle.js',
    path: config.outPath,
    publicPath: './',
    chunkFilename: '[name].vue.js'
  },
  resolve: {
    alias: {
      'lib': path.join(config.root, 'lib/'),
      '@css': path.join(config.root, 'src/css'),
      'vue$': 'vue/dist/vue.esm.js',
    },
    modules: ['node_modules', '*'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        config.vueLoader, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: { plugins: [require("autoprefixer")] }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        config.vueLoader, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: { plugins: [require("autoprefixer")] }
        }, {
          loader: "less-loader"
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: path.join(config.root, 'src/css/base.less'),
          }
        }
      ]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        transformAssetUrls: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        },
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-class-properties', 'syntax-dynamic-import']
        }
      },
      exclude: /node_modules/,
      // include: [process.cwd(), './src']
    },
    {
      test: /\.(gif|png|jpe?g|svg|ico)$/i,
      use: [{
        loader: 'url-loader'
      },
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,   // 处理字体
      use: {
        loader: 'file-loader'
      }
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor/vue-manifest.json')
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: config.root + '/src/index.html',
      title: 'wyulang',
      prod: true,
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './vendor/vue.library.js'),
    })
  ]
}