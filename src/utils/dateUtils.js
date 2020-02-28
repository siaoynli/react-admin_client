/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-28 15:30:51
 * @Description: 
 */

export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
        ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}