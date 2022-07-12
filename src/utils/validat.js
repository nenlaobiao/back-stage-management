export const validateEmail = (rule, value, callback) => {
  const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  console.log(value)
  if (value === undefined) {
    callback()
  } else if (regular.test(value)) {
    callback()
  } else {
    callback(new Error('邮箱格式错误'))
  }
}
export const validateMobile = (rule, value, callback) => {
  const regular = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (value === undefined) {
    callback()
  } else if (regular.test(value)) {
    callback()
  } else {
    callback(new Error('手机号格式错误'))
  }
}
