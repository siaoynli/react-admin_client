/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-02-27 09:06:09
 * @Description:
 */
import React, { Component } from 'react';

import { Button, message } from 'antd';

export class App extends Component {
  handleClick = () => {
    message.success('ok');
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>
          Primary
        </Button>
      </div>
    );
  }
}

export default App;
