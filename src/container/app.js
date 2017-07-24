import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../action'
import { unparam } from '../util/param'

import Lottery from './component/Lottery'
import LotteryConfig from './component/LotteryConfig'

import 'antd/dist/antd.less'
import './index.less'

class App extends Component {
  render() {
    const props = this.props
    const params = unparam(location.search.replace('?', ''))

    return (
      <div className="app-container">
        { params.mod === 'config' ? <LotteryConfig {...props} /> : <Lottery {...props} /> }
      </div>
    )
  }

  componentDidMount() {
  }
}

const mapStateToProps = (state) => {
  return state.toJS()
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)