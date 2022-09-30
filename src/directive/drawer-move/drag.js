
/**
 * 抽屉拖拽指令
 * ltr 从左往右开
 * rtl 从右往左开
 * ttb 从上往下开
 * btt 从下往上开
 */
export default {
  bind(el, binding, vnode) {
    if (!el.querySelector('.el-drawer')) return

    // 方向 默认从右往左
    const dire = binding.arg || 'rtl'
    const dragMinWidth = 400
    const dragMinHeight = 300
    const parent = el.querySelector('.el-drawer')
    const posi = {
      ltr: ';right:0;cursor:e-resize;',
      rtl: ';left:0;cursor:w-resize;',
      ttb: ';bottom:0;cursor:s-resize;',
      btt: ';top:0;cursor:n-resize;'
    }
    if (!parent.querySelector('custom-drawer-resize-lr') && !parent.querySelector('custom-drawer-resize-tb')) {
      const dragEl = document.createElement('span')
      dragEl.className = dire === 'ltr' || dire === 'rtl' ? 'custom-drawer-resize-lr' : 'custom-drawer-resize-tb'
      dragEl.style.cssText += posi[dire]
      parent.appendChild(dragEl)
      dragEl.onmousedown = (e) => {
        const disX = e.clientX - dragEl.offsetLeft
        const disY = e.clientY - dragEl.offsetTop

        const parentWidth = parent.offsetWidth
        const parentHeight = parent.offsetHeight

        document.onmousemove = (ev) => {
          // move left top
          const moveLeft = ev.clientX - disX
          const moveTop = ev.clientY - disY
          const maxW = document.documentElement.clientWidth - 10
          const maxH = document.documentElement.clientHeight - 10
          if (dire === 'rtl' || dire === 'ltr') {
            let w = dire === 'rtl' ? parentWidth - moveLeft : dragEl.offsetWidth + moveLeft
            if (w < dragMinWidth) w = dragMinWidth
            if (w > maxW) w = maxW
            parent.style.width = `${w}px`
          }
          if (dire === 'ttb' || dire === 'btt') {
            let h = dire === 'btt' ? parentHeight - moveTop : dragEl.offsetHeight + moveTop
            if (h < dragMinHeight) h = dragMinHeight
            if (h > maxH) h = maxH
            parent.style.height = `${h}px`
          }
        }

        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
}
