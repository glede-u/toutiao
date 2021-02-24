// 本地存储token
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getItem = key => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    return window.localStorage.getItem(key)
  }
}

export const removeItem = key => {
  window.localStorage.removeItem(key)
}
