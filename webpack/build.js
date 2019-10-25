const webpack = require('webpack') // 加载 webpack
const webpackConfig = require("./webpack.prod.js");
const chalk = require('chalk');
const ora = require('ora');

process.stderr.write(chalk.blueBright.bold(` build start ..... \n\n`));
webpack(webpackConfig, (err, state) => {});

