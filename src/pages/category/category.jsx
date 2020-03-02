import React, { Component } from 'react'
import { Card, Button, Table, Icon, message, Modal } from 'antd'

import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../components/link-button'
import './category.less'
import AddForm from './add-form'
import UpdateForm from './update-form'
export class Category extends Component {
  state = {
    categories: [],
    loading: false,
    subCategories: [],
    parentId: '0',
    parentName: '',
    showStatus: 0 //1显示添加，2显示更新
  }

  getCategories = async (parentId) => {
    this.setState({
      loading: true
    })

    parentId = parentId || this.state.parentId

    const result = await reqCategories(parentId)

    this.setState({
      loading: false
    })

    if (result.status === 0) {
      const categories = result.data
      if (parentId === '0') {
        this.setState({
          categories
        })
      } else {
        this.setState({
          subCategories: categories
        })
      }
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
        render: (category) => (
          <div>
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改分类
            </LinkButton>
            {this.state.parentId === '0' ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategories(category)
                }}
              >
                查看子分类
              </LinkButton>
            ) : null}
          </div>
        )
      }
    ]
  }

  showSubCategories = (category) => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name
      },
      () => {
        console.log('回调后:', this.state.parentId)
        this.getCategories()
      }
    )

    console.log('回调前:', this.state.parentId)
  }

  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  showUpdate = (category) => {
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  addCategory = async () => {
    const { parentId, categoryName } = this.form.getFieldsValue()

    const result = await reqAddCategory({ parentId, categoryName })

    if (result.status === 0) {
      //清除表单数据缓存
      this.form.resetFields()
      if (parentId === this.state.parentId) {
        this.getCategories()
      } else if (parentId === '0') {
        //在二级目录添加一级
        this.getCategories('0')
      }

      this.setState({
        showStatus: 0
      })
    }
  }

  updateCategory = async () => {
    const categoryId = this.category._id
    const categoryName = this.form.getFieldValue('categoryName')

    const result = await reqUpdateCategory({ categoryId, categoryName })

    if (result.status === 0) {
      //清除表单数据缓存
      this.form.resetFields()
      this.getCategories()
      this.setState({
        showStatus: 0
      })
    }
  }

  showCategories = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategories: []
    })
  }

  handleCancel = () => {
    this.form && this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {
    const {
      categories,
      subCategories,
      parentId,
      parentName,
      loading,
      showStatus
    } = this.state

    const category = this.category || {}

    const title =
      parentId === '0' ? (
        '品类管理'
      ) : (
        <span>
          <LinkButton onClick={this.showCategories}>品类管理</LinkButton>
          <Icon type="arrow-right" style={{ marginRight: 5 }}></Icon>
          {parentName}
        </span>
      )
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            dataSource={parentId === '0' ? categories : subCategories}
            columns={this.columns}
            rowKey="_id"
            pagination={{ hideOnSinglePage: true }}
          />
        </Card>

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categories={categories}
            parentId={parentId}
            setFrom={(form) => {
              this.form = form
            }}
          ></AddForm>
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            // 把子组件的form传递到父组件
            setFrom={(form) => {
              this.form = form
            }}
          ></UpdateForm>
        </Modal>
      </div>
    )
  }
}

export default Category
