/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 09:06:09
 * @Description:
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/admin/admin';

export class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          {/* 只匹配一个 */}
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Admin}></Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
