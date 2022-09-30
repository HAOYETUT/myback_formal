
export default {
  inserted(el, binding, vnode) {
    el.style.cssText += ';position:absolute;cursor:move;'
    /* 父元素*/
    const dragDom = el.parentNode
    if (!dragDom) return

    el.onmousedown = (e) => {
      let left = null
      let top = null
      // 记录鼠标相对拖放对象的位置
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        left = e.clientX - disX
        top = e.clientY - disY
        const mxLeft = 0
        const mxRight = dragDom.clientWidth
        const mxTop = 0
        const mxBottom = dragDom.clientHeight
        // 修正移动参数
        left = Math.max(Math.min(left, mxRight - el.offsetWidth), mxLeft)
        top = Math.max(Math.min(top, mxBottom - el.offsetHeight), mxTop)
        // 移动当前元素
        el.style.cssText += `;left:${left}px;top:${top}px;`
      }
      document.onmouseup = function(e) {
        // 执行函数和传入位置和下标
        if (left !== null && top !== null) {
          binding.value.cb({ left, top, index: binding.value.index })
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
