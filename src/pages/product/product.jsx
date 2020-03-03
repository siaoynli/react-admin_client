import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductHome from './home'
import ProduceAddUpdate from './add-update'
import ProduceDetail from './detail'

export class Product extends Component {
  render() {
    // exact 路径完全匹配
    return (
      <Switch>
        <Route exact path="/product" component={ProductHome}></Route>
        <Route path="/product/addupdate" component={ProduceAddUpdate}></Route>
        <Route path="/product/detail" component={ProduceDetail}></Route>
        <Redirect to="/product"></Redirect>
      </Switch>
    )
  }
}

export default Product
