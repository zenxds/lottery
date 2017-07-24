import { handleActions } from 'redux-actions'
import actions from '../action'
import { fromJS } from 'immutable'

let lotteryConfig = {
  // 号码范围
  min: 1,
  max: 200,
  // 中奖人
  prizers: {},
  // 每次中奖的个数
  every: 1,
  // 总中奖人数
  total: 3
}

try {
  const localConfig = localStorage.getItem('lotteryConfig')
  if (localConfig) {
    lotteryConfig = JSON.parse(localConfig)
  }
} catch(e) {
  console.log(e)
}

const reducer = handleActions({
  [actions.setMin]: (state, action) => {
    return state.set('min', action.payload)
  },
  
  [actions.setMax]: (state, action) => {
    return state.set('max', action.payload)
  },

  [actions.addPricer]: (state, action) => {
    const prizers = state.get('prizers')
    return state.set('prizers', prizers.set(action.payload, 1))
  },

  [actions.delPricer]: (state, action) => {
    const prizers = state.get('prizers')
    return state.set('prizers', prizers.delete(action.payload))
  },

  [actions.setEvery]: (state, action) => {
    return state.set('every', action.payload)
  },
  [actions.setTotal]: (state, action) => {
    return state.set('total', action.payload)
  }
}, fromJS(lotteryConfig))

export default reducer
