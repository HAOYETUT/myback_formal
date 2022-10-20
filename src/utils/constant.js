/* 常量 */

// 文件类型
export const FILE_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
  'text/plain': 'txt',
  'application/msword': 'doc',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
}

// 0:PC端注册 1地堆 2电话 3放箱公司 4手机端注册
export const SOURCE_OPTIONS = [
  { label: 'PC端注册', value: 0 },
  { label: '地堆上门', value: 1 },
  { label: '客服电话', value: 2 },
  { label: '放箱公司', value: 3 },
  { label: '手机端注册', value: 4 },
  { label: '用户PC端自行注册', value: 5 }
]

// 车队列表排序下拉
export const CAR_LIST_SORT_OPTION = [
  { label: '注册时间排序', value: 'add_time' },
  { label: '充值金额排序', value: 'money' },
  { label: '消费金额排序', value: 'use_money' }
  // { label: '到期时间排序', value: 'expiry_time' }
]

// 数据端口 Ft:货代,Car:车队,Admin:终端
export const PORT = [
  { label: '货代', value: 'Ft' },
  { label: '车队', value: 'Car' },
  { label: '终端', value: 'Admin' },
  { label: '大后台', value: 'adm' }
]

// 是否可用于侧边导航
export const IS_USE_LEFT_NAV_OPTION = [
  { label: '不可用于导航', value: 0 },
  { label: '可以用于导航', value: 1 }
]

// 微信菜单类型
export const WX_MENU_TYPE = [
  { label: '链接跳转', value: 'view' },
  { label: '图片推送', value: 'media_id' },
  { label: 'click文本消息', value: 'click' },
  { label: '小程序跳转', value: 'miniprogram' },
  { label: '扫扫二维码', value: 'scancode_waitmsg' },
  { label: '拍照或相册发图', value: 'pic_photo_or_album' },
  { label: '发送位置', value: 'location_select' }
]

// 文章开启，锁定，删除
export const ARTICLE_LIST_OPTION = [
  { label: '开启', value: '1' },
  { label: '锁定', value: '2' },
  { label: '删除', value: '3' }
]

// 收费形式
export const COST_TYPE = [
  { label: '免费', value: '1' },
  { label: '时间', value: '2' },
  { label: '次数', value: '3' }
]

// 接口类型
export const INTERFACE_TYPE = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' }
]

// 充值类型
export const RECHARGE_TYPE = [
  { value: '0', label: '请选择渠道' },
  { value: '1', label: '微信' },
  { value: '3', label: '后台充值及扣款' },
  { value: '4', label: '红包' },
  { value: '5', label: '放箱' },
  { value: '6', label: '预录' },
  { value: '7', label: '车辆定位' },
  { value: '11', label: '年费' }
]

// 文章类型
export const ARTICLE_TYPE = [
  { value: 0, label: '图文' },
  { value: 1, label: '视频' }
]

// 日志类型
export const LOG_TYPE_OPTIONS = [
  { value: 'Api', label: '接口日志' },
  { value: 'Admin', label: '后台日志' },
  { value: 'Car', label: '车队日志' },
  { value: 'Box', label: '放箱日志' },
  { value: 'Wx', label: '微信司机日志' }
]

export const TRACE_LARAVEL_OPTIONS = [
  { value: 'trace', label: 'trace' },
  { value: 'laravel', label: 'laravel' }
]

// 所属城市
export const CITYS_OPTIONS = [
  { value: 'sh', label: '上海' },
  { value: 'tj', label: '天津' },
  { value: 'qd', label: '青岛' },
  { value: 'jj', label: '九江' },
  { value: 'tc', label: '太仓' }
]

