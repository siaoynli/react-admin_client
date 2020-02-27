/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 09:54:03
 * @Description:
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

//针对antd实现按需打包
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css'
    style: true
  }),

  //使用less-loader 对less源码中的变量进行重新赋值
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  })
);
