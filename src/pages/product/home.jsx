import React, { PureComponent } from 'react'

import { Card, Select, Input, Button, Table, Icon } from 'antd'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

export class ProductHome extends PureComponent {
  state = {
    products: [],
    total: 0,
    loading: false,
    searchName: '',
    searchType: 'productName'
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => price + '元' //当前指定了dataindex,传入的值就是dataindex的值
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (status) =>
          status === 0 ? (
            <span>
              <Button type="primary">上架</Button> <span>下架</span>
            </span>
          ) : (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          )
      },
      {
        title: '操作',
        width: 100,
        align: 'center',
        dataIndex: '',
        render: (product) => (
          <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  getProducts = async (pageNum) => {
    this.setState({
      loading: true
    })

    let result
    const { searchName, searchType } = this.state
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType
      })
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE)
    }

    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({
        products: list,
        total
      })
    }
    this.setState({
      loading: false
    })
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render() {
    const { products, total, searchName, searchType } = this.state
    const columns = this.columns

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="请输入关键字"
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={(e) => this.setState({ searchName: e.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    )
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          bordered
          loading={false}
          dataSource={products}
          columns={columns}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: PAGE_SIZE,
            total: total,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        ></Table>
      </Card>
    )
  }
}

export default ProductHome
