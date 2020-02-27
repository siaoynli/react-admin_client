/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 17:18:03
 * @Description:localStorage存储
 */

import store from 'store';

const KEY = 'user_key';

export default {
  saveUser(user) {
    // localStorage.setItem(KEY, JSON.stringify(user));
    store.set(KEY, user);
  },

  getUser() {
    //return JSON.parse(localStorage.getItem(KEY) || '{}');
    return store.get(KEY);
  },

  deleteUser() {
    //localStorage.removeItem(KEY);
    store.remove(KEY);
  }
};
