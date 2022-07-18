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
export const getCategoriesAPI = ({ id, sel }) => { }
