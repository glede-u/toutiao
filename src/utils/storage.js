// 本地存储token
// 存
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 取
export const getItem = key => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    return window.localStorage.getItem(key)
  }
}
// 删
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
