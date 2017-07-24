/**
 * 入口
 */
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import App from './container/app'
import store from './store'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./container/app', () => { render(App)})
}

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('lotteryConfig', JSON.stringify(state))
})