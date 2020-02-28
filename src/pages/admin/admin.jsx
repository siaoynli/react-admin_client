/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 10:19:24
 * @Description:
 */

import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Product from '../product/product'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Bar from '../charts/bar'

const { Footer, Content, Sider } = Layout

export class Admin extends Component {
  render() {
    const user = memoryUtils.user
    if (!user || !user._id) {
      return <Redirect to="/login"></Redirect>
    }

    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header></Header>

          <Content style={{ backgroundColor: '#dedede' }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#999' }}>
            推荐使用chrome，杭州网版权所有
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
