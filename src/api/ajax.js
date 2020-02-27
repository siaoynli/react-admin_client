/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 16:01:52
 * @Description:封装axios库，统一处理请求异常
 */

import axios from 'axios';
import { message } from 'antd';

export default function(url, data = {}, type = 'get') {
  return new Promise((resolve, reject) => {
    let promise;
    switch (type.toLowerCase()) {
      case 'post':
        promise = axios.post(url, data);
        break;
      default:
        promise = axios.get(url, { params: data });
    }

    promise
      .then((response) => {
        const result = response.data;
        if (result.status) {
          message.error(result.msg);
        } else {
          //成功
          resolve(result);
        }
      })
      .catch((error) => {
        message.error('请求出错了:' + error.message);
      });
  });
}
