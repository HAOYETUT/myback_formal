<!--验证码-->
<template>
  <div style="cursor: pointer;">
    <canvas ref="canvasCode" width="100" height="40" title="刷新验证码" @click="handleClick" />
  </div>
</template>

<script>
export default {
  name: 'VerifyCode',
  props: {
    vCode: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  watch: {
    vCode: {
      handler(newVal) {
        this.$nextTick(() => {
          this.canvas = this.$refs.canvasCode
          this.validateCode(this.canvas, newVal)
        })
      },
      immediate: true
    }
  },
  methods: {
    // 生成并渲染出验证码图形
    validateCode(canvas, arr) {
      if (!Array.isArray(arr) || arr.length <= 0) return
      // 重置 canvas 宽高清空画布
      canvas.width = canvas.width   // eslint-disable-line
      canvas.height = canvas.height // eslint-disable-line
      const context = canvas.getContext('2d')// 获取到canvas画图的环境，演员表演的舞台
      arr.forEach((item, index) => {
        // 产生一个随机弧度
        const deg = Math.random() - 0.5
        // 文字在canvas上的x坐标
        var x = 10 + index * 20
        // 文字在canvas上的y坐标
        var y = 20 + Math.random() * 8
        context.font = 'bold 22px 微软雅黑'
        context.translate(x, y)
        context.rotate(deg)
        context.fillStyle = this.randomColor()
        context.fillText(arr[index], 0, 0)
        context.rotate(-deg)
        context.translate(-x, -y)
      })
      // 验证码上显示线条
      // for (let i = 0; i <= 5; i++) {
      //   context.strokeStyle = this.randomColor()
      //   context.beginPath()
      //   context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      //   context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      //   context.stroke()
      // }
      // 验证码上显示小点
      for (let i = 0; i <= 30; i++) {
        context.strokeStyle = this.randomColor()
        context.beginPath()
        var x = Math.random() * canvas.width
        var y = Math.random() * canvas.width
        context.moveTo(x, y)
        context.lineTo(x + 1, y + 1)
        context.stroke()
      }
    },
    // 随机的颜色值
    randomColor() {
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

