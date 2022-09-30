import { MessageBox } from 'element-ui'

var userAgent = navigator.userAgent
var isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
if (isLessIE11) {
  MessageBox({
    title: '温馨提示',
    message:
      '自2015年3月起，微软已宣布弃用IE，且不再对IE提供任何更新维护，我们强烈建议您使用较新版本的 Chrome、 Firefox、 Safari、Edge 或者升级到最新版本的IE浏览器。请<a target="_blank" style="color:blue" href="https://www.microsoft.com/zh-cn/edge/">点击此处</a>访问微软官网更新浏览器，如果您使用的是双核浏览器,请您切换浏览器内核为极速模式。',
    type: 'warning',
    showClose: false,
    showConfirmButton: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    closeOnHashChange: false,
    dangerouslyUseHTMLString: true,
    customClass: 'IE-MessageBox'
  })
}
