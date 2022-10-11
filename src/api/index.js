import request from '@/utils/request'

// 所有删除方法统一删除方法
export function deleteCommon(data) {
  return request({
    url: '/Ht/Index/SaveStatus',
    method: 'post',
    data
  })
}

// 文件上传
export function sysFileUploadFile(data) {
  return request({
    url: '/Api/SysFile/uploadFile',
    method: 'post',
    data
  })
}

// 改变状态
export function saveStatus(data) {
  return request({
    url: '/Ht/Index/SaveStatus',
    method: 'post',
    data
  })
}

// 全部车队列表V2和V3
export function getPrerecordShopNew(data) {
  return request({
    url: '/Ht/HtOrderPrerecord/PrerecordShopNew',
    method: 'post',
    data
  })
}

// 排序
export function editorSystemAuthSort(data) {
  return request({
    url: '/Ht/SystemAuth/EditorSystemAuthSort',
    method: 'post',
    data
  })
}

// 车队列表和地推接口
export function getPubSelect(data) {
  return request({
    url: '/Ht/HtCar/pubSelect',
    method: 'post',
    data
  })
}

// 放箱中心:权限下拉数据,公司名,进出口所属
export function getBoxbaseInfo(data) {
  return request({
    url: '/Ht/HtBox/baseInfo',
    method: 'post',
    data
  })
}

// 车队列表和地推接口
export function getlogin(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}