import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

export class AddForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired, //一级分类数组
    parentId: PropTypes.string.isRequired,
    setFrom: PropTypes.func.isRequired //父级id
  }

  componentWillMount() {
    this.props.setFrom(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { categories, parentId } = this.props

    return (
      <Form>
        <Item label="所属分类">
          {getFieldDecorator('parentId', {
            initialValue: parentId
          })(
            <Select>
              <Option value="0">请选择一级分类</Option>
              {categories.map((c) => (
                <Option value={c._id} key={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          )}
        </Item>
        <Item label="分类名称">
          {getFieldDecorator('categoryName', {
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

export default Form.create({ name: 'add_category_form' })(AddForm)
