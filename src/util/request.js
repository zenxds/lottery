import fetch from 'isomorphic-fetch'

export default (...args) => {
  return fetch(...args).then((response) => {
    return response.json()
  }).then((response) => {
    if (response.success) {
      return response.result
    } else {
      throw new Error(response.msg || 'request error')
    }
  })
}