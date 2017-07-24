import { Component } from 'react'
import {
  Row,
  Col,
  Button,
  Card
} from 'antd'
import LotteryItem from './LotteryItem'
import LotteryUtil from '../../util/lottery'
import { shuffle } from '../../util/random'

// 0 正常
// 1 抽奖中
// 10 禁用
const statusMap = {
  normal: 0,
  running: 1,
  disabled: 10
}

export default class Lottery extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      status: statusMap.normal,
      // 每次滚动的列表
      randomList: [],
      // 中奖列表
      lotteryList: []
    }

    // copy一份中奖号码名单，每次从中删除中奖的号码
    this.prizers = Object.assign({}, props.prizers)
    this.lotteryUtil = new LotteryUtil(props.min, props.max)    
  }

  getBtnText() {
    const map = {
      '0': '开始',
      '1': '停止',
      '10': '开始'
    }
    return map[this.state.status]
  }

  onClick() {
    const {
      min,
      max,
      every,
      prizers
    } = this.props

    if (this.state.status === statusMap.normal) {
      this.startRandom()
    }

    if (this.state.status === statusMap.running) {
      this.stopRandom()
    }
  }

  startRandom() {
    const {
      every,
      prizers
    } = this.props
    
    this.timer = setInterval(() => {
      const pool = this.lotteryUtil.shuffle()      
      const randomList = []

      // 要保证随机出来的中奖名单不包含中奖号码，方便后续处理
      pool.some((item) => {
        if (!prizers[item]) {
          randomList.push(item)
        }
        return randomList.length >= every
      })

      this.setState({
        status: statusMap.running,        
        randomList: randomList
      })
    }, Math.ceil(1000 / 60))
  }

  stopRandom() {
    let prizers = this.prizers
    let lotteryList = this.state.lotteryList
    let randomList = this.state.randomList

    randomList.forEach((item, index) => {
      const keys = Object.keys(prizers)
      if (!keys.length) {
        return
      }

      const key = shuffle(keys)[0]
      randomList[index] = key
      delete prizers[key]
    })

    clearInterval(this.timer)
    // 从奖池中删除号码
    this.lotteryUtil.remove(randomList)
    // 中奖名单添加
    lotteryList = lotteryList.concat(randomList)

    this.setState({
      lotteryList: lotteryList,
      status: lotteryList.length >= this.props.total ? statusMap.disabled : statusMap.normal
    })
  }

  render() {
    const {
      max,
      every
    } = this.props
    const {
      randomList,
      status
    } = this.state

    return (
      <div className="lottery-container">
        {
          new Array(every).fill().map((item, index) => {
            return <LotteryItem key={index} length={ (max + '').length } value={randomList[index]} />
          })
        }
        <div className="lottery-btn-box">
          <Button disabled={status === statusMap.disabled} onClick={this.onClick.bind(this)}>{ this.getBtnText() }</Button>
        </div>
      </div>
    )
  }
}
