postcss

#基础加载器
postcss-loader
# cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
$ npm install postcss-cssnext --save-dev
# 浏览器兼容补全
$ npm install autoprefixer --save-dev
# 类似scss的语法，实际上如果只是想用嵌套的话有cssnext就够了
//$ npm install precss --save-dev
# 在@import css文件的时候让webpack监听并编译
$ npm install postcss-import --save-dev
# 编译时语法检查,编译时默认检查所有依赖文件(.stylelintignore)中配置无需检查的路径
$ npm install stylelint --save-dev
#在配置文件(stylelint.config.js)中指明我们的检测语法扩展自该插件
$ npm install stylelint-config-standard --save-dev
#美化输出
$ npm install postcss-reporter --save-dev


// 配置webpack.config.js
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');
// ...
postcss: [
  postcssImport({
    addDependencyTo: webpack
  }),
  cssnext({
    autoprefixer: {
      browers: 'ie >= 10, ...'
    }
  }),
  stylelint({
    config: require('./stylelint.config.js'),
    failOnError: true
  }),
  postcssReporter({
    clearMessages: true
  })
]
