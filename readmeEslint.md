eslint

###基础
eslint
###babel-eslint来检测ES6代码
babel-eslint
###检测React的代码规则
eslint-plugin-react
###检测async/await functions，spread operator 等
eslint-plugin-babel
###扩展规则：我们不想每次都在.eslintrc中指定规则，已经有很多符合最佳实践的规则。其中之一就是Airbnb Style Guide，还需要install
eslint-config-airbnb
eslint-plugin-import
eslint-plugin-jsx-a11y
###另一个别人写好的配置,.eslintrc的extends改成“standard”，需要install
//eslint-config-standard
//eslint-plugin-standard
//eslint-plugin-promise//promise规则
###告诉webpack我们在构建时使用eslint
//eslint-loader
###
//eslint-import-resolver-webpack

//package.json中配置scripts,方便提交前检测"eslint位置 检测文件 --ext 文件后缀名"
"jslint": "./node_modules/eslint/bin/eslint.js components --ext .js,.jsx"

//rules:
0代码错误不提示、1代表警告提醒但不影响现有编译、2error会抛出错误。

###配置
    //配置.eslintrc检测规则
    {
      "extends": "airbnb",
      "plugins": [//插件
        "react",
        "import",
        "babel",
        "promise"
      ],
      "parser": "babel-eslint",//配置解析器
      "parserOptions": {//配置解析器选项
        "ecmaVersion": 6,
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "env": {//脚本目标的运行环境
        "browser": true,
        "node": true,
        "es6": true,
        "jquery": true,
        "commonjs": true,
        "phantomjs": true,
        "mocha": true
      },
      "rules": {//规则，只用插件：插件名/规则
        "strict": 0,
        "import/no-unresolved": [2, {"commonjs": true, "amd": true}],
        "react/no-did-mount-set-state": 0,
        "react/no-did-update-set-state": "error",
        "react/react-in-jsx-scope": "error",
        "react/jsx-uses-vars": [2],
        "react/jsx-uses-react": [2],
        "no-console": 0,
        "no-debugger": 1,
        "no-constant-condition": 2,
        "no-extra-boolean-cast": 2,
        "use-isnan": 2,
        "no-undef-init": 2,
        "camelcase": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-const-assign":2,
        "no-func-assign": 2,
        "no-else-return": 1,
        "no-obj-calls": 2,
        "valid-typeof": 2,
        "no-unused-vars": 1,
        "quotes": 0,
        "object-curly-spacing": 0,
        "block-spacing": 1,
        "semi": 1,
        "no-extra-semi": 1,
        "keyword-spacing": 1,
        "comma-dangle": 0,
        "array-bracket-spacing": 1,
        "space-before-function-paren": 0,
        "no-extra-bind": 1,
        "no-var": 2,
        "one-var": 0,
        "no-redeclare": 2,
        "no-new": 0,
        "no-new-func": 2,
        "no-new-wrappers": 0,
        "indent": 0,
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "arrow-body-style": 0,
        "no-global-assign": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-unsafe-negation": 0,
        "no-empty-function": ["error", { "allow": ["arrowFunctions", "constructors"] }],
        "radix": ["error", "as-needed"],
        "no-underscore-dangle": ["error", { "allow": ["object_", "_objects"] }],
        "no-param-reassign": ["error", { "props": false }],
        "no-alert": 0,
        "no-shadow": 0,
        "react/prop-types": 0,
        "global-require": 0,
        "max-len": ["error", 150],
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "linebreak-style": [0, "windows"],//Expected linebreaks to be 'LF' but found 'CRLF'
        "jsx-a11y/no-static-element-interactions": 0//Visible, non-interactive elements should not have mouse or keyboard event listeners

      },
      "settings": {//增加共享设置
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx"]
          }
        }
      },
      "globals": {//全局变量
        "gon": true,
        "TShe": true,
        "pingpp": true,
        "pingppPc": true,
        "_MEIQIA": true,
        "fabric": true
      }
    }

//配置.eslintignore
node_modules/
