/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 16:10:29
 * @Description: 所有接口请求函数
 */

import ajax from './ajax';

const URL = '';

//登录
export const reqLogin = (username, password) =>
  ajax(URL + '/login', { username, password }, 'post');

//添加用户
export const reqAddUser = (user) =>
  ajax(URL + '/manage/user/add', user, 'post');
