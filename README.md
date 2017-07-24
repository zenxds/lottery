# react-boilerplate

## 目录规范

```
config
  webpack.config.${env}.js
  postcss.config.js
src
  action: action
  component: 展示型组件
  container: 容器组件
  constant: 常量定义
  reducer: reducer
  store: store配置
  service: 封装的服务
```

## action规范

action遵守[flux-standard-action](https://github.com/acdlite/flux-standard-action)标准

## polyfill

* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
* babel-polyfill

## 第三方库

* [redux-thunk](https://github.com/gaearon/redux-thunk)：支持ActionCreator返回函数来处理异步action
* [redux-promise](https://github.com/acdlite/redux-promise)：支持ActionCreator返回promise来处理异步action
* [redux-actions](https://github.com/acdlite/redux-actions)：简化action创建和处理

### 可选库

* [reselect](https://github.com/reactjs/reselect)
* [immutable](https://facebook.github.io/immutable-js/)
* [normalizr](https://github.com/paularmstrong/normalizr)
