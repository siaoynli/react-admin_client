import React, { Component } from 'react'
import { Card, Button, Table, Icon, message } from 'antd'

import { reqCategories } from '../../api'
import LinkButton from '../../components/link-button'
import './category.less'
export class Category extends Component {
  state = {
    categories: [],
    loading: false
  }

  getCategories = async () => {
    this.setState({
      loading: true
    })
    const result = await reqCategories()

    this.setState({
      loading: false
    })

    if (result.status === 0) {
      const categories = result.data
      this.setState({
        categories
      })
    } else {
      message.error('获取数据失败')
    }
  }

  initColumn = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        width: 250,
        align: 'center',
        dataIndex: '',
        key: 'x',
        render: () => (
          <div>
            <LinkButton>查看分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </div>
        )
      }
    ]
  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {
    const title = '品类管理'
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    const dataSource = this.state.categories
    const loading = this.state.loading

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            dataSource={dataSource}
            columns={this.columns}
            rowKey="_id"
            pagination={{ hideOnSinglePage: true }}
          />
        </Card>
      </div>
    )
  }
}

export default Category