// 所属城市
export const BOXTYPE_OPTIONS = [
  { value: 1, label: '按票' },
  { value: 2, label: '按箱' }
]
// 介绍人有无
export const Introducers = [
  { value: true, label: '有' },
  { value: false, label: '无' }
]
// 北斗公司
export const Beidou_company = [
  { value: 1, label: '英迪' },
  { value: 2, label: '中安' },
  { value: 3, label: '星软' },
  { value: 4, label: '无宭大' },
  { value: 5, label: '畅胜' },
  { value: 6, label: '金航' },
  { value: 7, label: '控洛' }
]
// 预录金额
export const PRE_MONEY_OPTIONS = [
  { value: 0, label: '0元' },
  { value: 300, label: '3元' },
  { value: 220, label: '2.2元' }
]
// 预录金额
export const minus_options = [
  { value: 1, label: '不可输入' },
  { value: 2, label: '正常费用可输入负号' }
]
// 预录金额
export const PLAN_OPTIONS = [
  { value: 1, label: '未开通' },
  { value: 2, label: '已开通' }
]
// 日志下载分类
export const LOG_DOWN_OPTIONS = [
  { value: '1', label: '测试中台' },
  { value: '2', label: '测试V3车队' },
  { value: '3', label: '正式中台' },
  { value: '4', label: '正式V3车队' },
  { value: '5', label: '测试V2车队' },
  { value: '6', label: '测试V2后台' },
  { value: '7', label: '测试V2放箱' },
  { value: '8', label: '正式V2车队' },
  { value: '9', label: '正式V2后台' },
  { value: '10', label: '正式V2放箱' }
]

// 1=>'新业务',2=>'放箱中',3=>'已完成',4=>'已对单',5=>'有问题',6=>'已拒绝',7=>'没预配',8=>'船期早',9=>'明天放',10=>'已退关',11=>'等通知',12=>'申请中',13=>'爆仓',14=>'缺箱子',15=>'退单',16=>'作废',17=>'换单中'
export const IMPORT_EXPORT_STATUS = [
  { name: '', colorName: '', className: '' },
  { name: '新业务', colorName: '#FF0000', className: '' },
  { name: '放箱中', colorName: '#259B24', className: '' },
  { name: '已完成', colorName: '#0F0F0F', className: '' },
  { name: '已对单', colorName: '#1cbfdc', className: '' },
  { name: '有问题', colorName: '#3F51B5', className: '' },
  { name: '已拒绝', colorName: '#F56C6C', className: '' },
  { name: '没预配', colorName: '#FF4081', className: '' },
  { name: '船期早', colorName: '#E51C23', className: '' },
  { name: '明天放', colorName: '#009688', className: '' },
  { name: '已退关', colorName: '#8BC34A', className: '' },
  { name: '等通知', colorName: '#FF9800', className: '' },
  { name: '申请中', colorName: '#c700d9', className: '' },
  { name: '爆仓', colorName: '#009688', className: '' },
  { name: '缺箱子', colorName: '#A2292D', className: '' },
  { name: '退单', colorName: '#666', className: '' },
  { name: '作废', colorName: '#f6ca9d', className: '' },
  { name: '换单中', colorName: '#D6B993', className: '' }
]

// 进口放箱状态 1新业务 2放单中 3已完成  4已拒绝  5已对单  6没预配 7船期早  8明天放 9已退关  10等通知 11退单  12申请中  13爆仓  14缺箱子  15有问题
export const IMPORT_BOX_STATUS = []

export const IMPORT_EXPORT_STATUS_OPTIONS = [
  { name: '新业务', value: '1' },
  { name: '放箱中', value: '2' },
  { name: '已完成', value: '3' },
  { name: '已对单', value: '4' },
  { name: '有问题', value: '5' },
  { name: '已拒绝', value: '6' },
  { name: '没预配', value: '7' },
  { name: '船期早', value: '8' },
  { name: '明天放', value: '9' },
  { name: '已退关', value: '10' },
  { name: '等通知', value: '11' },
  { name: '申请中', value: '12' },
  { name: '爆仓', value: '13' },
  { name: '缺箱子', value: '14' },
  { name: '退单', value: '15' }
]

// 版本
export const SYSTEM_VERSION_OPTIONS = [
  { name: 'V1版', value: '1' },
  // { name: 'V2版本', value: '2' },
  { name: 'V2-V3版', value: '3' }
]

// 申请时间
export const APPLY_TIME_OPTIONS = [
  { name: '申请时间', value: '1' },
  { name: '完成时间', value: '2' }
]

// 进口时间
export const APPLY_IMPORT_TIME_OPTIONS = [
  { name: '申请时间', value: '1' },
  { name: '结费时间', value: '2' }
]

