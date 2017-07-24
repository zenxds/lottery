import { createActions } from 'redux-actions'
import * as apis from '../constant/api'
import request from '../util/request'

const defaultHandler = v => v
const actions = createActions({
  setMin: defaultHandler,
  setMax: defaultHandler,
  addPricer: defaultHandler,
  delPricer: defaultHandler,
  setEvery: defaultHandler,
  setTotal: defaultHandler
})

export default actions