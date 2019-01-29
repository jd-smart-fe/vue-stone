var fs = require('fs-extra');
var path = require('path');

require('shelljs/global')

env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')


const build = () => {
  return new Promise((resolve, reject) => {
    console.log(
      '  Tip:\n' +
      '  Built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    )

    var spinner = ora('building for production...')
    spinner.start()

    var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
    rm('-rf', assetsPath)
    mkdir('-p', assetsPath)
    cp('-R', 'static/*', assetsPath)

    webpack(webpackConfig, function (err, stats) {
      spinner.stop()
      if (err) {
        reject(false);
      }

      resolve(true);
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
    })
  });
}


// 主题色 start

process.on('message', async (val) => {

  const themePath = './theme';
  const vueStonePath = path.resolve(__dirname, '../')

  const cwd = val.path;

  const absolutePath = path.join(cwd, themePath);

  if (await replaceThemeColor(vueStonePath, absolutePath)) {
    const b = await build();
    if (b) {
      // 生成配置文件存错当前替换的对象
      const targetObj = require(absolutePath);
      await generateThemeConfigFile(targetObj.variables, vueStonePath);
    }
  } else {
    console.log('false');
  }
  process.exit();
});


// 判断有没有这个文件夹

const replaceThemeColor = async (vueStonePath, absolutePath) => {

  let sourceObj;
  console.log(vueStonePath);
  const vueStoneThemeConfigPath = path.join(vueStonePath, './config', 'theme.js');
  if (await fs.pathExists(vueStoneThemeConfigPath)) {
    sourceObj = require(vueStoneThemeConfigPath);
  } else {
    sourceObj = {variables: {}};
  }

  if (await fs.pathExists(absolutePath)) {
    try {
      const targetObj = require(absolutePath);
      const sourceVariables = sourceObj.variables || {};
      const targetVariables = targetObj.variables;
      const targetKeys = Object.keys(targetVariables);

      if (targetKeys.every(key => targetVariables[key] === sourceVariables[key])) {
        return false;
      }


      const parhArr = ['src', 'styles', 'default-theme', 'variables.css'];
      const vueStoneStylePath = path.resolve(vueStonePath, ...parhArr);
      let result = await fs.readFile(vueStoneStylePath ,'utf-8');

      targetKeys.forEach((key) => {
        const str = `${key}:.+?;`
        const regx = new RegExp(str, 'ig');
        result = result.replace(regx, `${key}: ${targetVariables[key]};`);
      });
      await fs.writeFile(vueStoneStylePath, result, 'utf-8');

      return true;
    } catch (error) {
      console.error(error);
    }

  }
}
const generateThemeConfigFile = async (obj, vueStonePath) => {
  const themeConfigPath = path.join(vueStonePath, 'config', 'theme.js');
  const moduleExprots = `module.exports = { variables };`
  const message = `const variables = ${JSON.stringify(obj)}; ${moduleExprots}`;
  await fs.writeFile(themeConfigPath,message, 'utf-8');
}

