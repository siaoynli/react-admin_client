/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 09:06:05
 * @Description:项目入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';

import App from './App';

import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

const user = storageUtils.getUser();

memoryUtils.user = user;

ReactDOM.render(<App />, document.getElementById('root'));
