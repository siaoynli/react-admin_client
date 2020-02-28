import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/link-button'
import './index.less'

import { Modal } from 'antd'

export class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  getTime = () => {
    this.timer = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({
        currentTime
      })
    }, 1000)
  }

  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('杭州')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  getByTitle = () => {
    //不是路由组件，获取props需要withRouter 包裹
    const path = this.props.location.pathname
    let title = ''
    menuList.map((item) => {
      if (item.key === path) {
        title = item.title
      }
      if (item.children) {
        const cItem = item.children.find((cItem) => cItem.key === path)

        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  logout = () => {
    //注意this指向
    Modal.confirm({
      title: '您确定要退出吗?',
      onOk: () => {
        storageUtils.deleteUser()
        memoryUtils.user = {}
        setTimeout(() => {
          this.props.history.replace('/')
        }, 100)
      }
    })
  }

  //异步请求时候使用
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }

  //卸载组件，清除定时器
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const user = memoryUtils.user
    const title = this.getByTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span> 欢迎，{user.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
