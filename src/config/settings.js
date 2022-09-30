/**
 * @description 全局变量配置
 */
module.exports = {
  // 部署时的URL
  publicPath: './',
  // 生产环境构建文件的目录名
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 进行编译的依赖
  transpileDependencies: [],
  // 默认的接口地址
  // baseURL: process.env.VUE_APP_BASE_API,
  // 标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: '小哪吒影音',
  // 简写
  abbreviation: 'vab',
  // 开发环境端口号
  devPort: '3030',
  // 是否显示顶部进度条
  progressBar: true,
  // 缓存路由的最大数量
  keepAliveMaxNum: 99,
  // 路由模式，可选值为 history 或 hash
  routerMode: 'hash',
  // 不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/401', '/500'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // token名称
  tokenName: 'token',
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'token',
  // 保存路由菜单
  routeTableName: 'leftNav',
  // 保存用户信息的 key
  userInfoTableName: 'userInfo',
  // 登录角色可读写的权限
  readwriteName: 'readwrite',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  // token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  // 是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  logo: 'vuejs-fill',
  // 是否国定头部 固定fixed 不固定noFixed
  header: 'fixed',
  // 横纵布局 horizontal vertical
  layout: 'vertical',
  // 是否开启主题配置按钮
  themeBar: false,
  // 是否显示多标签页
  tagsBar: true,
  // 是否显示骨架屏
  skeleton: false,
  // 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 消息框消失时间
  messageDuration: 3000,
  // 最长请求时间
  requestTimeout: 30000,
  // 操作正常code
  successCode: 200,
  // 登录失效code
  invalidCode: 402,
  // 无权限code
  noPermissionCode: 401,
  // 是否显示在页面高亮错误
  errorLog: ['development', 'test'],
  // intelligence和all两种方式，前者后端权限只控制permissions不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
  authentication: 'all',
  // vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  // vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOopeneds: [],
  // 需要自动注入并加载的模块
  // providePlugin: { maptalks: 'maptalks', 'window.maptalks': 'maptalks' },
  // npm run build时是否自动生成7z压缩包
  build7z: false,
  // 上传临时文件夹目录
  tempFolder: 'system_temp',
  previewCarFolder: 'img/system/drivers',
  // 默认文件夹
  defaultFolder: 'img/system',
  // 车队登录相对地址
  carLoginFolder: 'car/index.html#/base/login',
  // 车队总代登录相对地址
  admLoginFolder: 'adm/index.html#/base/login',
  // 货代登录地址
  freightLoginFolder: 'ft/index.html#/base/login',
  // 协议名
  protocolName: 'http://',
  // 预录默认金额
  prerecordMoney: 1
}
