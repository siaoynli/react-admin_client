/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 16:10:29
 * @Description: 所有接口请求函数
 */

import ajax from './ajax'
import jsonp from 'jsonp'
import {
  message
} from "antd"

const URL = '';

//登录
export const reqLogin = (username, password) =>
  ajax(URL + '/login', {
    username,
    password
  }, 'post');

//添加用户
export const reqAddUser = (user) =>
  ajax(URL + '/manage/user/add', user, 'post');

//获取分类列表
export const reqCategories = (parentId = 0) =>
  ajax(URL + '/manage/category/list', {
    parentId
  });

//添加分类
export const reqAddCategory = (category) =>
  ajax(URL + '/manage/category/add', category, "post");

//更新分类
export const reqUpdateCategory = (category) =>
  ajax(URL + '/manage/category/update', category, "post");




export const reqWeather = (city = "杭州") => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === "success") {
        const {
          dayPictureUrl,
          weather
        } = data.results[0].weather_data[0]

        resolve({
          dayPictureUrl,
          weather
        })
      } else {
        message.error("天气请求错误");
      }

    })
  })
}