/* 数据导出 */

/*
 *  普通导出
 *  header: 处理 Header 表头 序号名目前必须为name  { name: '序号', shop_name: '车队名称', car_num: '车牌'}
 *  list:   导出的数据
 *  titles: 标题        [{ name: '集行' }, { name: '时间：2020-02-02' }]
 *  fileName: 文件名
 *  seqAttrName: 序号的属性,默认为name
 *  会修改传入的Data对象,因为要在data里添加序号字段
 */
export function normalExport(header = {}, list = [], titles = [], fileName = '集行', seqAttrName = 'custom_seq_title') {
  import('@/utils/excel').then(({ excel }) => {
    // 添加序号
    list.forEach((el, index) => {
      el[seqAttrName] = index + 1
    })
    // 过滤后台返回的多余的字段 左新右旧
    list = excel.filterExportData(list, Object.keys(header))
    // 追加header
    list.unshift(header)

    // 格式化Excel识别的标题对象
    const formatTitle = excel.formateTitle(titles, seqAttrName)

    // 设置全部的单元格样式
    excel.setExportCellStyle(list, null, {
      s: {
        font: { sz: '12' },
        border: {
          top: { style: 'thin', color: { rgb: 'FF0000000' }},
          bottom: { style: 'thin', color: { rgb: 'FF0000000' }},
          left: { style: 'thin', color: { rgb: 'FF0000000' }},
          right: { style: 'thin', color: { rgb: 'FF0000000' }}
        },
        alignment: {
          // 自动换行
          wrapText: true
        }
      }
    })

    // 合并处理
    const mergeItem = []
    titles.forEach((item, index) => {
      //  每个元素 x y 轴坐标对应
      mergeItem.push([excel.numToTitle(1) + (index + 1), excel.numToTitle(Object.keys(header).length) + (index + 1)])
    })
    // 追加合拼的标题
    const mergeConf = excel.makeMergeConfig(mergeItem)
    // 把头部塞进数组
    const finallyData = formatTitle.concat(list)

    // 行设置：根据titles的长度动态设置行的高度
    const heightStyle = {}
    titles.forEach((el, index) => { heightStyle[index + 1] = 50 })
    // 设置最后一行高度,不然高度宽度不起效果
    heightStyle[finallyData.length] = 30
    const rowConf = excel.makeRowConfig(heightStyle, 30)

    // 列设置：设置列的宽度
    const colConfig = { 'A': 40 }
    // 设置最后一行的宽度,不然默认宽度不起效果
    colConfig[excel.numToTitle(Object.keys(header).length)] = 120
    var colConf = excel.makeColConfig(colConfig, 120)

    excel.exportExcel({
      sheet1: finallyData
    }, `${fileName}.xlsx`, 'xlsx', {
      extend: {
        '!cols': colConf,
        '!merges': mergeConf,
        '!rows': rowConf
      }
    })
  })
}
