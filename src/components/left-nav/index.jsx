import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu, Icon } from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu

//左侧导航组件
export class LeftNav extends Component {
  //map递归调用生成菜单
  getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }
  //reduce 递归生成菜单
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname

    return menuList.reduce((prev, item) => {
      if (item.children) {
        //查找与当前请求路径匹配的子Item
        const cItem = item.children.find((cItem) => cItem.key === path)

        if (cItem !== undefined) {
          this.openKey = item.key
        }

        prev.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      } else {
        prev.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
      return prev
    }, [])
  }
  //在render之前执行
  componentWillMount() {
    this.openKey = ''
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    const path = this.props.location.pathname
    const openKey = this.openKey

    return (
      <div>
        <div className="left-nav">
          <Link to="/" className="left-nav-header">
            <img src={logo} alt="logo" />
            <h1>后台系统</h1>
          </Link>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          // defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

//非路由组件需要获取props，需要用withRouterG高阶组件
export default withRouter(LeftNav)