export const SHIP_COMPANY_OPTIONS = [
  { name: '超期费', value: '超期费' }
]

// 是否删除状态
export const DEL_OPTIONS = [
  { name: '全部', value: '3' },
  { name: '未删除', value: '1' },
  { name: '已删除', value: '2' }
]
// 结费状态
export const PAY_STATUS_OPTIONS = [
  { name: '未结账', value: '1' },
  { name: '有费用', value: '2' },
  { name: '无费用', value: '3' },
  { name: '客户自结', value: '4' },
  { name: 'SOC', value: '5' },
  { name: '退运箱', value: '6' },
  { name: '套用箱', value: '7' },
  { name: '超期费未结', value: '8' },
  { name: '坏箱费未结', value: '9' }
]

// 业务状态
export const BUSINESS_STATUS_OPTIONS = [
  { name: '新业务', value: '1' },
  { name: '放箱中', value: '2' },
  { name: '未完成', value: '3' },
  { name: '已完成', value: '4' },
  { name: '已对单', value: '5' },
  { name: '有问题', value: '6' },
  { name: '已退关', value: '7' },
  { name: '退单', value: '8' }
]
// 预录状态
export const RECORDED_STATUS_OPTIONS = [
  { name: '发送成功', value: '1' },
  { name: '待处理', value: '2' },
  { name: '预录成功', value: '3' },
  { name: '预录失败', value: '4' },
  { name: '未发送', value: '5' },
  { name: '扣费成功', value: '6' }
]

// 预录状态修改
export const EDIT_STATUS_OPTIONS = [
  { name: '待处理', value: '2' },
  { name: '上港成功 ', value: '3' }
]

// 预录选择系统
export const SYS_TYPE_OPTIONS = [
  { name: 'V2车队', value: '1' },
  { name: '老伙计 ', value: '2' },
  { name: '司机端 ', value: '3' },
  { name: 'V3车队', value: '4' }
]

export const SYS_SIMPLE_TYPE_OPTIONS = [
  { name: 'V3车队', value: 3 },
  { name: 'V2车队', value: 2 }

]
//接口名称
export const INTERFACE_NAME_OPTIOPS=[
  { name: '预录', value: 'prerecord' },
  { name: '船期查询', value: 'shipInfo' },
  { name: '箱货查询', value: 'boxInfo' },
  { name: '出口放箱', value: 'releasingE' },
  { name: '进口放箱', value: 'releasingI' },
  { name: '车辆定位', value: 'gps' },
  { name: '车辆轨迹', value: 'hisTrack' },
  { name: 'EIR详情', value: 'eir' },
  { name: '提单号获取EIR', value: 'billEir' },
]
//内外部接口
export const INTERFACE_TYPE_OPTIOPS=[
  { name: '内部调用', value: 1 },
  { name: '外部调用', value: 2 },
]
//接口用户
export let INTERFACE_USER_OPTIONS=[]
export const MONTH_TONGJI = [
  { name: '新注册统计', value: 0 },
  { name: '累计注册统计', value: 1 },
  { name: '新付费统计', value: 2 },
  { name: '累计付费统计', value: 3 },
  { name: '新使用用户统计', value: 4 },
  { name: '月活用户统计', value: 5 },
  { name: '真实月活用户统计', value: 6 },
  { name: '真实流失用户统计', value: 7 },
  { name: '开户流失用户统计', value: 8 },
  { name: '付费流失用户统计', value: 9 },
  { name: '真实月活流失用户统计', value: 10 },
  { name: '放箱流失用户统计', value: 11 },
  { name: '平台放箱量统计', value: 12 },
  { name: 'JX放箱量统计', value: 13 },
  { name: '放箱车队统计', value: 14 },
  { name: '业务总量统计', value: 15 },
  { name: '业务车队统计', value: 16 },
  { name: '红包客户统计', value: 17 },
  { name: '预录统计', value: 18 }

]
// 做箱时间 添加时间
export const Box_making_time = [
  { name: '做箱时间', value: 'box_time' },
  { name: '添加时间', value: 'add_time' }
]
// 车队性质
export const Fleet_nature_car = [
  { label: '真实车队', value: 1 },
  { label: '测试车队', value: 2 }
]
// 通行税率
export const TAX_OPTIONS = [
  { name: '3%', value: '3%' },
  { name: '5%', value: '5%' },
  { name: '9%', value: '9%' },
  { name: '10%', value: '10%' },
  { name: '不征税', value: '0.0' }
]

