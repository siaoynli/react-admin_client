/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 10:17:55
 * @Description:
 */

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './login.less'
import logo from '../../assets/images/logo.png'

import { Form, Icon, Input, Button } from 'antd'
import { reqLogin } from '../../api'
import { message } from 'antd'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

//登录路由组件
export class Login extends Component {
  componentDidMount() {
    // To disable submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    //阻止默认表单提交
    e.preventDefault()
    //对表单所有字段进行验证
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      const { username, password } = values

      // 使用await，所在函数一定要用async
      const result = await reqLogin(username, password)

      //用户数据保存到localstorage 和内存
      storageUtils.saveUser(result.data)
      memoryUtils.user = result.data

      message.success('登录成功!')
      //跳转  replace 替换先前的路由,push 栈类型，路由存放在先前路由的上面
      this.props.history.replace('/')
    })
  }

  //自定义校验规则
  validatorPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码')
    }

    if (value.length <= 3) {
      callback('密码长度不能小于3位')
    }

    if (value.length > 30) {
      callback('密码长度不能大于30位')
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码为字母数字下划线')
    }

    if (value === '123456') {
      callback('密码太简单')
    } else {
      callback()
    }
  }

  render() {
    const user = memoryUtils.user

    if (user && user._id) {
      return <Redirect to="/"></Redirect>
    }

    const { getFieldDecorator } = this.props.form

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React后台管理系统</h1>
        </header>

        <section className="login-content">
          <div className="login-container">
            <h2>用户登录</h2>
            <Form className="login-form" onSubmit={this.handleSubmit}>
              <Form.Item>
                {// getFieldDecorator 是高阶函数，返回一个函数，参数是 组件，username是标识,传入后台用的就是这个
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入用户名!'
                    },
                    { min: 2, message: '用户名长度最小为2位字符!' },
                    { max: 12, message: '用户名长度最大为12位字符!' },
                    {
                      pattern: /^[a-zA-z0-9_]+$/,
                      message: '用户名为英文数字或下划线!'
                    }
                  ],
                  //当某一规则校验不通过时，是否停止剩下的规则的校验
                  validateFirst: true
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    // { required: true, message: '请输入密码!' },
                    {
                      validator: this.validatorPassword
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
            <h3>杭州网版权所有 </h3>
          </div>
        </section>
      </div>
    )
  }
}

//create  返回一个函数，返回一个新组件
const LoginForm = Form.create({ name: 'admin_login' })(Login)

export default LoginForm
