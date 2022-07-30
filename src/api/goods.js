import request from '@/utils/request'
/**
 *  获取商品列表
 * @param {Number} query: 搜索条件（可以为空）
 * @param {Number} pagenum：页数
 * @param {Number} pagesize：页面商品数量
 * @returns
 */
export const getGoodsList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: { query, pagenum, pagesize }
  })
}
/**
 * 删除商品接口
 * @param {Number} id-商品id
 * @returns
 */
export const delGoodsAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}
/**
 *  获取商品分类数据列表
 * @returns
 */
export const getCategoriesLst = () => {
  return request({
    url: 'categories'
  })
}
/**
 *  获取参数列表接口
 * @param {*} id
 * @param {*} sel
 * @returns
 */
export const getRootCatList = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}
/**
 *  上传图片接口
 * @param {*} file
 * @returns
 */
export const upImgAPI = (file) => {
  return request({
    url: 'upload',
    method: 'POST',
    data: { file }
  })
}
/**
 *  添加商品
 * @param {*} data
 * @returns
 */
export const addGoodsAPI = (data) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}
/**
 *  通过id查询商品信息
 * @param {*} id
 * @returns
 */
export const getGoodsDataById = (id) => {
  return request({
    url: `goods/${id}`
  })
}

/**
 *  修改商品
 * @param {*} data
 * @returns
 */
export const setGoodsById = (id, data) => {
  return request({
    method: 'PUT',
    url: `goods/${id}`,
    data
  })
}

/**
 * 修改商品分类接口
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const setCatValueAPI = ({ id, attr_id, attr_name, attr_sel, attr_vals }) => {
  return request({
    method: 'PUT',
    // eslint-disable-next-line camelcase
    url: `categories/${id}/attributes/${attr_id}`,
    data: {
      attr_name, attr_sel, attr_vals
    }
  })
}

/**
 * 删除商品分类接口
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const delCatValueAPI = ({ id, attr_id }) => {
  return request({
    method: 'DELETE',
    // eslint-disable-next-line camelcase
    url: `categories/${id}/attributes/${attr_id}`
  })
}

/**
 * 添加商品分类接口
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const addCatValueAPI = ({ id, attr_name, attr_sel, attr_vals }) => {
  return request({
    method: 'POST',
    // eslint-disable-next-line camelcase
    url: `categories/${id}/attributes`,
    data: {
      attr_name, attr_sel, attr_vals
    }
  })
}
/**
 *  获取商品分类数据列表
 * @param {*} param0
 * @returns
 */
export const getGoodsClassList = ({ pagenum, pagesize }, type) => {
  return request({
    url: 'categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}
/**
 *  添加商品分类接口
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const addGoodsClassAPI = ({ cat_pid, cat_name, cat_level }) => {
  return request({
    url: 'categories',
    method: 'POST',
    data: {
      cat_pid, cat_name, cat_level
    }
  })
}
/**
 *  修改商品分类接口
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const setGoodsClassAPI = ({ cat_id, cat_name }) => {
  return request({
    // eslint-disable-next-line camelcase
    url: `categories/${cat_id}`,
    method: 'PUT',
    data: {
      cat_name
    }
  })
}
/**
 *  修改商品分类接口
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const delGoodsClassAPI = (cat_id) => {
  return request({
    // eslint-disable-next-line camelcase
    url: `categories/${cat_id}`,
    method: 'DELETE'
  })
}
