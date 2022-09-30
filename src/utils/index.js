// import { IMPORT_EXPORT_STATUS } from '@/utils/constant'
import _ from 'lodash'
import dayjs from 'dayjs'

const SPECIAL_CHARS_REGEXP = /([\:\-\_\/]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
export function camelCase(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export function parseHorizontal(name) {
  return name ? `${name}`.replace(/_/g, '-') : ''
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

// 首字母转大写
export function firstCapitalize(str) {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

// 数字转千分位
export function thousandFormat(value) {
  return (+value || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * @description 获取随机id
 * @param length
 * @returns {string}
 */
export function uuid(length = 32) {
  const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += num.charAt(Math.floor(Math.random() * num.length))
  }
  return str
}

/**
 * @description 找到需要的表单字段
 * @param newForm 新表单
 * @param originalForm 原始表单
 * @returns
 */
export function getFormatForm(newForm, originalForm) {
  const obj = {}
  if (!isObject(newForm) || !isObject(originalForm)) return obj
  Object.keys(originalForm).forEach(key => {
    obj[key] = newForm[key]
  })
  return obj
}

/**
 * @description 递归比较对象的异同
 * @param obj 新的对象
 * @param other 原始对象副本
 * @param isAddArray 是否添加array属性
 * @returns {a,b} a:改变之前的字段  b:改变之后的字段(新字段)
 */
export function diff(obj, otherObj, isAddArrayProp = true) {
  let a = {}
  let b = {}
  Object.keys(obj || {}).forEach(item => {
    // 数组直接赋值
    if (Array.isArray(obj[item])) {
      if (isAddArrayProp) {
        a[item] = obj[item]
        if (otherObj) b[item] = otherObj[item]
      }
    } else if (isObject(obj[item])) {
      const { a: tempA, b: tempB } = diff(obj[item], otherObj[item], isAddArrayProp)
      a = { ...a, ...tempA }
      b = { ...b, ...tempB }
    } else {
      if (obj[item] !== otherObj[item]) {
        a[item] = obj[item]
        b[item] = otherObj[item]
      }
    }
  })
  return { a, b }
}

/**
 * @description 一维数组转树状结构
 */
export function getFormateTreeList(list = [], idName = 'auth_id') {
  list.forEach(el => { el.children = [] })
  const treeList = []
  list.forEach(el => {
    if (el.p_id === 0) {
      treeList.push(el)
    } else {
      const parent = list.find(_ => _[idName] === el.p_id)
      if (parent) parent.children.push(el)
    }
  })
  return treeList
}

/**
 * 树结构转为一维数组
 * @param {Array} nodes 树结构数组
 * @returns {Array} 一维数组
 */
export function getFlattenDeepList(nodes = []) {
  let list = []
  nodes.forEach(item => {
    list.push(item)
    if (item.children && item.children.length) {
      const tempList = getFlattenDeepList(item.children)
      list = [...list, ...tempList]
    }
  })
  return list
}

// 格式化开始结束搜索日期
export function formateChooseTime(addTime) {
  if (!Array.isArray(addTime) || addTime.length < 2) return ''
  const startTime = addTime[0]
  const endTime = addTime[1]
  return `${startTime} ~ ${endTime}`
}

// 格式化箱型箱量
export function formateBoxType(row, attrName = 'box_type') {
  if (!isObject(row)) return ''
  let result = ''
  try {
    const objType = JSON.parse(row[attrName])
    for (const [prop, val] of Object.entries(objType)) {
      result += ` ${prop}X${val}`
    }
  } catch (e) { return '' }
  return result
}

// 格式化业务状态
export function statusFormatter(row, attrName = 'status') {
  if (!isObject(row)) return ''
  // const obj = IMPORT_EXPORT_STATUS[row[attrName]] || {}
  // return obj.name ? `<span style="color:${obj.colorName}">${obj.name}</span>` : ''
}

// 前置补0
export function pad(num, n = 2) {
  let len = `${num}`.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export function formatTime(value, formate = 'YYYY-MM-DD') {
  return dayjs(value).format(formate)
}

// 获取当月的开始时间和结束时间
export function getFormatFristEndDay(formate = 'YYYY-MM-DD') {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)
  const firstFormat = dayjs(firstDay).format(formate)
  const lastFormat = dayjs(lastDay).format(formate)
  return [firstFormat, lastFormat]
}
// 获取当月的开始时间和结束时间三个月
export function getFormatFristEndDaytwo(formate = 'YYYY-MM-DD') {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  // const Dsss = date.getDay()
  const firstDay = new Date(y, m - 3)
  const lastDay = new Date()
  const firstFormat = dayjs(firstDay).format(formate)
  const lastFormat = dayjs(lastDay).format(formate)
  return [firstFormat, lastFormat]
}
// 获取当月的开始时间和结束时间三个月
export function getFormatFristEndDayOne(formate = 'YYYY-MM-DD') {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  const d=date.getDate()
  // const Dsss = date.getDay()
  const firstDay = new Date(y, m, d)
  const lastDay = new Date(y, m, d)
  const firstFormat = dayjs(firstDay).format(formate)
  const lastFormat = dayjs(lastDay).format(formate)
  return [firstFormat, lastFormat]
}

// null undefined  ''
export function isEmpty(val) {
  return !!(val === null || val === undefined || `${val}`.trim() === '')
}

/**
 * @description form对象 string2Array '1,2,3' -> [1,2,3]
 * @param fields:表单字段数组, form:表单对象 isFieldToNumber: 字段是否转为数字,默认为true
 * @returns {string} clone后新的form对象
 */
export function formForString2Array(fields = [], formObj = {}, isFieldToNumber = true) {
  const cloneForm = _.cloneDeep(formObj)
  fields.forEach(el => {
    cloneForm[el] = cloneForm[el] ? cloneForm[el].split(',') : []
    if (isFieldToNumber) {
      cloneForm[el] = cloneForm[el].map(sub => {
        return isNaN(parseFloat(sub)) ? sub : parseFloat(sub)
      })
    }
  })
  return cloneForm
}

/**
 * @description form对象 array2String '1,2,3' -> [1,2,3]
 * @param fields:表单字段数组, form:表单对象 , isClone: 是否克隆form对象
 * @returns {string} clone后新的form对象
 */
export function formForArray2String(fields = [], formObj = {}) {
  const cloneForm = _.cloneDeep(formObj)
  fields.forEach(el => {
    cloneForm[el] = Array.isArray(cloneForm[el]) ? cloneForm[el].join(',') : ''
  })
  return cloneForm
}

/**
 * @description 生成随机数
 * @param min:最小值
 * @param max:最大值
 * @returns {Number}:随机数
 */
export function getRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

/**
 * 根据上传的文件获取图片宽高尺寸
 * @returns {Number}:{width,height}
*/
export function getFileImageSize(file) {
  const fileType = Object.prototype.toString.call(file)
  const defaultSize = { width: 0, height: 0 }
  if (fileType !== '[object File]') return defaultSize
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const image = new Image()
      image.src = e.target.result
      image.onload = () => {
        const { width = 0, height = 0 } = image
        resolve({ width, height })
      }
      image.onerror = () => resolve(defaultSize)
    }
    reader.onerror = () => resolve(defaultSize)
  })
}

/**
 * 根据图片的地址获取宽高尺寸
 * @returns {Number}:{width,height}
 */
export function getImgSize(imgUrl) {
  if (!imgUrl) return { width: 0, height: 0 }
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imgUrl
    image.onload = () => {
      const { width = 0, height = 0 } = image
      resolve({ width, height })
    }
    image.onerror = () => resolve({ width: 0, height: 0 })
  })
}
// 一维数组转换为二维数组
export function arrTrans(num, arr) {
  const newArr = []
  while (arr.length > 0) {
    newArr.push(arr.splice(0, num))
  }
  return newArr
}

/**
 * 过期时间判断
 * @param oldTime 原始时间
 * @param dateNum 设置的过期天数
 * @returns  true 没有过期  false 过期了
 */
export function isTime_guoqi(oldTime, dateNum) {
  if (!oldTime || oldTime == null) {
    return false
  }
  var time = new Date(oldTime.replace('-', '/'))
  time.setDate(time.getDate() + dateNum)
  var d = new Date(time)
  var y = d.getFullYear()
  var m = d.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var da = d.getDate()
  da = da < 10 ? ('0' + da) : da
  var h = d.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = d.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  var resDate = y + '-' + m + '-' + da + ' ' + h + ':' + minute
  if (new Date(resDate) > new Date()) {
    return true
  } else {
    return false
  }
}
