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

#配置
    // 配置webpack.config.js
    const postcssImport = require('postcss-import');
    const cssnext = require('postcss-cssnext');
    const stylelint = require('stylelint');
    const postcssReporter = require('postcss-reporter');
    //在css的css-loader之前先通过postcss-loader加载
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }
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

    //配置stylelint.config.js
    module.exports = {
      extends: "stylelint-config-standard",
      rules: {
        "block-no-empty": true,
        "color-hex-case": null,
        "color-hex-length": null,
        "color-no-invalid-hex": true,
        "length-zero-no-unit": true,
        "root-no-standard-properties": true,
        "comment-empty-line-before": ["always", {
          "except": ["first-nested"],
          "ignore": ["stylelint-commands", "between-comments"],
        }],
        "declaration-colon-space-after": "always",
        "max-empty-lines": 2,
        "rule-nested-empty-line-before": ["always", {
          "except": ["first-nested"],
          "ignore": ["after-comment"],
        }],
        "unit-whitelist": ["em", "rem", "%", "s", "ms", "px", "deg", "vw", "vh", "dpi", "dppx"],
        "selector-combinator-space-after": null
      }
    };

//配置.stylelintignore
node_modules/
