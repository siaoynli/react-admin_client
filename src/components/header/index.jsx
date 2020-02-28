import React, { Component } from 'react'
import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'

export class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  getTime = () => {
    setInterval(() => {
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

  componentDidMount() {
    this.getTime()
    this.getWeather()
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const user = memoryUtils.user

    return (
      <div className="header">
        <div className="header-top">
          <span> 欢迎，{user.username}</span>
          <a href="#">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
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

export default Header
