import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

export class UpdateForm extends Component {
  static propsTypes = {
    categoryName: PropTypes.string.isRequired,
    setFrom: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setFrom(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const categoryName = this.props.categoryName
    return (
      <Form>
        <Item label="分类名称">
          {getFieldDecorator('categoryName', {
            initialValue: categoryName,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入分类名称!'
              },
              { min: 2, message: '分类名称最小为2位字符!' },
              { max: 12, message: '分类名称最大为12位字符!' }
            ],
            //当某一规则校验不通过时，是否停止剩下的规则的校验
            validateFirst: true
          })(<Input placeholder="请输入分类名称"></Input>)}
        </Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'update_category_form' })(UpdateForm)
