import request from '@/utils/request'

// 首页-工作台-基础信息查询
export function workBenchInfo() {
  return request({
    url: '/home/workbench/info',
    method: 'get'
  })
}

// 首页-工作台-临期合同查询
export function workRentInfo(params) {
  return request({
    url: '/home/workbench/rentInfo',
    method: 'get',
    params
  })
}
