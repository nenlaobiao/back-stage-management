import request from '@/utils/request'
/**
 *  登录接口
 * @param {*} param0
 * @returns
 */
export const loginAPI = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username, password
    }
  })
}
/**
 * 获取列表请求
 * @param {*} param0
 * @returns
 */
export const getUserList = ({ pagenum, pagesize, query }) => {
  return request({
    url: 'users',
    params: {
      pagenum, pagesize, query
    }
  })
}
/**
 *  删除指定用户
 * @param {*} id
 * @returns
 */
export const delUserAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/users/${id}`
  })
}
/**
 *  添加用户接口
 * @param {*} param0
 * @returns
 */
export const addUserAPI = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}
/**
 *  获取角色
 * @returns
 */
export const getRolesAPI = () => {
  return request({
    url: 'roles'
  })
}
/**
 * 修改角色状态
 * @param {*} param0
 * @returns
 */
export const setStateAPI = ({ id, type }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/state/${type}`
  })
}
