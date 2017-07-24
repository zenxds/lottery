import { Component } from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Slider,
  Tag,
  message
} from 'antd'
import { unparam }  from '../../util/param'

const FormItem = Form.Item

export default class LotteryConfig extends Component {
  
  onSliderChange(value) {
    const {
      actions
    } = this.props

    actions.setMin(value[0])
    actions.setMax(value[1])
  }

  onDeletePrizer(item) {
    this.props.actions.delPricer(item)
  }

  render() {
    const props = this.props
    const params = unparam(location.search.replace('?', ''))
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 14 }
      },
    }

    return (
      <div>
        <FormItem {...formItemLayout} label="中奖号码范围">
          <Row>
            <Col span={6}>
              <InputNumber
                value={props.min}
                onChange={(v) => {
                  props.actions.setMin(v)
                }}
              />
            </Col>
            <Col span={12}>
              <Slider range value={[props.min, props.max]} max={params.max ? parseInt(params.max) : 3000} onChange={this.onSliderChange.bind(this)} />
            </Col>
            <Col span={6}>
              <InputNumber
                value={props.max}
                onChange={(v) => {
                  props.actions.setMax(v)
                }}
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="每次抽奖人数">
          <InputNumber
            value={props.every}
            min={1}
            max={100}
            onChange={(v) => {
              props.actions.setEvery(v)
            }}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="总中奖人数">
          <InputNumber
            value={props.total}
            min={1}
            max={1000}
            onChange={(v) => {
              props.actions.setTotal(v)
            }}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="中奖号码">
          {
            Object.keys(props.prizers).map(item => {
              return (
                <Tag closable onClose={this.onDeletePrizer.bind(this, item)} key={item}>{ item }</Tag>
              )
            })
          }
          <Input ref={(input) => { this.pricerInput = input }} onPressEnter={(e) => {
            let value = e.target.value
            if (!/\d+/.test(value)) {
              message.error('号码格式不正确')
              return
            }

            value = parseInt(value)
            if (value > props.max || value < props.min) {
              message.error('号码范围不正确')
              return
            }

            props.actions.addPricer(value)
            e.target.value = ''
          }} />
        </FormItem>
      </div>
    )
  }
}
