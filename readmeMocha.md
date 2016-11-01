#安装mocha
npm install mocha --save-dev
#安装断言库
npm install chai --save-dev

项目下新建test文件夹
新建test/.babelrc配置支持es6
package.json的script添加test命令，方便运行
  "test": "./node_modules/mocha/bin/mocha --compilers js:babel-register"
test下新建测试入口文件,会自动识别
  [moduleName].test.js
在项目下
  npm test:会测试test目录下所有模块
  npm test ./test/[moduleName].test.js：只测试对应文件
