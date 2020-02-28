/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-28 16:17:27
 * @Description:
 */

import React from 'react'
import { Button } from 'antd'

//空指向的链接 按钮
export default function LinkButton(props) {
  return (
    <Button type="link" {...props}>
      {props.children}
    </Button>
  )
}
