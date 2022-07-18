import request from '@/utils/request'
/**
 *  获取所有权限列表
 * @returns
 */
export const getRootListAPI = () => {
  const type = 'tree'
  return request({
    url: `rights/${type}`
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
 * 添加角色请求
 * @param {*} param0
 * @returns
 */
export const addRoleAPI = ({ roleName, roleDesc }) => {
  return request({
    method: 'POST',
    url: 'roles',
    data: {
      roleName, roleDesc
    }
  })
}
/**
 * 修改角色接口
 * @param {*} param0
 * @returns
 */
export const setRoleAPI = ({ id, roleName, roleDesc }) => {
  return request({
    method: 'PUT',
    url: `roles/${id}`,
    data: {
      roleName, roleDesc
    }
  })
}
/**
 *  删除角色指定权限
 * @param {*} param0
 * @returns
 */
export const delRoleRootAPI = ({ id, roleId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}/rights/${roleId}`
  })
}
/**
 *  删除角色
 * @param {*} param0
 * @returns
 */
export const delRoleAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
}
/**
*   提交角色授权
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const submitRoleAPI = (id, data) => {
  return request({
    method: 'POST',
    url: `roles/${id}/rights`,
    data: {
      rids: data
    }
  })
}
