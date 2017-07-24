import React, { Component } from 'react'
import {
  Row,
  Col,
  Card
} from 'antd'

class LotteryItem extends Component {
  render() {
    let {
      length,
      value
    } = this.props
    value = padding(value, length)

    return (
      <Row gutter={16} className="lottery-row">
      {
        new Array(length).fill(0).map((item, index) => {
          return <Col key={index} span={24 / length}><Card >{ value.charAt(index) }</Card></Col>
        })
      }
      </Row>
    )
  }
}

export default LotteryItem

function padding(str='', length) {
  const zero = new Array(length).fill('0').join('')
  return (zero + str).substr(-length)
}