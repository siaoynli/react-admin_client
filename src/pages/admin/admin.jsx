/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 10:19:24
 * @Description:
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
export class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to="/login"></Redirect>;
    }

    return <div>欢迎您:{user.username}</div>;
  }
}

export default Admin;