// 作废状态
export const DEL_STATUS_OPTIONS = [
  { name: '未作废', value: '1' },
  { name: '已作废', value: '2' },
  { name: '已删除', value: '3' }
]
// 费用类型
export const COST_TYPE_OPTIONS = [
  { name: '应收', value: 1 },
  { name: '应付', value: 2 }
]
// 是否可见
export const COST_STATUS_OPTIONS = [
  { name: '全部可见', value: 1 },
  { name: '只主账号可见', value: 2 }

]
// 是否参与合计计算
export const COST_COMPUTE_OPTIONS = [
  { name: '参与', value: 1 },
  { name: '不参与', value: 2 }
]
// 进出口
export const IN_OUT_OPTIONS = [
  { name: '出口', value: 1 },
  { name: '进口', value: 2 }
]
// 进出口
export const OVER_IN_OUT_OPTIONS = [
  { name: '出口', value: '1' },
  { name: '进口', value: '2' },
  { name: '进出口', value: '3' }
]
// 进出口
export const BOX_IN_OUT_OPTIONS = [
  { name: '出口', value: 1 },
  { name: '进口', value: 2 }

]
// 业务中心状态 1-待处理 2-放箱中 3-放箱失败 4-已放箱 5-已回单 6-退关 7-已派单 8-已打单 9-暂落箱 10-已落箱 11-待预录 12-预录中 13预录失败 14已预录 15已进港 16已换箱 17已完成
export const BUSINESS_CENTER_STATUS_OPTIONS = [
  { name: '待处理', value: 1 },
  { name: '放箱中', value: 2 },
  { name: '放箱失败', value: 3 },
  { name: '已放箱', value: 4 },
  { name: '已回单', value: 5 },
  { name: '退关', value: 6 },
  { name: '已派单', value: 7 },
  { name: '已打单', value: 8 },
  { name: '暂落箱', value: 9 },
  { name: '已落箱', value: 10 },
  { name: '待预录', value: 11 },
  { name: '预录中', value: 12 },
  { name: '预录失败', value: 13 },
  { name: '已预录', value: 14 },
  { name: '已进港', value: 15 },
  { name: '已换箱', value: 16 },
  { name: '已完成', value: 17 }
]

// 车队可视化
export const VISUAL_OPTIONS = [
  { label: '财务可视化', value: 'cw' }
]

// 有无
export const HAS_NOT_OPTIONS = [{ name: '有', value: 1 }, { name: '无', value: 2 }]

// 接口车队V2 V3所属系统
export const V2_V3_FLEET_OPTIONS = [
  { name: 'V2', value: 1 },
  { name: 'V3', value: 2 },
  { name: '放箱', value: 3 },
  { name: '接口', value: 4 }
]
// 定位
export const POSITION_STATUSOPTIONS= [
  { name: '先用北斗再用中交定位', value: 1 },
  { name: '只用北斗定位', value: 2 },
  { name: '只用中交定位', value: 3 },
]
// 管车定位
export const POSITION_STATUSOPTIONS_G= [
  { name: '先用金航再用中交定位', value: 1 },
  { name: '只用金航定位', value: 2 },
  { name: '只用中交定位', value: 3 },
]
// 配置下拉选项
export const POST_PEIZHIXIANG= [
  { name: 'a3', value: 1 },
  { name: 's3的car', value: 2 }
]

// 司机库锁定状态下拉
export const LOCKED_STATE= [
  { name: '锁定', value: 1 },
  { name: '未锁定', value: 2 }
]

// 司机库系统来源下拉
export const SYSTEM_SOURCE= [
  { name: 'V2', value: 1 },
  { name: 'V3', value: 2 },
  { name: '网络货运系统', value: 3 },
]

// 司机库车牌颜色下拉
export const LICENSE_PLATE_COLOR= [
  { name: '黄色', value: 1 },
  { name: '蓝色', value: 2 },
  { name: '绿色', value: 3 },
  { name: '黑色', value: 4 },
  { name: '白色', value: 5 },
]